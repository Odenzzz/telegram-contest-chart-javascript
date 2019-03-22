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
			clickInitialPosition: 0
		};

		this.main();
	}

	get viewBoxWidth(){
		return this.data.settings.viewBoxWidth;
	}

	getCoordsByIndex(coordIndex){

		const x = this.chart.x[coordIndex];

		const coords = {
			x: x,
			values: []
		};

		for (const lineId in this.chart.lines){
			if (this.chart.lines[lineId].active){
				coords.values.push({
					y: this.chart.lines[lineId].coords[coordIndex],
					color: this.chart.lines[lineId].color,
					name: this.chart.lines[lineId].name
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

		const chartCoeff = this.chartWindow.querySelector('.chart-wrapper').getBoundingClientRect().width / this.chartWindow.clientWidth;

		// get window start position inside the full chart
		const chartStart = this.chart.viewBoxWidth * (chartCoeff * this.controlsState.startPosition / this.chart.viewBoxWidth);

		const chartFullWidth = this.chart.viewBoxWidth * chartCoeff;

		const chartIntervalWidth = chartFullWidth / this.chart.x.length;

		// get cursor position inside the full chart
		const cursorPositionInChart = chartStart + (clientX - this.chartWindow.getBoundingClientRect().left) / this.chartWindow.clientWidth * this.chart.viewBoxWidth;

		const cursorShift = (((chartFullWidth / 2) - cursorPositionInChart) / chartFullWidth) * chartIntervalWidth;

		const percentCursorPositionInChart = cursorPositionInChart / this.chart.viewBoxWidth / chartCoeff;

		return Math.floor(this.chart.x.length * percentCursorPositionInChart + (cursorShift / chartCoeff));

	}


	main(){

		this.view.init();

		this.updateGraph({target: this.view.elements.chart, drawValues: true});
		this.updateGraph({target: this.view.elements.map});

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

				this.updateGraph({
					target: this.view.elements.chart,
					startPercent: this.view.startChartValue,
					endPercent: this.view.endChartValue + this.view.endChartWidth,
					drawValues: true
				});

				this.updateGraph({
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

		// move chart by dragging chart
		this.view.elements.chart.addEventListener('mousedown', event => {
			this.controlsState.clickInitialPosition = event.clientX;
			this.controlsState.mapRangeClicked      = true;
			this.controlsState.chartMove            = true;
			this.controlsState.chartReverceMove     = true;
			this.controlsState.minMapViewRange      = this.viewRangeWidth;
		});

		this.view.elements.chart.addEventListener('touchstart', event => {
			this.controlsState.clickInitialPosition = event.touches[0].clientX;
			this.controlsState.mapRangeClicked      = true;
			this.controlsState.chartMove            = true;
			this.controlsState.chartReverceMove     = true;
			this.controlsState.minMapViewRange      = this.viewRangeWidth;
		});


		// move chart by dragging map range
		this.view.layoutContorls.viewRange.addEventListener('mousedown', event => {
			this.controlsState.clickInitialPosition = event.clientX;
			this.controlsState.mapRangeClicked      = true;
			this.controlsState.chartMove            = true;
			this.controlsState.minMapViewRange      = this.viewRangeWidth;
		});

		this.view.layoutContorls.viewRange.addEventListener('touchstart', event => {
			this.controlsState.clickInitialPosition = event.touches[0].clientX;
			this.controlsState.mapRangeClicked      = true;
			this.controlsState.chartMove            = true;
			this.controlsState.minMapViewRange      = this.viewRangeWidth;
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
			const element = event.touches[0];
			if (element.target !== this.view.chartWindow){
				this.view.removeItems('tooltip-item');
			}
		});

		this.view.elements.chart.addEventListener('mousemove', event => this.initTooltip(event));
		this.view.elements.chart.addEventListener('touchmove', event => this.initTooltip(event));

		this.view.elements.chart.addEventListener('mouseleave', () => this.view.removeItems('tooltip-item'));

	}


	clearConsrolState(){
		this.controlsState.startPosition    = this.view.startChartValue;
		this.controlsState.endPosition      = this.view.endChartValue;
		this.controlsState.minMapViewRange  = this.viewBoxWidth * this.data.settings.minMapSpace;
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

	updateGraph({target, startPercent = 0, endPercent = this.data.settings.viewBoxWidth, drawValues = false}){

		let start = this.getStartAbsoluteValue(startPercent);
		let end = this.getEndAbsoluteValue(endPercent);

		start = this.totalStart > start ? this.totalStart : start;
		end = this.totalEnd < end ? this.totalEnd : end;

		// Disable zoom less than 100%

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
				// this.drawValues(target, chartValuesMinMax);
			}, 0);
		}
	}


	updateDates(target, start, end){

		const range = this.data.x.slice();
		const totalStartDate = range.shift();
		const totalEndDate = range.pop();

		if (!this.controlsState.mapRangeClicked){

			const windowWidthDrawsCount = Math.floor((target.getBoundingClientRect().width) / 80);

			let myltiple = Math.floor((target.querySelector('.chart-wrapper').getBoundingClientRect().width / target.getBoundingClientRect().width) * 1.3);

			myltiple = Math.pow(2, Math.floor(Math.log2(myltiple)));

			const totalDrawsCount = windowWidthDrawsCount * myltiple;

			const step = Math.floor((totalEndDate - totalStartDate) / totalDrawsCount);

			this.displayedDates = [];

			const currentDatesClasses = [];

			for (let i = 0; i <= totalDrawsCount; i++){
				const dateValue = Math.floor((totalStartDate + (step * i)) / 86400000) * 86400000;
				currentDatesClasses.push(`date-${dateValue}`);
				this.displayedDates.push(dateValue);
			}

			this.displayedDates.push(Math.floor((totalEndDate) / 86400000) * 86400000);

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

			let valueStart;

			if (this.controlsState.chartReverceMove){
				valueStart = this.controlsState.startPosition + ((this.controlsState.clickInitialPosition - clientX) / this.view.elements.layout.clientWidth) * this.view.viewRangeWidth;
			}else{
				valueStart = this.controlsState.startPosition + (0 - (this.controlsState.clickInitialPosition - clientX) / this.view.elements.layout.clientWidth) * this.viewBoxWidth;
			}

			this.view.changeStartPosition(valueStart);

		}

		if (this.controlsState.endClicked || this.controlsState.mapRangeClicked){

			let valueEnd;

			if (this.controlsState.chartReverceMove){
				valueEnd = (this.controlsState.endPosition + ((this.controlsState.clickInitialPosition - clientX) / this.view.elements.layout.clientWidth) * this.view.viewRangeWidth);
			}else{
				valueEnd = (this.controlsState.endPosition + (0 - (this.controlsState.clickInitialPosition - clientX) / this.view.elements.layout.clientWidth) * this.viewBoxWidth);
			}

			this.view.changeEndPosition(valueEnd);

		}


		if(this.controlsState.chartMove){

			this.view.removeItems('tooltip-item');

			const startPercent = this.view.startChartValue;

			const endPercent = this.view.endChartValue + this.view.endChartWidth;

			this.view.elements.chart.classList.add('dragging');

			this.updateGraph({target: this.view.elements.chart, startPercent, endPercent, drawValues: true});

			setTimeout(() => {
				this.view.elements.chart.classList.remove('dragging');
			}, 0);
		}
	}


}