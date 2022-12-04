import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Pages
import MenuAdder from "./pages/MenuAdder";
import NewHomePage from "./pages/NewHomePage";
import NewUserPage from "./pages/NewUserPage";
import RestaurantAdder from "./pages/RestaurantAdder";
import RestaurantPage from "./pages/RestaurantPage";

// MyComponents
import BottomNavigationBar from "./components/BottomNavigationBar";
import AuthContextProvider from "./context/Auth";
import RandomPage from "./pages/RandomPage";
import RestaurantMenuPage from "./pages/RestaurantMenuPage";

function App() {

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
