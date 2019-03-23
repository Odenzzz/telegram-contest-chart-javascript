import ChartData from './ChartData';
import ChartTemplate from './ChartTemplate';

export default class ChartController{

	constructor(data){

		this.data = new ChartData(data);

		this.view = new ChartTemplate({
			appendTarget: 'body',
			settings: this.data.settings
		});

		this.displayedDates = [];

		this.displayedValues = [];

		this.controlsState = {
			startClicked        : false,
			endClicked          : false,
			mapRangeClicked     : false,
			chartMove           : false,
			chartReverceMove    : false,
			startPosition       : 0,
			endPosition         : this.viewBoxWidth,
			clickInitialPosition: 0,
			minMapViewRange     : this.data.settings.minMapSpace
		};

		this.main();
	}

	get viewBoxWidth(){
		return this.data.settings.viewBoxWidth;
	}
	get chartSizeCoeff(){
		return this.viewBoxWidth / this.view.elements.chartWrapper.clientWidth;
	}

	get currentStart(){
		return this.view.startChartValue;
	}

	get currentEnd(){
		return this.view.endChartValue + this.view.endChartWidth;
	}

	getCoordsByIndex(coordIndex){
		const x = this.data.x[coordIndex];

		const coords = {
			x: x,
			values: []
		};

		for (const lineId in this.data.lines){
			if (this.data.lines[lineId].active){
				coords.values.push({
					y: this.data.lines[lineId].coords[coordIndex],
					color: this.data.lines[lineId].color,
					name: this.data.lines[lineId].name
				});
			}
		}

		if (coords.values.length > 0){
			return coords;
		}else{
			return false;
		}

	}

	getCoordIndexByClientX(clientX){

		const chart = this.view.elements.chart;

		const chartCoeff = chart.querySelector('.chart-wrapper').getBoundingClientRect().width / chart.clientWidth;

		// get window start position inside the full chart
		const chartStart = this.viewBoxWidth * (chartCoeff * this.controlsState.startPosition / this.viewBoxWidth);

		const chartFullWidth = this.viewBoxWidth * chartCoeff;

		const chartIntervalWidth = chartFullWidth / this.data.x.length;

		// get cursor position inside the full chart
		const cursorPositionInChart = chartStart + (clientX - chart.getBoundingClientRect().left) / chart.clientWidth * this.viewBoxWidth;

		const cursorShift = (((chartFullWidth / 2) - cursorPositionInChart) / chartFullWidth) * chartIntervalWidth;

		const percentCursorPositionInChart = cursorPositionInChart / this.viewBoxWidth / chartCoeff;

		return Math.floor(this.data.x.length * percentCursorPositionInChart + (cursorShift / chartCoeff));

	}


	main(){

		this.view.init();

		this.updateLines({target: this.view.elements.chart, drawValues: true});
		this.updateLines({target: this.view.elements.map});

		this.view.initControlButtons(this.data.lines);

		this.setEventListeners();

	}


	setEventListeners(){

		this.setButtonsListeners();

		this.dragStartListeners();

		this.dragEndListeners();

		this.moveListeners();



	}

	setButtonsListeners(){
		for (const button of this.view.elements.buttons){

			button.addEventListener('click', () => {

				const lineID = button.dataset.lineid;

				const lines = this.view.elements.layout.getElementsByClassName(`line-${lineID}`);

				if (this.data.lines[lineID].active){
					this.data.lines[lineID].active = false;
					for (const line of lines){
						line.style.opacity = 0;
					}

				}else{
					this.data.lines[lineID].active = true;
					for (const line of lines){
						line.style.opacity = 1;
					}
				}

				this.updateLines({
					target: this.view.elements.chart,
					startPercent: this.currentStart,
					endPercent: this.currentEnd,
					drawValues: true
				});

				this.updateLines({
					target: this.view.elements.map,
					startPercent: 0,
					endPercent: this.viewBoxWidth,
					drawValues: false
				});

			});
		}
	}



	dragEndListeners(){

		document.addEventListener('mouseup',  () => this.clearConsrolState());
		document.addEventListener('touchend', () => this.clearConsrolState());

	}

