import chartData from '../data/chart_data';
import ChartController from './ChartController';

class Chart {
	constructor(data){
		this.chart = new ChartController(data);
	}
}



new Chart(chartData[0]);
// new Chart(chartData[1]);
// new Chart(chartData[2]);
// new Chart(chartData[3]);
// new Chart(chartData[4]);