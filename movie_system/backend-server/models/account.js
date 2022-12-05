const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const accountSchema = mongoose.Schema({
    regUsername: { type: String, require: true, unique: true },
    regEmail: { type: String, require: true, unique: true },
    regFirst: { type: String },
    regLast: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    regPassword: { type: String, require: true },
    isAdmin: { type: String, default: false }
});

accountSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Account', accountSchema);
