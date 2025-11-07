import powderedDonuts from "@/assets/powdered-donuts.jpg";
import donutSugar from "@/assets/milky-donut-sugar.jpeg";
import nutellaDonuts from "@/assets/nutella-donuts.jpg";
import creamedFilled from "@/assets/Whipped Cream-Filled Doughnuts _ RICARDO.jpeg"
import oreoFilledDonut from "@/assets/oreo-filled-donut.jpg";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Features = () => {
  // Refs for intersection observer
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  // Animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section id="features" className="py-12 sm:py-16 md:py-20 px-4 bg-background" ref={sectionRef}>
      <motion.div 
        className="container max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Feature 1 with Image */}
          <motion.div 
            className="lg:col-span-2 flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 items-center"
            variants={itemVariants}
          >
            <div className="w-full lg:w-1/2 aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-muted/30">
              <img 
                src={powderedDonuts} 
                alt="Soft powdered donuts with vanilla cream filling" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-3 px-2 lg:px-0">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Melt-in-your-mouth.
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Fluffy, fresh, and filled with love, our milky donuts are soft, airy, and packed with a light chantilly-based cream that is perfectly sweet and irresistibly smooth.
              </p>
            </div>
          </motion.div>

          {/* Feature 2 with Image - Full Width */}
          <motion.div 
            className="lg:col-span-2 flex flex-col lg:flex-row-reverse gap-6 sm:gap-8 lg:gap-10 items-center"
            variants={itemVariants}
          >
            <div className="w-full lg:w-1/2 aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-muted/30">
              <img 
                src={creamedFilled} 
                alt="Donuts filled with rich chocolate and Nutella cream" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-3 px-2 lg:px-0">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Hand-filled joy.
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Each donut is filled by hand with rich vanilla, chocolate, or seasonal cream.
              </p>
            </div>
          </motion.div>

          {/* Feature 3 with Image - Full Width */}
          <motion.div 
            className="lg:col-span-2 flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 items-center"
            variants={itemVariants}
          >
            <div className="w-full lg:w-1/2 aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-muted/30">
              <img 
                src={donutSugar} 
                alt="Fresh donut filled with cookies and cream" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-3 px-2 lg:px-0">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Made fresh daily.
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Each bite is pure comfort and a real temptation to make your Saturday extra special.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Features;
