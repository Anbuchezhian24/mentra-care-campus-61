import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { MessageCircle, Send, Heart, BookOpen, Calendar, Lightbulb } from "lucide-react";

const quickActions = [
  { text: "I'm feeling anxious about exams", icon: BookOpen },
  { text: "Help me manage stress and overwhelm", icon: Heart },
  { text: "I want to book a counsellor session", icon: Calendar },
  { text: "I'm having trouble sleeping", icon: Lightbulb },
  { text: "I need motivation and support", icon: Heart },
  { text: "Help with study stress", icon: BookOpen },
];

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hi there! I'm Mentra Bot, your friendly mental health companion. I'm here to provide support, coping strategies, and resources whenever you need them. How are you feeling today?",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Generate contextual bot response
    const generateResponse = (userInput: string) => {
      const input = userInput.toLowerCase();
      
      if (input.includes('anxious') || input.includes('anxiety') || input.includes('worried')) {
        return "I understand you're feeling anxious. Here are some immediate techniques that can help: Try the 4-7-8 breathing technique (breathe in for 4, hold for 7, exhale for 8). You can also try grounding exercises - name 5 things you can see, 4 you can hear, 3 you can touch, 2 you can smell, and 1 you can taste. Would you like me to guide you to our Resources section for more anxiety management tools?";
      }
      
      if (input.includes('exam') || input.includes('test') || input.includes('study')) {
        return "Exam stress is very common among students. Here are some strategies: Break your study into smaller chunks, take regular breaks (try the Pomodoro technique), ensure you're getting enough sleep, and remember that your worth isn't defined by grades. Consider booking a session with our counsellors who specialize in academic pressure if you need personalized support.";
      }
      
      if (input.includes('sleep') || input.includes('tired') || input.includes('insomnia')) {
        return "Sleep issues can really impact your mental health. Try establishing a consistent bedtime routine, avoid screens 1 hour before bed, and create a comfortable sleep environment. Our Resources section has helpful sleep hygiene guides and relaxing soundscapes that might help you wind down.";
      }
      
      if (input.includes('stress') || input.includes('overwhelmed') || input.includes('pressure')) {
        return "Feeling overwhelmed is a sign that you're dealing with a lot right now. Some immediate stress relief techniques: try progressive muscle relaxation, take a short walk outside, practice deep breathing, or listen to calming music. Remember, it's okay to ask for help. Consider exploring our Resources section for stress management tools.";
      }
      
      if (input.includes('counsellor') || input.includes('therapist') || input.includes('professional')) {
        return "It's great that you're considering professional support! Our booking system allows you to schedule confidential sessions with qualified counsellors who specialize in student mental health. They can provide personalized strategies and support for your specific situation. Would you like me to guide you to the booking page?";
      }
      
      if (input.includes('lonely') || input.includes('isolated') || input.includes('friends')) {
        return "Feeling lonely is more common than you might think, especially among students. Our peer support forum provides a safe, anonymous space to connect with other students who understand what you're going through. Sometimes just knowing you're not alone can make a big difference. Remember, reaching out like you're doing now shows real courage.";
      }
      
      if (input.includes('motivation') || input.includes('unmotivated') || input.includes('purpose')) {
        return "Loss of motivation can be tough, but it's often temporary. Try setting small, achievable goals each day, celebrate small wins, and remember why you started your studies. Sometimes talking to someone about your goals and challenges can help reignite that spark. Our counsellors and peer support community are here to help.";
      }
      
      // Default response
      return "Thank you for sharing that with me. While I'm here to provide general support and resources, everyone's situation is unique. For personalized guidance, I'd recommend booking a session with one of our professional counsellors who can provide tailored support for your specific needs. In the meantime, feel free to explore our Resources section for helpful tools and techniques.";
    };
    
    setMessage("");
    
    // Simulate typing delay
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: "bot",
        content: generateResponse(message),
        timestamp: new Date()
      }]);
    }, 1000);
  };

  const handleQuickAction = (text: string) => {
    setMessage(text);
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="h-16 w-16 bg-gradient-primary rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-medium">
          <MessageCircle className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Chat with Mentra Bot</h1>
        <p className="text-muted-foreground">
          Your 24/7 AI companion for mental health support and coping strategies
        </p>
        <Badge variant="secondary" className="mt-2">
          🔒 Confidential & Private
        </Badge>
      </div>

      {/* Chat Interface */}
      <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="h-3 w-3 bg-success rounded-full animate-pulse"></div>
            Mentra Bot is online
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Messages */}
          <div className="space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Quick actions:</p>
            <div className="grid gap-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto p-3 text-left"
                    onClick={() => handleQuickAction(action.text)}
                  >
                    <Icon className="h-4 w-4 mr-3 text-primary" />
                    {action.text}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-gradient-primary hover:opacity-90 shadow-soft"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground bg-accent p-3 rounded-lg">
            <p className="mb-2">
              <strong>Important:</strong> Mentra Bot provides general support and resources. 
              For immediate crisis support or professional counselling, please use our SOS feature 
              or book a session with our qualified counsellors.
            </p>
            <p>
              🔐 All conversations are confidential and encrypted.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;