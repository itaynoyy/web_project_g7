const {getConnection} = require('./Database');

let CreateCart = exports.CreateCart = async(user_id, product_type, product_id, quantity) => {
	let conn = await getConnection();
	let query = `INSERT INTO cart(user_id, product_type, product_id, quantity)
			VALUES(?,?,?,?);`;
	let data = [user_id, product_type, product_id, quantity];
	return new Promise(function(resolve, reject){
		conn.query(query, data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});	
}

exports.GetCartData = async(user_id)=>{
	let conn = await getConnection();
	query = `SELECT *, cart.id as cart_id, sum(cart.quantity) as total_count FROM cart, product WHERE cart.user_id=? AND cart.product_id=product.id AND cart.product_type='product' GROUP BY cart.product_id`
	let data_1 = await new Promise(function(resolve, reject){
		conn.query(query, [user_id], function(err, result, fields){
			if(err)
				reject(err);
			resolve(result);
		});
	});		
	query =	`SELECT *, cart.id as cart_id, sum(cart.quantity) as total_count FROM customize_product, cart WHERE cart.user_id=? AND cart.product_id=customize_product.id AND cart.product_type='customize' GROUP BY cart.product_id`
	let data_2 = await new Promise(function(resolve, reject){
		conn.query(query, [user_id], function(err, result, fields){
			if(err)
				reject(err);
			resolve(result);
		});
	});
	for(let i = 0; i<data_2.length; i++){
		query = "SELECT flower.* FROM flower, customize_product_items WHERE customize_product_items.flower_id=flower.id AND customize_product_items.customize_id=?"
		data_2[i]["flowers"] = await new Promise(function(resolve, reject){
			conn.query(query, [data_2[i].product_id], function(err, result){
				if(err)
					reject(err);
				resolve(result);
			});
		});		
	}
	return [data_1, data_2];
}

exports.DeleteCart = async(user_id, cart_id)=>{
	console.log(user_id, cart_id);
	let conn = await getConnection();
	let query = "DELETE FROM cart WHERE user_id=? AND id=?";
	return new Promise(function(resolve, reject){
		conn.query(query, [user_id, cart_id], function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});	
}

exports.PlaceOrder = async(data, user_id)=>{
	let conn = await getConnection();
	let query = `INSERT INTO orders(date, delivery_method, delivery_price, recipient_name, recipient_address, recipient_phone, user_id) VALUES(?,?,?,?,?,?,?)`
	let ID = await new Promise(function(resolve, reject){
		conn.query(query, data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});
	ID=ID.insertId;	
	query = "INSERT INTO orderitem(order_id, item_id, item_type) (SELECT ? as order_id,product_id as item_id,product_type as item_type FROM cart WHERE user_id=?)"
	let abc = await new Promise(function(resolve, reject){
		conn.query(query, [ID,user_id], function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});
	query = "DELETE FROM cart WHERE user_id=?"
	let _ = await new Promise(function(resolve, reject){
		conn.query(query, [user_id], function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});
	return ID;
};
exports.ViewHistory = async(user_id) =>{
	let orders = await ViewProductHistory(user_id);
	let classes = await ViewClassHistory(user_id);
	return {orders:orders, classes:classes}
}
let ViewProductHistory = exports.ViewProductHistory = async(user_id)=>{
	let conn = await getConnection();
	query = "SELECT * FROM orders WHERE user_id=?"
	let orders = await new Promise(function(resolve, reject){
		conn.query(query, [user_id], function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});
	for(let i = 0; i<orders.length; i++){
		query = "SELECT * FROM product, orderitem WHERE orderitem.order_id=? AND orderitem.item_type='product' AND orderitem.item_id=product.id GROUP BY product.id"
		orders[i]["products"] = await new Promise(function(resolve, reject){
			conn.query(query, [orders[i].id], function(err, result){
				if(err)
					reject(err);
				resolve(result);
			});
		});
		query = "SELECT * FROM customize_product, orderitem WHERE orderitem.order_id=? AND orderitem.item_type='customize' AND orderitem.item_id=customize_product.id GROUP BY customize_product.id"
		orders[i]["customize"] = await new Promise(function(resolve, reject){
			conn.query(query, [orders[i].id], function(err, result){
				if(err)
					reject(err);
				resolve(result);
			});
		});
	}
	return orders;
}
let ViewClassHistory = exports.ViewClassHistory = async(user_id)=>{
	let conn = await getConnection();
	let query = "SELECT class_join.*, class.name as name, class.price as price FROM class_join, credit_card, class WHERE credit_card.order_id=class_join.id AND credit_card.type=1 AND class_join.user_id=? AND class.id=class_join.class_id"
	return new Promise(function(resolve, reject){
		conn.query(query, [user_id], function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});
};
exports.SaveCard = async(data)=>{
	let conn = await getConnection();
	let query = `INSERT INTO credit_card(order_id, type, number, expiry_year,expiry_month, cvv, first_name, last_name)
			VALUES(?,?,?,?,?,?,?,?);`;
	return new Promise(function(resolve, reject){
		conn.query(query, data, function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});	

}

exports.UpdateCart = async (cart_id, quantity) =>{
	let conn = await getConnection();
	let query = "SELECT * FROM cart WHERE id=?";
	let data = await new Promise(function(resolve, reject){
		conn.query(query, [cart_id], function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});
	query = "DELETE FROM cart WHERE user_id=? AND product_id=? AND product_type=?";
	let _ = await new Promise(function(resolve, reject){
		conn.query(query, [data[0].user_id, data[0].product_id, data[0].product_type], function(err, result){
			if(err)
				reject(err);
			resolve(result);
		});
	});
	return CreateCart(data[0].user_id, data[0].product_type, data[0].product_id, quantity)
}
