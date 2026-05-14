import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn about PureLife Kitchen's mission to make microplastic-free, non-toxic cooking accessible to everyone.",
};

export default function AboutPage() {
  return <AboutClient />;
}
