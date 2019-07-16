module.exports = class Page {

	constructor() {
		this.apiButton();
	}

	apiButton() {
		if (document.querySelector('button.api')) {
			document.querySelector('button.api').addEventListener('click', () => {
				this.ajax({
					url: '/api/data-example',
					method: 'post',
					data: {
						say: 'hello',
						again: 'again'
					},
					success: function (response) {
						document.querySelector('.result').insertAdjacentHTML('beforeend', response);
					},
					error: function (error) {
						console.log(error);
					}
				});
			});
		}
	}

	ajax(obj) {

		// API URL: app.get('/api/data-example', apiController.getDataExample);
		// ajax({
		// 	url: '/api/style',
		// 	data: 'param1=1&param2=2',
		// 	success: function (response) {
		// 		console.log(response);
		// 	},
		// 	error: function (error) {
		// 		console.log(error);
		// 	}
		// });

		let a = {};
		a.url = '';
		a.method = 'GET';
		a.data = null;
		a.dataString = '';
		a.async = true;

		a.postHeaders = [
			['Content-type', 'application/x-www-form-urlencoded'],
			// ['Content-type', 'application/json'],
			['X-Requested-With', 'XMLHttpRequest']
		];
		a.getHeaders = [
			['X-Requested-With', 'XMLHttpRequest']
		];

		a = Object.assign(a, obj);
		a.method = a.method.toUpperCase();

		if (typeof a.data === 'string') 
			a.dataString = encodeURIComponent(a.data);
		else 
			for(let item in a.data) a.dataString += item + '=' + encodeURIComponent(a.data[item]) + '&'; 

		let xhReq = new XMLHttpRequest();
		if (window.ActiveXObject) xhReq = new ActiveXObject("Microsoft.XMLHTTP");

		if (a.method == 'GET') {
			if(typeof a.data !== 'undefined' && a.data !== null) a.url = a.url+'?'+a.dataString;
			xhReq.open(a.method, a.url, a.async);
			for (let x = 0; x < a.getHeaders.length; x++) xhReq.setRequestHeader(a.getHeaders[x][0], a.getHeaders[x][1]);
			xhReq.send(null);
		}
		else {
			xhReq.open(a.method, a.url, a.async);
			for (let x = 0; x < a.postHeaders.length; x++) xhReq.setRequestHeader(a.postHeaders[x][0], a.postHeaders[x][1]);
			xhReq.send(a.dataString);
		}
		xhReq.onreadystatechange = function(){
			if (xhReq.readyState == 4) {
				let response;
				try {
					response = JSON.parse(xhReq.responseText)
				} catch (e) {
					response = xhReq.responseText;
				}
				if(xhReq.status == 200) {
					obj.success(response);
				}
				else {
					obj.error(response);
				}
			}
		}
	}

}
