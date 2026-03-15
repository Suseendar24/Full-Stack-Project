import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import News from "./components/News";
import Live from "./components/Live";
import Store from "./components/Store";
import Account from "./components/Account";
import OnlineGames from "./components/OnlineGames";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/news" element={<News />} />
        <Route path="/live" element={<Live />} />
        <Route path="/store" element={<Store />} />
        <Route path="/account" element={<Account />} />
        <Route path="/online-games" element={<OnlineGames />} />
      </Routes>
    </Router>
  );
}

export default App;