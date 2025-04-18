
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your financial assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      // Generate a response based on the user's message
      const response = generateAssistantResponse(input.toLowerCase());
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const generateAssistantResponse = (userInput: string): string => {
    // Simple rule-based responses
    if (userInput.includes("hello") || userInput.includes("hi")) {
      return "Hello! How can I help with your finances today?";
    }

    if (userInput.includes("spend") && userInput.includes("last month")) {
      return "Based on your spending last month, your top three categories were: Food & Dining ($485), Rent ($1200), and Utilities ($420).";
    }

    if (userInput.includes("budget") && userInput.includes("tips")) {
      return "Here are some budgeting tips: 1) Follow the 50/30/20 rule - 50% on needs, 30% on wants, and 20% on savings. 2) Track all your expenses. 3) Set specific financial goals. 4) Review your budget regularly and adjust as needed.";
    }

    if (userInput.includes("save") || userInput.includes("saving")) {
      return "To improve your savings, consider: 1) Automating your savings with direct deposit. 2) Finding areas to cut back on expenses. 3) Using the 24-hour rule before making non-essential purchases. 4) Setting clear financial goals with deadlines.";
    }

    if (userInput.includes("invest") || userInput.includes("investment")) {
      return "For investments, consider: 1) Start with your employer's retirement plan. 2) Build a diversified portfolio. 3) Consider low-cost index funds for beginners. 4) Consult with a financial advisor for personalized advice.";
    }

    if (userInput.includes("debt") || userInput.includes("loan")) {
      return "To manage debt effectively: 1) Prioritize high-interest debt. 2) Consider debt consolidation. 3) Always pay more than the minimum payment. 4) Create a debt repayment plan with specific goals and timeline.";
    }

    if (userInput.includes("emergency fund") || userInput.includes("emergency savings")) {
      return "For emergency funds: 1) Aim to save 3-6 months of essential expenses. 2) Keep it in a high-yield savings account. 3) Only use it for true emergencies. 4) Replenish it as soon as possible after using it.";
    }

    return "I'm here to help with your financial questions. You can ask about your spending, budgeting tips, saving strategies, debt management, or investment advice.";
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financial Assistant</h2>
          <p className="text-muted-foreground mt-1">
            Get answers to your financial questions
          </p>
        </div>

        <Card className="border-none shadow-none">
          <CardHeader className="px-0">
            <CardTitle>Ask a Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-0">
            <div className="h-[500px] overflow-y-auto rounded-md border bg-background p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === "assistant" ? "" : "justify-end"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[75%] ${
                        message.role === "assistant"
                          ? "bg-muted"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <Avatar>
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-2 max-w-[75%] bg-muted">
                      <p className="flex items-center gap-1">
                        <span className="animate-pulse">●</span>
                        <span className="animate-pulse delay-100">●</span>
                        <span className="animate-pulse delay-200">●</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-0">
            <form
              className="flex w-full gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <Input
                placeholder="Ask a question about your finances..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sample Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                "What did I spend most on last month?",
                "What are some budgeting tips?",
                "How can I save more money?",
                "How should I invest my money?",
                "How can I manage my debt?",
                "How much should I have in my emergency fund?",
              ].map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInput(question);
                  }}
                  disabled={isLoading}
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
