import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import NeonButton from "../ui/NeonButton";
import { contactInfo, devQuotes, personalInfo } from "@/data/portfolioData";
import { Send, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const apiUrl = import.meta.env.VITE_CONTACT_URL;

const iconMap: Record<string, any> = { Mail, Phone, MapPin };

const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(apiUrl, formData);
      toast({
        title: "Message sent!",
        description: response.data.message || "I'll get back to you soon.",
        variant: "default",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setIsSent(true);
      setTimeout(() => setIsSent(false), 3000);
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-lg
    bg-card/30 border border-border
    text-foreground placeholder-foreground/30
    focus:outline-none focus:border-primary/40 focus:shadow-[0_0_20px_rgba(99,102,241,0.1)]
    transition-all duration-300
    font-sans text-sm
  `;

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      className="relative py-24 px-6 bg-transparent"
    >
      <div className="absolute inset-0 bg-radial-glow opacity-30" />
      <div className="relative container mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm tracking-[0.2em] uppercase mb-3">
            // establish link
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Mission <span className="text-gradient">Control</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Ready to start a project or connect? Send a transmission to my coordinates.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Send a Transmission</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-foreground/50 text-xs font-mono mb-1 block">Name *</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="text-foreground/50 text-xs font-mono mb-1 block">Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className={inputClasses}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-foreground/50 text-xs font-mono mb-1 block">Phone</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="text-foreground/50 text-xs font-mono mb-1 block">Subject *</label>
                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className="text-foreground/50 text-xs font-mono mb-1 block">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Write your message here..."
                    rows={4}
                    className={`${inputClasses} resize-none`}
                  />
                </div>
                <NeonButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Transmitting..."
                  ) : isSent ? (
                    "✓ Transmission Success!"
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Transmission
                    </>
                  )}
                </NeonButton>
              </form>
            </GlassCard>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Contact Info */}
            <GlassCard className="p-6">
              <h4 className="text-foreground font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                {contactInfo.map((info, i) => {
                  const Icon = iconMap[info.icon] || Mail;
                  return (
                    <a
                      key={i}
                      href={info.href}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground/50">{info.label}</p>
                        <p className="text-sm text-foreground/75">{info.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </GlassCard>

            {/* Dev Quotes */}
            <GlassCard className="p-6">
              <h4 className="text-foreground font-semibold mb-4">Dev Vibes ✨</h4>
              <div className="space-y-3">
                {devQuotes.map((quote, i) => (
                  <p
                    key={i}
                    className="text-muted-foreground/50 text-sm italic border-l-2 border-primary/30 pl-3"
                  >
                    "{quote}"
                  </p>
                ))}
              </div>
            </GlassCard>

            {/* Availability */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-foreground">Open to opportunities</span>
              </div>
              <p className="text-muted-foreground/60 text-sm leading-relaxed">
                I'm always excited to contribute to open-source projects, participate in hackathons,
                and share knowledge on tech topics.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
