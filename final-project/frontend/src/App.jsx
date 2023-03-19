import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LogInSignUp from "./components/LogInSignUp";
import MainPage from "./components/MainPage";
import SessionPage from "./components/SessionPage";
import NotFound from "./components/NotFoundPage";
import Protected from "./utils/protected";

import "./reset.css";
import "./main.css";

function App() {
  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogInSignUp />} />
          <Route element={<Protected />}>
            <Route path="/home" element={<MainPage />} />
            <Route path="/session/:id" element={<SessionPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
