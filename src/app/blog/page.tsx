import type { Metadata } from "next";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "The Journal — Guides, Science & Recipes",
  description:
    "Science-backed guides on microplastic-free living, non-toxic cookware care, and healthy kitchen practices.",
};

export default function BlogPage() {
  return <BlogListClient />;
}
