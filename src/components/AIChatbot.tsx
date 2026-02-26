import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { X, Send, Bot, User, Sparkles, ChevronDown } from "lucide-react";
import axios from "axios";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// API URLs from environment
const API_URLS = {
  skills: import.meta.env.VITE_SKILL_URL,
  projects: import.meta.env.VITE_PROJECT_URL,
  articles: import.meta.env.VITE_ARTICLE_URL,
  blogs: import.meta.env.VITE_BLOG_URL,
  courses: import.meta.env.VITE_COURSE_URL,
};

const BASE_PROMPT = `You are an AI assistant on Prince Kumar Sahni's personal portfolio website. Your job is to answer questions about Prince in a friendly, concise, and professional tone.

## Personal
- Full name: Prince Kumar Sahni
- Role: Software Engineer
- Based in: Noida, India
- Website: https://princesahni.com
- Passionate about: building scalable, secure, and high-performing web and mobile applications
- He is a Lifelong Learner, audiophile, photographer, and content creator
- His Google Maps Local Guide photos and reviews have crossed 600K+ views

## Professional Experience
1. Associate Software Developer at Chetu Inc. (2024 – Present), Noida, India
   - Leading development of scalable web applications using React, Node.js, and cloud technologies
2. Full-Stack Developer at Webbocket (2023 – 2024), Bhubaneswar, Odisha
   - Built and maintained multiple web applications, collaborated with cross-functional teams

## Education
- Bachelor of Science in Computer Science, Biju Patnaik University of Technology (2020–2024), GPA: 8.34/10.0

## Interests & Hobbies
Open Source Contributing, Technical Writing, AI/ML Research, Mobile App Development, Medium Articles, Local Guide at Google Maps, Photography, Audiophile, Cricket, Hiking, Chess

## Content & Social
- Writes tech articles on Medium
- Has a YouTube channel
- Passionate photographer

## Contact
- For professional inquiries, visitors can use the /contact page on the website

## Guidelines for your responses:
- Be friendly, helpful, and professional
- Keep answers concise (2–4 sentences) unless the question requires detail
- If asked something not related to Prince, politely say you're only here to answer questions about Prince
- Never make up information not provided to you
- Encourage visitors to explore the portfolio or get in touch
`;

// Build dynamic prompt sections from server data
function buildDynamicPrompt(serverData: {
  skills?: any[];
  projects?: any[];
  articles?: any[];
  blogs?: any[];
  courses?: any[];
}): string {
  let dynamicParts = "";

  // Skills
  if (serverData.skills && serverData.skills.length > 0) {
    dynamicParts += "\n## Technical Skills (from server)\n";
    serverData.skills.forEach((category) => {
      const skillNames = category.skillsList
        ?.map((s: any) => s.name)
        .join(", ");
      if (skillNames) {
        dynamicParts += `- ${category.name}: ${skillNames}\n`;
      }
    });
  }

  // Projects
  if (serverData.projects && serverData.projects.length > 0) {
    dynamicParts += `\n## Projects (${serverData.projects.length} total, from server)\n`;
    serverData.projects.forEach((project) => {
      const techs = project.technologies?.join(", ") || "";
      dynamicParts += `- ${project.title}: ${project.description || ""}`;
      if (techs) dynamicParts += ` [Tech: ${techs}]`;
      if (project.liveUrl && project.liveUrl !== "#")
        dynamicParts += ` [Live: ${project.liveUrl}]`;
      if (project.githubUrl && project.githubUrl !== "#")
        dynamicParts += ` [GitHub: ${project.githubUrl}]`;
      dynamicParts += "\n";
    });
  }

  // Articles
  if (serverData.articles && serverData.articles.length > 0) {
    dynamicParts += `\n## Published Articles (${serverData.articles.length} total, from server)\n`;
    serverData.articles.forEach((article) => {
      dynamicParts += `- "${article.title}"`;
      if (article.tags?.length)
        dynamicParts += ` [Tags: ${article.tags.join(", ")}]`;
      if (article.articleLink)
        dynamicParts += ` [Link: ${article.articleLink}]`;
      dynamicParts += "\n";
    });
  }

  // Blogs
  if (serverData.blogs && serverData.blogs.length > 0) {
    dynamicParts += `\n## Blog Posts (${serverData.blogs.length} total, from server)\n`;
    serverData.blogs.forEach((blog) => {
      dynamicParts += `- "${blog.title}"`;
      if (blog.tags?.length) dynamicParts += ` [Tags: ${blog.tags.join(", ")}]`;
      dynamicParts += "\n";
    });
  }

  // Courses
  if (serverData.courses && serverData.courses.length > 0) {
    dynamicParts += `\n## Courses (${serverData.courses.length} total, from server)\n`;
    serverData.courses.forEach((course) => {
      dynamicParts += `- "${course.title}": ${course.description || ""}`;
      if (course.technologies?.length)
        dynamicParts += ` [Tech: ${course.technologies.join(", ")}]`;
      dynamicParts += "\n";
    });
  }

  return BASE_PROMPT + dynamicParts;
}

