const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const MovieController = require('./controllers/movieController.js');
const PORT = 3000;

mongoose.connect('mongodb+srv://yangyohan1:p0KFelNLbsUaMaUo@practiceproject.qtjlaob.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }); 
mongoose.connection.once('open', () => {
    console.log('Connected to database');
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('client'));

app.get('/getAll', MovieController.getAllMovies, (req, res) => {
    res.status(200).json(res.locals.allMovies);
})

app.post('/', MovieController.createMovie, (req, res) => {
    res.status(200).json(res.locals.createMovie);
})

app.delete('/:title', MovieController.deleteMovie, (req, res) => {
    res.status(200);
})

app.get('/:title', MovieController.getMovie, (req, res) => {
    res.status(200).send(res.locals.movie);
})

app.patch('/:title', MovieController.updateMovie, (req, res) => {
    res.status(200).send(res.locals.updateMovie);
})

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: {err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`Listening on PORT 3000...`);
})

module.exports = app;