import Chart from './Chart';

import { getJSON } from './Resources';

const charts = [];

const switchLink = document.createElement('a');

switchLink.setAttribute('class', 'switch-link');

switchLink.dataset.currentmode = 'day';

switchLink.innerHTML = `Switch to night mode`;

switchLink.addEventListener('click', (event) => {

	const button = event.target;

	const currentMode = button.dataset.currentmode;

	const switchTo = button.dataset.currentmode === 'day' ? 'night' : 'day';

	if (charts.length > 0){
		for (const chart of charts){
			chart.changeSetting('currentMode', switchTo);
		}
		button.dataset.currentmode = switchTo;
		button.innerHTML = `Switch to ${currentMode} mode`;
		button.style.color = switchTo === 'night' ? '#fff' : '#333';
	}
});

document.querySelector('body').appendChild(switchLink);

getJSON('data/chart_data.json').then((data) => {
	for (const dataOfChart of data){
		charts.push(new Chart(dataOfChart));
	}
});