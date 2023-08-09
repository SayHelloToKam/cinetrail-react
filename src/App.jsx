import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/moviedetails/:movieId"} element={<MovieDetails />} />
          <Route path={"*"} element={<HomePage />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;
