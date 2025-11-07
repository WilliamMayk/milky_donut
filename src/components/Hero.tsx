import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/milky-donut.jpg";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import donut from "@/assets/donut.svg";
import heart from "@/assets/heart.svg";
import whatsapp from "@/assets/whatsapp.svg";
import instagram from "@/assets/instagram.svg";
import pin from "@/assets/pin.svg";
import creditCard from "@/assets/credit-card.svg";
import lock from "@/assets/lock.svg";
import heartStar from "@/assets/heart_star.svg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          animation: "subtle-zoom 8s ease-in-out infinite",
          backgroundPosition: "center center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/70 to-background/40" />
      </div>
      
      <div className="container relative z-10 flex flex-col items-center justify-center min-h-[500px] sm:min-h-[600px] md:min-h-[700px] text-center px-4 sm:px-6">
        <motion.div 
          className="max-w-3xl space-y-4 sm:space-y-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Indulge in our soft milky donuts
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Made with love, filled with happiness
          </motion.p>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Because your sweet tooth deserves it 
            <img src={heart} alt="Heart" className="h-5 w-5 inline-block align-middle -translate-y-[2px] ml-2" />
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Button 
              size="lg" 
              onClick={() => navigate("/order")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
            >
              Preorder Now
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes subtle-zoom {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
