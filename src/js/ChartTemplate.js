import ChartDrawier from './ChartDrawier';

export default class ChartTemplate {

	constructor({appendTarget = body, settings}){

		this.drawier = new ChartDrawier();

		this.layoutID = `chart-layout-${Math.floor(Math.random() * 100000)}`;

		this.mainAppendTarget = document.querySelector(appendTarget);

		this.layoutContorls = {};

		this.settings = settings;

		// define chart elements (like wrapper, window, map, etc...)
		this.elements = {};

	}

	get chartTemplate(){
		return `
			<div class="chart" id="${this.layoutID}">
				<div class="chart__window">
					<svg></svg>
				</div>
				<div class="chart__map">
					<svg></svg>
				</div>
				<div class="chart__buttons"></div>
			</div>
		`;
	}

	get viewBoxWidth(){
		return this.settings.viewBoxWidth;
	}

	get viewBoxHeight(){
		return this.settings.viewBoxWidth / this.chartAspectRatio;
	}

	get chartSizeCoeff(){
		return this.viewBoxWidth / this.elements.chartWrapper.clientWidth;
	}

	get currentColorScheme(){
		const mode = this.settings.currentMode;
		return this.settings[`${mode}Mode`];
	}

	get mapSliderWidth() {
		return this.settings.mapSliderWidth;
	}

	get startChartValue(){
		return this.layoutContorls.startChartSlider.x.baseVal.value;
	}
	set startChartValue(value){
		this.layoutContorls.startChartSlider.x.baseVal.value = value;
	}
	get startChartWidth(){
		return this.layoutContorls.startChartSlider.width.baseVal.value;
	}

	get endChartValue(){
		return this.layoutContorls.endChartSlider.x.baseVal.value;
	}
	set endChartValue(value){
		this.layoutContorls.endChartSlider.x.baseVal.value = value;
	}
	get endChartWidth(){
		return this.layoutContorls.endChartSlider.width.baseVal.value;
	}

	get viewRangeWidth(){
		return this.endChartValue - this.startChartValue;
	}

	get chartAspectRatio(){
		return this.elements.chartWrapper.clientWidth / this.elements.chartWrapper.clientHeight;
	}

	get mapAspectRatio(){
		return this.elements.mapWrapper.clientWidth / this.elements.mapWrapper.clientHeight;
	}

	// init all chart template
	init(){

		this.elements.layout = this.initLayout();

		this.elements.chartWrapper = this.elements.layout.querySelector('.chart__window');

		this.elements.mapWrapper = this.elements.layout.querySelector('.chart__map');

		this.elements.buttonsWrapper = this.elements.layout.querySelector('.chart__buttons');

		this.elements.chart = this.initChart();

		this.elements.map = this.initMap();

		this.setCurrentColorScheme();

	}

	setCurrentColorScheme(){

		document.querySelector('body').style.background = this.currentColorScheme.background;

		this.elements.map.style.background = this.currentColorScheme.background;

		this.elements.chart.style.background = this.currentColorScheme.background;

	}

	initLayout(){

		const layout = document.createElement('div');

		layout.classList.add('chart_wrapper');

		layout.innerHTML = this.chartTemplate;

		this.mainAppendTarget.append(layout);

		return layout;

	}

	initChart(){

		const chart = this.elements.chartWrapper.querySelector('svg');

		chart.setAttribute('viewBox', `0 0 ${this.viewBoxWidth} ${this.viewBoxWidth / this.chartAspectRatio}`);

		this.drawier.createSVGItem(chart, 'g', {class: 'dates-wrapper'});
		this.drawier.createSVGItem(chart, 'g', {class: 'value-lines-wrapper'});
		this.drawier.createSVGItem(chart, 'g', {class: 'chart-wrapper'});
		this.drawier.createSVGItem(chart, 'g', {class: 'tooltip-wrapper'});
		this.drawier.createSVGItem(chart, 'g', {class: 'values-wrapper'});

		return chart;

	}

