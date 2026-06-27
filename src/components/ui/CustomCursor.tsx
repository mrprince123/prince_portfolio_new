import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Track hover states on interactive elements
    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Add hover listeners to all interactive elements
    const addHoverListeners = () => {
      const elements = document.querySelectorAll("a, button, [role='button'], input, textarea, select, .cursor-pointer");
      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("resize", checkMobile);
      observer.disconnect();
    };
  }, []);

  if (isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor dot */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
            animate={{
              x: mousePosition.x - 4,
              y: mousePosition.y - 4,
              scale: isHovering ? 0 : 1,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
          >
            <div className="w-2 h-2 bg-[#00f0ff] rounded-full" />
          </motion.div>

          {/* Outer ring */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            animate={{
              x: mousePosition.x - (isHovering ? 24 : 16),
              y: mousePosition.y - (isHovering ? 24 : 16),
              width: isHovering ? 48 : 32,
              height: isHovering ? 48 : 32,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.2 }}
          >
            <div
              className={`w-full h-full rounded-full border transition-colors duration-200 ${
                isHovering
                  ? "border-[#00f0ff]/60 bg-[#00f0ff]/5"
                  : "border-[#00f0ff]/20"
              }`}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomCursor;
