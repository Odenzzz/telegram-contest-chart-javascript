import chartData from '../data/chart_data';



class Chart {

	constructor(data){

		this.lines = {};

		this.x = this.createX(data.columns);

		this.start = this.x[0];

		this.end = this.x[this.x.length - 1];

		this.viewBoxWidth = 100;

		this.totalValues = [];

		this.parseData(data);

		this.layout = new ChartTemplate({
			chart: this
		});

		this.layout.init();

		this.displayedDates = [];
		this.displayedValues = [];


	}


	createLineCoords({id, name, color, coords}){
		this.lines[`${id}`] = {
			name,
			coords,
			color,
			active: true
		}
	}

	createX(columns) {
		for (let column of columns){
			if (column[0] === 'x'){
				column.shift();
				return column;
			}
		}
		return undefined;
	}

	getCoordsFromColumns({key, columns}){

		for(let column of columns){
			if (column[0] === key){
				column.shift();

				this.totalValues.push(...column);

				return column;
			}
		}
		return undefined;

	}

	parseData(data){

		for (let columnId in data.types){
			if (data.types[columnId] === 'line'){
				this.createLineCoords({
					id: columnId,
					name: data.names[columnId],
					color: data.colors[columnId],
					coords: this.getCoordsFromColumns({key: columnId, columns: data.columns})
				})
			}
		}


		// remove all not unique values
		this.totalValues = this.totalValues.filter((v, i, s) => s.indexOf(v) === i);

		// sorting array on values
		this.totalValues.sort();
	}

	getChartMinMaxValueInRange(start, end){

		let min = 99999999999999999;
		let max = 0;

		if (this.getActiveLinesCount() === 0){
			// Prevent the not smooth animation on disable last chart
			return {min: 0, max: this.viewBoxWidth};
		}

		for (let coordIndex in this.x){
			if (this.x[coordIndex] >= start && this.x[coordIndex] <= end){
				for (let lineIndex in this.lines){
					const line = this.lines[lineIndex];
					if (line.active){
						min = line.coords[coordIndex] < min ? line.coords[coordIndex] : min;
						max = line.coords[coordIndex] > max ? line.coords[coordIndex] : max;
					}
				}
			}else{
				for (let lineIndex in this.lines){
					const line = this.lines[lineIndex];
					if (line.active){
						min = line.coords[coordIndex] < min ? line.coords[coordIndex] : min;
					}
				}
			}
		}
		return {min, max};
	}

	getActiveLinesCount(){

		let count = 0;

		for (let lineIndex in this.lines){
			count += this.lines[lineIndex].active ? 1 : 0;
		}

		return count;
	}

	drawDates(target, start, end){

		const monthNames = [
			"Dec", "Jan", "Feb", "Mar",
			"Apr", "May", "Jun", "Jul",
			"Aug", "Sep", "Oct",
			"Nov"
		];


		const range = this.x.slice();
		const totalStartDate = range.shift();
		const totalEndDate = range.pop();



		if (!this.layout.controlsState.mapRangeClicked){



			// const drawCountOfdates = target.clientWidth / 100;

			const coeff = target.viewBox.baseVal.width / target.clientWidth;

			console.log(coeff * target.querySelector('.chart-wrapper').getBoundingClientRect().width);

			const totalDrawsCount = Math.floor((coeff * target.querySelector('.chart-wrapper').getBoundingClientRect().width) / (100 * coeff));

			console.log(coeff);

			const step = Math.floor(((totalEndDate - totalStartDate) / totalDrawsCount));

			let dateValue = totalStartDate;

			this.displayedDates = [];

			for (let i = 0; i < totalDrawsCount; i++){
				dateValue = Math.floor(dateValue / 86400000) * 86400000;
				this.displayedDates.push(dateValue);
				dateValue += step;
			}

			this.displayedDates.push(Math.floor(totalEndDate / 86400000) * 86400000);

			const currentDates = target.getElementsByClassName('date-text');

			for (const currentDate of currentDates){
				if (this.displayedDates.indexOf(Number(currentDate.dataset.date)) === -1){
					currentDate.classList.remove('active-date');
					currentDate.classList.add('removing-date');
				}
			}
		}


		for (const date of this.displayedDates){

			const x = (1 - ((end - date) / (end - start))) * this.viewBoxWidth;

			const shift = (1 - (totalEndDate - date) / (totalEndDate - totalStartDate));

			let text = target.querySelector(`.date-${date}`);

			if (text === null){
				text = document.createElementNS('http://www.w3.org/2000/svg','text');

				const dateValue = new Date(date);
				text.innerHTML = `${monthNames[dateValue.getMonth()]} ${dateValue.getDate()}`;
				text.setAttribute('y', this.viewBoxWidth * (target.clientHeight / target.clientWidth));

				text.dataset.date = date;

				target.querySelector('.dates-wrapper').appendChild(text);
			}
			text.setAttribute('x', x);
			text.setAttributeNS(null, 'class', `date-${date} date-text active-date`);
		}

	}

