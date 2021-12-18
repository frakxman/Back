const { moviesMock } = require('../utils/mocks/movies');

const MongoLib = require('../lib/mongo');

class MoviesService {
    constructor() {
        this.collection = 'movies';
        this.mongoDB = new MongoLib();
    }

    async getMovies({ tags }) {
        const query = tags && { tags: { $in: tags }};
        const movies = await this.mongoDB.getAll( this.collection, query );
        return movies || [];
    }

    async getMovie({ id }) {
        const movie = await this.mongoDB.get( this.collection, id );
        return movie || {};
    }

    async createMovie({ movie }) {
        const createMovie = this.mongoDB.create( this.collection, movie );
        return createMovie;
    }

    async updateMovie({ id, movie } = {}) {
        const updateMovie = await this.mongoDB.update( this.collection, id, movie );
        return updateMovie;
    }

    async deleteMovie({ id }) {
        const deleteMovie = await this.mongoDB.delete( this.collection, id );
        return deleteMovie;
    }
}

module.exports = MoviesService;