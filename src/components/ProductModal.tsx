
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductProps } from "./ProductCard";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product: ProductProps | null;
  quantity: number;
  setQuantity: (num: number) => void;
  onAddToCart: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onClose,
  product,
  quantity,
  setQuantity,
  onAddToCart
}) => {
  if (!product) return null;

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <Dialog open={open} onOpenChange={val => !val && onClose()}>
      <DialogContent
        className="max-w-md w-full rounded-3xl p-6 bg-white animate-fade-in border-2 border-kawaii-gold shadow-2xl flex flex-col items-center relative z-[100]"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "fixed"
        }}
      >
        {/* Single, cute close button */}
        <button
          className="absolute right-4 top-4 p-1.5 rounded-full bg-kawaii-lilac hover:bg-kawaii-pink text-purple-800"
          onClick={onClose}
          aria-label="Close"
          style={{ zIndex: 2 }}
        >
          <X className="w-6 h-6" />
        </button>
        <img
          src={product.imageSrc}
          alt={product.name}
          className="w-40 h-40 object-cover rounded-xl shadow mb-4 border-2 border-kawaii-purple"
        />
        <h2 className="text-2xl font-bold text-purple-700 mb-1 text-center">{product.name}</h2>
        <div className="text-pink-700 font-semibold mb-2">${product.price.toFixed(2)}</div>
        <div className="mb-4 text-center text-sm text-muted-foreground">{product.description}</div>
        <div className="flex items-center justify-center gap-3 mb-6">
          <Button
            variant="secondary"
            size="icon"
            aria-label="Decrease quantity"
            onClick={() => handleQuantityChange(-1)}
          >-</Button>
          <input
            type="number"
            readOnly
            value={quantity}
            className="w-12 text-center border border-kawaii-purple rounded-md font-bold py-1 bg-kawaii-cream text-xl"
            style={{ outline: "none" }}
          />
          <Button
            variant="secondary"
            size="icon"
            aria-label="Increase quantity"
            onClick={() => handleQuantityChange(1)}
          >+</Button>
        </div>
        <Button
          variant="accent"
          size="lg"
          className="w-full font-bold text-lg"
          onClick={onAddToCart}
        >
          Add to Cart
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
