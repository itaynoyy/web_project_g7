const {GetBasicPageData} = require("../controllers/BasicActions");
const {CreateSpecialDate, UpdateSpecialDate, DeleteSpecialDate, UpdateBirthday, GetSpecialDates} = require("../controllers/SpecialActions");
const {JoinClass, AvailableClass, ViewClasses, theClasses} = require("../controllers/ClassActions");


exports.ClassJoin = (req,res)=>{
    if(!req.session.user)
        return res.redirect("/login");
    let data_to_send = GetBasicPageData(req.session);
    ViewClasses()
    .then(data=>{
        console.log(data);
        data_to_send.classes=data;
        return AvailableClass(req.query.id, req.query.date);
    })
    .then(data=>{        
        if(data[0].participants>= data[0].max_participants){
            data_to_send["error"]="Limit exceed, try another date";
            return res.render("schedule",data_to_send);
        }
        return JoinClass(req.session.user.id, req.query.date, req.query.id);
    })
    .then((data)=>{
        if(data)
            return res.redirect("/checkout/class/"+data.insertId);
    })
    .catch(err=>{
        console.log(err);
        res.send("please choose a date and click 'check' ");
    })
};
exports.ClassPage = (req,res)=>{
    if(!req.session.user)
        return res.redirect("/login");
    let data_to_send = GetBasicPageData(req.session);
    ViewClasses(req.query.date)
    .then(data=>{
        data_to_send["classes"] = data;
        return res.render("schedule",data_to_send);
    })
    .catch(err=>{
        console.log(err);
        res.send("please choose a date and click 'check' ");
    })
};


exports.SpecialDatesAdd = (req,res)=>{
    if(!req.session.user)
        return res.redirect("/login");
    let data_to_send = GetBasicPageData(req.session);
    let title = req.body.title;
    let date = req.body.date;
    CreateSpecialDate(req.session.user.id, date, title)
    .then(()=>{
        return res.redirect("/special-dates");
    })
    .catch((err)=>{
        console.log(err);
        return res.send("something went wrong");
    })
};
exports.SpecialDatesEdit = (req,res)=>{
    if(!req.session.user)
        return res.redirect("/login");
    let data_to_send = GetBasicPageData(req.session);
    let title = req.body.title;
    let date = req.body.date;
    UpdateSpecialDate(req.params.id, date, title)
    .then(()=>{
        return res.redirect("/special-dates");
    })
    .catch((err)=>{
        console.log(err);
        return res.send("something went wrong");
    })    
};
exports.SpecialDatesDelete = (req,res)=>{
    if(!req.session.user)
        return res.redirect("/login");
    let data_to_send = GetBasicPageData(req.session);
    DeleteSpecialDate(req.params.id)
    .then(()=>{
        return res.redirect("/special-dates");
    })
    .catch((err)=>{
        console.log(err);
        return res.send("something went wrong");
    })
};
exports.EditBirthday = (req,res)=>{
    if(!req.session.user)
        return res.redirect("/login");
    let data_to_send = GetBasicPageData(req.session);
    UpdateBirthday(req.session.user.id, req.body.birthday)
    .then(()=>{
        req.session.user.date_of_birth=req.body.birthday;
        return res.redirect("/special-dates");
    })
    .catch((err)=>{
        console.log(err);
        return res.send("something went wrong");
    })    
}
exports.SpecialDatesPage = (req,res)=>{
    if(!req.session.user)
        return res.redirect("/login");
    let data_to_send = GetBasicPageData(req.session);
    GetSpecialDates(req.session.user.id)
    .then((data)=>{
        data_to_send["dates"] = data;
        return res.render("special-dates", data_to_send);
    })
    .catch((err)=>{
        console.log(err);
        return res.send("something went wrong");
    })
};