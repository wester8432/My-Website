import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./page/Home";
import Layout from "./page/Layout";
import Message from "./page/Message";
import PopCon from "./components/PopCon";
import { useState } from "react";
function App() {
  const [popState, setPopState] = useState(false);
  return (
    <>
      {popState && <PopCon setPopState={setPopState} />}

      <Routes>
        <Route path="/" element={<Layout setPopState={setPopState} />}>
          <Route path="" element={<Home />} />
          <Route path="/message" element={<Message />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
