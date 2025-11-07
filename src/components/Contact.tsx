import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import donut from "@/assets/donut.svg";
import heart from "@/assets/heart.svg";
import whatsapp from "@/assets/whatsapp.svg";
import instagram from "@/assets/instagram.svg";
import pin from "@/assets/pin.svg";
import creditCard from "@/assets/credit-card.svg";
import lock from "@/assets/lock.svg";
import heartStar from "@/assets/heart_star.svg";

const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 bg-card" ref={sectionRef}>
      <div className="container max-w-4xl">
        <motion.div 
          className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Get in Touch</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            We'd love to hear from you! 
            <img src={heart} alt="Heart" className="h-5 w-5 inline-block align-middle -translate-y-[2px] ml-2" />
          </p>
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <Card className="border-2 hover-lift hover:border-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <img src={whatsapp} alt="WhatsApp icon" className="h-5 w-5 inline-block align-middle" />
                WhatsApp
              </CardTitle>
              <CardDescription>Quick response for orders & questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => window.open("http://wa.me/233556033174", "_blank")}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full"
                size="lg"
              >
                Chat with Us
              </Button>
            </CardContent>
          </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-2 hover-lift hover:border-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <img src={instagram} alt="Instgram icon" className="h-5 w-5 inline-block align-middle" />
                Instagram
              </CardTitle>
              <CardDescription>Follow us for daily sweetness</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => window.open("https://www.instagram.com/sweet_temptation_pastries?igsh=eDhvMDFydTlteWVi&utm_source=qr", "_blank")}
                variant="outline"
                className="w-full rounded-full border-2"
                size="lg"
              >
                @sweettemptation
              </Button>
            </CardContent>
          </Card>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="border-2 border-secondary bg-primary/20">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center">
                <img src={pin} alt="Pin Point" className="h-5 w-5 inline-block align-middle -translate-y-[2px] mr-2" />
                 Delivery Area</h3>
              <p className="text-center text-muted-foreground">
                We currently deliver to all areas within Accra
              </p>
              
              <div className="bg-card p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">
                  <img src={creditCard} alt="Credit Card" className="h-5 w-5 inline-block align-middle -translate-y-[2px] mr-2" />
                   Payment Methods</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Mobile Money (MTN, AirtelTigo, Vodafone Cash)</li>
                </ul>
                <p className="text-xs text-muted-foreground pt-2">
                  After checkout via this platform, you'll receive our MoMo number to confirm your order.
                </p>
              </div>

              <div className="bg-card p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">
                  <img src={lock} alt="Padlock" className="h-5 w-5 inline-block align-middle -translate-y-[2px] mr-2" />
                   Our Promise</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Refunds available for unfulfilled preorders only</li>
                  <li>✓ Fresh batches baked with strict hygiene standards</li>
                  <li>✓ Made with love and care, every single time</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
