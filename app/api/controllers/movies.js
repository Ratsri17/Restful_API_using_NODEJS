const movieModel = require('../models/movies');

module.exports = {
    getById: function (req, res, next) {
        console.log(req.body);
        movieModel.findById(req.params.movieId, (err, movieInfo) => {
            if (err)
                next(err);
            else
                res.json({
                    status: 'succeess',
                    message: 'Movie Found!!!',
                    data: {
                        Movies: movieInfo
                    }
                });
        });
    },

    getAll: function (req, res, next) {
        let moviesList = [];

        movieModel.find({}, (err, movies) => {
            if (err)
                next(err);
            else {
                for (let movie of movies) {
                    moviesList.push({ id: movie._id, name: movie.name, released_on: movie.released_on });
                }
                res.json({
                    status: 'success',
                    message: 'Movies List Found!!!',
                    data: {
                        movies: moviesList
                    }
                });
            }
        });
    },

    updateById: function (req, res, next) {
        movieModel.findByIdAndUpdate(req.params.movieId, {name:req.body.name}, (err, movieInfo) => {
            if(err)
            next(err);
            else
            res.json({
                status: 'success',
                message: 'Movie updated succcessfully!!!',
                data:  null
            });
        });
    },

    deleteById: function (req,res,next) {
        movieModel.findByIdAndRemove(req.params.movieId, (err, movieInfo) => {
            if(err)
            next(err);
            else
            res.json({
                status: 'success',
                message: 'Movie Deleted Successfully!!!',
                data: null
            });
        });
    },

    create: function (req,res,next) {
        movieModel.create({name: req.body.name, released_on: req.body.released_on}, (err, movieInfo) => {
            if(err)
            next(err);
            else
            res.json({
                status: 'success',
                message: 'Movie added successfully!!!',
                data: null
            });
        });
    }

}