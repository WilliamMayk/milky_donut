import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/sweet-temptation-logo.jpg";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import donut from "@/assets/donut.svg";
import heart from "@/assets/heart.svg";
import whatsapp from "@/assets/whatsapp.svg";
import instagram from "@/assets/instagram.svg";
import pin from "@/assets/pin.svg";
import creditCard from "@/assets/credit-card.svg";
import lock from "@/assets/lock.svg";
import heartStar from "@/assets/heart_star.svg";

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    e.preventDefault();
    
    const isHomePage = location.pathname === "/";
    if (!isHomePage) {
      // If not on home page, navigate there first
      navigate("/");
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        const element = document.querySelector(to);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // If already on home page, just scroll
      const element = document.querySelector(to);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navLinks = [
    { to: "#products", label: "Home" },
    { to: "#features", label: "About" },
    { to: "#contact", label: "Contact" },
  ];

  return (
    <>
      <div className="bg-accent text-accent-foreground text-center py-2 px-4 text-xs sm:text-sm font-medium">
        <span className="hidden sm:inline">Orders close every Friday 6PM • Saturday deliveries only 
              <img src={donut} alt="Donut icon" className="h-5 w-5 inline-block align-middle -translate-y-[2px] ml-2" />
        </span>
        <span className="sm:hidden">Friday 6PM • Saturday delivery 
              <img src={donut} alt="Donut icon" className="h-5 w-5 inline-block align-middle -translate-y-[2px] ml-2" />
        </span>
      </div>
      <header id="home" className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 sm:h-20 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img src={logo} alt="Sweet Temptation Logo" className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">Sweet Temptation</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Because your sweet tooth deserves it</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.to}
                href={link.to} 
                className="text-sm font-medium text-foreground hover:text-accent transition-colors"
                onClick={(e) => handleScroll(e, link.to)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <img src={logo} alt="Sweet Temptation" className="h-12 w-12 rounded-full object-cover" />
                    <span className="font-bold text-lg">Sweet Temptation</span>
                  </div>
                </div>
                
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.to}>
                      <a
                        href={link.to}
                        className="text-lg font-medium text-foreground hover:text-accent transition-colors py-3 px-4 rounded-lg hover:bg-accent/10"
                        onClick={(e) => {
                          handleScroll(e, link.to);
                          setOpen(false);
                        }}
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto pt-8 border-t">
                  <p className="text-sm text-muted-foreground text-center">
                    Made with 
                    <img src={heartStar} alt="Heart icon" className="h-5 w-5 inline-block align-middle" />
                     in Accra
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
};

export default Header;