import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import NewUserPage from "./pages/newUserPage";
import axios from "axios";
import liff from "@line/liff";
import "./App.css";

// MyComponents
import MyLoader from "./components/MyLoader";
import BottomNavigationBar from "./components/BottomNavigationBar";
import { Navigate } from "react-router-dom";
import AuthContextProvider from "./context/Auth";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState(null);
  const [liffData, setLiffData] = useState(null);

  return (
    <AuthContextProvider>
      <Router>
        <div className="App ">
          <div>
            <div>
              <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/restaurant" element={<HomePage />}></Route>
                <Route path="/random" element={<HomePage />}></Route>
                <Route path="/info" element={<HomePage />}></Route>
                <Route path="/new-user" element={<NewUserPage />}></Route>
              </Routes>
            </div>

            <div>
              <BottomNavigationBar />
            </div>
          </div>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
