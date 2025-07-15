
import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export interface ProductProps {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  category: string;
  description: string;
}

const ProductCard = ({
  product,
  onClick,
}: {
  product: ProductProps;
  onClick?: () => void;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Card
      className={`overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-200 kawaii-card ${onClick ? "hover:shadow-2xl" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onClick) onClick();
      }}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.imageSrc}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <span className="inline-block px-3 py-1 bg-kawaii-purple text-white text-xs font-bold rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{product.name}</CardTitle>
      </CardHeader>

      <CardContent className="pb-2">
        <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-bold text-purple-700">
          ${product.price.toFixed(2)}
        </span>
        <Button
          variant="secondary"
          size="icon"
          className={`${isHovered ? "animate-bounce" : ""} rounded-full w-10 h-10 bg-kawaii-pink text-pink-700 hover:bg-pink-300 shadow-sm hover:shadow-md transform hover:scale-110`}
          tabIndex={-1}
        >
          <Heart className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
