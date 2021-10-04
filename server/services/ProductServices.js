const {GetBasicPageData} = require("../controllers/BasicActions");
const {GetAllFlowers, CreateBouqeut} = require("../controllers/FlowerActions");
const {GetSingleProduct, GetProducts, GetCountOfProducts} = require("../controllers/ProductActions");

exports.ProductPage = (req,res)=>{
    let data_to_send = GetBasicPageData(req.session);
    GetSingleProduct(req.params.id)
    .then((data)=>{
        if(data.length==0)
            return res.status(404).send("404 - page not found");
        data_to_send["product"] = data[0];
        return res.render("SpecipicProduct", data_to_send);
    })
    .catch(err=>{
        console.log(err);
        return res.send("something went wrong");        
    })
};
exports.ProductTypePage = (req,res)=>{
    let data_to_send = GetBasicPageData(req.session);
    let page = parseInt(req.query.page) || 1;
    let range = parseInt(req.query.range) || 1;
    let rangeL = 0;
    let rangeR = 150;
    if(range==2)
    {
        rangeL = 150;
        rangeR = 300;
    }
    else if(range==3)
    {
        rangeL = 300;
        rangeR = 100000000000;        
    }
    GetProducts(req.params.type, rangeL, rangeR, (page))
    .then(data=>{
        data_to_send["products"] = data;
        return GetCountOfProducts(req.params.type, rangeL, rangeR);
    })
    .then((data)=>{
        data_to_send["total"]=Math.ceil(data/8);
        data_to_send["page"]=page;
        data_to_send["range"]=range;
        return res.render("Products", data_to_send);
    })
    .catch(err=>{
        console.log(err);
        return res.send("something went wrong");        
    })
};
exports.CustomizePage = (req,res)=>{
    let data_to_send = GetBasicPageData(req.session);
    GetAllFlowers()
    .then(data=>{
        console.log(data);
        data_to_send["flowers"]=data;
        return res.render("customize", data_to_send);    
    })
    .catch(err=>{
        console.log(err);
        return res.send("something went wrong");
    });    
};
exports.Customize = (req,res)=>{
    let data_to_send = GetBasicPageData(req.session);
    if(!req.session.user)
        return res.redirect("/login");
    let type = req.body["sort-by"];
    let items = req.body.selected;
    CreateBouqeut(req.session.user.id, items, type)
    .then(data=>{
        return res.redirect("/cart");
    })
    .catch(err=>{
        console.log(err);
        return res.send("something went wrong");
    })
};