import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./page/HomePage";
import ContentProvider from "./context/ContentProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";

// Everything except the home page is split into its own chunk; the admin
// panel (and the Firebase SDK it needs) never loads for visitors.
const ProjectPage = lazy(() => import("./page/ProjectPage"));
const ContactPage = lazy(() => import("./page/ContactPage"));
const ResumePage = lazy(() => import("./page/ResumePage"));
const BlogPage = lazy(() => import("./page/BlogPage"));
const BlogPostPage = lazy(() => import("./page/BlogPostPage"));
const NotFoundPage = lazy(() => import("./page/NotFoundPage"));
const AdminApp = lazy(() => import("./admin/AdminApp"));

const PageFallback = () => <div className="min-h-screen bg-[#0A1926]" />;

const App = () => {
  return (
    <div className="bg-[#0A1926] overflow-x-clip">
      <ErrorBoundary>
        <ContentProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTop />
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/admin/*" element={<AdminApp />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ContentProvider>
      </ErrorBoundary>
    </div>
  );
};

export default App;
