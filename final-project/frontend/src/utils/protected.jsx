import React from "react";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

const Protected = () => {
  const [user, setUser] = useState(window.sessionStorage.getItem("user"));
  const sessionId = useParams("id");

  useEffect(() => {
    if (sessionId.id) {
      localStorage.setItem("sessionMember", sessionId.id);
    }
  }, []);

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default Protected;
