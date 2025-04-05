import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import GameGrid from "./components/GameGrid";
import GameDetail from "./components/GameDetail";
import Library from "./components/Library";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

console.log("Header:", Header);
console.log("Sidebar:", Sidebar);
console.log("GameGrid:", GameGrid);
console.log("GameDetail:", GameDetail);
console.log("Library:", Library);
console.log("ProtectedRoute:", ProtectedRoute);

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Sidebar />
          <Routes>
            <Route path="/" element={<GameGrid />} />
            <Route path="/game/:id" element={<GameDetail />} />
            <Route 
              path="/library" 
              element={
                <ProtectedRoute>
                  <Library />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
