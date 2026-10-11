import React from "react";
import { Link } from "react-router-dom";
import SafeImg from "./SafeImg";
import { formatDate } from "../lib/posts";

// Same card language as the project cards, linking to the post.
const BlogCard = ({ post }) => (
  <Link
    to={`/blog/${post.slug}`}
    className="group relative block border border-white/[0.06] w-[340px] max-w-[calc(100vw_-_2rem)] sm:w-[440px] bg-gradient-to-r from-slate-700 to-slate-800 rounded-3xl p-4 sm:p-5 transition-transform duration-300 hover:-translate-y-1"
  >
    <span aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-600/60">
      <SafeImg
        src={post.coverImage}
        alt=""
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        fallback={
          <div className="h-full w-full flex items-center justify-center p-6 text-center text-slate-200 text-xl font-bold font-bricolage bg-gradient-to-br from-blue-900 to-slate-800">
            {post.title}
          </div>
        }
      />
    </div>
    <p className="mt-3 text-slate-400 text-[13px] md:text-[14px] font-robotomono">
      {formatDate(post.publishedAt)}
      {post.readingTime > 0 && ` · ${post.readingTime} min read`}
    </p>
    <h2 className="mt-1 text-white text-[1.3rem] font-bold font-bricolage line-clamp-2">
      {post.title}
    </h2>
    {post.excerpt && (
      <p className="mt-1 text-slate-300 text-[13px] leading-[15px] md:text-[16px] md:leading-[20px] line-clamp-3">
        {post.excerpt}
      </p>
    )}
    {post.tags.length > 0 && (
      <ul className="mt-3 flex flex-wrap gap-2">
        {post.tags.slice(0, 4).map((tag) => (
          <li
            key={tag}
            className="text-[12px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-300"
          >
            #{tag}
          </li>
        ))}
      </ul>
    )}
  </Link>
);

export default BlogCard;
