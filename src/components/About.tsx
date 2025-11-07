import { Heart, Leaf, Sparkles } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-background to-primary/30">
      <div className="container max-w-4xl">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">A Little Bit of Sweetness in Every Bite</h2>
        </div>

        <div className="prose prose-lg mx-auto text-center mb-12">
          <p className="text-xl text-muted-foreground leading-relaxed">
            Sweet Temptation was born from a dream to bring comfort and joy through pastries made with love. 
            Each donut is a little piece of happiness — soft, milky, and made fresh to order.
          </p>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-8">Made for You, With Love ❤️</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center space-y-4 p-6 bg-card rounded-2xl border-2 border-secondary hover-lift">
            <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-accent" />
            </div>
            <h4 className="text-xl font-semibold">Fresh Ingredients</h4>
            <p className="text-muted-foreground">
              We use only the finest, freshest ingredients in every batch
            </p>
          </div>

          <div className="text-center space-y-4 p-6 bg-card rounded-2xl border-2 border-secondary hover-lift">
            <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
              <Leaf className="h-8 w-8 text-accent" />
            </div>
            <h4 className="text-xl font-semibold">Eco-Friendly Packaging</h4>
            <p className="text-muted-foreground">
              Sustainably packaged with care for our planet
            </p>
          </div>

          <div className="text-center space-y-4 p-6 bg-card rounded-2xl border-2 border-secondary hover-lift">
            <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
              <Heart className="h-8 w-8 text-accent" />
            </div>
            <h4 className="text-xl font-semibold">Happiness Guaranteed</h4>
            <p className="text-muted-foreground">
              Made to bring a smile to your face with every bite
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl font-medium text-accent">
            Every donut is made to make your day a little brighter ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;