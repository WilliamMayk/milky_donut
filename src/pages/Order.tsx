import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import donut from "@/assets/donut.svg";
import heart from "@/assets/heart.svg";
import whatsapp from "@/assets/whatsapp.svg";
import instagram from "@/assets/instagram.svg";
import pin from "@/assets/pin.svg";
import creditCard from "@/assets/credit-card.svg";
import lock from "@/assets/lock.svg";
import heartStar from "@/assets/heart_star.svg";

interface OrderItem {
  id: string;
  name: string;
  flavor: string;
  price: number;
  quantity: number;
  emoji: string;
}

const availableItems: Omit<OrderItem, 'quantity'>[] = [
  { id: "vanilla-3", name: "Vanilla Cloud (3)", flavor: "Vanilla", price: 45, emoji: "☁️" },
  { id: "vanilla-6", name: "Vanilla Cloud (6)", flavor: "Vanilla", price: 85, emoji: "☁️" },
  { id: "chocolate-3", name: "Chocolate Kiss (3)", flavor: "Chocolate", price: 55, emoji: "🍫" },
  { id: "chocolate-6", name: "Chocolate Kiss (6)", flavor: "Chocolate", price: 100, emoji: "🍫" },
  { id: "oreo-3", name: "Oreo Magic (3)", flavor: "Oreo", price: 60, emoji: "🍪" },
  { id: "oreo-6", name: "Oreo Magic (6)", flavor: "Oreo", price: 110, emoji: "🍪" },
  { id: "mixed-3", name: "Sweet Rush (3)", flavor: "Mixed (3 Flavors)", price: 50, emoji: "🌈" },
  { id: "mixed-6", name: "Sweet Rush (6)", flavor: "Mixed (3 Flavors)", price: 100, emoji: "🌈" },
];

