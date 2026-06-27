import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

const GlassCard = ({
  children,
  className = "",
  hover = true,
  glow = false,
  onClick,
}: GlassCardProps) => {
  return (
    <motion.div
      className={`
        relative rounded-xl overflow-hidden
        bg-card/60 dark:bg-white/[0.02] backdrop-blur-xl
        border border-border/60 dark:border-white/[0.06]
        ${glow ? "shadow-[0_0_30px_rgba(99,102,241,0.1)] dark:shadow-[0_0_30px_rgba(0,240,255,0.1)]" : ""}
        ${hover ? "hover:border-primary/30 dark:hover:border-primary/20 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)] dark:hover:shadow-[0_0_40px_rgba(0,240,255,0.1)]" : ""}
        transition-all duration-500
        ${className}
      `}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlassCard;
