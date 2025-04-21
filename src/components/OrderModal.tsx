
import React from "react";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, Heart } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    name: string;
    image: string;
    price: number;
    description: string;
  } | null;
  onAddToCart: (quantity: number) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, item, onAddToCart }) => {
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    if (isOpen) setQuantity(1);
  }, [isOpen, item]);

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent
        className="rounded-3xl p-0 max-w-md shadow-2xl border-2 border-kawaii-purple/20 bg-white/90 relative kawaii-modal animate-fade-in"
        style={{
          overflow: "visible",
          zIndex: 9999, // always on top
        }}
      >
        <DialogTitle className="sr-only">{item.name}</DialogTitle>
        {/* Only one visible top-right close button */}
        <DialogClose asChild>
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 bg-white rounded-full p-1 shadow hover:bg-pink-100 transition-colors z-50"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-kawaii-purple" />
          </button>
        </DialogClose>
        <div className="flex flex-col items-center py-8 px-6">
          <img
            src={item.image}
            alt={item.name}
            className="w-32 h-32 rounded-2xl border-4 border-kawaii-pink shadow mb-4 object-cover"
            style={{ boxShadow: "0 0 24px #ffdee2aa" }}
          />
          <h2 className="text-xl font-bold text-purple-700 mb-1">{item.name}</h2>
          <p className="text-muted-foreground mb-3 text-sm text-center">{item.description}</p>
          <div className="text-pink-600 font-bold text-lg mb-6">${item.price.toFixed(2)}</div>
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full w-9 h-9 bg-pink-200 text-pink-700 hover:bg-pink-300"
              onClick={() => setQuantity(q => Math.max(q - 1, 1))}
            >
              <Minus />
            </Button>
            <div className="text-xl font-bold text-purple-700 w-6 text-center">{quantity}</div>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full w-9 h-9 bg-pink-200 text-pink-700 hover:bg-pink-300"
              onClick={() => setQuantity(q => q + 1)}
            >
              <Plus />
            </Button>
          </div>
          <Button
            variant="secondary"
            className="rounded-full px-6 py-3 flex gap-2 bg-kawaii-pink text-pink-700 hover:bg-pink-200 text-lg font-bold shadow-lg transition-transform hover:scale-105"
            onClick={() => {
              onAddToCart(quantity);
              onClose();
            }}
          >
            <Heart className="w-5 h-5" />
            Add to Cart
          </Button>
        </div>
        {/* Cute floating popcorn/hearts */}
        <div className="absolute -top-6 left-12 animate-bounce z-10">
          <img src="https://pngimg.com/d/popcorn_PNG36.png" alt="" className="w-10 h-10 opacity-70" />
        </div>
        <div className="absolute -top-8 right-14 animate-pulse z-10">
          <Heart className="text-pink-300 w-6 h-6" fill="#ffdee2" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
