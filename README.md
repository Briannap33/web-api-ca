# Assignment 2 - Web API.

Name: Brianna Power

## Features.
 *postman only*
 + getMoviesBySearch- name of movie can be imputted to then return movie details http://localhost:8080/api/movies/tmdb/search/The Godfather
 + getMoviesByYear- when user unputs year, list of movies realeased in that year are returned e.g.http://localhost:8080/api/movies/tmdb/year/2022
 + getPopularMovies -returns list of popular movies at the time 
 + getTopMovies- returns list of top rated movies

## Setup requirements.
N/A

## API Configuration

.env files created for both frontend and backend using following:
______________________
*backend*
NODE_ENV=development
PORT=8080
HOST=
MONGO_DB=YourMongoURL
TMDB_KEY=--------
SECRET=YourJWTSecret
______________________
______________________
*frontend*
REACT_APP_TMDB_KEY=----------
FAST_REFRESH=-----
______________________



## API Design
-/api/movies/upcoming | GET | Fetches a list of upcoming movies from TMDB.
-/api/movies/popular | GET | Retrieves a list of popular movies from TMDB.
-/api/movies/top | GET | Fetches a list of top-rated movies from TMDB.
-/api/movies/{year} | GET | Retrieves movies released in a specific year from TMDB.
-/api/movies/search | GET | Searches for movies based on a query string.

## Security and Authentication

login&signup forms made, not working very well as user can login without having made account if they use the login on the site header, if user clicks register they are locked out of seeing any movie page until they register.

## Integrating with React App

attempt at integration but could not get it to work, instead it just gives an error message to the user (for upcoming movies and popular movies)

   
