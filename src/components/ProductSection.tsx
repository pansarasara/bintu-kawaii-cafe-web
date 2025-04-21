
import React from "react";
import ProductCard, { ProductProps } from "./ProductCard";
import { Button } from "@/components/ui/button";

interface ProductSectionProps {
  title: string;
  subtitle: string;
  products: ProductProps[];
  showMoreLink: string;
}

const ProductSection = ({ title, subtitle, products, showMoreLink }: ProductSectionProps) => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display text-purple-700 mb-2">{title}</h2>
          <p className="text-purple-600 opacity-80">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <a href={showMoreLink}>See More Kawaii Treats</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
