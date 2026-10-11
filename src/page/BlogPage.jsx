import React from "react";
import PageLayout from "./PageLayout";
import BlogCard from "../components/BlogCard";
import useAsync from "../hooks/useAsync";
import { fetchPostList } from "../lib/posts";
import { StaggerGroup, StaggerItem } from "../components/Motion";

const CardSkeleton = () => (
  <div className="w-[340px] max-w-[calc(100vw_-_2rem)] sm:w-[440px] h-[360px] rounded-3xl bg-slate-800/70 motion-safe:animate-pulse" />
);

const BlogPage = () => {
  const { status, data: posts } = useAsync(fetchPostList, []);

  return (
    <PageLayout title="Blog">
      <section className="py-12 md:py-14 flex flex-col items-center">
        <div className="mb-8 md:mb-10 flex flex-col items-center md:items-start w-full md:w-[90%]">
          <h1 className="text-[1.6rem] md:text-[2.2rem] text-blue-400 font-bold font-bricolage">
            Blog
          </h1>
          <p className="mt-3 text-slate-100 w-4/5 md:w-3/5 text-center md:text-left text-[14px] leading-[16px] md:text-[18px] md:leading-[20px] font-bricolage">
            Notes on frontend engineering, performance and the things I learn while building.
          </p>
        </div>

        {status === "loading" && (
          <div className="flex gap-8 flex-wrap justify-center">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        )}

        {status === "error" && (
          <p className="text-slate-300 font-bricolage px-6 text-center">
            Posts couldn&apos;t be loaded right now. Please check back in a moment.
          </p>
        )}

        {status === "success" && posts.length === 0 && (
          <p className="text-slate-300 font-bricolage px-6 text-center">
            No posts yet. The first one is on its way!
          </p>
        )}

        {status === "success" && posts.length > 0 && (
          <StaggerGroup stagger={0.1} className="flex gap-8 flex-wrap justify-center">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
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
