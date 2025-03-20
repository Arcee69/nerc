import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/home";
import PageLayout from "../layouts";



export default function Routers() {
  return (
    <div>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}
