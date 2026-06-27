import { ReactNode } from "react";
import { motion } from "framer-motion";

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  target?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

const NeonButton = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  href,
  target,
  disabled = false,
  type = "button",
}: NeonButtonProps) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-[#00f0ff] to-[#0066ff]
      text-[#050505] font-semibold
      shadow-[0_0_20px_rgba(0,240,255,0.3)]
      hover:shadow-[0_0_40px_rgba(0,240,255,0.5)]
    `,
    outline: `
      bg-transparent
      border border-[rgba(0,240,255,0.3)]
      text-[#00f0ff]
      hover:bg-[rgba(0,240,255,0.05)]
      hover:border-[rgba(0,240,255,0.6)]
      hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]
    `,
    ghost: `
      bg-transparent
      text-[#e0e0e0]
      hover:bg-white/[0.05]
      hover:text-[#00f0ff]
    `,
  };

  const baseClasses = `
    relative inline-flex items-center justify-center
    rounded-lg font-medium
    transition-all duration-300 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed
    overflow-hidden group
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  const content = (
    <>
      {/* Animated beam effect */}
      {variant === "primary" && (
        <span className="absolute inset-0 overflow-hidden rounded-lg">
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </span>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={baseClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
};

export default NeonButton;
