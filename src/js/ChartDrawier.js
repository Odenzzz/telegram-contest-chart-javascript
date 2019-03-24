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

	animateItem(item, prop, startValue, endValue, miliseconds){
		const step = endValue - startValue;
		this.animate(function(timePassed) {

			if (item.classList.contains('active-item')){

				const animationProgress = timePassed / miliseconds;

				const value = (startValue + step * animationProgress);

				item.setAttribute(prop, parseFloat(Number(value).toFixed(9)));

			}
		}, miliseconds);

	}

	animate(draw, duration) {
		var start = performance.now();
		requestAnimationFrame(function animate(time) {

			var timePassed = time - start;

			if (timePassed > duration) timePassed = duration;

			draw(timePassed);

			if (timePassed < duration) {

				requestAnimationFrame(animate);

			}

		});
	}
}