	initMap(){

		const map = this.elements.mapWrapper.querySelector('svg');

		map.setAttribute('viewBox', `0 0 ${this.viewBoxWidth} ${this.viewBoxWidth / this.mapAspectRatio}`);

		this.drawier.createSVGItem(map, 'g', {class: 'chart-wrapper'});

		this.layoutContorls.viewRange = this.createMapViewRange(map);

		// init start slider
		this.layoutContorls.startChartSlider = this.createSlider(map);
		this.layoutContorls.startChartSlider.setAttributeNS(null, 'x', 0);

		// init start map background
		this.layoutContorls.startMapBackground = this.createMapBackground(map);
		this.layoutContorls.startMapBackground.setAttributeNS(null, 'x', 0);

		// init end slider
		this.layoutContorls.endChartSlider = this.createSlider(map);
		this.layoutContorls.endChartSlider.setAttributeNS(null, 'x', this.viewBoxWidth - this.endChartWidth);

		// init start map background
		this.layoutContorls.endMapBackground = this.createMapBackground(map);
		this.layoutContorls.endMapBackground.setAttributeNS(null, 'x', this.viewBoxWidth);

		this.changeMapViewSize();

		return map;

	}

	xValueToCoord(x, start, end){

		return (1 - ((end - x) / (end - start))) * this.viewBoxWidth;

	}

	yValueToCoord(y, min, max, target){

		return (((max - min) - (y - min)) / (max - min)) * (this.viewBoxWidth * this.settings.chartHeight) / (target.clientWidth / target.clientHeight);

	}

	createLines({target, x, lines, start, end, min, max}){

		for (let lineId in lines){

			let pathLine = '';

			const yCoords = lines[lineId].coords;

			for (let coordIndex in x){

				coordIndex = Number(coordIndex);

				const xCoord = this.xValueToCoord(x[coordIndex], start, end);
				const yCoord = this.yValueToCoord(yCoords[coordIndex], min, max, target);

				pathLine += (coordIndex === 0) ? `M${xCoord} ${yCoord}` : ` L ${xCoord} ${yCoord}`;

			}

			let path = target.querySelector(`.line-${lineId}`);

			if (path === null){
				const settings = {
					'class': `line-${lineId}`,
					'stroke': lines[lineId].color,
					'stroke-width': this.chartSizeCoeff * this.settings.chartLineWidth,
					'fill': 'none'
				}

				// Create the chart path if it not exists
				path = this.drawier.createSVGItem(target.querySelector('.chart-wrapper'), 'path', settings);

			}

			path.setAttributeNS(null, 'd', pathLine);
		}
	}

	createDates({target, dates, start, end}){

		for (const date of dates){

			let x = this.xValueToCoord(date, start, end);

			let text = target.querySelector(`.date-${date}`);

			if (text === null){

				const settingsText = {
					'y': this.viewBoxHeight - this.viewBoxHeight * 0.05,
					'font-size': this.chartSizeCoeff * this.settings.fontSize,
					'class': `date-text date-${date} removing-item`,
					'color': this.currentColorScheme.textColor,
					'fill': this.currentColorScheme.textColor
				}

				text = this.drawier.createSVGItem(target.querySelector('.dates-wrapper'), 'text', settingsText);

				const dateValue = new Date(date);
				text.innerHTML = `${this.settings.monthNames[dateValue.getMonth()]} ${dateValue.getDate()}`;
				text.setAttribute('y', this.viewBoxHeight);

			}

			text.setAttribute('x', 0);
			text.setAttribute('x', x - Math.floor(text.clientWidth / 2));
			text.setAttributeNS(null, 'class', `date-${date} date-text active-item`);
		}

	}

	createValues({target, steps, min, max}){

		for (const value of steps){

			const y = this.yValueToCoord(value, min, max, target);

			let text = target.querySelector(`.value-${value}-text`);

			let path = target.querySelector(`.value-${value}-value`);

			if (path === null){
				const settings = {
					'stroke': this.currentColorScheme.valueLineColor,
					'stroke-width': this.chartSizeCoeff * this.settings.valueLineWidth,
					'fill': 'none'
				};
				path = this.drawier.createSVGItem(target.querySelector('.value-lines-wrapper'), 'path', settings);
			}

			path.setAttributeNS(null, 'd', `M${0} ${y} L ${this.viewBoxWidth} ${y}`);
			path.setAttribute('class', `value-item active-item value-${value} value-${value}-value`);

			if (text === null){
				const settings = {
					'x': 0,
					'font-size': this.chartSizeCoeff * this.settings.fontSize,
					'color': this.currentColorScheme.textColor,
					'fill': this.currentColorScheme.textColor
				};
				text = this.drawier.createSVGItem(target.querySelector('.values-wrapper'), 'text', settings);
			}

			text.innerHTML = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
			text.setAttribute('y', (y - target.viewBox.baseVal.height * 0.01));
			text.setAttribute('class', `value-item active-item value-${value} value-${value}-text`);
		}
	}

