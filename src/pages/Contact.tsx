import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from "lucide-react";
import axios from "axios";
import { Seo } from "@/components/seo";
const apiUrl = import.meta.env.VITE_CONTACT_URL;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      const message = response.data.message;

      toast({
        title: "Message sent!",
        description: message,
        variant: "default",
      });

      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "princekrdss2018@gmail.com",
      href: "mailto:princekrdss2018@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7369900185",
      href: "tel:+917369900185",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "New Delhi, India",
      href: "#",
    },
  ];

  return (
    <>
      <Seo
        title="Contact | Prince Kumar Sahni - Software Engineer"
        description="Learn more about Prince Kumar Sahni, a passionate Software Engineer dedicated to building scalable, secure, and high-performing applications."
        url="https://princesahni.com/about"
        image="https://princesahni.com/og-images/princesahni-logo.png"
      />

      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Have a question or want to connect? Feel free to reach out — I'd
              love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-soft animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Send a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and I'll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Your phone"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="What's this about?"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Write your message here..."
                        className="min-h-[120px] resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full group"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Details */}
              <Card className="shadow-soft animate-fade-in-up">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    You can also reach me directly through any of these
                    channels.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <a
                        key={index}
                        href={info.href}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                      >
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{info.label}</p>
                          <p className="text-muted-foreground text-sm">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Dev Quotes */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="h-5 w-5 text-primary" />
                    Dev Vibes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <p className="italic text-muted-foreground border-l-2 border-primary pl-3">
                      "First, solve the problem. Then, write the code."
                    </p>
                    <p className="italic text-muted-foreground border-l-2 border-primary pl-3">
                      "Code is like humor. When you have to explain it, it's
                      bad."
                    </p>
                    <p className="italic text-muted-foreground border-l-2 border-primary pl-3">
                      "It's not a bug — it's an undocumented feature."
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Availability */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Let's Connect</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium">
                      Open to opportunities
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I'm always excited to contribute to open-source projects,
                    participate in hackathons, and share knowledge on tech
                    topics. Let's connect and build something awesome!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">
                        What technologies do you work with?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        I primarily work with React, Node.js, TypeScript,
                        Next.js, and MongoDB. I'm always exploring new tools and
                        frameworks to stay up to date.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        How many years of experience do you have?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        I have hands-on experience building full-stack web
                        applications and have been actively developing and
                        learning in the field for several years.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">
                        Do you contribute to open source?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Yes! I enjoy contributing to open-source projects and
                        sharing my work on GitHub. Feel free to check out my
                        repositories.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Are you open to collaborations?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Absolutely! I'm always open to collaborating on
                        interesting open-source projects, hackathons, or any fun dev ideas.
                        Just drop me a message!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
