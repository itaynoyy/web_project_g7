const express = require('express');
const {HomePage, ContactPage, AboutPage, Contact} = require('../services/BasicServices');
const {LoginPage, Login, Register, Logout, AccountPage, UpdateAccount} = require('../services/AccountServices');
const {ProductPage, ProductTypePage, CustomizePage, Customize} = require('../services/ProductServices');
const {CheckoutClass, Checkout,CheckoutAction, CheckoutPage, HistoryPage, CartPage, CartAdd, CartUpdate, CartDelete} = require('../services/OrderServices');
const {EditBirthday, ClassJoin, ClassPage, SpecialDatesAdd, SpecialDatesEdit, SpecialDatesDelete, SpecialDatesPage, ClassCheck} = require('../services/SpecialServices');
const {AdminPage, AddProduct, AddFlower, AddClass, AddClassPage} = require('../services/AdminServices')
const router = express.Router();

// basic routes
router.get('/', (req, res) => {
    HomePage(req, res);
});

router.get("/contact", (req, res) => {
    ContactPage(req, res);
});
router.post("/contact", (req, res) => {
    Contact(req, res);
});
router.get("/about", (req, res) => {
    AboutPage(req, res);
});

// user account routes
router.get('/login', (req, res) => {
    LoginPage(req, res);
});
router.post("/login", (req, res) => {
    Login(req, res);
});
router.post("/register", (req, res) => {
    Register(req, res);
});
router.get('/logout', (req, res) => {
    Logout(req, res);
});
router.get("/account", (req, res) => {
    AccountPage(req, res);
});
router.post("/account", (req, res) => {
    UpdateAccount(req, res);
});

// product related pages
router.get('/product/:id', (req, res) => {
    ProductPage(req, res);
});
router.get("/product-type/:type", (req, res) => {
    ProductTypePage(req, res);
});
router.get("/customize", (req, res) => {
    CustomizePage(req, res);
});
router.post("/customize", (req, res) => {
    Customize(req, res);
});

// order related pages
router.get("/checkout", (req, res) => {
    CheckoutPage(req, res);
});
router.post("/checkout", (req, res) => {
    Checkout(req, res);
});
router.get("/checkout/class/:id", (req, res) => {
    CheckoutPage(req, res);
});
router.post("/checkout/class/:id", (req, res) => {
    CheckoutClass(req, res);
});
router.get("/history", (req, res) => {
    HistoryPage(req, res);
});
router.get("/cart", (req, res) => {
    CartPage(req, res);
});

router.post("/cart", (req,res)=>{
    CheckoutAction(req,res);
})
router.get("/cart/add/:id", (req, res) => {
    CartAdd(req, res);
});
router.get("/cart/update/:id", (req, res) => {
    CartUpdate(req, res);
});
router.get("/cart/delete/:id", (req, res) => {
    CartDelete(req, res);
});

// classes and special dates and admin
router.get("/classes", (req, res) => {
    ClassPage(req, res);
});

router.get("/classes/join", (req, res) => {
    ClassJoin(req, res);
});
router.get("/special-dates", (req, res) => {
    SpecialDatesPage(req, res);
});
router.post("/special-dates/add", (req, res) => {
    SpecialDatesAdd(req, res);
});
router.post("/special-dates/edit/:id", (req, res) => {
    SpecialDatesEdit(req, res);
});
router.get("/special-dates/delete/:id", (req, res) => {
    SpecialDatesDelete(req, res);
});
router.post("/edit-birthday", (req,res)=>{
    EditBirthday(req,res);
})
// admin pages
router.get("/admin", (req, res) => {
    AdminPage(req, res);
});
router.post("/admin/product", (req, res) => {
    AddProduct(req, res);
});
router.post("/admin/flower", (req, res) => {
    AddFlower(req, res);
});
router.get("/admin/class", (req,res)=>{
    AddClassPage(req,res);
})
router.post("/admin/class", (req,res)=>{
    AddClass(req,res);
})
module.exports = router;