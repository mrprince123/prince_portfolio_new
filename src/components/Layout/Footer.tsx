import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  Twitter,
} from "lucide-react";
import princelogo from "@/assets/princesahni-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/mrprince123",
      color: "hover:text-gray-600",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/mrprince123/",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/_mrprince123_/",
      color: "hover:text-pink-600",
    },
    {
      name: "Medium",
      icon: MessageCircle,
      href: "https://medium.com/@mrprince123",
      color: "hover:text-green-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/MrPrince185",
      color: "hover:text-blue-400",
    },
  ];

  const footerLinks = [
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Courses", href: "/courses" },
    { name: "Contact", href: "/contact" },
    { name: "Resume", href: "/resume" },
    { name: "Articles", href: "/articles" },
  ];

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src={princelogo}
                alt="Prince Kumar Sahni Logo"
                className="w-10 h-10 rounded-lg object-cover border-2 border-primary"
              />
              <span className="font-bold text-lg">Prince Kumar Sahni</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Crafting seamless, secure, and scalable web experiences that users
              love. Building the future, one line of code at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">
              Connect With Me
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    target="_blank"
                    key={social.name}
                    href={social.href}
                    className={`p-2 rounded-lg bg-muted text-muted-foreground transition-colors ${social.color} hover:bg-accent`}
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Feel free to reach out for collaborations or just a friendly chat!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with ❤️ using Prince Imignation
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
