import react, { useState, useEffect, useContext } from "react";

// React Router Dom
import { Navigate, useNavigate } from "react-router";

// Context Provider
import { AuthContext } from "../context/Auth";

// LINE LIFF
import LIFF from "@line/liff";

export default function HomePage() {
  let navigate = useNavigate;
  const authContext = useContext(AuthContext);

  if (!authContext?.userData) {
    return <Navigate to={"/new-user"} />;
  }

  return <div>HOME</div>;
}
