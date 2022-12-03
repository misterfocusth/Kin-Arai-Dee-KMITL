import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import NewHomePage from "./pages/NewHomePage";
import NewUserPage from "./pages/NewUserPage";
import MenuAdder from "./pages/MenuAdder"
import RestaurantAdder from "./pages/RestaurantAdder"
import RestaurantPage from "./pages/RestaurantPage";

// MyComponents
import BottomNavigationBar from "./components/BottomNavigationBar";
import AuthContextProvider from "./context/Auth";
import RestaurantMenuPage from "./pages/RestaurantMenuPage";
import RandomPage from "./pages/RandomPage";

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
                <Route path="/restaurant" element={<RestaurantPage />}></Route>
                <Route path="/random" element={<RandomPage />}></Route>
                <Route path="/new-user" element={<NewUserPage />}></Route>
                <Route path="/add/restaurant" element={<RestaurantAdder />}></Route>
                <Route path="/add/menu" element={<MenuAdder />}></Route>
                <Route exact path="/restaurant/menu" element={<RestaurantMenuPage />}></Route>
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