	createTooltip({x, values, clientY, start, end, min, max}){

		const target = this.elements.chartWrapper;

		const xCoord = this.xValueToCoord(x, start, end);

		let tooltipPath = target.querySelector(`.tooltip-${x}`);

		let tooltipHTML = ``;

		let tooltipText = document.querySelector(`#tooltip-text-${x}`);


		if (tooltipPath === null){

			this.removeItems('tooltip-item', `tooltip-${x}`);

			const dateValue = new Date(x);

			tooltipHTML += `<span class="tooltip-date">${this.settings.weekdaysNames[dateValue.getDay()]}, ${this.settings.monthNames[dateValue.getMonth()]} ${dateValue.getDate()}</span>`;
			tooltipHTML += `<div class="tooltip-values-wrapper">`;

			for (const chartValue of values){

				let circleValue = target.querySelector(`.tooltip-value-${chartValue.y}`);

				const yCoord = this.yValueToCoord(chartValue.y, min, max, target);

				if (circleValue === null){

					const settings = {
						'stroke'      : chartValue.color,
						'stroke-width': this.chartSizeCoeff * this.settings.tooltipCircleLineWidth,
						'fill'        : this.currentColorScheme.background,
						'r'           : this.chartSizeCoeff * this.settings.tooltipCirclesRadius,
						'class'       : `tooltip-${x} tooltip-value-${chartValue.y} tooltip-item`
					}

					circleValue = this.drawier.createSVGItem(target.querySelector('.tooltip-wrapper'), 'circle', settings);

				}

				circleValue.setAttributeNS(null, 'cx', xCoord);
				circleValue.setAttributeNS(null, 'cy', yCoord);


				tooltipHTML += `<div class="tooltip-value-wrapper" style="color: ${chartValue.color}">
					<span class="tooltip-value">${[chartValue.y].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span>
					<span class="tooltip-value-name">${chartValue.name}</span>
				</div>`;

			}

			tooltipHTML += `</div>`;

			if (tooltipText === null){
				tooltipText = document.createElement('div');
				tooltipText.setAttribute('class', `tooltip-text tooltip-${x} tooltip-item`);
				tooltipText.setAttribute('id', `tooltip-text-${x}`);
				this.elements.chartWrapper.appendChild(tooltipText);
			}

			tooltipText.innerHTML = tooltipHTML;
			tooltipText.style.background = this.currentColorScheme.tooltipBackground;
			tooltipText.style.color = this.currentColorScheme.tooltipColor;

			const settings = {
				'stroke': this.currentColorScheme.tooltipLineColor,
				'stroke-width': this.chartSizeCoeff * this.settings.tooltipLineWidth,
				'fill': 'none',
				'class': `tooltip-${x} tooltip-item`,
				'd': `M${xCoord} 0 L ${xCoord} ${this.viewBoxHeight}`,
			}
			tooltipPath = this.drawier.createSVGItem(target.querySelector('.tooltip-wrapper'), 'path', settings);
		}

		// rect of chart
		const bcrChart = this.elements.chart.getBoundingClientRect();

		// rect of tooltip (text)
		const bcrTooltip = tooltipText.getBoundingClientRect();

		// rect of tooltip (line)
		const bcrCurrentTooltipLine = tooltipPath.getBoundingClientRect();

		// get relative Y position of cursor
		const chartY = clientY - bcrChart.top;

		// tooltip on top from cursor by offset
		let left = ((bcrCurrentTooltipLine.left - bcrChart.left) - (bcrTooltip.width / 2));
		let top = chartY - (bcrTooltip.height + this.settings.tooltipOffsetFromCursor);

		// tooltip on right from cursor by offset
		if (left < 0){
			left = (bcrCurrentTooltipLine.left - bcrChart.left) + this.settings.tooltipOffsetFromCursor;
			top = chartY - (bcrTooltip.height / 2);

		}

		// tooltip on left from cursor by offset
		if ((left + bcrTooltip.width) > bcrChart.width){
			left = (bcrCurrentTooltipLine.left - bcrChart.left) - (bcrTooltip.width + this.settings.tooltipOffsetFromCursor);
			top = chartY - (bcrTooltip.height / 2);
		}

		// tooltip on bottom from cursor by offset
		if (top < 0){
			top = chartY + this.settings.tooltipOffsetFromCursor;
		}


		// tooltip on top (right/left) from cursor by offset
		if ((top + bcrTooltip.height) > (bcrChart.height - (bcrChart.height * (1 - this.settings.chartHeight)))){
			top = chartY - (bcrTooltip.height + this.settings.tooltipOffsetFromCursor);
		}


		tooltipText.style.top = `${top}px`;
		tooltipText.style.left = `${left}px`;
	}


