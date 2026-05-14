import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Common questions about microplastic-free cookware, our products, care instructions, shipping, and returns.",
};

export default function FAQPage() {
  return <FAQClient />;
}
