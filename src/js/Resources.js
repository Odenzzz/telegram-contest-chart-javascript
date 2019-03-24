export const getJSON = function(url) {

	return new Promise(function(resolve, reject){

		const request = new XMLHttpRequest();

		request.open('GET', url, true);

		request.onload = function () {

			if (request.status >= 200 && request.status < 300) {

				resolve(JSON.parse(request.responseText));

			}else{

				reject('Error: HTTP status - ' + request.status + ' on resource ' + url);

			}
		}

		request.send();

	});
}
