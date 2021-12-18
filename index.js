const express = require('express');
const app = express();

const { config } = require('./config/index');
// Routes 
const moviesApi = require('./routes/movies');

// Transfomation Data o Body parser
app.use(express.json());

moviesApi( app );

app.listen( config.port, () => {
    console.log(`Listening http://localhost:${ config.port }`);
});