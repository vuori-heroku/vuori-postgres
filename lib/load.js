const pg = require('pg')
const moment = require('moment');

let connection = '';
module.exports = function init(connectionString) {
  connection = connectionString;

  console.log('GOt connection string', connectionString);

  return load;
}

//////////////////

function load(data, tableName) {
  console.log(data);
    return new Promise((fulfill, reject) => {
        pg.connect(connection, (err, client, done) => {
            if (err) {
                return reject(err);
            }

            let columnNames = Object.keys(data[0]);

            let sqlQuery = `INSERT INTO ${tableName} (${columnNames.join(',')}) values `;

            let outerValues = [];

            data.forEach((obj) => {
                let values = [];

                columnNames.forEach((column) => {

                  let value = obj[column];
                  if(isNaN(value)) {
                    if(new Date(value) != 'Invalid Date') {
                      values.push(`'${moment(new Date(value)).format('LLL')}'`);
                    } else {
                      values.push(`'${obj[column].replace("'", '')}'`);
                    }
                  } else {
                    values.push(obj[column]);
                  }

                  // console.log('trying ' + column);
                  //   switch (typeof obj[column]) {
                  //       case 'string':
                  //         let value = obj[column];
                  //           if (new Date(value) != 'Invalid Date') {
                  //             console.log('Its a date');
                  //             try {
                  //               values.push(`'${moment(new Date(value)).format('LLL')}'`);
                  //             } catch(e) {
                  //               console.log('Couldnt push to array');
                  //                 if(isNaN(value)) {
                  //                   console.log('Its not a number');
                  //                   values.push(`'${obj[column].replace("'", '')}'`);
                  //                 } else {
                  //                   console.log('Its a number');
                  //                   values.push(`${obj[column].replace("'", '')}`);
                  //                 }
                  //
                  //             }
                  //             break;
                  //           } else {
                  //               values.push(`'${obj[column].replace("'", '')}'`);
                  //               break;
                  //           }
                  //       case 'number':
                  //           values.push(obj[column]);
                  //           break;
                  //   }


                });

                outerValues.push(`(${values.join(',')})`);
            });

            sqlQuery += outerValues.join(',');

            client.query(sqlQuery, (err, result) => {
                if (err) {
                    return reject(err);
                }

                fulfill();
                done();
            })
        });
    });
}
