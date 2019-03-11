import chartData from '../data/chart_data';



class Chart {
	constructor(data){
		this._lines = {};

		this._x = this.createX(data.columns);

		this.start = this.x[0];

		this.end = this.x[this.x.length - 1];

		this.parseData(data);
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
			color
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

	drawLines(target, start = this.start, end = this.end){

		for (let lineId in this.lines){

			const lineLenght = end - start;


			let pathLine = 'M0';

			const yCoords = this.lines[lineId].coords;

			const maxY = Math.max(...yCoords);
			const minY = Math.min(...yCoords);

			const graphHeight = (maxY - minY);

			for (let coordIndex in this.x){
				coordIndex = Number(coordIndex);
				if (this.x[coordIndex] >= start && this.x[coordIndex] <= end){
					let x = this.x[coordIndex];
					let y = yCoords[coordIndex];
					x = (1 - ((end - x) / lineLenght)) * 100;
					y = ((1 - ((maxY - y) / graphHeight)) * 40) + ((50 / graphHeight) * 0.1);
					pathLine += (coordIndex === 0) ? ` ${y}` : ` L ${x} ${y}`;
				}
			}

			let path = document.createElementNS('http://www.w3.org/2000/svg','path');

			path.setAttributeNS(null, 'id', `line-${lineId}`);
			path.setAttributeNS(null, 'stroke', this.lines[lineId].color);
			path.setAttributeNS(null, 'stroke-width', .2);
			path.setAttributeNS(null, 'fill', 'none');
			path.setAttributeNS(null, 'd', pathLine);


			document.getElementById(target).appendChild(path);
		}

	}
}

const chart = new Chart(chartData[0]);

chart.drawLines('draw-target');