	dragStartListeners(){

		// move chart by dragging map range
		this.view.layoutContorls.viewRange.addEventListener('mousedown', event => {
			this.controlsState.clickInitialPosition = event.clientX;
			this.controlsState.mapRangeClicked      = true;
			this.controlsState.chartMove            = true;
			this.controlsState.minMapViewRange      = this.currentEnd - this.currentStart;
		});

		this.view.layoutContorls.viewRange.addEventListener('touchstart', event => {
			this.controlsState.clickInitialPosition = event.touches[0].clientX;
			this.controlsState.mapRangeClicked      = true;
			this.controlsState.chartMove            = true;
			this.controlsState.minMapViewRange      = this.currentEnd - this.currentStart;
		});



		// change start position
		this.view.layoutContorls.startChartSlider.addEventListener('mousedown', event => {
			this.controlsState.clickInitialPosition = event.clientX;
			this.controlsState.chartMove            = true;
			this.controlsState.startClicked         = true;
		});

		this.view.layoutContorls.startChartSlider.addEventListener('touchstart', event => {
			this.controlsState.clickInitialPosition = event.touches[0].clientX;
			this.controlsState.chartMove            = true;
			this.controlsState.startClicked         = true;
		});


		// change end position
		this.view.layoutContorls.endChartSlider.addEventListener('mousedown', event => {
			this.controlsState.clickInitialPosition = event.clientX;
			this.controlsState.chartMove            = true;
			this.controlsState.endClicked           = true;
		});

		this.view.layoutContorls.endChartSlider.addEventListener('touchstart', event => {
			this.controlsState.clickInitialPosition = event.touches[0].clientX;
			this.controlsState.chartMove            = true;
			this.controlsState.endClicked           = true;
		});



	}

	moveListeners(){

		document.addEventListener('mousemove', (event) => {
			this.moveChart(event);
		});

		document.addEventListener('touchmove', (event) => {
			this.moveChart(event);
		});

		this.view.elements.chart.addEventListener('mousemove', event => this.updateTooltip(event));
		this.view.elements.chart.addEventListener('touchmove', event => this.updateTooltip(event));

		this.view.elements.chart.addEventListener('mouseleave', () => this.view.removeItems('tooltip-item'));

	}


	clearConsrolState(){
		this.controlsState.startPosition    = this.view.startChartValue;
		this.controlsState.endPosition      = this.view.endChartValue;
		this.controlsState.minMapViewRange  = this.data.settings.minMapSpace;
		this.controlsState.startClicked     = false;
		this.controlsState.endClicked       = false;
		this.controlsState.chartReverceMove = false;
		this.controlsState.chartMove        = false;
		this.controlsState.mapRangeClicked  = false;
	}


	getStartAbsoluteValue(startPercent){

		return this.data.totalStart + ((this.data.totalEnd - this.data.totalStart) * (startPercent / this.viewBoxWidth));

	}

	getEndAbsoluteValue(endPercent){

		return this.data.totalEnd - ((this.data.totalEnd - this.data.totalStart) * (1 - (endPercent / this.viewBoxWidth)));

	}


	getChartMinMaxValueInRange(start, end){

		let min = 99999999999999999;
		let max = 0;

		if (this.data.activeLinesCount === 0){
			// Prevent the not smooth animation on disable last chart
			return {min: 0, max: this.viewBoxWidth};
		}

		for (let coordIndex in this.data.x){
			if (this.data.x[coordIndex] >= start && this.data.x[coordIndex] <= end){
				for (let lineIndex in this.data.lines){
					const line = this.data.lines[lineIndex];
					if (line.active){
						min = line.coords[coordIndex] < min ? line.coords[coordIndex] : min;
						max = line.coords[coordIndex] > max ? line.coords[coordIndex] : max;
					}
				}
			}else{
				for (let lineIndex in this.data.lines){
					const line = this.data.lines[lineIndex];
					if (line.active){
						min = line.coords[coordIndex] < min ? line.coords[coordIndex] : min;
					}
				}
			}
		}

		const range = max - min;

		max += range * 0.05;

		if (min > 0 && (min - range * 0.05) < 0){
			min = 0;
		}else{
			min -= range * 0.05;
			min = Math.floor(min / this.getOOM(min)) * this.getOOM(min);
		}

		return {min, max};
	}

	updateLines({target, startPercent = 0, endPercent = this.data.settings.viewBoxWidth, drawValues = false}){

		let start = this.getStartAbsoluteValue(startPercent);
		let end = this.getEndAbsoluteValue(endPercent);

		// Disable zoom less than 100%
		start = this.totalStart > start ? this.totalStart : start;
		end = this.totalEnd < end ? this.totalEnd : end;

		const chartValuesMinMax = this.getChartMinMaxValueInRange(start, end);

		this.view.createLines({
			target,
			x: this.data.x,
			lines: this.data.lines,
			start,
			end,
			min: chartValuesMinMax.min,
			max: chartValuesMinMax.max
		});

		if (drawValues){
			setTimeout(() => {
				this.updateDates(target, start, end);
				this.updateValues(target, chartValuesMinMax);
			}, 0);
		}
	}

