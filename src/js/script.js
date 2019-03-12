import chartData from '../data/chart_data';



class Chart {
	constructor(data){
		this._lines = {};

		this._x = this.createX(data.columns);

		this.start = this.x[0];

		this.end = this.x[this.x.length - 1];

		this.parseData(data);

		this.setRange();
	}

	setRange(){

	}

	get x(){
		return this._x;
	}
	set x(coords){
		this._x = coords;
	}
	get lines(){
		return this._lines;
	}

	createLineCoords({id, name, color, coords}){
		this._lines[`${id}`] = {
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

				const coords = [];

				for (let coord_index in this.x){
					coords.push({
						x: this.x[coord_index],
						y: column[coord_index]
					})
				}

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
	}

	getChartMinMaxValueInRange(start, end){

		let min = 99999999999999999;
		let max = 0;

		if (this.activeLinesCount() === 0){
			return {min: 0, max: 100};
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
			}
		}

		return {min, max};
	}

	activeLinesCount(){

		let count = 0;

		for (let lineIndex in this.lines){
			count += this.lines[lineIndex].active ? 1 : 0;
		}

		return count;

	}

	drawLines(target_id, start = this.start, end = this.end){

		const target = document.getElementById(target_id);

		const windowCoeff = target.clientHeight / target.clientWidth;

		target.setAttribute('viewBox', `0 0 100 ${100 * windowCoeff}`);

		// Disable zoom less than 100%
		start = this.start > start ? this.start : start;
		end = this.end < end ? this.end : end;

		const chartWidth = (end - start);

		const chartValuesMinMax = this.getChartMinMaxValueInRange(start, end);

		const chartHeight = (chartValuesMinMax.max - chartValuesMinMax.min);

		for (let lineId in this.lines){

			let pathLine = '';

			const yCoords = this.lines[lineId].coords;

			for (let coordIndex in this.x){
				coordIndex = Number(coordIndex);
				let x = this.x[coordIndex];
				let y = yCoords[coordIndex];
				x = (1 -((end - x) / chartWidth)) * 100;
				y = ((((chartHeight - y) / chartHeight) * 80) + 15) * windowCoeff;
				pathLine += (coordIndex === 0) ? `M${x} ${y}` : ` L ${x} ${y}`;
			}

			let path = document.createElementNS('http://www.w3.org/2000/svg','path');
			const line = document.getElementById(`${target_id}-line-${lineId}`);


			if (line !== null){
				path = line;
			}else{
				path.setAttributeNS(null, 'id', `${target_id}-line-${lineId}`);
				path.setAttributeNS(null, 'stroke', this.lines[lineId].color);
				path.setAttributeNS(null, 'stroke-width', .2);
				path.setAttributeNS(null, 'fill', 'none');
				target.appendChild(path);
			}
			path.setAttributeNS(null, 'd', pathLine);
		}
	}
}



const chart = new Chart(chartData[0]);

chart.drawLines('draw-target');
chart.drawLines('draw-range');

document.getElementById('disable1').addEventListener('click', (event) => {

	const that = event.target;

	if (that.dataset.show === 'false'){
		chart._lines.y0.active = false;
		document.getElementById('line-y0').style.opacity = 0;
		that.dataset.show = 'true';
		that.innerHTML = 'enable1';
	}else{
		chart._lines.y0.active = true;
		document.getElementById('line-y0').style.opacity = 1;
		that.dataset.show = 'false';
		that.innerHTML = 'disable1';
	}
	chart.drawLines('draw-target');

});
document.getElementById('disable2').addEventListener('click', (event) => {
	const that = event.target;
	if (that.dataset.show === 'false'){
		chart._lines.y1.active = false;
		document.getElementById('line-y1').style.opacity = 0;
		that.dataset.show = 'true';
		that.innerHTML = 'enable2';
	}else{
		chart._lines.y1.active = true;
		document.getElementById('line-y1').style.opacity = 1;
		that.dataset.show = 'false';
		that.innerHTML = 'disable2';
	}
	chart.drawLines('draw-target');
});

const chartStart = document.getElementById('chart-start');
const chartEnd = document.getElementById('chart-end');
const chartControls = document.getElementById('chart-controls');

let chartStartClicked = false;
let chartEndClicked = false;
let startClickedPosition, startLeftOffset, endClickedPosition, endRightOffset, startPosition, endPosition;



chartStart.addEventListener('mousedown', (event) => {
	startClickedPosition = event.clientX;
	startLeftOffset = chartStart.getBoundingClientRect().left - chartControls.getBoundingClientRect().left;
	endPosition = chartEnd.getBoundingClientRect().left - chartControls.getBoundingClientRect().left - 100;
	chartStartClicked = true;
	document.getElementById('draw-target').classList.add('dragging');
});
chartEnd.addEventListener('mousedown', (event) => {
	endClickedPosition = event.clientX;
	endRightOffset = chartControls.getBoundingClientRect().right - chartEnd.getBoundingClientRect().right;
	startPosition = chartControls.getBoundingClientRect().right - chartStart.getBoundingClientRect().right - 100;
	chartEndClicked = true;
	document.getElementById('draw-target').classList.add('dragging');
});

document.addEventListener('mousemove', (event) => {
	if (chartStartClicked){
		let offsetLeft = event.clientX - startClickedPosition;
		let left = startLeftOffset + offsetLeft;
		left = left >= 0 ? left : 0;
		left = left <= endPosition ? left : endPosition;
		chartStart.style.left = `${left}px`;
		chartStart.dataset.value = (chart.start + ((left / chartControls.clientWidth) * (chart.end - chart.start)));
		chart.drawLines('draw-target', chartStart.dataset.value, chartEnd.dataset.value);
	}
	if (chartEndClicked){
		let offsetRight = 1 - (event.clientX - endClickedPosition);
		let right = endRightOffset + offsetRight;
		right = right >= 0 ? right : 0;
		right = right <= startPosition ? right : startPosition;
		chartEnd.style.right = `${right}px`;
		chartEnd.dataset.value = (chart.end - ((right / chartControls.clientWidth) * (chart.end - chart.start)));
		chart.drawLines('draw-target', chartStart.dataset.value, chartEnd.dataset.value);
	}
});
document.addEventListener('mouseup', () => {
	chartStartClicked = false;
	chartEndClicked = false;
	document.getElementById('draw-target').classList.remove('dragging')
});