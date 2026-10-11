import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import PageLayout from "./PageLayout";
import Markdown from "../components/Markdown";
import SafeImg from "../components/SafeImg";
import useAsync from "../hooks/useAsync";
import { fetchPost, formatDate } from "../lib/posts";

const BackLink = () => (
  <Link
    to="/blog"
    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bricolage"
  >
    <FaLongArrowAltLeft /> All posts
  </Link>
);

const BlogPostPage = () => {
  const { slug } = useParams();
  const { status, data: post } = useAsync(() => fetchPost(slug), [slug]);
  const title = status === "success" && post ? post.title : "Blog";

  return (
    <PageLayout title={title}>
      <article className="mx-auto w-full max-w-3xl px-5 py-10 md:py-14">
        <BackLink />

        {status === "loading" && (
          <div className="mt-8 space-y-4 motion-safe:animate-pulse">
            <div className="h-10 w-3/4 rounded bg-slate-800" />
            <div className="h-4 w-1/3 rounded bg-slate-800" />
            <div className="h-64 rounded-2xl bg-slate-800" />
          </div>
        )}

        {(status === "error" || (status === "success" && !post)) && (
          <div className="mt-10 text-center">
            <p className="text-white text-2xl font-bricolage">
              {status === "error" ? "This post couldn't be loaded." : "Post not found."}
            </p>
          </div>
        )}

        {status === "success" && post && (
          <>
            <header className="mt-6">
              <h1 className="text-white text-[2rem] md:text-[2.8rem] leading-tight font-bold font-bricolage">
                {post.title}
              </h1>
              <p className="mt-3 text-slate-400 font-robotomono text-sm md:text-base">
                {formatDate(post.publishedAt)}
                {post.readingTime > 0 && ` · ${post.readingTime} min read`}
              </p>
              {post.tags.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-blue-950 text-blue-300"
                    >
                      #{tag}
                    </li>
                  ))}
                </ul>
              )}
            </header>
            <SafeImg
              src={post.coverImage}
              alt=""
              loading="eager"
              className="mt-8 w-full rounded-2xl object-cover max-h-[420px]"
            />
            <div className="mt-8">
              <Markdown>{post.content}</Markdown>
            </div>
            <div className="mt-12 pt-6 border-t border-blue-900">
              <BackLink />
            </div>
          </>
        )}
      </article>
    </PageLayout>
  );
};

export default BlogPostPage;
