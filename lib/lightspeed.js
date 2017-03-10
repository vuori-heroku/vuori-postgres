const axios = require('axios').create({
        baseURL: 'https://api.merchantos.com/',
        headers: { 'Authorization': 'Bearer ' + process.env.LIGHTSPEED_ACCESS_TOKEN }
    });
var moment = require('moment-timezone');


                                                                       //2016-08-04T20:19:35+00:00
let yesterday = moment.tz('America/Los_Angeles').add('days', -1).startOf('day').format('YYYY-MM-DDTHH:mm:ss');
let today = moment.tz('America/Los_Angeles').add('days', -1).endOf('day').format('YYYY-MM-DDTHH:mm:ss');
console.log(today)

module.exports = {
	getCurrentAccount: function() {
		return axios
			.get('API/Account.json') 
			.then(response => response.data.Account);
	},

	getInventory: function(accountId) {
		return axios
			.get(`/API/Account/${accountId}/Item.json`)
			.then(response => response.data);
	},
//need to change start date and end date for reports to daily using startsDate=${yesterday}&endDate=${today}
	getReports: function(accountId) {
		return axios
			.get(`/API/Account/${accountId}/Reports/Accounting/PaymentsByDay.json?startDate=${yesterday}&endDate=${today}`)
			.then(response => response.data);
	},

	getAccountSale: function(accountId) {
		return axios
			.get(`/API/Account/${accountId}/Sale.json?timeStamp=><,${yesterday},${today}`)
			.then(response => response.data);
	}
}
