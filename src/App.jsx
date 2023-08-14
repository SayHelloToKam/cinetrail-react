import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import ContextReducer from "./contexts";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <ContextReducer>
          <Header />
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/moviedetails/:movieId"} element={<MovieDetails />} />
            <Route path={"/signup"} element={<SignUp />} />
            <Route path={"/signin"} element={<SignIn />} />
            <Route path={"/myfavorites"} element={<Favorites />} />
            <Route path={"*"} element={<HomePage />} />
          </Routes>
          <Footer />
        </ContextReducer>
      </BrowserRouter>
    </>
  );
}

export default App;
