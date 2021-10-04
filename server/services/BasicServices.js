const {GetPopularProducts} = require('../controllers/ProductActions');
const {GetBasicPageData} = require('../controllers/BasicActions');
const {ContactUs} = require('../controllers/ContactActions')
exports.HomePage = (req, res) => {
    let data_to_send = GetBasicPageData(req.session);
    GetPopularProducts()
    .then((data)=>{
        console.log(data);
        data_to_send["products"] = data;
        return res.render("home", data_to_send);
    })
    .catch(err=>{
        console.log(err);
        return res.status(500).send("SERVER ERROR");
    })
}
exports.AboutPage = (req, res) => {
    let data_to_send = GetBasicPageData(req.session);
    return res.render("about", data_to_send);
}
exports.ContactPage = (req, res) => {
    let data_to_send = GetBasicPageData(req.session);
    return res.render("contact", data_to_send);
}
exports.Contact = (req, res) => {
    let data_to_send = GetBasicPageData(req.session);
    let name = req.body.name;
    let message = req.body.message;
    let phone = req.body.phone;
    let email = req.body.email;
    ContactUs(name, email, phone, message)
    .then((out)=>{
        data_to_send["message"]="We have received your message, we will contact you soon";
        return res.render("contact", data_to_send);
    })
    .catch((err)=>{
        data_to_send["message"] = "Something went wrong, try again";
        return res.render("contact", data_to_send);
    });
}