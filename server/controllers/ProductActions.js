const {getConnection} = require('./Database');

exports.GetPopularProducts = async () => {
	let conn = await getConnection();
	query = `SELECT *, 
			(SELECT count(*) 
			 FROM orderitem 
			 WHERE item_id=product.id AND item_type='product') as popularity
			 FROM product
			 ORDER BY popularity DESC
			 LIMIT 0,6`;

	return new Promise(function(resolve, reject){
		conn.query(query, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});
}

exports.CreateProduct = async(name, price, picture, type, description) => {
	let conn = await getConnection();
	let query = `INSERT INTO product(name, price, picture, type, description)
			VALUES(?,?,?,?,?);`;
	let data = [name, price, picture, type, description];
	return new Promise(function(resolve, reject){
		conn.query(query, data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});	
}

exports.GetSingleProduct = async(ID)=>{
	let conn = await getConnection();
	query = `SELECT * FROM product WHERE id=?`;
	return new Promise(function(resolve, reject){
		conn.query(query,[ID], function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});	
};

exports.GetProducts = async(type, rangeL=0, rangeR=150, page=1)=>{
	let conn = await getConnection();
	query = `SELECT * FROM product WHERE type=? AND price BETWEEN ? AND ? LIMIT ?,8`;
	let data =[type, rangeL, rangeR, (page-1)*8];
	return new Promise(function(resolve, reject){
		conn.query(query,data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});	
};
exports.GetProducts = async(type, rangeL=151, rangeR=250, page=2)=>{
	let conn = await getConnection();
	query = `SELECT * FROM product WHERE type=? AND price BETWEEN ? AND ? LIMIT ?,8`;
	let data =[type, rangeL, rangeR, (page-1)*8];
	return new Promise(function(resolve, reject){
		conn.query(query,data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});	
};


exports.GetCountOfProducts = async(type, rangeL, rangeR)=>{
	let conn = await getConnection();
	query = `SELECT count(*) as total FROM product WHERE type=? AND price BETWEEN ? AND ?`;
	let data =[type, rangeL, rangeR];
	return new Promise(function(resolve, reject){
		conn.query(query,data, function(err, result){
			if(err)
				reject(err);
			resolve(result[0].total);
		});
	});		
}