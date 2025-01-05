import React, { useState } from "react";
import { useQuery } from "react-query";
import { getNowTrendingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


const NowTrendingPage = () => {
  //State manages current page of trending movies
  const [currentPage, setCurrentPage] = useState(1); 
//use react-query to get trending movies based on current page
  const { data, error, isLoading, isError } = useQuery( ["nowTrending", currentPage], () => getNowTrendingMovies(currentPage), 
    {
      keepPreviousData: true, //keeps previous data while new page is loading
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>Error: {error.message}</h1>;
  }

  const movies = data?.results || [];  //stores movie results from response or contains empty array
  const totalPages = data?.total_pages || 1;   //gets total pages from response, defaults at 1

  //function to get to next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  //function to go back a page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Trending Movies
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
        {movies.map((movie) => (
          <Card key={movie.id} sx={{ maxWidth: 345 }}> 
          {/*card for each movie*/}
              <CardMedia
              component="img"
              height="200"
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {movie.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {movie.release_date}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Button
          variant="contained"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}  //disables the button to go back when on first page
          sx={{ marginRight: 2 }}
        >
          Previous
        </Button>
        <Typography variant="body1" sx={{ alignSelf: "center" }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}  //disables next button on last page
          sx={{ marginLeft: 2 }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default NowTrendingPage;
