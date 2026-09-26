import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "./store";
import { checkAuthSession } from "./store/authSlice";
import { Header } from "./components/Header/Header";
import { Home } from "./pages/Home/Home";
import { Genres } from "./pages/Genres/Genres";
import { GenreMovies } from "./pages/GenreMovies/GenreMovies";
import { MovieDetails } from "./pages/MovieDetails/MovieDetails";
import { Account } from "./pages/Account/Account";
import { Footer } from "./components/Footer/Footer";

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthChecked } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkAuthSession());
  }, [dispatch]);

  if (!isAuthChecked) {
    return (
      <div
        style={{
          color: "#747d8c",
          textAlign: "center",
          paddingTop: "20vh",
          fontFamily: "sans-serif",
        }}
      >
        Загрузка сессии...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/genres/:genreName" element={<GenreMovies />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
