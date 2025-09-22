import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { 
  BarChart3, 
  Calendar,
  TrendingUp,
  Award,
  Target,
  AlertTriangle,
  Smile,
  Frown,
  Meh
} from "lucide-react";

const moods = [
  { emoji: "😊", label: "Great", value: 5, color: "text-success" },
  { emoji: "🙂", label: "Good", value: 4, color: "text-primary" },
  { emoji: "😐", label: "Okay", value: 3, color: "text-warning" },
  { emoji: "🙁", label: "Low", value: 2, color: "text-destructive" },
  { emoji: "😢", label: "Very Low", value: 1, color: "text-destructive" }
];

const challenges = [
  {
    id: 1,
    title: "7 Day Check-in Streak",
    description: "Log your mood for 7 consecutive days",
    progress: 3,
    total: 7,
    badge: "🔥"
  },
  {
    id: 2,
    title: "Mindful Monday",
    description: "Practice mindfulness this Monday",
    progress: 0,
    total: 1,
    badge: "🧘"
  },
  {
    id: 3,
    title: "Sleep Tracker Challenge",
    description: "Track healthy sleep patterns",
    progress: 2,
    total: 5,
    badge: "💤"
  }
];

const weeklyData = [
  { day: "Mon", mood: 4, logged: true },
  { day: "Tue", mood: 3, logged: true },
  { day: "Wed", mood: 4, logged: true },
  { day: "Thu", mood: 2, logged: true },
  { day: "Fri", mood: 0, logged: false },
  { day: "Sat", mood: 0, logged: false },
  { day: "Sun", mood: 0, logged: false },
];

const Mood = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [todayLogged, setTodayLogged] = useState(false);

  const handleMoodSelect = (value: number) => {
    setSelectedMood(value);
  };

  const handleLogMood = () => {
    if (selectedMood !== null) {
      setTodayLogged(true);
      // In real app, this would save to backend
    }
  };

  const loggedDays = weeklyData.filter(day => day.logged).length;
  const avgMood = weeklyData.filter(day => day.logged).reduce((acc, day) => acc + day.mood, 0) / loggedDays || 0;

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="h-16 w-16 bg-gradient-primary rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-medium">
          <BarChart3 className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Mood Tracker</h1>
        <p className="text-muted-foreground">
          Track your daily mood and build healthy mental wellness habits
        </p>
        <Badge variant="secondary" className="mt-2">
          📊 Personal Analytics
        </Badge>
      </div>

      {/* Backend Notice */}
      <Card className="mb-8 border-2 border-primary/20 bg-primary-soft">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold text-primary mb-2">Backend Integration Required</h3>
              <p className="text-foreground text-sm mb-3">
                To enable mood tracking with data persistence, analytics, and personalized insights, 
                this platform needs to be connected to Supabase. This will unlock features like:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Persistent mood history and trends</li>
                <li>• Personalized wellness insights</li>
                <li>• Gamification and achievement tracking</li>
                <li>• Export mood data for counsellor sessions</li>
                <li>• Anonymous aggregated statistics</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Tracking */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Mood */}
          <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                How are you feeling today?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!todayLogged ? (
                <>
                  <div className="grid grid-cols-5 gap-3">
                    {moods.map((mood) => (
                      <button
                        key={mood.value}
                        onClick={() => handleMoodSelect(mood.value)}
                        className={`p-4 rounded-xl transition-all text-center ${
                          selectedMood === mood.value
                            ? "bg-primary text-primary-foreground shadow-medium scale-105"
                            : "bg-accent hover:bg-accent/80"
                        }`}
                      >
                        <div className="text-2xl mb-2">{mood.emoji}</div>
                        <div className="text-xs font-medium">{mood.label}</div>
                      </button>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={handleLogMood}
                    disabled={selectedMood === null}
                    className="w-full bg-gradient-primary hover:opacity-90 shadow-soft"
                  >
                    Log Today's Mood
                  </Button>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="text-4xl mb-3">
                    {moods.find(m => m.value === selectedMood)?.emoji}
                  </div>
                  <h3 className="font-semibold mb-2">Mood logged for today!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You're feeling {moods.find(m => m.value === selectedMood)?.label.toLowerCase()} today
                  </p>
                  <Badge variant="secondary">
                    ✅ Day {loggedDays} of tracking
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weekly Overview */}
          <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>This Week's Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-6">
                {weeklyData.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                    <div 
                      className={`h-12 w-full rounded-lg flex items-center justify-center text-sm ${
                        day.logged 
                          ? day.mood >= 4 ? "bg-success/20 text-success" :
                            day.mood >= 3 ? "bg-warning/20 text-warning" :
                            "bg-destructive/20 text-destructive"
                          : "bg-muted"
                      }`}
                    >
                      {day.logged ? moods.find(m => m.value === day.mood)?.emoji : "−"}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-accent rounded-lg">
                  <div className="text-2xl font-bold text-primary">{loggedDays}</div>
                  <div className="text-xs text-muted-foreground">Days Tracked</div>
                </div>
                <div className="text-center p-3 bg-accent rounded-lg">
                  <div className="text-2xl font-bold text-secondary">{avgMood.toFixed(1)}</div>
                  <div className="text-xs text-muted-foreground">Avg Mood</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Streak */}
          <Card className="shadow-medium border-0 bg-gradient-success text-white">
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 mx-auto mb-3" />
              <h3 className="text-2xl font-bold">{loggedDays}</h3>
              <p className="text-sm opacity-90">Day Streak</p>
              <p className="text-xs opacity-75 mt-2">Keep it up!</p>
            </CardContent>
          </Card>

          {/* Challenges */}
          <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Wellness Challenges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{challenge.badge}</span>
                      <div>
                        <p className="font-medium text-sm">{challenge.title}</p>
                        <p className="text-xs text-muted-foreground">{challenge.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all"
                      style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {challenge.progress}/{challenge.total} completed
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Insights */}
          <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {avgMood >= 4 && (
                <div className="flex items-start gap-2">
                  <Smile className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Great week! You've been feeling positive most days.
                  </p>
                </div>
              )}
              {avgMood >= 2 && avgMood < 4 && (
                <div className="flex items-start gap-2">
                  <Meh className="h-4 w-4 text-warning mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Mixed week. Consider talking to someone about what's on your mind.
                  </p>
                </div>
              )}
              {avgMood < 2 && loggedDays > 0 && (
                <div className="flex items-start gap-2">
                  <Frown className="h-4 w-4 text-destructive mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Tough week. Please consider reaching out to our counsellors.
                  </p>
                </div>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                disabled
              >
                View Detailed Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Mood;