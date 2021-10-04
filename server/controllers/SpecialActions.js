const {getConnection} = require('./Database');

exports.CreateSpecialDate = async(user_id, date, title) => {
	let conn = await getConnection();
	let query = `INSERT INTO special_dates(user_id, date, title)
			VALUES(?,?,?);`;
	let data = [user_id, date, title];
	return new Promise(function(resolve, reject){
		conn.query(query, data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});	
}
exports.UpdateSpecialDate = async(ID, date, title) => {
	let conn = await getConnection();
	let query = `UPDATE special_dates SET date=?, title=? WHERE id=?`;
	let data = [date, title, ID];
	return new Promise(function(resolve, reject){
		conn.query(query, data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});	
}
exports.DeleteSpecialDate = async(ID) => {
	let conn = await getConnection();
	let query = `DELETE FROM special_dates WHERE ID=?`;
	let data = [ID];
	return new Promise(function(resolve, reject){
		conn.query(query, data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});	
}
exports.UpdateBirthday = async(user_id, date) => {
	let conn = await getConnection();
	let query = `UPDATE users SET date_of_birth=? WHERE id=?`;
	let data = [date, user_id];
	return new Promise(function(resolve, reject){
		conn.query(query, data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});	
}

exports.GetSpecialDates = async(user_id)=>{
	let conn = await getConnection();
	let query = `SELECT * FROM special_dates WHERE user_id=?`;
	let data = [user_id];
	return new Promise(function(resolve, reject){
		conn.query(query, data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});		
}