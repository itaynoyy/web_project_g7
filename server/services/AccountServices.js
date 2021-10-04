const {GetBasicPageData} = require('../controllers/BasicActions');
const {LoginUser, RegisterUser, UpdateUser} = require("../controllers/AccountActions")

exports.LoginPage = (req, res) => {
    let data_to_send = GetBasicPageData(req.session);
    if(req.session.user)
        return res.redirect("/");
    return res.render("login-or-register", data_to_send);
}
exports.Login = (req, res) => {
    let data_to_send = GetBasicPageData(req.session);
    let email = req.body.email;
    let password = req.body.password;
    let remember_me = req.body.remember_me;
    LoginUser(email, password)
    .then((data)=>{
        if(data.length!==1){
            data_to_send["message"]="Invalid email or password";
            return res.render("login-or-register", data_to_send)
        }
        if(remember_me)
            req.session.remember_me=data[0].email;
        req.session.user = data[0];
        return res.redirect("/");
    })
    .catch((err)=>{
        console.log(err);
        data_to_send["message"]="Something went wrong, try again";
        return res.render("login-or-register", data_to_send);
    });
}
exports.Register = (req, res) => {
    let data_to_send = GetBasicPageData(req.session);
    let email = req.body.email;
    let password = req.body.password;
    let first_name = req.body.firstname;
    let last_name = req.body.lastname;
    RegisterUser(first_name, last_name, email, password)
    .then((data)=>{
        if(!data){
            data_to_send["message"]="Email already exists";
            return res.render("login-or-register", data_to_send)
        }
        data_to_send["message"] = "Account created, login to continue";
        return res.redirect("/login");
    })
    .catch((err)=>{
        console.log(err);
        data_to_send["message"]="Something went wrong, try again";
        return res.render("login-or-register", data_to_send);
    });
}
exports.Logout = (req, res) => {
    try{
        delete req.session.user;
    }
    catch { }
    return res.redirect("/");
}
exports.AccountPage = (req, res) => {
    let data_to_send = GetBasicPageData(req.session);
    if(!req.session.user)
        return res.redirect("/")
    return res.render("account", data_to_send);
}
exports.UpdateAccount = (req, res) => {
    if(!req.session.user)
        return res.redirect("/")
    let data_to_send = GetBasicPageData(req.session);
    let field_name = req.body.action;
    console.log(req.body);
    let field_val = req.body[req.body.action];
    UpdateUser(field_name, field_val, req.session.user.id, req.session.user.email)
    .then(data=>{
        req.session.user=data[0];
        console.log(data[0]);
        return res.redirect("/account");
    })
    .catch((err)=>{
        console.log(err);
        return res.send("SOMETHING WENT WRONG");
    });
}