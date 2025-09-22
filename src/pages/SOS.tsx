import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, MapPin, Clock, AlertTriangle, Heart } from "lucide-react";

const emergencyContacts = [
  {
    name: "National Suicide Prevention Lifeline",
    number: "988",
    description: "24/7 crisis support",
    type: "call"
  },
  {
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    description: "24/7 text-based crisis support",
    type: "text"
  },
  {
    name: "Campus Security",
    number: "(555) 123-HELP",
    description: "On-campus emergency response",
    type: "call"
  },
  {
    name: "Campus Counselling Center",
    number: "(555) 123-CARE",
    description: "Professional mental health services",
    type: "call"
  }
];

const quickResources = [
  {
    title: "Breathing Exercises",
    description: "Quick techniques to manage anxiety and panic",
    action: "Start Breathing Exercise"
  },
  {
    title: "Grounding Techniques",
    description: "5-4-3-2-1 method to return to the present",
    action: "Learn Grounding"
  },
  {
    title: "Safe Spaces",
    description: "Find quiet places on campus for calming down",
    action: "Find Locations"
  }
];

const SOS = () => {
  const handleEmergencyCall = (number: string) => {
    // In real app, this would initiate a call or SMS
    if (number.includes("988") || number.includes("741741")) {
      window.open(`tel:${number.replace(/\D/g, '')}`, '_self');
    } else {
      alert(`In a real implementation, this would call: ${number}`);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      {/* Emergency Header */}
      <div className="text-center mb-8">
        <div className="h-16 w-16 bg-destructive rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-medium animate-pulse">
          <AlertTriangle className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-destructive">Emergency Support</h1>
        <p className="text-muted-foreground">
          If you're in crisis or need immediate help, please reach out now
        </p>
        <Badge variant="destructive" className="mt-2 animate-pulse">
          🚨 Available 24/7
        </Badge>
      </div>

      {/* Crisis Message */}
      <Card className="mb-8 border-2 border-destructive bg-destructive/5">
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-bold text-destructive mb-3">
            You Are Not Alone
          </h2>
          <p className="text-foreground mb-4">
            If you're having thoughts of suicide or self-harm, or if you're in immediate danger, 
            please contact emergency services or one of the resources below right away.
          </p>
          <p className="text-sm text-muted-foreground">
            Your life matters, and there are people who want to help you through this difficult time.
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Emergency Contacts */}
        <div className="space-y-6">
          <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-destructive" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{contact.name}</h3>
                    <p className="text-xs text-muted-foreground mb-1">{contact.description}</p>
                    <p className="font-mono text-sm text-primary">{contact.number}</p>
                  </div>
                  <Button 
                    size="sm"
                    variant={contact.type === "call" ? "destructive" : "outline"}
                    onClick={() => handleEmergencyCall(contact.number)}
                    className="ml-4"
                  >
                    {contact.type === "call" ? (
                      <><Phone className="h-4 w-4 mr-1" /> Call</>
                    ) : (
                      <><MessageCircle className="h-4 w-4 mr-1" /> Text</>
                    )}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Location & Hours */}
          <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-secondary" />
                Campus Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-sm mb-2">Counselling Center</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Student Services Building, Room 201
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Mon-Fri: 8AM-6PM | Emergency: 24/7
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-sm mb-2">Health Center</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Campus Health Building, 1st Floor
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  24/7 Emergency Services Available
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Help */}
        <div className="space-y-6">
          <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Immediate Coping Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickResources.map((resource, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-sm mb-1">{resource.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{resource.description}</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => alert(`This would open: ${resource.title}`)}
                  >
                    {resource.action}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Safety Plan */}
          <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Create a Safety Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                A safety plan helps you identify warning signs and coping strategies 
                for when you're in crisis.
              </p>
              <Button 
                className="w-full bg-gradient-secondary hover:opacity-90"
                onClick={() => alert("This would open a safety plan tool")}
              >
                Start Safety Plan
              </Button>
            </CardContent>
          </Card>

          {/* Professional Help */}
          <Card className="bg-gradient-wellness border-0 text-foreground">
            <CardContent className="p-6 text-center">
              <h3 className="font-bold mb-2">Need Professional Support?</h3>
              <p className="text-sm mb-4 opacity-90">
                Book a confidential session with our qualified counsellors
              </p>
              <Button 
                variant="secondary"
                className="bg-white text-secondary hover:bg-white/90"
                onClick={() => window.location.href = '/booking'}
              >
                Book Counsellor Session
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SOS;