	drawValues(target, chartValuesMinMax){

		const totalMinMax = this.getChartMinMaxValueInRange(this.start, this.end);

		const countValuesToDisplay = Math.floor(target.clientHeight / 60);

		const coeff = target.viewBox.baseVal.height / target.clientHeight;

		const totalDrawsCount = Math.floor((coeff * target.querySelector('.line-y0').getBoundingClientRect().height) / countValuesToDisplay);

		const valuesRange = this.totalValues;

		const displayInRangeStep = Math.floor((chartValuesMinMax.max - chartValuesMinMax.min) / countValuesToDisplay);

		const chartHeight = chartValuesMinMax.max - chartValuesMinMax.min;

		let stepValue = chartValuesMinMax.min + (chartHeight * 0.02);


		for (const value of valuesRange){

			const y = ((((chartHeight - (value - chartValuesMinMax.min)) / chartHeight) * (this.viewBoxWidth * 0.8)) + this.viewBoxWidth * 0.15) * (target.clientHeight / target.clientWidth);

			let text = target.querySelector(`.value-${value}-text`);
			let path = target.querySelector(`.value-${value}`);

			if (path === null){

				path = document.createElementNS('http://www.w3.org/2000/svg','path');

				path.setAttributeNS(null, 'stroke', '#96a2aa');
				path.setAttributeNS(null, 'stroke-width', this.viewBoxWidth * 0.001);
				path.setAttributeNS(null, 'fill', 'none');
			}

			if (text === null){
				text = document.createElementNS('http://www.w3.org/2000/svg','text');

				text.innerHTML = value;
				text.setAttribute('x', 0);

				text.dataset.value = value;
				target.querySelector('.values-wrapper').appendChild(text);
			}
			if (value >= stepValue){
				stepValue += displayInRangeStep;
				text.setAttribute('y', (y - target.viewBox.baseVal.height * 0.01));
				text.setAttributeNS(null, 'class', `value-${value}-text active-value`);
				path.setAttributeNS(null, 'class', `value-${value} active-value`);
				path.setAttributeNS(null, 'd', `M0 ${y} L ${700} ${y}`);
				target.querySelector('.values-wrapper').appendChild(path);
			}else{
				if (target.querySelector(`.value-${value}`) !== null){
					target.querySelector(`.value-${value}`).remove();
				}
				text.setAttributeNS(null, 'class', `value-${value}-text removing-value`);
				path.setAttributeNS(null, 'class', `value-${value} removing-value`);
			}
		}

	}

