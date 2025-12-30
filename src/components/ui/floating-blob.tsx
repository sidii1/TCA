import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingBlobProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "accent" | "mixed";
  delay?: number;
}

export const FloatingBlob = ({
  className,
  size = "md",
  color = "primary",
  delay = 0,
}: FloatingBlobProps) => {
  const sizes = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
    xl: "w-[500px] h-[500px]",
  };

  const colors = {
    primary: "bg-gradient-to-br from-primary/12 to-primary/8",
    accent: "bg-gradient-to-br from-accent/12 to-accent/8",
    mixed: "bg-gradient-to-br from-primary/15 to-accent/10",
  };

  return (
    <motion.div
      className={cn(
        "absolute rounded-full blur-3xl pointer-events-none",
        "animate-float-slow animate-pulse-glow",
        sizes[size],
        colors[color],
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
    />
  );
};
