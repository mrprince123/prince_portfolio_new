import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CustomCursor from "../ui/CustomCursor";
import Background3D from "../3d/Background3D";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Smooth scroll with native CSS
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative transition-colors duration-300">
      <CustomCursor />
      
      {/* Interactive 3D Background */}
      <Background3D />
      
      {/* Main content elements positioned relatively above the 3D background */}
      <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
        <div className="pointer-events-auto">
          <Header />
        </div>
        <main className={`flex-1 pointer-events-auto ${isHome ? "" : "pt-24"}`}>
          {children}
        </main>
        <div className="pointer-events-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
