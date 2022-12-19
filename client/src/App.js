import React from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { userContext } from "./Context/Context";

function App() {
  const { user } = React.useContext(userContext);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
      </Routes>
    </Router>
  );
}

export default App;
