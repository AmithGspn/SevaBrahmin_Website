// Load data - change here for a different file

let fs = require('fs');

module.exports = {
    load: (file) => JSON.parse(fs.readFileSync(file)),
    write: (file, data) => { fs.writeFileSync(file, JSON.stringify(data)) }
}