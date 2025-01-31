import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import WatchlistPage from "./pages/watchListPage";
import ActorPage from "./pages/ActorDetailPage";
import PopularMoviePage from "./pages/popularMoviePage.js";
import NowTrendingPage from "./pages/nowTrendingMovies";
import { AuthProvider } from './contexts/authContext';
import SignUpForm from "./pages/signUpForm.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <AuthProvider>  
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SiteHeader />
      <MoviesContextProvider>
      <Routes>
        <Route path="/signup" element={ <SignUpForm /> } />
        <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} /> 
        <Route path="/movies/watchlist" element={<WatchlistPage />} /> 
        <Route path="/movies/popular" element={<PopularMoviePage />} />
        <Route path="/movies/nowTrending" element={<NowTrendingPage />}/>
        <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={ <Navigate to="/" /> } />
        <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
        <Route path="/person/:id" element={<ActorPage />} />

      </Routes>
      </MoviesContextProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  </AuthProvider>
);
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);