	updateValues(target, chartValuesMinMax){

		const range = chartValuesMinMax.max - chartValuesMinMax.min;

		const countValuesToDisplay = Math.floor(target.clientHeight / 60);

		const stepNotRounded = range / countValuesToDisplay;

		const stepOrder = this.getOOM(stepNotRounded);

		// const step = Math.ceil(stepNotRounded / stepOrder) * stepOrder;
		const step = Math.ceil(stepNotRounded);

		const totalValues = this.data.totalValues;

		const steps = [];

		const currentStepsClasses = [];

		const min = (chartValuesMinMax.min > step && chartValuesMinMax.min > 0) ? chartValuesMinMax.min : 0;

		for (let i = 0; i <= countValuesToDisplay; i++){
			const value = (step * i) + chartValuesMinMax.min;
			steps.push(value);
			currentStepsClasses.push(`value-${value}`);
		}

		this.view.removeItems('value-item', currentStepsClasses, 'hide');

		this.view.createValues({
			target,
			steps,
			min: chartValuesMinMax.min,
			max: chartValuesMinMax.max
		});

	}


	updateDates(target, start, end){

		const range = this.data.x.slice();

		let totalStartDate = range.shift();

		let totalEndDate = range.pop();

		const offset = Math.floor((totalEndDate - totalStartDate) * (this.chartSizeCoeff / 5));

		totalStartDate += offset;

		totalEndDate -= offset;

		const windowWidthDrawsCount = Math.floor((target.getBoundingClientRect().width) / 80);

		let myltiple = Math.floor((target.querySelector('.chart-wrapper').getBoundingClientRect().width / target.getBoundingClientRect().width) * 1.1);

		myltiple = Math.pow(2, Math.floor(Math.log2(myltiple)));

		const totalDrawsCount = windowWidthDrawsCount * myltiple;

		let step = Math.floor((totalEndDate - totalStartDate) / totalDrawsCount);

		if (!this.controlsState.mapRangeClicked){

			this.displayedDates = [];

			const currentDatesClasses = [];

			for (let i = 0; i <= totalDrawsCount; i++){
				const dateValue = Math.floor((totalStartDate + (step * i)) / 86400000) * 86400000;
				currentDatesClasses.push(`date-${dateValue}`);
				this.displayedDates.push(dateValue);
			}

			if (offset > step){
				currentDatesClasses.push(`date-${totalStartDate - offset}`);
				this.displayedDates.push(totalStartDate - offset);
				currentDatesClasses.push(`date-${totalEndDate + offset}`);
				this.displayedDates.push(totalEndDate + offset);
			}
			this.view.removeItems('date-text', currentDatesClasses, 'hide');


		}


		this.view.createDates({
			target,
			dates: this.displayedDates,
			start,
			end,
			totalStartDate,
			totalEndDate
		})

	}

	updateTooltip(event){

		let start = this.getStartAbsoluteValue(this.currentStart);

		let end = this.getEndAbsoluteValue(this.currentEnd);

		const minMax = this.getChartMinMaxValueInRange(start, end);

		const coordIndex = this.getCoordIndexByClientX(event.clientX || event.touches[0].clientX);

		const coords = this.getCoordsByIndex(coordIndex);

		if(coords){
			this.view.createTooltip({
				x: coords.x,
				values: coords.values,
				clientY: event.clientY || event.touches[0].clientY,
				start,
				end,
				min: minMax.min,
				max: minMax.max
			});
		}
	}


	// get order of magnitude
	getOOM(n) {
		if (Math.abs(n) > 0){
			const order = Math.floor(Math.log(Math.abs(n)) / Math.LN10 + 0.000000001);
			return Math.pow(10,order);
		}else{
			return 0;
		}
	}


	moveChart(event){

		const clientX = event.clientX || event.touches[0].clientX;

		if (this.controlsState.startClicked || this.controlsState.mapRangeClicked){

			const valueStart = this.controlsState.startPosition + (0 - (this.controlsState.clickInitialPosition - clientX) / this.view.elements.layout.clientWidth) * this.viewBoxWidth;

			this.view.changeStartPosition(valueStart, this.controlsState.minMapViewRange);

		}

		if (this.controlsState.endClicked || this.controlsState.mapRangeClicked){

			const valueEnd = (this.controlsState.endPosition + (0 - (this.controlsState.clickInitialPosition - clientX) / this.view.elements.layout.clientWidth) * this.viewBoxWidth);

			this.view.changeEndPosition(valueEnd, this.controlsState.minMapViewRange);
		}


		if(this.controlsState.chartMove){

			this.view.removeItems('tooltip-item');

			const startPercent = this.currentStart;

			const endPercent = this.currentEnd;

			this.view.elements.chart.classList.add('dragging');

			this.updateLines({target: this.view.elements.chart, startPercent, endPercent, drawValues: true});

			setTimeout(() => {

				this.view.elements.chart.classList.remove('dragging');

			}, 0);
		}
	}


}