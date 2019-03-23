export default class ChartDrawier {

	constructor(){

	}

	createSVGItem(target, type, settings){

		const item = document.createElementNS('http://www.w3.org/2000/svg', type);

		for (const settingName in settings){
			item.setAttributeNS(null, settingName, settings[settingName]);
		}

		target.appendChild(item);

		return item;

	}

}

