const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: mongoose.Schema.Types.String,
    userName: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);
