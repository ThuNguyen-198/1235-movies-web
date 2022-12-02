const express = require('express');

const app = express();
const https = require("https");
const Account = require('./models/account')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const checkAuth = require('./middleware/check-auth');

mongoose.connect("mongodb+srv://ThuNguyen:teamwork@cluster0.wuh4lin.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(() => {
        console.log("Connection to MongoDB failed!")
    })

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.post("/register", (req, res, next) => {
    bcrypt.hash(req.body.regPassword, 10)
        .then((hash) => {
            const account = new Account({
                regUsername: req.body.regUsername,
                regEmail: req.body.regEmail,
                regFirst: req.body.regFirst,
                regLast: req.body.regLast,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                regPassword: hash
            });
            account.save().then((result) => {
                res.status(201).json({
                    message: 'User added to mongoDB with secured password',
                    result: result
                });
            })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        })

})


app.post("/login", (req, res, next) => {
    let loginAccount;
    Account.findOne({ regEmail: req.body.regUsername })
        .then(acccount => {
            if (!acccount) {
                return res.status(401).json({
                    message: "This email/user name is not in the database"
                });
            }
            loginAccount = acccount;
            return bcrypt.compare(req.body.regPassword, acccount.regPassword);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Incorrect password!"
                });
            }
            const token = jwt.sign({
                regEmail: loginAccount.regEmail
            },
                "secret_this_should_be_longer",
                { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "Authentication failed!"
            });
        })
})

const url = "https://api.themoviedb.org/3/movie/upcoming?api_key=32a493f008c6421b255d91b5cbc139b7&language=en-US&page=10"
https.get(url, function (response) {
    response.on("data", function (data) {
        const jobsData = JSON.parse(data);
        const jobsJson = jobsData.results;
        app.use("/movies", (req, res, next) => {
            res.status(200).json({
                message: 'success',
                posts: jobsJson
            });
        });
    });
});

module.exports = app;