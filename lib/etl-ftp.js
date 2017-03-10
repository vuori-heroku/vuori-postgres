const extract = require('./extract');
const load = require('./load')(process.env.DATABASE_URL);

module.exports = {
    run: function() {
      // Pull CSV file from Vuori FTP
        return extract('customers.csv')
            .then(data => {
                // Insert CSV into Vuori Postgres
                console.log('inserting customers into sql');

                return load(data, 'tests.customer');
            })
            .then(() => {
                console.log('finished.');
            })
            .catch((err) => {
                console.log(err);
            });

    }
}
