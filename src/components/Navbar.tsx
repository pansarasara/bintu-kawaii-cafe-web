
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBasket, Coffee, Utensils, Film, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import bintuLogo from "/lovable-uploads/8889ca95-1374-4feb-aab0-fe4834275956.png";

const PopcornParticle = ({ index }: { index: number }) => {
  const randomDelay = `${Math.random() * 3}s`;
  const randomLeft = `${Math.random() * 50 + 25}px`;

  return (
    <div
      className="popcorn"
      style={{
        left: randomLeft,
        animationDelay: randomDelay,
        top: `${5 + index * 2}px`
      }}
    />
  );
};

const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const NavLink = ({
  to,
  icon: Icon,
  children,
  scrollTarget,
}: {
  to?: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  scrollTarget?: string;
}) => {
  return scrollTarget ? (
    <button
      onClick={() => scrollToSection(scrollTarget)}
      className="relative group flex items-center gap-1.5 text-purple-700 font-semibold hover:text-purple-500 transition-colors duration-200 bg-transparent border-none p-0 m-0"
      style={{ background: "none", outline: "none" }}
      type="button"
    >
      {Icon && <Icon size={18} />}
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-kawaii-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </button>
  ) : (
    <Link
      to={to || "#"}
      className="relative group flex items-center gap-1.5 text-purple-700 font-semibold hover:text-purple-500 transition-colors duration-200"
    >
      {Icon && <Icon size={18} />}
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-kawaii-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </Link>
  );
};

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-md border-b border-kawaii-purple/30 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="relative mr-6">
              <img src={bintuLogo} alt="Bintu" className="w-16 h-16 animate-float" />
              {[...Array(5)].map((_, i) => (
                <PopcornParticle key={i} index={i} />
              ))}
            </Link>
            {!isMobile && (
              <div className="hidden md:flex items-center space-x-6">
                <NavLink to="/" icon={Heart}>Home</NavLink>
                <NavLink icon={Coffee} scrollTarget="drinks-section">Order Drinks</NavLink>
                <NavLink icon={Utensils} scrollTarget="food-section">Order Food</NavLink>
                <NavLink to="/cinema" icon={Film}>Buy Movie Tickets</NavLink>
                <NavLink to="/about" icon={Info}>About</NavLink>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Button variant="secondary" size="icon" className="relative rounded-full w-10 h-10 bg-kawaii-pink text-pink-700 hover:bg-pink-300 shadow-sm hover:shadow-md transform hover:scale-110">
              <ShoppingBasket className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-kawaii-pink flex items-center justify-center text-xs font-bold">
                0
              </span>
            </Button>
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </Button>
            )}
          </div>
        </nav>
        {isMobile && isMenuOpen && (
          <div className="md:hidden py-4 border-t border-kawaii-purple/30 mt-4 flex flex-col space-y-4">
            <NavLink to="/" icon={Heart}>Home</NavLink>
            <NavLink icon={Coffee} scrollTarget="drinks-section">Order Drinks</NavLink>
            <NavLink icon={Utensils} scrollTarget="food-section">Order Food</NavLink>
            <NavLink to="/cinema" icon={Film}>Buy Movie Tickets</NavLink>
            <NavLink to="/about" icon={Info}>About</NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
