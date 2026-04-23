import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Send, Bot, User } from "lucide-react";
import { toast } from "sonner";



const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/beauty-ai`;

const quickPrompts = [
"Meri skin oily hai, kaunsa facial karwau?",
"Bridal makeup ke liye kya tips hain?",
"Hair fall ke liye kya treatment hai?",
"Party makeup kaise karein ghar pe?"];


const AIBeautyConsultantPage = () => {
  const [messages, setMessages] = useState([
  {
    role: "assistant",
    content:
    "Namaste! 🌸 Main Sakshi Beauty Parlour ki AI Beauty Consultant hoon. Aap mujhse skin care, hair care, makeup tips, ya koi bhi beauty related sawaal pooch sakte hain!"
  }]
  );
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async (text) => {
    if (!text.trim() || typing) return;
    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setTyping(true);

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({
          type: "consultant",
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content }))
        })
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => null);
        throw new Error(errData?.error || `Error ${resp.status}`);
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && prev.length > updatedMessages.length) {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to get response");
      setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Sorry, kuch problem aa gayi. Please try again! 🙏" }]
      );
    } finally {
      setTyping(false);
    }
  };

  return (
    <PageTransition>
      <Navbar />
      <main>
        <section className="pt-32 pb-8 bg-gradient-hero section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <span className="text-sm font-medium text-primary tracking-widest uppercase">AI Powered</span>
              <h1 className="heading-display mt-3">
                Beauty <span className="text-gradient-rose">Consultant</span>
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                Get personalized beauty advice, skincare tips, and treatment recommendations from our AI consultant.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="px-6 pb-16 bg-background">
          <div className="max-w-3xl mx-auto">
            <div className="glass-card rounded-3xl overflow-hidden">
              <div className="h-[450px] overflow-y-auto p-6 space-y-4">
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) =>
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    
                      {msg.role === "assistant" &&
                    <div className="w-8 h-8 rounded-full bg-blush/40 flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                    }
                      <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user" ?
                      "bg-primary text-primary-foreground rounded-br-sm" :
                      "bg-blush/20 text-foreground rounded-bl-sm"}`
                      }>
                      
                        {msg.content}
                      </div>
                      {msg.role === "user" &&
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                    }
                    </motion.div>
                  )}
                </AnimatePresence>
                {typing && !messages[messages.length - 1]?.content &&
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blush/40 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-blush/20 rounded-2xl px-4 py-3 rounded-bl-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                }
                <div ref={chatEndRef} />
              </div>

              <div className="px-6 pb-3 flex flex-wrap gap-2">
                {quickPrompts.map((p) =>
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  disabled={typing}
                  className="text-xs px-3 py-1.5 rounded-full bg-blush/30 text-foreground hover:bg-blush/50 transition-colors disabled:opacity-50">
                  
                    {p}
                  </button>
                )}
              </div>

              <div className="p-4 border-t border-border/30">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(input);
                  }}
                  className="flex gap-3">
                  
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Apna beauty sawaal poochein..."
                    className="flex-1 bg-blush/10 rounded-full px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  
                  <button
                    type="submit"
                    disabled={!input.trim() || typing}
                    className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50">
                    
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>);

};

export default AIBeautyConsultantPage;