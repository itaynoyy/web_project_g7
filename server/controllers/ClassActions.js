const {getConnection} = require('./Database');

exports.CreateClass = async(name, lecturer, description, max, price, Date)=>{
	let conn = await getConnection();
	let query = `INSERT INTO class(name,lecturer,description, price, max_participants, Date) VALUES(?,?,?,?,?,?)`;
	let data = [name,lecturer, description, price, max, Date];
	return new Promise(function(resolve, reject){
		conn.query(query,data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});	
}


exports.ViewClasses = async(d)=>{
	let conn = await getConnection();
	let query = "SELECT * FROM class where date=?";
	let data = [d];
	console.log(d);
	return new Promise(function(resolve, reject){
		conn.query(query, data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});		
}


exports.JoinClass = async(u, d, c)=>{
	let conn = await getConnection();
	let query = "INSERT INTO class_join(user_id, date, class_id) VALUES(?,?,?)"
	let data = [u,d,c];
	return new Promise(function(resolve, reject){
		conn.query(query, data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});	
}
exports.AvailableClass = async(id, d) =>{
	let conn = await getConnection();
	let query = "select (select count(*) as participants from class_join where class_id=?) as participants, max_participants from class where class.id=?";
	let data = [id,id];
	return new Promise(function(resolve, reject){
		conn.query(query, data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});	
}