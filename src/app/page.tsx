import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import MicroplasticsSection from "@/components/sections/MicroplasticsSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";

export const metadata: Metadata = {
  title: "PureLife Kitchen — Cook Without Compromise",
  description:
    "Discover microplastic-free, non-toxic kitchen essentials. Premium stainless steel cookware, wooden cutting boards, glass storage, and cast iron skillets built to last a lifetime.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <MicroplasticsSection />
      <FeaturedProducts />
      <BeforeAfter />
      <Testimonials />
      <Newsletter />
    </>
  );
}
