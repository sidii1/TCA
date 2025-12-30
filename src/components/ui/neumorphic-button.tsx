import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface NeumorphicButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const NeumorphicButton = ({
  children,
  variant = "primary",
  size = "md",
  magnetic = true,
  className,
  onClick,
  type = "button",
  disabled = false,
}: NeumorphicButtonProps) => {
  const baseStyles = "relative font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary: cn(
      "bg-gradient-to-br from-primary to-accent text-primary-foreground",
      "shadow-neu-lg",
      "hover:shadow-neu-xl hover:shadow-glow-purple",
      "active:shadow-neu-inset",
      "focus-visible:outline-none focus-visible:shadow-glow-purple-lg",
      "rounded-3xl",
      "transition-all duration-400 ease-out"
    ),
    secondary: cn(
      "bg-gradient-to-br from-card to-secondary/40 text-foreground",
      "shadow-neu",
      "hover:shadow-neu-lg",
      "active:shadow-neu-inset",
      "focus-visible:outline-none focus-visible:shadow-glow-purple",
      "rounded-3xl",
      "transition-all duration-400 ease-out"
    ),
    ghost: cn(
      "bg-transparent text-foreground",
      "hover:bg-secondary/30 hover:shadow-neu-sm",
      "active:bg-secondary/50 active:shadow-neu-inset-sm",
      "rounded-2xl",
      "transition-all duration-300 ease-out"
    ),
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm rounded-2xl",
    md: "px-7 py-3.5 text-base rounded-3xl",
    lg: "px-10 py-4 text-lg rounded-3xl",
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={!disabled && magnetic ? { scale: 1.02, y: -2 } : undefined}
      whileTap={!disabled ? { scale: 0.98, y: 0 } : undefined}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17,
        duration: 0.3
      }}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center justify-center gap-2.5">
        {children}
      </span>
    </motion.button>
  );
};
