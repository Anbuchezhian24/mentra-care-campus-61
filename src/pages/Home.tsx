import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Calendar,
  BookOpen,
  Users,
  BarChart3,
  Shield,
  Clock,
  Brain,
  Headphones
} from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Mentra Bot",
    description: "24/7 AI companion for immediate support and coping strategies",
    color: "bg-primary",
    href: "/chat"
  },
  {
    icon: Calendar,
    title: "Book Counsellor",
    description: "Schedule confidential one-on-one sessions with professional counsellors",
    color: "bg-secondary",
    href: "/booking"
  },
  {
    icon: BookOpen,
    title: "Resource Hub",
    description: "Access guides, videos, and tools for mental wellness",
    color: "bg-warning",
    href: "/resources"
  },
  {
    icon: Users,
    title: "Peer Support",
    description: "Connect anonymously with fellow students in safe forums",
    color: "bg-success",
    href: "/forum"
  }
];

const benefits = [
  { icon: Shield, text: "100% Confidential & Anonymous" },
  { icon: Clock, text: "24/7 Available Support" },
  { icon: Brain, text: "Evidence-Based Resources" },
  { icon: Headphones, text: "Professional Counsellors" }
];

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 bg-gradient-wellness">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge 
              variant="secondary" 
              className="mb-6 px-4 py-2 text-sm bg-secondary-soft text-secondary border-secondary/20"
            >
              ✨ Stigma-Free Mental Health Platform
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Your Trusted Space for{" "}
              <span className="text-transparent bg-gradient-primary bg-clip-text">
                Student Well-being
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              MentraCare provides confidential mental health support designed specifically 
              for college students. Get help with stress, anxiety, and academic pressure 
              in a safe, understanding environment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 shadow-medium px-8 py-6 text-lg"
                asChild
              >
                <Link to="/chat">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat with Mentra Bot
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-6 text-lg"
                asChild
              >
                <Link to="/resources">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore Resources
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center">
                <div className="h-12 w-12 bg-gradient-primary rounded-lg mx-auto mb-3 flex items-center justify-center shadow-soft">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium text-foreground">{benefit.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for Mental Wellness
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools and support designed to help you thrive academically 
            and personally throughout your college journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`h-12 w-12 ${feature.color} rounded-lg flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      <Button 
                        variant="ghost" 
                        className="p-0 h-auto text-primary hover:text-primary-glow"
                        asChild
                      >
                        <Link to={feature.href}>
                          Learn more →
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Mood Tracker CTA */}
      <section className="container mx-auto px-6">
        <Card className="bg-gradient-secondary text-white border-0 shadow-strong">
          <CardContent className="p-8 md:p-12 text-center">
            <BarChart3 className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Track Your Mental Wellness Journey</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Monitor your daily mood and gain insights into your mental health patterns. 
              Build healthy habits with our gamified tracking system.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-secondary hover:bg-white/90 shadow-medium px-8"
              asChild
            >
              <Link to="/mood">
                Start Tracking Today
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Emergency Support */}
      <section className="container mx-auto px-6">
        <Card className="border-2 border-destructive/20 bg-destructive/5">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-destructive mb-2">
              In Crisis? Get Immediate Help
            </h3>
            <p className="text-muted-foreground mb-4">
              If you're experiencing thoughts of self-harm or suicide, please reach out immediately.
            </p>
            <Button 
              variant="destructive" 
              size="lg"
              className="shadow-medium"
              asChild
            >
              <Link to="/sos">
                Emergency Support & Helplines
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;