const {getConnection} = require('./Database');

let GetUserByEmail = exports.GetUserByEmail = async(email)=>{
	let conn = await getConnection();
	let query = `SELECT * FROM users WHERE email=?`;
	let data = [email];
	return new Promise(function(resolve, reject){
		conn.query(query,data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});	
}

exports.RegisterUser = async (fname, lname, email, password) => {
	let conn = await getConnection();
	let user = await GetUserByEmail(email);
	if(user.length!==0)
		return false;
	let query = `INSERT INTO 
			 users(first_name, last_name, email, password, role, picture)
			 VALUES(?,?,?,?,?,?)`;
	let data = [fname,lname,email,password,"customer","user.jpg"];
	return new Promise(function(resolve, reject){
		conn.query(query,data, function(err, result){
			if(err)
				reject(err);
			resolve(true);
		});
	});
}


exports.LoginUser = async(email, password)=>{
	let conn = await getConnection();
	let query = `SELECT * FROM users WHERE email=? AND password=?`;
	let data = [email, password];
	return new Promise(function(resolve, reject){
		conn.query(query,data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});	
}

exports.UpdateUser=async(field_name, field_value, id, email)=>{
	let conn = await getConnection();
	let query = `UPDATE users SET
				${field_name}=? WHERE id=?`;
	let data = [field_value, id];	
	console.log(query, data);			
	return new Promise(function(resolve, reject){
		conn.query(query,data, function(err, result){
			if(err)
				reject(err);
			resolve(GetUserByEmail(email));
		});
	});	
};