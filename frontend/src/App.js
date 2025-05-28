import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import IndexPage from "./pages/IndexPage";
import SignupPage from "./SignupPage";
import Contact from "./Contact";
import About from "./About";
import Mealgen from "./Mealgen";
import Feature from "./Feature";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/mealgen" element={<Mealgen/>}/>
        <Route path ="/feature" element={<Feature/>}/>
      </Routes>
    </Router>
  );
};

export default App;
