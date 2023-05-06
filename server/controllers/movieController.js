const { Movie } = require('../../models.js');

const MovieController = {};

MovieController.createMovie = async (req, res, next) => {
    const { title, releaseYear } = req.body;
    const createMovie = await Movie.create({title, releaseYear}) 
    try {
    res.locals.createMovie = createMovie;
    next();
    }
    catch(err) {
        return next(err);
    }
}

MovieController.deleteMovie = async (req, res, next) => {
    const title = req.params.title;
    const removeMovie = await Movie.deleteOne({title})
    try {
        next();
    }
    catch(err) {
        return next(err);
    }
}

MovieController.getMovie = async (req, res, next) => {
    const title = req.params.title;
    const getMovie = await Movie.findOne({title})
    try {
        res.locals.movie = getMovie;
        next();
    }
    catch(err) {
        return next(err);
    }
}

MovieController.updateMovie = async (req, res, next) => {
    const { title } = req.body;
    const newTitle = req.params.title;
    const update = await Movie.findOneAndUpdate({title}, {$set: {
        title: newTitle}, new: true})
    try {
        res.locals.updateMovie = update;
        next();
    }
    catch(err) {
        return next(err);
    }

};

MovieController.getAllMovies = async (req, res, next) => {
    const all = await Movie.find({})
    try {
        res.locals.allMovies = all;
        next();
    }
    catch(err) {
        return next(err);
    }
};
module.exports = MovieController;