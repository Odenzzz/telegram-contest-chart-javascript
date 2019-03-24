import ChartController from './ChartController';

export default class Chart {

	constructor(data){
		this.chart = new ChartController(data);
	}

	changeSetting(settingName, settingValue){
		this.chart.data.settings[settingName] = settingValue;
		this.chart.updateSettings();
	}
}