import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Click ''Pre-Order Now'', browse our menu and choose your favorite treats. Press the ''generate code'' button after choosing and make payment to our number using the code as ''reference''.",
  },
  {
    question: "How far in advance should I place my order?",
    answer: "We recommend placing your order at least 24-48 hours in advance so we can bake everything fresh and perfectly for you.",
  },
  {
    question: "Do you offer same-day orders?",
    answer: "For now, we focus on pre-orders to keep our desserts extra fresh. We might have a few sweet surprises ready to go.",
  },
  {
    question: "Where are you located?",
    answer: "We are located at Haatso, close to Grand Star Hotel.",
  },
  {
    question: "Do you offer delivery?",
    answer: "Yes! We currently offer delivery within Accra for an additional fee. We use Yango delivery or Bolt send service to ensure your order arrives on time.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We only accept payment through Momo.",
  },
  {
    question: "How do I know my order is confirmed?",
    answer: "Once you complete checkout, you'll receive a confirmation message via email or WhatsApp with your order details and pickup/delivery time.",
  },
];

const FAQ = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
        duration: 0.5,
      },
    },
  };

  return (
    <section id="faq" className="py-20 px-4 bg-muted/30" ref={sectionRef}>
      <div className="container max-w-3xl">
        <motion.div 
          className="text-center mb-12 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={itemVariants}>
              <AccordionItem 
                value={`item-${index}`}
                className="bg-card rounded-2xl px-6 border-2 border-border"
              >
              <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-accent hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
