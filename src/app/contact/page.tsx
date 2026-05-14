import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with PureLife Kitchen. We're here to help with product questions, orders, and anything else.",
};

export default function ContactPage() {
  return <ContactClient />;
}
