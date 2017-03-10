 const lightspeed = require('./lightspeed');
const load = require('./load')(process.env.DATABASE_URL);

module.exports = {
  run: function() {
    let accountId = null;

    return lightspeed
      .getCurrentAccount()
      .then(account => {
        accountId = account.accountID;
        return lightspeed.getInventory(accountId);
      })
      .then(inventory => {
        return load(inventory, 'lightspeed.inventory')
      })
      .then(() => {
        console.log('Loaded inventory into database');
        return lightspeed.getReports(accountId);
      })
      .then(reports => {
        return load(reports, 'lightspeed.reports');
      })
      .then(() => {
        console.log('Loaded reports into database');
      });
  }
}
