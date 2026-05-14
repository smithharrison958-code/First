import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProductBySlug, getRelatedProducts } from "@/lib/data";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} — PureLife Kitchen`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  return <ProductDetailClient product={product} related={related} />;
}
