import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, MessageCircle, Twitter } from "lucide-react";
import princelogo from "@/assets/princesahni-logo.png";

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/mrprince123", color: "#ffffff" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/mrprince123/", color: "#0077B5" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/_mrprince123_/", color: "#E4405F" },
  { name: "Medium", icon: MessageCircle, href: "https://medium.com/@mrprince123", color: "#00ab6c" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/MrPrince185", color: "#1DA1F2" },
];

const footerLinks = [
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Courses", href: "/courses" },
  { name: "Resume", href: "/resume" },
  { name: "Articles", href: "/articles" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/40 bg-card/60 backdrop-blur-md">
      {/* Scan lines */}
      <div className="absolute inset-0 bg-scanlines opacity-30 pointer-events-none" />

      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-primary/20 rounded-lg blur" />
                <img
                  src={princelogo}
                  alt="Prince Kumar Sahni"
                  className="relative w-10 h-10 rounded-lg object-cover"
                />
              </div>
              <div>
                <span className="font-display font-bold text-foreground text-lg">
                  Prince Kumar Sahni
                </span>
                <p className="text-muted-foreground/50 text-xs font-mono">Software Engineer</p>
              </div>
            </div>
            <p className="text-muted-foreground/75 text-sm leading-relaxed max-w-xs">
              Crafting seamless, secure, and scalable web experiences. Building the future, one line of code at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary/60 mb-4">
              Navigation
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary/60 mb-4">
              Connect
            </h3>
            <div className="flex gap-3 mb-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-card/40 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
            <p className="text-muted-foreground/50 text-xs">
              Open to collaborations and tech discussions!
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mt-12 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-muted-foreground/50 text-xs font-mono">
            © {currentYear} Prince Kumar Sahni. All rights reserved.
          </p>
          <p className="text-muted-foreground/30 text-xs font-mono">
            Crafted with ❤️ & Three.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
