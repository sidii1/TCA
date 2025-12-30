import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface NeumorphicCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  pressed?: boolean;
  delay?: number;
  onClick?: () => void;
}

export const NeumorphicCard = ({
  children,
  className,
  hover = true,
  pressed = false,
  delay = 0,
  onClick,
}: NeumorphicCardProps) => {
  return (
    <motion.div
      className={cn(
        "rounded-3xl p-6 transition-all duration-400 ease-out",
        pressed 
          ? "shadow-neu-inset bg-background" 
          : "shadow-neu-lg bg-gradient-to-br from-card to-secondary/20",
        hover && !pressed && "hover:shadow-neu-xl hover:-translate-y-1",
        className
      )}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};
