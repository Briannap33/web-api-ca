import React, { useContext, useState } from "react";
import { getPopularMovies } from "../api/tmdb-api"; // Update the API function
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { MoviesContext } from "../contexts/moviesContext";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchList";
import RemoveFromWatchlistIcon from "../components/cardIcons/removeFromWatchList";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const PopularMoviePage = (props) => {
  const { data, error, isLoading, isError } = useQuery("popular", getPopularMovies);
  //context used to manage watchlist state
  const { addToMustWatch, removeFromMustWatch, mustWatch } = useContext(MoviesContext);
  //state to manage snackbar alert 
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  //handles adding a movie
  const handleAddToWatchlist = (movie) => {
    addToMustWatch(movie);
    setAlertMessage(`${movie.title} is added to your watchlist`);
    setAlertOpen(true);
  };
 //handles removing a movie
  const handleRemoveFromWatchlist = (movie) => {
    removeFromMustWatch(movie);
    setAlertMessage(`${movie.title} is removed from your watchlist`);
    setAlertOpen(true);
  };
 // function to close alert
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
 //gets list of movies from fetched data
  const movies = data.results;

  return (
    <>
      <PageTemplate
        title="Popular Movies"
        movies={movies}
        action={(movie) => (
          <> {/*check if movie already in watchlist*/}
            {mustWatch.includes(movie.id) ? (
              //if in list, show remnove icon
              <RemoveFromWatchlistIcon
                movie={movie}
                onRemoveFromWatchlist={handleRemoveFromWatchlist}
              />
            ) : (
              //if not in list, show add icon
              <AddToWatchlistIcon
                movie={movie}
                onAddToWatchList={handleAddToWatchlist}
              />
            )}
          </>
        )}
      />
      {/*snackbar showss success message*/}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {/*success message when added*/}
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PopularMoviePage;
