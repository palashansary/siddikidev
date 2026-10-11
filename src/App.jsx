import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

import HomePage from "./page/HomePage";
import ContentProvider from "./context/ContentProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";

// Everything except the home page is split into its own chunk; the admin
// panel (and the Firebase SDK it needs) never loads for visitors.
const loadProjectPage = () => import("./page/ProjectPage");
const loadContactPage = () => import("./page/ContactPage");
const loadResumePage = () => import("./page/ResumePage");
const loadBlogPage = () => import("./page/BlogPage");

const ProjectPage = lazy(loadProjectPage);
const ContactPage = lazy(loadContactPage);
const ResumePage = lazy(loadResumePage);
const BlogPage = lazy(loadBlogPage);
const BlogPostPage = lazy(() => import("./page/BlogPostPage"));
const NotFoundPage = lazy(() => import("./page/NotFoundPage"));
const AdminApp = lazy(() => import("./admin/AdminApp"));

const PageFallback = () => <div className="min-h-screen" />;

// Once the page is idle, fetch the small page chunks so navigating to them
// is instant. Skipped on slow or data-saver connections.
function usePrefetchPages() {
  useEffect(() => {
    const connection = navigator.connection;
    if (connection?.saveData || /2g/.test(connection?.effectiveType || "")) return;
    const prefetch = () => [loadProjectPage, loadBlogPage, loadContactPage, loadResumePage].forEach((load) => load().catch(() => {}));
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 2000));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const handle = idle(prefetch, { timeout: 4000 });
    return () => cancel(handle);
  }, []);
}

const App = () => {
  usePrefetchPages();
  return (
    <div className="overflow-x-clip">
      <ErrorBoundary>
        {/* Load only the animation features the site uses (no drag/layout),
            and skip movement for visitors who ask for reduced motion. */}
        <LazyMotion features={domAnimation} strict>
          <MotionConfig reducedMotion="user">
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
          </MotionConfig>
        </LazyMotion>
      </ErrorBoundary>
    </div>
  );
};

export default App;
