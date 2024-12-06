import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainProvider } from "./Context/MainContext";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Header from "./components/Header";
import "./App.scss";
import MovieDetails from "./pages/MovieDetails";

const App = () => {
  return (
    <MainProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />

        </Routes>
      </BrowserRouter>
    </MainProvider>
  );
};

export default App;
