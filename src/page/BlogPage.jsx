import React from "react";
import PageLayout from "./PageLayout";
import BlogCard from "../components/BlogCard";
import useAsync from "../hooks/useAsync";
import { fetchPostList } from "../lib/posts";
import { StaggerGroup, StaggerItem } from "../components/Motion";

const CardSkeleton = () => (
  <div className="w-full sm:w-[440px] h-[360px] rounded-3xl bg-slate-800/70 motion-safe:animate-pulse" />
);

const BlogPage = () => {
  const { status, data: posts } = useAsync(fetchPostList, []);

  return (
    <PageLayout title="Blog">
      <section className="py-10 md:py-14 flex flex-col items-center">
        <div className="mb-6 md:mb-10 flex flex-col items-center md:items-start w-full px-5 sm:px-8 md:px-0 md:w-[90%]">
          <h1 className="heading-gradient text-[1.75rem] md:text-[2.2rem] font-bold font-bricolage">
            Blog
          </h1>
          <p className="mt-3 text-slate-300 w-full md:w-3/5 text-center md:text-left text-[14px] leading-[20px] md:text-[18px] md:leading-[20px] font-bricolage">
            Notes on frontend engineering, performance and the things I learn while building.
          </p>
        </div>

        {status === "loading" && (
          <div className="w-full px-5 sm:w-auto sm:px-0 flex gap-6 sm:gap-8 flex-wrap justify-center">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        )}

        {status === "error" && (
          <p className="text-slate-300 font-bricolage px-5 text-center">
            Posts couldn&apos;t be loaded right now. Please check back in a moment.
          </p>
        )}

        {status === "success" && posts.length === 0 && (
          <p className="text-slate-300 font-bricolage px-5 text-center">
            No posts yet. The first one is on its way!
          </p>
        )}

        {status === "success" && posts.length > 0 && (
          <StaggerGroup stagger={0.1} className="w-full px-5 sm:w-auto sm:px-0 flex gap-6 sm:gap-8 flex-wrap justify-center">
            {posts.map((post) => (
              <StaggerItem key={post.slug} className="w-full sm:w-auto">
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </PageLayout>
  );
};

export default BlogPage;