const Order = () => {
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState<Record<string, number>>({});
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation refs
  const confirmationRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const itemsRef = useRef(null);
  
  const isConfirmationInView = useInView(confirmationRef, { once: true, margin: "-100px" });
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });
  const isItemsInView = useInView(itemsRef, { once: true, margin: "-100px" });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setOrderItems(prev => {
      const newQty = (prev[itemId] || 0) + delta;
      if (newQty <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQty };
    });
  };

  const calculateTotal = () => {
    return Object.entries(orderItems).reduce((total, [itemId, qty]) => {
      const item = availableItems.find(i => i.id === itemId);
      return total + (item ? item.price * qty : 0);
    }, 0);
  };

  const generateOrderCode = () => {
    const timestamp = Date.now().toString(36).slice(-4).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `ST-${timestamp}-${random}`;
  };

  const handleSubmitOrder = async () => {
    if (Object.keys(orderItems).length === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item to order.",
        variant: "destructive",
      });
      return;
    }

    if (!customerName.trim() || !customerPhone.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide your name and phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const code = generateOrderCode();

    try {
      const orderDetails = {
        orderCode: code,
        customerName,
        customerPhone,
        items: Object.entries(orderItems).map(([itemId, quantity]) => {
          const item = availableItems.find(i => i.id === itemId);
          return {
            name: item?.name,
            flavor: item?.flavor,
            quantity,
            price: item?.price,
            totalPrice: (item?.price || 0) * quantity
          };
        }),
        totalAmount: calculateTotal()
      };

      const response = await fetch('https://formspree.io/f/mblpnwjd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      setOrderCode(code);
      toast({
        title: "Order Created! 🎉",
        description: `Your order reference is ${code}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your order. Please try again.",
        variant: "destructive",
      });
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = calculateTotal();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-6 sm:py-8 md:py-12 lg:py-20 px-4">
  <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div 
            ref={headerRef}
            className="text-center mb-6 sm:mb-8 md:mb-12 space-y-2 sm:space-y-3 md:space-y-4"
            initial="hidden"
            animate={isHeaderInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-2">Create Your Order</h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground px-4">
              Select your favorite donuts and we'll generate your order code 🍩
            </p>
          </motion.div>

          <motion.div
            ref={formRef}
            initial="hidden"
            animate={isFormInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
          <Card className="border-2 border-secondary mb-6 sm:mb-8 rounded-2xl overflow-hidden">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm sm:text-base">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm sm:text-base">WhatsApp Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="text-base"
                />
              </div>
            </CardContent>
          </Card>
          </motion.div>

          <motion.div 
            ref={itemsRef}
            className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8"
            initial="hidden"
            animate={isItemsInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {availableItems.map((item, index) => (
              <motion.div key={item.id} variants={fadeInUp}>
              <Card className="w-full border-2 rounded-2xl overflow-hidden bg-card hover:shadow-lg hover:-translate-y-1 transform transition-transform duration-200">
                <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 w-full">
                    <span className="text-2xl sm:text-3xl flex-shrink-0">{item.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-base sm:text-lg break-words">{item.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground break-words">{item.flavor}</p>
                      <p className="text-accent font-bold text-sm sm:text-base">GHC {item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 mt-3 sm:mt-0">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 p-2 sm:h-10 sm:w-10 active:scale-95 transition-transform"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={!orderItems[item.id]}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 sm:w-12 text-center font-semibold text-base sm:text-lg">
                      {orderItems[item.id] || 0}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 p-2 sm:h-10 sm:w-10 active:scale-95 transition-transform"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isItemsInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
          <Card className="border-2 border-accent sticky bottom-2 sm:bottom-4 shadow-lg bg-card rounded-2xl overflow-hidden">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 md:gap-4 mb-3 sm:mb-4">
                <span className="text-base sm:text-lg md:text-xl font-semibold">Total Amount</span>
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-accent">GHC {total}</span>
              </div>
              <Button 
                onClick={handleSubmitOrder}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full text-sm sm:text-base active:scale-95 transform transition-all"
                size="lg"
                disabled={Object.keys(orderItems).length === 0 || isSubmitting}
              >
                <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                {isSubmitting ? 'Submitting...' : 'Generate Order Code'}
              </Button>
              <p className="text-xs sm:text-sm text-center text-muted-foreground mt-2 sm:mt-3">
                <span className="hidden sm:inline">📦 Orders close Friday 6PM • Saturday deliveries only</span>
                <span className="sm:hidden">📦 Friday 6PM • Sat delivery</span>
              </p>
            </CardContent>
          </Card>
          </motion.div>
        </div>
      </main>
      <Footer />

      {/* Order Confirmation Dialog */}
      <Dialog open={!!orderCode} onOpenChange={(open) => !open && setOrderCode(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="text-center space-y-2 sm:space-y-3 pb-3 sm:pb-4">
            <div className="text-4xl sm:text-5xl">🎉</div>
            <DialogTitle className="text-xl sm:text-2xl md:text-3xl">Order Confirmed!</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-accent/10 border-2 border-accent rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center space-y-1 sm:space-y-2">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Your Order Reference</p>
              <p className="text-lg sm:text-2xl md:text-3xl font-bold text-accent font-mono break-all">{orderCode}</p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-base sm:text-lg">Order Summary</h3>
              {Object.entries(orderItems).map(([itemId, qty]) => {
                const item = availableItems.find(i => i.id === itemId);
                if (!item) return null;
                return (
                  <div key={itemId} className="flex justify-between items-center py-2 border-b gap-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="text-lg sm:text-xl flex-shrink-0">{item.emoji}</span>
                      <span className="text-sm sm:text-base truncate">{item.name}</span>
                      <span className="text-muted-foreground text-sm sm:text-base flex-shrink-0">× {qty}</span>
                    </div>
                    <span className="font-semibold text-sm sm:text-base flex-shrink-0">GHC {item.price * qty}</span>
                  </div>
                );
              })}
              <div className="flex justify-between items-center pt-3 sm:pt-4 text-lg sm:text-xl font-bold">
                <span>Total Amount</span>
                <span className="text-accent">GHC {total}</span>
              </div>
            </div>

            <div className="bg-muted/50 border-2 border-secondary rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-base sm:text-lg">Payment Instructions</h3>
              <ol className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li className="flex gap-2 sm:gap-3">
                  <span className="font-bold text-accent flex-shrink-0">1.</span>
                  <span>Make a Mobile Money payment of <strong>GHC {total}</strong> to this number: 055 603 3174 (William Josue Okwale)</span>
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <span className="font-bold text-accent flex-shrink-0">2.</span>
                  <span>Use <strong className="font-mono text-xs sm:text-sm break-all">{orderCode}</strong> as your payment reference</span>
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <span className="font-bold text-accent flex-shrink-0">3.</span>
                  <span>You'll receive a confirmation message once payment is verified</span>
                </li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
              <Button 
                onClick={() => navigate("/")}
                variant="outline"
                className="flex-1 text-sm sm:text-base"
                size="lg"
              >
                Back to Home
              </Button>
              <Button 
                onClick={() => {
                  setOrderCode(null);
                  setOrderItems({});
                  setCustomerName("");
                  setCustomerPhone("");
                }}
                className="flex-1 bg-accent hover:bg-accent/90 text-sm sm:text-base"
                size="lg"
              >
                Order Another One
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Order;