	drawLines({target, startPercent = 0, endPercent = this.viewBoxWidth, drawValues = false}){


		let start = this.start + ((this.end - this.start) * (startPercent / this.viewBoxWidth));
		let end = this.end - ((this.end - this.start) * (1 - (endPercent / this.viewBoxWidth)));


		const aspectRatioCoeff = target.clientHeight / target.clientWidth;

		target.setAttribute('viewBox', `0 0 ${this.viewBoxWidth} ${this.viewBoxWidth * aspectRatioCoeff}`);

		// Disable zoom less than 100%
		start = this.start > start ? this.start : start;
		end = this.end < end ? this.end : end;
		const chartWidth = (end - start);

		const chartValuesMinMax = this.getChartMinMaxValueInRange(start, end);
		const chartHeight = chartValuesMinMax.max - chartValuesMinMax.min;

		for (let lineId in this.lines){

			let pathLine = '';

			const yCoords = this.lines[lineId].coords;

			for (let coordIndex in this.x){

				coordIndex = Number(coordIndex);
				let x = this.x[coordIndex];
				let y = yCoords[coordIndex];

				x = (1 - ((end - x) / chartWidth)) * this.viewBoxWidth;
				y = ((((chartHeight - (y - chartValuesMinMax.min)) / chartHeight) * (this.viewBoxWidth * 0.8)) + this.viewBoxWidth * 0.15) * aspectRatioCoeff;


				pathLine += (coordIndex === 0) ? `M${x} ${y}` : ` L ${x} ${y}`;

			}

			let path = target.querySelector(`.line-${lineId}`);

			if (path === null){
				// Create the chart path if it not exists
				path = document.createElementNS('http://www.w3.org/2000/svg','path');
				path.setAttributeNS(null, 'class', `line-${lineId}`);
				path.setAttributeNS(null, 'stroke', this.lines[lineId].color);
				path.setAttributeNS(null, 'stroke-width', this.viewBoxWidth * 0.004);
				path.setAttributeNS(null, 'fill', 'none');
				target.querySelector('.chart-wrapper').appendChild(path);
			}
			path.setAttributeNS(null, 'd', pathLine);
		}

		if (drawValues){
			this.drawDates(target, start, end);
			this.drawValues(target, chartValuesMinMax);
		}
	}
}


class ChartTemplate {

