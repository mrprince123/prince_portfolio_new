import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    // Safety timeout — max 3 seconds
    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 400);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Animated geometry */}
          <motion.div
            className="mb-12 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-16 h-16 border border-[#00f0ff]/30 rounded-lg rotate-45" />
            <motion.div
              className="absolute inset-2 border border-[#00f0ff]/60 rounded-md rotate-0"
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-[#00f0ff] font-mono text-sm tracking-[0.3em] uppercase mb-2">
              Initializing
            </p>
            <p className="text-white/40 font-mono text-xs">
              Loading 3D Environment...
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00f0ff] to-[#0066ff] rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Percentage */}
          <p className="mt-3 text-white/30 font-mono text-xs">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
