const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    accountName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Account', accountSchema);