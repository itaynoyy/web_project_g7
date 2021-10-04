var mysql = require('mysql');

exports.getConnection = async()=>{
	var con = mysql.createConnection({
	  host: process.env.MYSQL_DATABASE_HOST,
	  user: process.env.MYSQL_DATABASE_USERNAME,
	  password: process.env.MYSQL_DATABASE_PASSWORD,
	  database: process.env.MYSQL_DATABASE
	});
	return new Promise(function(resolve, reject){
		con.connect(function(err) {
		  if (err) reject(err);
		  resolve(con);
		});
	});
};