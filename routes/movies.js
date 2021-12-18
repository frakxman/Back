// Import dependecies 
const express = require('express');

// Services 
const MoviesService = require('../services/movies');


function moviesApi( app ) {
    const router = express.Router();
    app.use('/api/v1/movies', router);

    const moviesService = new MoviesService();

    // Get All Movies 
    router.get('/', async ( req, res, next ) => {
        const { tags } = req.query;
        try {
            const movies = moviesService.getMovies({ tags });
            res.status( 200 ).json({
                data: movies,
                msg: 'movies listed'
            });
        } catch ( err ) {
            next( err );
        }
    });

    // Get A Movie
    router.get('/:id', async ( req, res, next ) => {
        const { id } = req.params;
        try {
            const movie = await moviesService.getMovie({ id });
            res.status( 200 ).json({
                data: movie,
                msg: 'movie retieved'
            });
        } catch ( err ) {
            next( err );
        }
    });

    // Create a Movie
    router.post('/', async ( req, res, next ) => {
        const { body: movie } = req;
        try {
            const createMovieId = await moviesService.createMovie({ movie });
            res.status( 201 ).json({
                data: createMovieId,
                msg: 'movie created'
            });
        } catch ( err ) {
            next( err );
        }
    });

    // Edit Movie 
    router.patch('/:id', async ( req, res, next ) => {
        const { id } = req.params;
        const { body: movie } = req;
        try {
            const updatedMovie = await moviesService.updateMovie({ id, movie });
            res.status( 200 ).json({
                data: updatedMovie,
                msg: 'movie updated'
            });
        } catch ( err ) {
            next( err );
        }
    });

    // Delete Movie
    router.delete('/:id', async ( req, res, next ) => {
        const { id } = req.params;
        try {
            const deleteMovie = await moviesService.deleteMovie( id );
            res.status( 200 ).json({
                data: deleteMovie,
                msg: 'movie deleted'
            });
        } catch ( err ) {
            next( err );
        }
    });
}

module.exports = moviesApi;