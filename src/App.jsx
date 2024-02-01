import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./page/HomePage";
import ProjectPage from "./page/ProjectPage";
import ContactPage from "./page/ContactPage";

// const router = createBrowserRouter([
//   { path: "/", element: <HomePage /> },
//   { path: "/projects", element: <ProjectPage /> },
//   { path: "/contacts", element: <ContactPage /> },
// ]);

const App = () => {
  return (
    <div className="bg-[#0A1926]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

// bg-gradient-to-b from-gray-900 via-purple-900 to-blue-950

//bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 px-4
//bg-[#0A1926]
