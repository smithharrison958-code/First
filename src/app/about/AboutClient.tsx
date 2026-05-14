"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Leaf, Shield, Heart, Globe } from "lucide-react";
import { brandStats } from "@/lib/data";

const values = [
  {
    icon: Shield,
    title: "Health First",
    description:
      "Every product we carry has passed rigorous third-party testing for PFAS, BPA, heavy metals, and microplastic shedding. We refuse to compromise.",
  },
  {
    icon: Globe,
    title: "Environmental Responsibility",
    description:
      "We source from FSC-certified forests, use 100% plastic-free packaging, and partner only with suppliers who meet our environmental standards.",
  },
  {
    icon: Heart,
    title: "Honesty Over Marketing",
    description:
      "We won't exaggerate claims or use fear-based marketing. We share the science as it is, and let our products speak for themselves.",
  },
  {
    icon: Leaf,
    title: "Built to Last",
    description:
      "We believe in buying once and buying well. All our products come with lifetime warranties because we design them to outlast trends and decades.",
  },
];

const team = [
  {
    name: "Maya Hoffman",
    role: "Founder & CEO",
    bio: "Former food scientist who left a career in food packaging after discovering the extent of microplastic contamination in the supply chain.",
    imageStyle: { background: "linear-gradient(135deg, #C4956A, #8B5E3C)" },
  },
  {
    name: "James Okafor",
    role: "Head of Product",
    bio: "20-year culinary professional turned product developer. James tests every product in his own kitchen before we list it.",
    imageStyle: { background: "linear-gradient(135deg, #4A6B45, #2D4A28)" },
  },
  {
    name: "Dr. Priya Nair",
    role: "Scientific Advisor",
    bio: "Environmental toxicologist specializing in microplastic research. Ensures all our health claims are backed by peer-reviewed science.",
    imageStyle: { background: "linear-gradient(135deg, #6B8EAF, #3A5A7A)" },
  },
];

export default function AboutClient() {
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true });
  const valuesInView = useInView(valuesRef, { once: true });
  const teamInView = useInView(teamRef, { once: true });

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Hero */}
      <section className="relative bg-[#1A1A1A] pt-24 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #C4956A 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-px bg-[#C4956A]" />
              <span className="text-[#C4956A] text-xs font-semibold uppercase tracking-[0.25em]">
                Our Story
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#FAFAF7] mb-5 leading-tight">
              Born From
              <br />
              <span className="text-[#C4956A]">Frustration.</span>
              <br />
              Built on Truth.
            </h1>
            <p className="text-[#8A8A8A] text-lg leading-relaxed">
              PureLife Kitchen started when our founder discovered that her own kitchen — stocked
              with &quot;premium&quot; products — was one of the biggest sources of microplastic
              contamination in her family&apos;s diet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-[#1A1A1A] mb-5">The Wake-Up Call</h2>
              <div className="space-y-4 text-[#4A4A4A] leading-relaxed">
                <p>
                  In 2021, Maya Hoffman was working as a packaging scientist for a major food
                  company when she read a study showing microplastics in the blood of 77% of tested
                  participants. She started tracing the sources.
                </p>
                <p>
                  What she found in her own kitchen horrified her. The beloved non-stick pan she&apos;d
                  used for years was shedding PFAS particles. Her plastic cutting board was literally
                  being eaten. The meal-prep containers she used daily were leaching BPA into
                  leftovers she microwaved every day.
                </p>
                <p>
                  When she went to replace everything, she found that the market for genuinely
                  non-toxic kitchen goods was scattered, expensive, and confusing. Marketing claims
                  were wild and unverifiable. She decided to build the solution she couldn&apos;t find.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl overflow-hidden aspect-square product-img-oak relative"
            >
              <div className="absolute inset-0 flex items-end p-6">
                <div className="glass rounded-xl p-4 w-full">
                  <blockquote className="text-sm font-medium text-[#1A1A1A] italic">
                    &ldquo;I knew the science. I&apos;d spent years in food packaging. And even I was being
                    unknowingly poisoned by my own kitchen.&rdquo;
                  </blockquote>
                  <p className="text-xs text-[#8A8A8A] mt-2">— Maya Hoffman, Founder</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div ref={statsRef} className="bg-[#1A1A1A] py-16">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {brandStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-[#C4956A] mb-1">{stat.value}</div>
                <div className="text-xs text-[#8A8A8A] uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <section className="section-padding bg-[#F0EDE8]">
        <div ref={valuesRef} className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#1A1A1A]">Our Values</h2>
            <p className="text-[#8A8A8A] mt-3 max-w-xl mx-auto">
              Four principles that guide every product decision, every partnership, and every
              communication.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-[#E8E8E8] hover:border-[#C4956A]/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#C4956A]/10 flex items-center justify-center mb-4">
                  <value.icon className="w-5 h-5 text-[#C4956A]" />
                </div>
                <h3 className="text-base font-bold text-[#1A1A1A] mb-2">{value.title}</h3>
                <p className="text-sm text-[#8A8A8A] leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div ref={teamRef} className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#1A1A1A]">The Team</h2>
            <p className="text-[#8A8A8A] mt-3 max-w-md mx-auto">
              Scientists, chefs, and advocates united by one mission.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4 shadow-md"
                  style={member.imageStyle}
                />
                <h3 className="font-bold text-[#1A1A1A]">{member.name}</h3>
                <p className="text-xs text-[#C4956A] font-medium uppercase tracking-wider mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-[#8A8A8A] leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A1A1A] py-16">
        <div className="container-premium text-center">
          <h2 className="text-3xl font-bold text-[#FAFAF7] mb-4">
            Ready to Cook Without Compromise?
          </h2>
          <p className="text-[#8A8A8A] mb-8 max-w-lg mx-auto">
            Join 50,000+ households that have made the switch to a cleaner, safer kitchen.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 h-12 px-8 bg-[#C4956A] text-white rounded text-sm font-semibold hover:bg-[#A47850] transition-colors"
          >
            Shop the Collection
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
