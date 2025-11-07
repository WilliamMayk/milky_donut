import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import vanillaImage from "@/assets/vanilla-donut.jpg";
import chocolateImage from "@/assets/chocolate-donut.jpg";
import oreoImage from "@/assets/oreo-donut.jpg";
import mixedImage from "@/assets/mixed-donuts.jpg";
import { ShoppingCart } from "lucide-react";
import donut from "@/assets/donut.svg";
import heart from "@/assets/heart.svg";
import whatsapp from "@/assets/whatsapp.svg";
import instagram from "@/assets/instagram.svg";
import pin from "@/assets/pin.svg";
import creditCard from "@/assets/credit-card.svg";
import lock from "@/assets/lock.svg";
import heartStar from "@/assets/heart_star.svg";

interface Product {
  id: string;
  name: string;
  flavor: string;
  price: number;
  quantity: string;
  description: string;
  image: string;
  emoji: string;
}

const products: Product[] = [
  {
    id: "vanilla-3",
    name: "Vanilla Cloud",
    flavor: "Vanilla",
    price: 45,
    quantity: "3 Donuts",
    description: "Soft vanilla donuts with sweet cream filling",
    image: vanillaImage,
    emoji: "☁️",
  },
  {
    id: "vanilla-6",
    name: "Vanilla Cloud",
    flavor: "Vanilla",
    price: 85,
    quantity: "6 Donuts",
    description: "Soft vanilla donuts with sweet cream filling",
    image: vanillaImage,
    emoji: "☁️",
  },
  {
    id: "chocolate-3",
    name: "Chocolate Kiss",
    flavor: "Chocolate",
    price: 55,
    quantity: "3 Donuts",
    description: "Rich chocolate donuts with chocolate cream",
    image: chocolateImage,
    emoji: "🍫",
  },
  {
    id: "chocolate-6",
    name: "Chocolate Kiss",
    flavor: "Chocolate",
    price: 100,
    quantity: "6 Donuts",
    description: "Rich chocolate donuts with chocolate cream",
    image: chocolateImage,
    emoji: "🍫",
  },
  {
    id: "oreo-3",
    name: "Oreo Magic",
    flavor: "Oreo",
    price: 60,
    quantity: "3 Donuts",
    description: "Cookies and cream perfection in every bite",
    image: oreoImage,
    emoji: "🍪",
  },
  {
    id: "oreo-6",
    name: "Oreo Magic",
    flavor: "Oreo",
    price: 110,
    quantity: "6 Donuts",
    description: "Cookies and cream perfection in every bite",
    image: oreoImage,
    emoji: "🍪",
  },
  {
    id: "mixed-3",
    name: "Sweet Rush",
    flavor: "Mixed (3 Flavors)",
    price: 50,
    quantity: "3 Donuts",
    description: "Can't decide? Try all three flavors!",
    image: mixedImage,
    emoji: "🌈",
  },
  {
    id: "mixed-6",
    name: "Sweet Rush",
    flavor: "Mixed (3 Flavors)",
    price: 100,
    quantity: "6 Donuts",
    description: "Can't decide? Try all three flavors!",
    image: mixedImage,
    emoji: "🌈",
  },
];

const Products = () => {
  const navigate = useNavigate();

  return (
    <section id="products" className="py-20 px-4">
      <div className="container">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Our Delicious Donuts</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Freshly made just for you 🍓
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover-lift border-2 hover:border-secondary">
              <div className="aspect-square overflow-hidden bg-primary/20">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>{product.emoji}</span>
                  {product.name}
                </CardTitle>
                <CardDescription className="text-base">
                  {product.quantity} • {product.flavor}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <p className="text-3xl font-bold text-accent">GHC {product.price}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => navigate("/order")}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Preorder Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-card border-2 border-secondary rounded-2xl text-center space-y-2">
          <p className="text-lg font-semibold">📦 Delivery Information</p>
          <p className="text-muted-foreground">Preorders close Friday 6PM • Deliveries every Saturday • Accra only</p>
        </div>
      </div>
    </section>
  );
};

export default Products;