const express = require('express');
const app = express();
const https = require("https");
const Account = require('./models/account')
const Movie = require("./models/movie")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');


const jwt = require('jsonwebtoken')
const checkAuth = require('./middleware/check-auth');
ObjectId = require('mongodb').ObjectID;


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
                regPassword: hash,
                isAdmin: req.body.isAdmin
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
                token: token,
                isAdmin: loginAccount.isAdmin,
                username: loginAccount.regUsername
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: "Authentication failed!"
            });
        })
})

app.post("/movies", (req, res, next) => {
    console.log("server 1: " + req.body.title)
    const movie = new Movie()
    movie.adult = req.body.adult
    movie.backdrop_path = req.body.backdrop_path
    movie.genre_ids = req.body.genre_ids
    movie.original_language = req.body.original_language
    movie.original_title = req.body.original_title
    movie.overview = req.body.overview
    movie.popularity = req.body.popularity
    movie.poster_path = req.body.poster_path
    movie.release_date = req.body.release_date
    movie.title = req.body.title
    movie.video = req.body.video
    movie.vote_average = req.body.vote_average
    movie.vote_count = req.body.vote_count
    movie.show_times = req.body.show_times
    movie.theaters = req.body.theaters
    movie.ticket_price = req.body.ticket_price
    movie.tickets_sold = req.body.tickets_sold
    // const movie = new Movie({
    //     adult: req.body.adult,
    //     backdrop_path: req.body.backdrop_path,
    //     genre_ids: req.body.genre_ids,
    //     original_language: req.body.original_language,
    //     original_title: req.body.original_title,
    //     overview: req.body.overview,
    //     popularity: req.body.popularity,
    //     poster_path: req.body.poster_path,
    //     release_date: req.body.release_date,
    //     title: req.body.title,
    //     video: req.body.video,
    //     vote_average: req.body.vote_average,
    //     vote_count: req.body.vote_count,
    //     show_times: req.body.show_times,
    //     theaters: req.body.theaters,
    //     ticket_price: req.body.ticket_price,
    //     tickets_sold: req.body.tickets_sold
    // });

    movie.save().then((result) => {
        console.log("server 2: " + req.body.title)
        res.status(201).json({
            message: 'Movie added',
            result: result
        });
    })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

app.post("/deleteMovie", (req, res, next) => {
    console.log("chut chut" + req.body)

    Movie.findOneAndDelete(req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                message: "ERROR"
            })
        } else {
            res.status(200).json({ message: "Post deleted!" })
        }
    })
})

app.use("/movies", (req, res, next) => {
    Movie.find()
        .then(movieList => {
            res.status(200).json({
                message: 'success',
                posts: movieList
            });
        })
})

const url = "https://api.themoviedb.org/3/movie/upcoming?api_key=32a493f008c6421b255d91b5cbc139b7&language=en-US&page=10"
https.get(url, function (response) {
    // console.log("ngon qua")
    response.on("data", function (data) {

        const jobsData = JSON.parse(data);
        const jobsJson = jobsData.results;
        app.use("/api/admin", (req, res, next) => {
            res.status(200).json({
                message: 'success',
                posts: jobsJson
            });
        });
    });
});

module.exports = app;