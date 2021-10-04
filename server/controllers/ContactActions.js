const {getConnection} = require('./Database');

exports.ContactUs = async (name, email, phone, message) => {
	let conn = await getConnection();
	let query = `INSERT INTO 
			 contact_us(name, email, phone, message)
			 VALUES(?,?,?,?)`;
	let data = [name,email,phone,message];
	return new Promise(function(resolve, reject){
		conn.query(query,data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});
}