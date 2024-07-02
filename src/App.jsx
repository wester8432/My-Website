import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./page/Home";
import Layout from "./page/Layout";
import Message from "./page/Message";
import PopCon from "./components/PopCon";
import { useState } from "react";
function App() {
  const [popState, setPopState] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <>
      {popState && <PopCon setPopState={setPopState} setIsAdmin={setIsAdmin} />}

      <Routes>
        <Route
          path="/"
          element={
            <Layout
              setPopState={setPopState}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
            />
          }
        >
          <Route path="" element={<Home />} />
          <Route path="/message" element={<Message isAdmin={isAdmin} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
