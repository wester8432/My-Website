import "./App.css";
import { Route, Routes } from "react-router";
import { useState } from "react";
import Home from "./page/Home";
import Layout from "./page/Layout";
import Message from "./page/Message";
import Login from "./page/Login";
import Portfolio from "./page/Portfolio";
function App() {
  const [popState, setPopState] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout setIsAdmin={setIsAdmin} />}>
          <Route path="" element={<Home />} />
          <Route path="/message" element={<Message isAdmin={isAdmin} />} />
          <Route
            path="/login"
            element={<Login isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
          />
          <Route path="/portfolio" element={<Portfolio />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
