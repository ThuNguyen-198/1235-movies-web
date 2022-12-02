const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    regUsername: { type: String },
    regEmail: { type: String },
    regFirst: { type: String },
    regLast: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    regPassword: { type: String },
});

module.exports = mongoose.model('Account', accountSchema);
