import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {getUpcomingMovies, getMovieGenres, getPopularMovies, getMoviesByYear, getTopMovies, getMoviesBySearch } from '../tmdb-api';
  
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));
router.get('/tmdb/year/:year', asyncHandler(async (req, res) => {
    const year = req.params.year;

    try {
        const moviesByYear = await getMoviesByYear(year);
        res.status(200).json(moviesByYear.results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.get('/tmdb/search/:query', asyncHandler(async (req, res) => {
    const query = req.params.query;
    try {
        const moviesBySearch = await getMoviesBySearch(query);  // Use the `query` parameter
        res.status(200).json(moviesBySearch.results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getMovieGenres();
    res.status(200).json(genres);
}));
router.get('/tmdb/popular', asyncHandler(async (req, res) => {
    const popularMovies = await getPopularMovies();
    res.status(200).json(popularMovies);
}));
router.get('/tmdb/top_rated', asyncHandler(async (req, res) => {
    const topMovies = await getTopMovies();
    res.status(200).json(topMovies);
}));
export default router;
