const express = require('express');

const app = express();
const https = require("https");
const Account = require('./models/account')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


mongoose.connect("mongodb+srv://ThuNguyen:teamwork@cluster0.wuh4lin.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(() => {
        console.log("Connection to MongoDB failed!")
    })

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://ThuNguyen:<password>@cluster0.ajvxtpp.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.post("/accounts", (req, res, next) => {
    const account = new Account({
        regUsername: req.body.regUsername,
        regEmail: req.body.regEmail,
        regFirst: req.body.regFirst,
        regLast: req.body.regLast,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        regPassword: req.body.regPassword
    });
    account.save();
    res.status(201).json({
        message: "account added!"
    });
})

app.get("/accounts", (req, res, next) => {
    Account.find().then(document => {
        res.status(200).json({
            message: 'Account fetched successfully!',
            accounts: document
        })
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