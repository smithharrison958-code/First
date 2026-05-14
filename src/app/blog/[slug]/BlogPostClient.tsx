"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowLeft, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { blogPosts } from "@/lib/data";
import type { BlogPost } from "@/lib/data";

interface Props {
  post: BlogPost;
}

export default function BlogPostClient({ post }: Props) {
  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Hero */}
      <div className="bg-[#1A1A1A] pt-24 pb-0">
        <div className="container-premium pb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl pb-12"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs text-[#8A8A8A] hover:text-[#C4956A] transition-colors mb-6"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Journal
            </Link>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold text-[#C4956A] uppercase tracking-wider">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-[#FAFAF7] mb-5 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[#8A8A8A]">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime} min read
              </span>
            </div>
          </motion.div>
        </div>

        {/* Cover image */}
        <div className="container-premium pb-0 px-0 sm:px-8 lg:px-16 xl:px-[4rem]">
          <div className={cn("h-72 md:h-96 rounded-t-2xl overflow-hidden mx-4 sm:mx-0", post.imageClass)} />
        </div>
      </div>

      {/* Article */}
      <div className="container-premium py-12">
        <div className="max-w-2xl mx-auto">
          {/* Excerpt callout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="border-l-2 border-[#C4956A] pl-5 mb-10"
          >
            <p className="text-base text-[#4A4A4A] italic leading-relaxed">{post.excerpt}</p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author bio */}
          <div className="mt-12 pt-8 border-t border-[#E8E8E8] flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full shrink-0"
              style={{
                background: "linear-gradient(135deg, #C4956A, #6A8F65)",
              }}
            />
            <div>
              <p className="font-bold text-[#1A1A1A] text-sm">{post.author}</p>
              <p className="text-xs text-[#8A8A8A] mt-0.5">
                Expert contributor to PureLife Kitchen Journal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="bg-[#F0EDE8] py-14">
          <div className="container-premium">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-8">More from the Journal</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((relPost) => (
                <Link
                  key={relPost.id}
                  href={`/blog/${relPost.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden border border-[#E8E8E8] hover:border-[#C4956A]/30 hover:shadow-sm transition-all"
                >
                  <div className={cn("h-36", relPost.imageClass)} />
                  <div className="p-4">
                    <span className="text-[10px] font-semibold text-[#C4956A] uppercase tracking-wider">
                      {relPost.category}
                    </span>
                    <h3 className="text-sm font-bold text-[#1A1A1A] mt-1 group-hover:text-[#C4956A] transition-colors line-clamp-2 leading-snug">
                      {relPost.title}
                    </h3>
                    <p className="text-xs text-[#8A8A8A] mt-1.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {relPost.readTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
