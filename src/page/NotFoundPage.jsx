import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";

const NotFoundPage = () => (
  <PageLayout title="Page not found">
    <div className="h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-green-500 text-6xl font-bold font-bricolage">404</p>
      <p className="mt-3 text-white text-2xl md:text-3xl font-bricolage">
        This page doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="text-slate-100 text-[1.2rem] mt-6 px-4 py-1 border border-white rounded-lg"
      >
        Go to home
      </Link>
    </div>
  </PageLayout>
);

export default NotFoundPage;
