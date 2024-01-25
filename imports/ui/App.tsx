import React from "react";
import { UploadInput } from "./components/UploadInput";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ImportPage } from "./pages/ImportPage";
import { FixturesPage } from "./pages/FixturesPage";
import { FixtureDetailPage } from "./pages/FixtureDetailPage";
import { Navbar } from "./components/Navbar";
export const App = () => (
  // <div>
  //   <h1 className="text-3xl font-bold">Rugby Fixtures</h1>

  //   <UploadInput />
  // </div>

  <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/import" element={<ImportPage />}></Route>
        <Route path="/fixture/:id" element={<FixtureDetailPage />}></Route>
        {/* <Route path="/fixtures" element={<FixturesPage />}></Route> */}
      </Routes>
    </div>
  </Router>
);