	createSlider(target){

		const settings = {
			'y'     : 0,
			'width' : target.viewBox.baseVal.width * this.mapSliderWidth,
			'height': target.viewBox.baseVal.height,
			'fill'  : 'rgba(0,0,0,0)'
		};

		const chartSlider = this.drawier.createSVGItem(target, 'rect', settings);

		return chartSlider;
	}

	createMapBackground(target){
		const settings = {
			'y'     : 0,
			'width' : 0,
			'height': target.viewBox.baseVal.height,
			'fill'  : this.currentColorScheme.mapNotVisibleBackground
		};

		const mapBackground = this.drawier.createSVGItem(target, 'rect', settings);

		return mapBackground;
	}

	createMapViewRange(target){

		const settings = {
			'x'           : 0,
			'y'           : 0 - target.viewBox.baseVal.height * this.mapSliderWidth,
			'width'       : 0,
			'height'      : target.viewBox.baseVal.height + target.viewBox.baseVal.height * (this.mapSliderWidth * 2),
			'fill'        : 'rgba(0,0,0,0)',
			'stroke'      : this.currentColorScheme.startEndColor,
			'stroke-width': this.viewBoxWidth * this.mapSliderWidth
		};

		const viewRange = this.drawier.createSVGItem(target, 'rect', settings);

		return viewRange;
	}

	initControlButtons(lines){

		const buttons = [];

		for (let lineID in lines){

			const button = document.createElement('button');

			button.style.background = lines[lineID].color;

			button.innerHTML = lines[lineID].name;

			button.dataset.lineid = lineID;

			this.elements.buttonsWrapper.appendChild(button);

			buttons.push(button);

		}

		this.elements.buttons = buttons;

	}

	changeStartPosition(value, minRangeWidth){

		const maxOfStartPosition = this.endChartValue + this.endChartWidth - minRangeWidth;

		value = value > 0 ? value : 0;

		value = value < maxOfStartPosition ? value : maxOfStartPosition;

		this.startChartValue = value;

		this.layoutContorls.startMapBackground.setAttributeNS(null, 'width', this.startChartValue);

		this.changeMapViewSize();
	}



	changeEndPosition(value, minRangeWidth){

		const minOfEndPosition = this.startChartValue + minRangeWidth - this.endChartWidth;

		value = value > minOfEndPosition ? value : minOfEndPosition;

		value = value + this.endChartWidth < this.viewBoxWidth ? value : this.viewBoxWidth - this.endChartWidth;

		this.endChartValue = value;

		this.layoutContorls.endMapBackground.setAttributeNS(null, 'width', this.viewBoxWidth - this.endChartValue + this.endChartWidth);
		this.layoutContorls.endMapBackground.setAttributeNS(null, 'x', this.endChartValue + this.endChartWidth);

		this.changeMapViewSize();

	}


	changeMapViewSize(){

		const left = this.startChartValue + (this.viewBoxWidth * (this.mapSliderWidth / 2));

		const width = this.viewRangeWidth;

		this.layoutContorls.viewRange.setAttributeNS(null, 'x', left);
		this.layoutContorls.viewRange.setAttributeNS(null, 'width', width);

	}




	removeItems(removingClass, drawingID = 'id-of-item-to-not-remove', action = 'remove'){

		let checkToNotRemove = [];

		if (typeof drawingID === 'string'){
			checkToNotRemove.push(drawingID);
		}else if(Array.isArray(drawingID)){
			checkToNotRemove = drawingID;
		}else{
			reject('Wrong value of Drawing ID');
		}

		let items = this.elements.layout.getElementsByClassName(removingClass);

		if (this.removeItem(items, checkToNotRemove, items.length, action)){
			return true;
		}else{
			return false;
		}

	}

	removeItem(items, checkToNotRemove, countToRemove, action){
		for (const item of items){
			let found = 0;
			for (const checkID of checkToNotRemove){
				found += item.classList.contains(checkID) ? 1 : 0;
			}
			if (found === 0){
				switch (action){
					case 'remove':
						item.remove();
						break;
					case 'hide':
						item.classList.remove('active-item');
						item.classList.add('removing-item');
						break;
				}
				countToRemove--;
			}else{
				countToRemove--;
			}
		}
		if (countToRemove !== 0){
			return this.removeItem(items, checkToNotRemove, countToRemove, action);
		}else{
			return true;
		}
	}

}