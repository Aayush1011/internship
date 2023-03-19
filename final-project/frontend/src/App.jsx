import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LogInSignUp from "./components/LogInSignUp";
import MainPage from "./components/MainPage";
import SessionPage from "./components/SessionPage";
import Protected from "./utils/protected";

import "./reset.css";
import "./main.css";

export const UserContext = createContext();

function App() {
  const [userInfo, setUserInfo] = useState("");

  return (
    <>
      <UserContext.Provider value={[userInfo, setUserInfo]}>
        <ToastContainer position="top-right" theme="colored" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogInSignUp />} />
            <Route element={<Protected />}>
              <Route path="/home" element={<MainPage />} />
              <Route path="/session/:id" element={<SessionPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
