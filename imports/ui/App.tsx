import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ImportPage } from "./pages/ImportPage";
import { FixturesPage } from "./pages/FixturesPage";
import { FixtureDetailPage } from "./pages/FixtureDetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Navbar } from "./components/Navbar";
export const App = () => (
  <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/fixtures" element={<FixturesPage />}></Route>
        <Route path="/import" element={<ImportPage />}></Route>
        <Route path="/fixtures/:id" element={<FixtureDetailPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  </Router>
);
