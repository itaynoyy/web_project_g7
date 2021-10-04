const {GetBasicPageData} = require("../controllers/BasicActions");
const {CreateCart,UpdateCart, GetCartData, DeleteCart, PlaceOrder, ViewHistory, SaveCard} = require("../controllers/CartAndOrderActions")

exports.Checkout = (req,res)=>{
    if(!req.session.user)
        return res.redirect("/")
    let data = req.session.checkout;
    let first_name = req.body.name;
    let last_name = req.body.cardname;
    let number = req.body.cardnumber;
    let cvv = req.body.cvv;
    let exp_month = req.body.expmonth;
    let exp_year = req.body.expyear;
    GetCartData(req.session.user.id)
    .then(x=>{
        let total = 0;
        x.forEach((v)=>{
            v.forEach((y)=>{
                total += y.price*y.total_count;
            });
        });
        return PlaceOrder([data.date, "card", total, data.name, data.address, data.phone, req.session.user.id], req.session.user.id);
    })
    .then((ID)=>{
        return SaveCard([ID, 0, number, exp_year, exp_month, cvv, first_name, last_name]);
    })
    .then(()=>{
        return res.redirect("/history")
    })
    .catch((err)=>{console.log(err); return res.send("something wend wrong")})
};
exports.CheckoutAction = (req,res)=>{
    if(!req.session.user)
        return res.redirect("/")
    req.session.checkout = {};
    req.session.checkout.name = req.body.name;
    req.session.checkout.address = req.body.address;
    req.session.checkout.phone = req.body.phone;
    req.session.checkout.date = req.body.date;
    req.session.checkout.dedication = req.body.dedication;
    res.redirect("/checkout");
};
exports.CheckoutClass = (req,res)=>{
    if(!req.session.user)
        return res.redirect("/")
    let data = req.session.checkout;
    let first_name = req.body.name;
    let last_name = req.body.cardname;
    let number = req.body.cardnumber;
    let cvv = req.body.cvv;
    let exp_month = req.body.expmonth;
    let exp_year = req.body.expyear;
    let ID = req.params.id;
    SaveCard([ID, 1, number, exp_year, exp_month, cvv, first_name, last_name])
    .then(()=>{
        return res.redirect("/history")
    })
    .catch((err)=>{console.log(err); return res.send("something wend wrong")})
};
exports.CheckoutPage = (req,res)=>{
    if(!req.session.user)
        return res.redirect("/")
    let data_to_send = GetBasicPageData(req.session);
    return res.render("payment", data_to_send);
};
exports.HistoryPage = (req,res)=>{
    let data_to_send= GetBasicPageData(req.session);
    if(!req.session.user)
        return res.redirect("/login");
    ViewHistory(req.session.user.id)
    .then(data=>{
        data_to_send.orders = data.orders;
        data_to_send.classes=data.classes;
        return res.render("Order_History", data_to_send);
    })
    .catch(err=>{
        console.log(err);
        res.send("something went wrong");
    })
};
exports.CartPage = (req,res)=>{
    let data_to_send = GetBasicPageData(req.session);
    if(!req.session.user)
        return res.redirect("/login")
    GetCartData(req.session.user.id)
    .then(data=>{
        data_to_send["cart"]=data;
        console.log(data)
        return res.render("cart", data_to_send);    
    })
    .catch(err=>{console.log(err)});
};


exports.CartAdd = (req,res)=>{
    if(!req.session.user)
        return res.redirect("/login");
    CreateCart(req.session.user.id, "product", req.params.id, req.query.count)
    .then(data=>{
        return res.redirect("/cart");
    })
    .catch(err=>{
        console.log(err);
        return res.status(500).send("something went wrong");
    })
};
exports.CartDelete = (req,res)=>{
    if(!req.session.user)
        return res.redirect("/login");
    DeleteCart(req.session.user.id, req.params.id)
    .then(data=>{
        console.log(data);
        return res.redirect("/cart");
    })
    .catch(err=>{
        console.log(err);
        return res.status(500).send("something went wrong");
    }); 
};

exports.CartUpdate = (req,res)=>{
    if(!req.session.user)
        return res.redirect("/");
    let cart_id = req.params.id;
    let quantity = req.query.quantity;
    UpdateCart(cart_id, quantity)
    .then((data)=>{
        return res.send({cart_id:data.insertId, quantity:quantity});
    })
    .catch(err=>{
        console.log(err);
        res.send("error");
    })
};




