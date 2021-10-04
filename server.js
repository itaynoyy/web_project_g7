const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const session = require('express-session');
const ejs = require('ejs');
const fileUpload = require("express-fileupload");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config({path: 'config.env'});

const PORT = process.env.PORT || 8080;

const app = express();

app.use(morgan('tiny'));
app.use(cookieParser());
app.use(session({secret: process.env.SESSION_SECRET_KEY}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload({
  filesize:8*1024*1024
}));

app.set('view engine', "ejs");
app.engine('ejs', async (path, data, cb) => {
    try{
      let html = await ejs.renderFile(path, data,{async:true});
      cb(null, html);
    }catch (e){
      cb(e, '');
    }
  });
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js'), {setHeaders: function (res, path, stat) {
  res.set('Service-Worker-Allowed', '/');
}}));
app.use('/images', express.static(path.resolve(__dirname, 'assets/images')));

global.main_dir;
global.main_dir = __dirname;
app.use('/', require('./server/routes/router'));
app.listen(PORT, ()=>{console.log(`server is running on http://localhost:${PORT}`)});