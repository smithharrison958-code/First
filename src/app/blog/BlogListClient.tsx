"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function BlogListClient() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Header */}
      <div className="bg-[#1A1A1A] pt-24 pb-16">
        <div className="container-premium">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-px bg-[#C4956A]" />
              <span className="text-[#C4956A] text-xs font-semibold uppercase tracking-[0.25em]">
                The Journal
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#FAFAF7] mb-3">
              Science, Guides & Stories
            </h1>
            <p className="text-[#8A8A8A] max-w-lg">
              Evidence-based guides to a microplastic-free kitchen, non-toxic cooking techniques,
              and sustainable living.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-premium py-12">
        {/* Featured post */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden border border-[#E8E8E8] hover:border-[#C4956A]/30 transition-all hover:shadow-md">
              <div
                className={cn(
                  "h-56 md:h-auto min-h-[280px]",
                  featured.imageClass
                )}
              />
              <div className="p-8 flex flex-col justify-center">
                <span className="text-xs font-semibold text-[#C4956A] uppercase tracking-wider mb-2">
                  {featured.category}
                </span>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3 leading-tight group-hover:text-[#C4956A] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-[#8A8A8A] text-sm leading-relaxed mb-4 line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-[#8A8A8A]">
                    <span>{featured.author}</span>
                    <span>·</span>
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featured.readTime} min
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#C4956A] group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Rest */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block bg-white rounded-xl overflow-hidden border border-[#E8E8E8] hover:border-[#C4956A]/30 hover:shadow-md transition-all">
                <div className={cn("h-44", post.imageClass)} />
                <div className="p-5">
                  <span className="text-xs font-semibold text-[#C4956A] uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h2 className="text-base font-bold text-[#1A1A1A] mt-1 mb-2 leading-snug group-hover:text-[#C4956A] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#8A8A8A] line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-[#8A8A8A]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min read
                    </span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
