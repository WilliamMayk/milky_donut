import { Heart } from "lucide-react";
import heartStar from "@/assets/heart_star.svg";

const Footer = () => {
  return (
    <footer className="bg-foreground/5 border-t py-8 px-4">
      <div className="container">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <img src={heartStar} alt="Heart icon" className="h-5 w-5 inline-block align-middle -translate-y-[2px]" />
            <span>by Sweet Temptation</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sweet Temptation. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Fresh donuts • Accra, Ghana • Saturday Deliveries
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;