const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {type: String, required: true},
    releaseYear: {type: Number, required: true},
});


const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
})

const Movie = mongoose.model('movie', movieSchema);
const User = mongoose.model('user', userSchema);

module.exports = {
    Movie,
    User
};