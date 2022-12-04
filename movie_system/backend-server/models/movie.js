const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const movieSchema = mongoose.Schema({
    adult: { type: boolean },
    backdrop_path: { type: string },
    genre_ids: { type: string },
    original_language: { type: string },
    original_title: { type: string },
    overview: { type: string },
    popularity: { type: number },
    poster_path: { type: string },
    release_date: { type: string },
    title: { type: string },
    video: { type: boolean },
    vote_average: { type: number },
    vote_count: { type: number },
    show_times: { type: string[{ type: string }] },
    theaters: { type: string[{ type: string }] },
    ticket_price: { type: number }
});

accountSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Movie', movieSchema);
