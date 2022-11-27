import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewHomePage from "./pages/NewHomePage";
import NewUserPage from "./pages/NewUserPage";
import "./App.css";

// MyComponents
import BottomNavigationBar from "./components/BottomNavigationBar";
import AuthContextProvider from "./context/Auth";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [liffData, setLiffData] = useState(null);

  return (
    <AuthContextProvider>
      <Router>
        <div className="App ">
          <div>
            <div>
              <Routes>
                <Route path="/" element={<NewHomePage />}></Route>
                <Route path="/restaurant" element={<NewHomePage />}></Route>
                <Route path="/random" element={<NewHomePage />}></Route>
                <Route path="/info" element={<NewHomePage />}></Route>
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
