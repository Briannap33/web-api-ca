import fetch from 'node-fetch';

export const getUpcomingMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
      );
  
      if (!response.ok) {
        const errorResponse = await response.json(); // Await response.json() here
        throw new Error(errorResponse.message || "Something went wrong with TMDB API");
      }
  
      return await response.json(); // If the response is okay, parse the JSON
    } catch (error) {
      console.error("Error fetching upcoming movies:", error); // Log the error for debugging
      throw error; // Rethrow the error to be caught by your backend error handler
    }
  };
  
export const getMovieGenres = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getPopularMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            throw new Error((await response.json()).message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getMoviesByYear = async (year) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&primary_release_year=${year}`
        );

        if (!response.ok) {
            throw new Error((await response.json()).message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getTopMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error((await response.json()).message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMoviesBySearch = async (search) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${encodeURIComponent(search)}&language=en-US`
       );
        if (!response.ok) {
            throw new Error((await response.json()).message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};