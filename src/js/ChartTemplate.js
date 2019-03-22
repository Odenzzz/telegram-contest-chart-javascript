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
		return (this.endChartValue - this.startChartValue) ;
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
		this.drawier.createSVGItem(chart, 'g', {class: 'values-wrapper'});
		this.drawier.createSVGItem(chart, 'g', {class: 'chart-wrapper'});
		this.drawier.createSVGItem(chart, 'g', {class: 'tooltip-wrapper'});

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

		// init end slider
		this.layoutContorls.endChartSlider = this.createSlider(map);
		this.layoutContorls.endChartSlider.setAttributeNS(null, 'x', this.viewBoxWidth - this.endChartWidth);

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
					'stroke-width': this.viewBoxWidth * this.settings.chartLineWidth,
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

			const x = this.xValueToCoord(date, start, end);

			// const shift = (1 - (totalEndDate - date) / (totalEndDate - totalStartDate));

			let text = target.querySelector(`.date-${date}`);

			if (text === null){

				const settings = {
					'y': this.viewBoxHeight - this.viewBoxHeight * 0.05,
					'x': x,
					'width': this.viewBoxWidth * 0.07,
					'height': this.viewBoxHeight * 0.05,
					'fill': 'none',
					'stroke': 'none'
				};

				const wrapper = this.drawier.createSVGItem(target.querySelector('.dates-wrapper'), 'rect', settings);

				const settingsText = {
					'class': 'date-text active-item',
					'x': 0,
					'y': 0
				}

				const text = this.drawier.createSVGItem(wrapper, 'text', settingsText);

				// text = document.createElementNS('http://www.w3.org/2000/svg','text');

				const dateValue = new Date(date);
				wrapper.innerHTML = `${this.settings.monthNames[dateValue.getMonth()]} ${dateValue.getDate()}`;
				text.setAttribute('y', this.viewBoxHeight);
				text.setAttribute('width', `50px`);

				// target.querySelector('.dates-wrapper').appendChild(text);
			}

			// text.setAttribute('x', x);
			// text.setAttributeNS(null, 'class', `date-${date} date-text active-item`);
		}

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

	createMapViewRange(target){

		const settings = {
			'x'           : 0,
			'y'           : 0 - target.viewBox.baseVal.height * (this.mapSliderWidth * 2.5),
			'width'       : 0,
			'height'      : target.viewBox.baseVal.height + target.viewBox.baseVal.height * (this.mapSliderWidth * 5),
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

	changeStartPosition(value){

		const maxOfStartPosition = this.endChartValue - this.viewBoxWidth * this.settings.minMapSpace;

		value = value > 0 ? value : 0;

		value = value < maxOfStartPosition ? value : maxOfStartPosition;

		this.startChartValue = value;

		this.changeMapViewSize();
	}



	changeEndPosition(value){

		const minOfEndPosition = this.startChartValue + this.viewBoxWidth * this.settings.minMapSpace;

		value = value > minOfEndPosition ? value : minOfEndPosition;

		value = value + this.endChartWidth < this.viewBoxWidth ? value : this.viewBoxWidth - this.endChartWidth;

		this.endChartValue = value;

		this.changeMapViewSize();

	}

	changeMapViewSize(){

		const left = this.startChartValue + (this.viewBoxWidth * (this.mapSliderWidth / 2));

		const width = this.viewRangeWidth;

		this.layoutContorls.viewRange.setAttributeNS(null, 'x', left);
		this.layoutContorls.viewRange.setAttributeNS(null, 'width', width);
	}


	initTooltip(event){

		const coordIndex = this.getCoordIndexByClientX(event.clientX);

		const coords = this.getCoordsByIndex(coordIndex);

		if(coords){
			this.drawier.drawTooltip(this.chartWindow, coords, event.clientY);
		}
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