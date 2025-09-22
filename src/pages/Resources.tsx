import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { 
  BookOpen, 
  Search, 
  Play, 
  FileText, 
  Headphones, 
  Video,
  Brain,
  Heart,
  Moon,
  Zap,
  Coffee
} from "lucide-react";

const categories = [
  { id: "all", name: "All Resources", icon: BookOpen },
  { id: "anxiety", name: "Anxiety", icon: Brain },
  { id: "depression", name: "Depression", icon: Heart },
  { id: "stress", name: "Exam Stress", icon: Coffee },
  { id: "sleep", name: "Sleep", icon: Moon },
  { id: "motivation", name: "Motivation", icon: Zap },
];

const resources = [
  {
    id: 1,
    title: "Understanding Anxiety: A Student's Guide",
    type: "PDF Guide",
    category: "anxiety",
    duration: "15 min read",
    description: "Comprehensive guide to recognizing and managing anxiety symptoms in academic settings",
    icon: FileText,
    featured: true,
    url: "https://www.example.com/anxiety-guide.pdf"
  },
  {
    id: 2,
    title: "Relaxing Rain Sounds for Study & Sleep",
    type: "YouTube Audio",
    category: "stress",
    duration: "3 hours",
    description: "Natural rain sounds to help you relax, focus, and reduce stress while studying",
    icon: Headphones,
    featured: true,
    url: "https://www.youtube.com/watch?v=mPZkdNFkNps"
  },
  {
    id: 3,
    title: "10-Minute Morning Meditation",
    type: "YouTube Video",
    category: "anxiety",
    duration: "10 minutes",
    description: "Start your day with calm and focus using this guided morning meditation",
    icon: Video,
    featured: true,
    url: "https://www.youtube.com/watch?v=inpok4MKVLM"
  },
  {
    id: 4,
    title: "Study Music - Deep Focus & Concentration",
    type: "YouTube Audio",
    category: "stress",
    duration: "2 hours",
    description: "Instrumental background music designed to enhance focus and productivity",
    icon: Headphones,
    featured: false,
    url: "https://www.youtube.com/watch?v=5qap5aO4i9A"
  },
  {
    id: 5,
    title: "Progressive Muscle Relaxation",
    type: "YouTube Video",
    category: "anxiety",
    duration: "15 minutes",
    description: "Full body relaxation technique to release tension and stress",
    icon: Video,
    featured: false,
    url: "https://www.youtube.com/watch?v=1nZEdqcGVzo"
  },
  {
    id: 6,
    title: "Nature Sounds - Forest Ambience",
    type: "YouTube Audio",
    category: "sleep",
    duration: "8 hours",
    description: "Peaceful forest sounds for relaxation, meditation, and better sleep",
    icon: Headphones,
    featured: true,
    url: "https://www.youtube.com/watch?v=xNN7iTA57jM"
  },
  {
    id: 7,
    title: "Breathing Exercises for Anxiety",
    type: "YouTube Video",
    category: "anxiety",
    duration: "12 minutes",
    description: "Simple breathing techniques to manage anxiety and panic attacks",
    icon: Video,
    featured: false,
    url: "https://www.youtube.com/watch?v=tybOi4hjZFQ"
  },
  {
    id: 8,
    title: "Calming Piano Music for Stress Relief",
    type: "YouTube Audio",
    category: "stress",
    duration: "1 hour",
    description: "Gentle piano melodies to reduce stress and promote relaxation",
    icon: Headphones,
    featured: false,
    url: "https://www.youtube.com/watch?v=1ZYbU82GVz4"
  },
  {
    id: 9,
    title: "Healthy Sleep Habits for Students",
    type: "PDF Guide",
    category: "sleep",
    duration: "12 min read",
    description: "Evidence-based strategies for better sleep during college",
    icon: FileText,
    featured: false,
    url: "https://www.example.com/sleep-guide.pdf"
  },
  {
    id: 10,
    title: "Mindful Walking Meditation",
    type: "YouTube Video",
    category: "anxiety",
    duration: "20 minutes",
    description: "Learn to practice mindfulness while walking to reduce anxiety",
    icon: Video,
    featured: true,
    url: "https://www.youtube.com/watch?v=6p_yaNFSYao"
  },
  {
    id: 11,
    title: "Ocean Waves - Sleep & Relaxation",
    type: "YouTube Audio",
    category: "sleep",
    duration: "10 hours",
    description: "Soothing ocean wave sounds for deep sleep and relaxation",
    icon: Headphones,
    featured: false,
    url: "https://www.youtube.com/watch?v=V1bFr2SWP1I"
  },
  {
    id: 12,
    title: "Dealing with Academic Burnout",
    type: "PDF Guide",
    category: "stress",
    duration: "20 min read",
    description: "Recognize signs of burnout and develop healthy coping strategies",
    icon: FileText,
    featured: false,
    url: "https://www.example.com/burnout-guide.pdf"
  },
  {
    id: 13,
    title: "Yoga for Stress Relief - Beginner Friendly",
    type: "YouTube Video",
    category: "stress",
    duration: "30 minutes",
    description: "Gentle yoga routine specifically designed for stress relief and relaxation",
    icon: Video,
    featured: true,
    url: "https://www.youtube.com/watch?v=hJbRpHZr_d0"
  },
  {
    id: 14,
    title: "Motivation & Self-Confidence Building",
    type: "YouTube Video",
    category: "motivation",
    duration: "18 minutes",
    description: "Practical exercises and affirmations to boost confidence and motivation",
    icon: Video,
    featured: false,
    url: "https://www.youtube.com/watch?v=mgmVOuLgFB0"
  },
  {
    id: 15,
    title: "White Noise for Focus & Productivity",
    type: "YouTube Audio",
    category: "stress",
    duration: "4 hours",
    description: "Consistent white noise to mask distractions and improve concentration",
    icon: Headphones,
    featured: false,
    url: "https://www.youtube.com/watch?v=nMfPqeZjc2c"
  }
];

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="h-16 w-16 bg-gradient-warning rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-medium">
          <BookOpen className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Resource Hub</h1>
        <p className="text-muted-foreground">
          Evidence-based guides, videos, and tools for your mental wellness journey
        </p>
        <Badge variant="secondary" className="mt-2">
          📚 Multi-language Support
        </Badge>
      </div>

      {/* Search */}
      <Card className="mb-8 shadow-medium border-0 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources by topic, keyword, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "shadow-soft" : ""}
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Featured Resources */}
      {selectedCategory === "all" && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Card key={resource.id} className="group hover:shadow-strong transition-all border-0 bg-gradient-wellness text-foreground">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="h-10 w-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary" className="text-xs bg-white/20 text-foreground">
                        {resource.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm opacity-90 mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs opacity-70">{resource.duration}</span>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        className="bg-white/20 hover:bg-white/30 text-foreground border-white/30"
                        asChild
                      >
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <Play className="h-3 w-3 mr-1" />
                          {resource.type.includes('YouTube') ? 'Watch' : 'Access'}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* All Resources */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          {selectedCategory === "all" ? "All Resources" : 
           categories.find(cat => cat.id === selectedCategory)?.name + " Resources"}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const Icon = resource.icon;
            return (
              <Card key={resource.id} className="group hover:shadow-medium transition-all shadow-soft border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="h-10 w-10 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {resource.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{resource.duration}</span>
                    <Button size="sm" variant="outline" asChild>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <Play className="h-3 w-3 mr-1" />
                        {resource.type.includes('YouTube') ? 'Watch' : 'Access'}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;