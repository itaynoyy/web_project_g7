const {GetBasicPageData} = require("../controllers/BasicActions");
const {CreateProduct} = require("../controllers/ProductActions");
const {CreateFlower} = require("../controllers/FlowerActions");
const {CreateClass} = require("../controllers/ClassActions");
const path = require('path');
const UUID = require('uuid');

exports.AdminPage = (req,res)=>{
    if(!req.session.user || req.session.user.role!="admin")
        return res.redirect("/");
    let data_to_send = GetBasicPageData(req.session);
    return res.render("Admin", data_to_send);
};
exports.AddClassPage = (req, res)=>{
    if(!req.session.user || req.session.user.role!="admin")
        return res.redirect("/");    
    let data_to_send = GetBasicPageData(req.session);
    return res.render("Admin-Class", data_to_send);
};
exports.AddClass = (req,res)=>{
    if(!req.session.user || req.session.user.role!="admin")
        return res.redirect("/");
    let name = req.body.name;
    let description = req.body.description;
    let max = req.body.max;
    let lecturer = req.body.lecturer;
    let price = req.body.price;
    let Date = req.body.Date;
    CreateClass(name,lecturer, description, max, price, Date)
    .then(()=>{
        return res.redirect("/admin/class");
    })    
    .catch(err=>{
        console.log(err);
        return res.send("something went wrong");
    })
}
exports.AddProduct = (req,res)=>{
    if(!req.session.user || req.session.user.role!="admin")
        return res.redirect("/");
    let name = req.body.name;
    let type = req.body.type;
    let image = req.files.picture;
    let price = req.body.price;
    console.log(image)
    let description = req.body.description;
    let ext = image.name.split('.');
    ext = ext[ext.length-1];
    let picture = UUID.v4()+'.'+ext;
    image.mv(path.resolve(global.main_dir, './assets/images/'+picture), (err)=>{
        console.log(err);
    });
    CreateProduct(name, price, picture, type, description)
    .then(data=>{
        console.log(data);
        return res.redirect("/admin");
    }) 
    .catch(err=>{
        console.log(err);
        return res.send("something went wrong");
    })
};
exports.AddFlower = (req,res)=>{
    if(!req.session.user || req.session.user.role!="admin")
        return res.redirect("/");
    let name = req.body.name;
    let image = req.files.picture;
    let description = req.body.description;
    let ext = image.name.split('.');
    ext = ext[ext.length-1];
    let picture = UUID.v4()+'.'+ext;
    image.mv(path.resolve(global.main_dir, './assets/images/'+picture), (err)=>{
        console.log(err);
    });
    CreateFlower(name, picture, description)
    .then(data=>{
        console.log(data);
        return res.redirect("/admin");
    }) 
    .catch(err=>{
        console.log(err);
        return res.send("something went wrong");
    })
};