// Fetch data from a single API endpoint with timeout
async function fetchData(url: string): Promise<any[]> {
  if (!url) return [];
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const response = await axios.get(url, { signal: controller.signal });
    clearTimeout(timeout);
    return response.data?.data || [];
  } catch {
    return [];
  }
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_REPLIES = [
  "What are your skills?",
  "Tell me about your experience",
  "What projects have you built?",
  "How can I contact you?",
];

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hey! 👋 I'm Prince's AI assistant. Ask me anything about his skills, experience, or projects!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [systemPrompt, setSystemPrompt] = useState(BASE_PROMPT);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Fetch all server data on mount and build dynamic prompt
  useEffect(() => {
    const loadServerData = async () => {
      const [skills, projects, articles, blogs, courses] = await Promise.all([
        fetchData(API_URLS.skills),
        fetchData(API_URLS.projects),
        fetchData(API_URLS.articles),
        fetchData(API_URLS.blogs),
        fetchData(API_URLS.courses),
      ]);

      const prompt = buildDynamicPrompt({
        skills,
        projects,
        articles,
        blogs,
        courses,
      });

      setSystemPrompt(prompt);
      console.log("[AIChatbot] System prompt built with server data:", {
        skills: skills.length,
        projects: projects.length,
        articles: articles.length,
        blogs: blogs.length,
        courses: courses.length,
      });
    };

    loadServerData();
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setShowQuickReplies(false);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      if (!genAI) {
        throw new Error("API key not configured");
      }

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: systemPrompt,
      });

      // Build history from previous messages (excluding welcome)
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role === "user" ? ("user" as const) : ("model" as const),
          parts: [{ text: m.content }],
        }));

      const chat = model.startChat({ history });

      const result = await chat.sendMessage(text.trim());
      const responseText = result.response.text();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const isApiKeyMissing = !genAI;
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error("[AIChatbot] Gemini error:", errMsg);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: isApiKeyMissing
            ? "⚠️ Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file."
            : `Sorry, I couldn't get a response right now. Please try again in a moment.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Chat Panel */}
      <div
        ref={chatRef}
        className={`fixed bottom-24 right-5 z-50 w-[360px] max-w-[calc(100vw-40px)] flex flex-col transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
        style={{ height: "500px" }}
      >
        <div className="flex flex-col h-full rounded-2xl overflow-hidden shadow-2xl border border-border/60 bg-background">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-primary rounded-full" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-none">
                  Prince's AI
                </p>
                <p className="text-xs text-primary-foreground/70 mt-0.5">
                  Powered by Gemini
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-primary-foreground/20 transition-colors"
              aria-label="Close chat"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    msg.role === "assistant"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "assistant"
                      ? "bg-muted text-foreground rounded-tl-sm"
                      : "bg-primary text-primary-foreground rounded-tr-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" />
                </div>
              </div>
            )}

            {/* Quick replies */}
            {showQuickReplies && !isLoading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary bg-primary/5 hover:bg-primary/15 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border/60 shrink-0">
            <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-center text-[10px] text-muted-foreground/50 mt-2">
              Prince's AI · Gemini 2.5 Flash
            </p>
          </div>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        aria-label="Open AI chatbot"
      >
        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
        )}
        {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
      </button>
    </>
  );
}
