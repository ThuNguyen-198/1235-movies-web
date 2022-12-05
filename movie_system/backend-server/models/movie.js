const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const movieSchema = mongoose.Schema({
    adult: { type: Boolean },
    backdrop_path: { type: String },
    genre_ids: { type: String },
    original_language: { type: String },
    original_title: { type: String },
    overview: { type: String },
    popularity: { type: Number },
    poster_path: { type: String },
    release_date: { type: String },
    title: { type: String },
    video: { type: Boolean },
    vote_average: { type: Number },
    vote_count: { type: Number },
    show_times: { type: [String] },
    theaters: { type: [String] },
    ticket_price: { type: Number, default: 15 },
    tickets_sold: { type: Number }
});

movieSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Movie', movieSchema);
