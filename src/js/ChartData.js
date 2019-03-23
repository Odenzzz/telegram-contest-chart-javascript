export default class ChartData {

	constructor(data){

		this.settings = {

			// width of viewBox
			viewBoxWidth: 100,

			nightMode: {

				// background of all chart
				background: '#242f3e',

				// background of tooltip
				tooltipBackground: '#253241',

				// color of tooltip
				tooltipColor: '#ffffff',

				// line of selected date color
				tooltipLineColor: '#3b4a5a',

				// color of value lines
				valueLineColor: '#293544',

				// dates and values on X and Y axis color
				textColor: '#546778',

				// color of dragging blocks (start and end on map)
				startEndColor: 'rgba(112, 149, 185, 0.5)',

				// color on map of hiden chart elements
				mapNotVisibleBackground: 'rgba(16, 25, 37, 0.5)',

			},

			dayMode: {

				// background of all chart
				background: '#ffffff',

				// background of tooltip
				tooltipBackground: '#ffffff',

				// color of tooltip
				tooltipColor: '#222222',

				// line of selected date color
				tooltipLineColor: '#dfe6eb',

				// color of value lines
				valueLineColor: '#f2f4f5',

				// dates and values on X and Y axis color
				textColor: '#96a2aa',

				// color of dragging blocks (start and end on map)
				startEndColor: 'rgba(183, 207, 223, 0.5)',

				// color on map of hiden chart elements
				mapNotVisibleBackground: 'rgba(221, 234, 241, 0.5)',

			},

			monthNames: [
				"Dec", "Jan", "Feb", "Mar",
				"Apr", "May", "Jun", "Jul",
				"Aug", "Sep", "Oct",
				"Nov"
			],

			weekdaysNames: [
				"Sun", "Mon",
				"Tue", "Wed",
				"Thu", "Fri",
				"Sat"
			],

			// width of sliders on map (in percents)
			mapSliderWidth: 0.03,


			fontSize: 13,


			currentMode: 'day',

			chartLineWidth: 3,

			valueLineWidth: 1,

			tooltipCircleLineWidth: 2,

			tooltipOffsetFromCursor: 15,

			tooltipLineWidth: 2,

			tooltipCirclesRadius: 5,

			// height relative to the wrapper (in percent)
			chartHeight: 0.93,

			// minimal space between start and end
			minMapSpace: 15,
		}

		this.lines = {};

		this.totalValues = [];

		this.x = this.parseX(data.columns);

		this.totalStart = this.x[0];

		this.totalEnd = this.x[this.x.length - 1];

		this.parseData(data);

	}

	get activeLinesCount(){

		let count = 0;

		for (let lineIndex in this.lines){
			count += this.lines[lineIndex].active ? 1 : 0;
		}

		return count;
	}

	parseX(columns) {
		for (let column of columns){
			if (column[0] === 'x'){
				column.shift();
				return column;
			}
		}
		return undefined;
	}

	createLineCoords({id, name, color, coords}){
		this.lines[`${id}`] = {
			name,
			coords,
			color,
			active: true
		}
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

		this.totalValues.sort((a, b) => {return a - b});

	}

}