	constructor({chart, appendTarget = 'body'}){

		this.chart = chart;

		this.layoutID = `chart-layout-${Math.floor(Math.random() * 100000)}`;

		this.appendTarget = document.querySelector(appendTarget);

		this.layout;

		this.layoutContorls = {};

		this.controlsState = {
			startClicked        : false,
			endClicked          : false,
			mapRangeClicked     : false,
			chartMove           : false,
			chartReverceMove    : false,
			startPosition       : 0,
			endPosition         : this.chart.viewBoxWidth,
			clickInitialPosition: 0
		};

		this.chartWindow, this.mapWindow;
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

	init(){

		this.layout = this.initLayout();

		this.chartWindow = this.initChartWindow();

		this.map = this.initMap();

		this.initControlButtons();

	}

	initMap(){

		const map = this.layout.querySelector('.chart__map svg');

		const chartWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');

		chartWrapper.setAttributeNS(null, 'class', 'chart-wrapper');

		map.appendChild(chartWrapper);

		this.chart.drawLines({target: map});

		this.layoutContorls.viewRange = this.createMapViewRange(map);

		this.layoutContorls.startChartSlider = this.createSlider(map);
		this.layoutContorls.startChartSlider.setAttributeNS(null, 'x', this.controlsState.startPosition);
		this.layoutContorls.startChartSlider.addEventListener('mousedown', () => this.controlsState.startClicked = true);
		this.layoutContorls.startChartSlider.addEventListener('touchstart', () => this.controlsState.startClicked = true);

		this.layoutContorls.endChartSlider = this.createSlider(map);
		this.layoutContorls.endChartSlider.setAttributeNS(null, 'x', this.controlsState.endPosition - this.endChartWidth);
		this.layoutContorls.endChartSlider.addEventListener('mousedown', () => this.controlsState.endClicked = true);
		this.layoutContorls.endChartSlider.addEventListener('touchstart', () => this.controlsState.endClicked = true);

		this.changeMapViewSize();

		this.clearConsrolState();

		return map;
	}

	createSlider(map){
		const chartSlider = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		chartSlider.setAttributeNS(null, 'y', 0);
		chartSlider.setAttributeNS(null, 'width', map.viewBox.baseVal.width * 0.02);
		chartSlider.setAttributeNS(null, 'height', map.viewBox.baseVal.height);
		chartSlider.setAttributeNS(null, 'fill', 'rgba(0,0,0,0)');
		chartSlider.addEventListener('mousedown', event => {
			this.controlsState.clickInitialPosition = event.clientX;
			this.controlsState.chartMove            = true;
		});
		chartSlider.addEventListener('touchstart', event => {
			this.controlsState.clickInitialPosition = event.touches[0].clientX;
			this.controlsState.chartMove            = true;
		});

		map.appendChild(chartSlider);
		return chartSlider;
	}

	createMapViewRange(map){
		const viewRange = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

		viewRange.setAttributeNS(null, 'y', 0 - map.viewBox.baseVal.height * 0.05);
		viewRange.setAttributeNS(null, 'x', 0);
		viewRange.setAttributeNS(null, 'width', 0);
		viewRange.setAttributeNS(null, 'height', map.viewBox.baseVal.height * 1.1);
		viewRange.setAttributeNS(null, 'fill', 'rgba(0,0,0,0)');
		viewRange.setAttributeNS(null, 'stroke', 'rgba(133, 173, 201, .5)');
		viewRange.setAttributeNS(null, 'stroke-width', this.chart.viewBoxWidth * 0.02);
		viewRange.addEventListener('mousedown', event => {
			this.controlsState.clickInitialPosition = event.clientX;
			this.controlsState.mapRangeClicked      = true;
			this.controlsState.chartMove            = true;
			this.controlsState.minMapViewRange      = this.viewRangeWidth;
		});
		viewRange.addEventListener('touchstart', event => {
			this.controlsState.clickInitialPosition = event.touches[0].clientX;
			this.controlsState.mapRangeClicked      = true;
			this.controlsState.chartMove            = true;
			this.controlsState.minMapViewRange      = this.viewRangeWidth;
		});

		map.appendChild(viewRange);
		return viewRange;
	}

	initChartWindow(){


		const chartWindow = this.layout.querySelector('.chart__window svg');

		const datesWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');

		datesWrapper.setAttributeNS(null, 'class', 'dates-wrapper');

		const valuesWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');

		valuesWrapper.setAttributeNS(null, 'class', 'values-wrapper');

		const chartWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');

		chartWrapper.setAttributeNS(null, 'class', 'chart-wrapper');

		chartWindow.appendChild(datesWrapper);
		chartWindow.appendChild(valuesWrapper);
		chartWindow.appendChild(chartWrapper);

		chartWindow.addEventListener('mousedown', event => {
			this.controlsState.clickInitialPosition = event.clientX;
			this.controlsState.mapRangeClicked      = true;
			this.controlsState.chartMove            = true;
			this.controlsState.chartReverceMove     = true;
			this.controlsState.minMapViewRange      = this.viewRangeWidth;
		});
		chartWindow.addEventListener('touchstart', event => {
			this.controlsState.clickInitialPosition = event.touches[0].clientX;
			this.controlsState.mapRangeClicked      = true;
			this.controlsState.chartMove            = true;
			this.controlsState.chartReverceMove     = true;
			this.controlsState.minMapViewRange      = this.viewRangeWidth;
		});

		this.chart.drawLines({target: chartWindow, drawValues: true});

		return chartWindow;

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

	initControlButtons(){
		for (let line_id in this.chart.lines){

			const button = document.createElement('button');
			button.style.background = this.chart.lines[line_id].color;
			button.innerHTML = this.chart.lines[line_id].name;

			button.addEventListener('click', () => {
				const line = this.chartWindow.querySelector(`.line-${line_id}`);
				if (this.chart.lines[line_id].active){
					this.chart.lines[line_id].active = false;
					line.style.opacity = 0;
				}else{
					this.chart.lines[line_id].active = true;
					line.style.opacity = 1;
				}
				this.chart.drawLines({
					target: this.chartWindow,
					startPercent: this.startChartValue,
					endPercent: this.endChartValue + this.endChartWidth,
					drawValues: true
				});
			});
			this.layout.querySelector('.chart__buttons').appendChild(button);
		}

	}

	changeStartPosition(value){

		const maxOfStartPosition = this.endChartValue - this.controlsState.minMapViewRange;

		value = value > 0 ? value : 0;
		value = value < maxOfStartPosition ? value : maxOfStartPosition;

		this.startChartValue = value;

		this.changeMapViewSize();
	}

	changeEndPosition(value){

		const minOfEndPosition = this.startChartValue + this.controlsState.minMapViewRange;

		value = value > minOfEndPosition ? value : minOfEndPosition;
		value = value + this.endChartWidth < this.chart.viewBoxWidth ? value : this.chart.viewBoxWidth - this.endChartWidth;

		this.endChartValue = value;

		this.changeMapViewSize();

	}

	changeMapViewSize(){
		const left = this.startChartValue + (this.chart.viewBoxWidth * 0.01);
		const width = this.viewRangeWidth;
		this.layoutContorls.viewRange.setAttributeNS(null, 'x', left);
		this.layoutContorls.viewRange.setAttributeNS(null, 'width', width);
	}


	clearConsrolState(){
		this.controlsState.startPosition    = this.startChartValue;
		this.controlsState.endPosition      = this.endChartValue;
		this.controlsState.minMapViewRange  = this.chart.viewBoxWidth * 0.15;
		this.controlsState.startClicked     = false;
		this.controlsState.endClicked       = false;
		this.controlsState.chartReverceMove = false;
		this.controlsState.chartMove        = false;
		this.controlsState.mapRangeClicked  = false;
	}

	moveChart(event){
		const clientX = event.clientX || event.touches[0].clientX;
		if (this.controlsState.startClicked || this.controlsState.mapRangeClicked){

			let valueStart;
			if (this.controlsState.chartReverceMove){
				valueStart = this.controlsState.startPosition + ((this.controlsState.clickInitialPosition - clientX) / this.layout.clientWidth) * this.viewRangeWidth;
			}else{
				valueStart = this.controlsState.startPosition + (0 - (this.controlsState.clickInitialPosition - clientX) / this.layout.clientWidth) * this.chart.viewBoxWidth;
			}

			this.changeStartPosition(valueStart);

		}

		if (this.controlsState.endClicked || this.controlsState.mapRangeClicked){

			let valueEnd;
			if (this.controlsState.chartReverceMove){
				valueEnd = (this.controlsState.endPosition + ((this.controlsState.clickInitialPosition - clientX) / this.layout.clientWidth) * this.viewRangeWidth);
			}else{
				valueEnd = (this.controlsState.endPosition + (0 - (this.controlsState.clickInitialPosition - clientX) / this.layout.clientWidth) * this.chart.viewBoxWidth);
			}

			this.changeEndPosition(valueEnd);

		}


		if(this.controlsState.chartMove){
			const startPercent = this.startChartValue;
			const endPercent = this.endChartValue + this.endChartWidth;
			const target = this.chartWindow;

			target.classList.add('dragging');
			this.chart.drawLines({target, startPercent, endPercent, drawValues: true});
			setTimeout(() => {
				target.classList.remove('dragging');
			}, 0);
		}
	}

	initLayout(){

		const layout = document.createElement('div');

		layout.classList.add('chart_wrapper');

		layout.innerHTML = this.chartTemplate;

		document.addEventListener('mousemove', (event) => {
			this.moveChart(event);
		});
		document.addEventListener('touchmove', (event) => {
			this.moveChart(event);
		});


		document.addEventListener('mouseup', () => this.clearConsrolState());
		document.addEventListener('touchend', () => this.clearConsrolState());

		this.appendTarget.append(layout);

		return layout;

	}
}


new Chart(chartData[2]);