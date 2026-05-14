"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { products, categories, materials } from "@/lib/data";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedMaterial !== "All") {
      result = result.filter((p) => p.material === selectedMaterial);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "featured":
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [search, selectedCategory, selectedMaterial, priceRange, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedMaterial("All");
    setPriceRange([0, 500]);
    setSortBy("featured");
  };

  const activeFilterCount = [
    selectedCategory !== "All",
    selectedMaterial !== "All",
    priceRange[0] > 0 || priceRange[1] < 500,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* Page header */}
      <div className="bg-[#1A1A1A] pt-24 pb-12">
        <div className="container-premium">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-px bg-[#C4956A]" />
            <span className="text-[#C4956A] text-xs font-semibold uppercase tracking-[0.25em]">
              The Collection
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#FAFAF7] mb-3">
            Shop All Products
          </h1>
          <p className="text-[#8A8A8A] max-w-lg">
            Every item is rigorously curated to be completely free from PFAS, BPA, microplastics,
            and synthetic coatings.
          </p>
        </div>
      </div>

      <div className="container-premium py-10">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8A8A]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full h-10 pl-9 pr-4 border border-[#E8E8E8] rounded text-sm focus:outline-none focus:border-[#C4956A] bg-white transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A8A] hover:text-[#1A1A1A]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filters toggle (mobile) */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="sm:hidden inline-flex items-center gap-2 h-10 px-4 border border-[#E8E8E8] rounded text-sm font-medium bg-white hover:border-[#C4956A] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#C4956A] text-white text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Category filter (desktop) */}
          <div className="hidden sm:flex items-center gap-2 flex-wrap">
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`h-9 px-3 rounded text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-[#1A1A1A] text-[#FAFAF7]"
                    : "border border-[#E8E8E8] text-[#1A1A1A] hover:border-[#1A1A1A] bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs text-[#8A8A8A] hover:text-[#C4956A] transition-colors"
              >
                Clear all
              </button>
            )}
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 px-3 border border-[#E8E8E8] rounded text-sm focus:outline-none focus:border-[#C4956A] bg-white cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden lg:block w-56 shrink-0 space-y-6">
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-3">
                Category
              </h3>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${
                        selectedCategory === cat
                          ? "text-[#C4956A] bg-[#C4956A]/6 font-medium"
                          : "text-[#4A4A4A] hover:text-[#1A1A1A] hover:bg-[#F0EDE8]"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-3">
                Material
              </h3>
              <ul className="space-y-1">
                {materials.map((mat) => (
                  <li key={mat}>
                    <button
                      onClick={() => setSelectedMaterial(mat)}
                      className={`w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${
                        selectedMaterial === mat
                          ? "text-[#C4956A] bg-[#C4956A]/6 font-medium"
                          : "text-[#4A4A4A] hover:text-[#1A1A1A] hover:bg-[#F0EDE8]"
                      }`}
                    >
                      {mat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-3">
                Price Range
              </h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min={0}
                  max={500}
                  step={10}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-[#C4956A]"
                />
                <div className="flex justify-between text-xs text-[#8A8A8A]">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-[#8A8A8A]">
                {filtered.length} {filtered.length === 1 ? "product" : "products"}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[#1A1A1A] font-semibold mb-2">No products found</p>
                <p className="text-sm text-[#8A8A8A] mb-4">Try adjusting your filters or search query.</p>
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#C4956A] hover:text-[#A47850] font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
