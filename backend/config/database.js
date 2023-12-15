let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kostku2'

});

connection.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Connection Succuessfully!');
    }
})

module.exports = connection; 
