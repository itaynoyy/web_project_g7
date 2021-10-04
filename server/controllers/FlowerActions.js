const {getConnection} = require('./Database');
const {CreateCart} = require("./CartAndOrderActions");

exports.CreateFlower = async(name, picture, description) => {
	let conn = await getConnection();
	let query = `INSERT INTO flower(name, picture, description)
			VALUES(?,?,?);`;
	let data = [name, picture, description];
	return new Promise(function(resolve, reject){
		conn.query(query, data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});	
}

exports.GetAllFlowers = async()=>{
	let conn = await getConnection();
	let query = "SELECT * FROM flower";
	return new Promise(function(resolve, reject){
		conn.query(query, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});		
}

exports.CreateBouqeut = async (user_id, list_of_items, price_type) => {
	let conn = await getConnection();
	let price = 150;
	if(price_type=="small")
		price = 80;
	else if(price_type=="medium")
		price=120;
	else
		price=150;
	let query = "INSERT INTO customize_product(size, price) VALUES(?,?)";
	let data = [price_type, price];
	let res = await new Promise(function(resolve, reject){
		conn.query(query,data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});
	let ID = res.insertId;
	for(let i = 0; i<list_of_items.length; i++) {
		query = "INSERT INTO customize_product_items(customize_id, flower_id) VALUES(?,?)"
		data = [ID, list_of_items[i]];
		let res = await new Promise(function(resolve, reject){
			conn.query(query,data, function(err, result){
				if(err)
					reject(err);
				resolve(result);
			});
		});		
	}
	res = await CreateCart(user_id, "customize", ID, 1);
	return res;
}