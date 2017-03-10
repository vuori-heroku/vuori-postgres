const csv = require('csvtojson');

module.exports = convert;
var JSFtp = require("jsftp");

//////////////

function convert(filename) {
    var ftp = new JSFtp({
        host: process.env.FTP_URL,
        port: 21,
        user: procses.env.FTP_USERNAME,
        pass: process.env.FTP_PASSWORD
    });
    return new Promise((fulfill, reject) => {
        let remoteFilePath = `files/${filename}`;
        let localFilePath = __dirname + `/${filename}`;

        ftp.get(remoteFilePath, localFilePath, (err) => {
            if (err) return reject(err);

            let array = [];

            csv()
                .fromFile(localFilePath)
                .on('json', (data) => array.push(data))
                .on('done', (error) => {
                    if (error) {
                        return reject(error);
                    }

                    fulfill(array);
                });
        });
    });
}
