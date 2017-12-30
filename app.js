const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;


const api_routes = require('./routes/api_routes');

mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost/simpleapp');

const db = mongoose.connection;

db.once('open', () => {
	console.log('Mongoose connection successfully started');
});


db.on('error', (err) => {
	console.log("Mongoose error", err);
});

const app = express();


app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// settings models

const UserSchema = Schema({
    username:{
        type:String
    },

    password:{
        type:String
    }
});

const User = mongoose.model("User", UserSchema);


// JSON Web Token
// jwt.sign();
// jwt.verify();

const generateToken = (_id, username) => {
  const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // a day
      data:{
          _id,
          username
      }
  }, 'awesome');
  return token;
};



const verifyCookie = (req, res, next) => {
    const {token} = req.cookies;
    jwt.verify(token, 'awesome', (err, decoded) => {
        if(err){
            res.status(401).json({error:"No Access buddy"});
        } else{
            next();
        }
    });

};



app.post("/signup", (req, res) => {
    const {username, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    User.findOne({username})
        .then((user) => {
            if(user)
                return res.status(409).json({error: "User already exist"});
            const create_user = new User({
                username,
                password: hash
            });
            create_user.save((err) => {
                if(err)
                    return err;
                const token = generateToken(user._id, user.username);
                res.cookie("token", token);
                res.status(200).json({msg:"Created registered"});
            });
        })
        .catch((err) => {
            res.status(400).json({err:"Connection error"});
        });
});




app.post("/signin", (req, res) => {
    const {username, password} = req.body;

    User.findOne({username})
        .then((user) => {
            if(bcrypt.compareSync(password, user.password)){
                const token = generateToken(user._id, user.username);
                res.cookie("token", token);
                res.status(200).json({msg:"User is signed in"});
            } else{
                res.status(400).json({error:'Password does not match'});
            }
        })
        .catch((err) => {
            res.status(400).json({err:"Connection error"});
        });

});



app.get('/user', verifyCookie, (req, res) => {
    res.json({msg:"Happy to be here"});
});


app.use('/', api_routes);

module.exports = app;

