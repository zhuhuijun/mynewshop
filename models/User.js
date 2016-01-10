var mongoose = require('mongoose');

module.exports = mongoose.model('user', new mongoose.Schema({
    username: String,
    upwd: String,
    uemail: String,
    avator: String
}));
