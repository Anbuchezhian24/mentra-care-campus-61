import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { 
  Users, 
  MessageCircle, 
  Plus, 
  Search, 
  Heart,
  Bookmark,
  MoreHorizontal,
  Shield,
  AlertTriangle
} from "lucide-react";

const forumCategories = [
  { id: "all", name: "All Posts", color: "bg-primary" },
  { id: "stress", name: "Stress Help", color: "bg-warning" },
  { id: "motivation", name: "Motivation", color: "bg-success" },
  { id: "anxiety", name: "Career Anxiety", color: "bg-destructive" },
  { id: "academic", name: "Academic Support", color: "bg-secondary" },
  { id: "social", name: "Social Connections", color: "bg-primary" }
];

const forumPosts = [
  {
    id: 1,
    title: "Feeling overwhelmed with final exams approaching",
    category: "stress",
    content: "Anyone else feeling like they can't catch up with everything? I have 4 exams next week and I'm starting to panic. Looking for some study tips and moral support.",
    author: "Anonymous Student",
    timeAgo: "2 hours ago",
    replies: 12,
    likes: 28,
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 2,
    title: "Graduated and still don't know what I want to do",
    category: "anxiety",
    content: "I just graduated with a degree in Business but I have no idea what career path to take. All my friends seem to have it figured out. Feeling really lost and anxious about my future.",
    author: "Recent Graduate",
    timeAgo: "5 hours ago",
    replies: 18,
    likes: 34,
    isLiked: true,
    isBookmarked: false
  },
  {
    id: 3,
    title: "Small victories thread - share your wins!",
    category: "motivation",
    content: "Let's celebrate the small things! Today I managed to attend all my classes and even participated in group discussion. What's your win for today?",
    author: "Positive Peer",
    timeAgo: "1 day ago",
    replies: 45,
    likes: 89,
    isLiked: false,
    isBookmarked: true
  },
  {
    id: 4,
    title: "Study group for organic chemistry?",
    category: "academic",
    content: "Looking for fellow students who are struggling with organic chem. Maybe we can help each other understand the concepts better?",
    author: "Chem Student",
    timeAgo: "2 days ago",
    replies: 7,
    likes: 15,
    isLiked: false,
    isBookmarked: false
  }
];

const Forum = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="h-16 w-16 bg-gradient-success rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-medium">
          <Users className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Peer Support Forum</h1>
        <p className="text-muted-foreground">
          Connect with fellow students in a safe, anonymous community
        </p>
        <Badge variant="secondary" className="mt-2">
          👥 Anonymous & Moderated
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
                To enable the peer support forum with user posts, moderation tools, and real-time discussions, 
                this platform needs to be connected to Supabase. This will unlock features like:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Anonymous posting and commenting</li>
                <li>• Real-time discussion threads</li>
                <li>• Content moderation and reporting</li>
                <li>• User reputation and community guidelines</li>
                <li>• Search and category filtering</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Create Post */}
          <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <Button className="w-full bg-gradient-primary hover:opacity-90 shadow-soft" disabled>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {forumCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`h-2 w-2 ${category.color} rounded-full`}></div>
                    <span>{category.name}</span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Community Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs text-muted-foreground">
                • Be respectful and supportive
              </p>
              <p className="text-xs text-muted-foreground">
                • No personal attacks or judgment
              </p>
              <p className="text-xs text-muted-foreground">
                • Keep posts relevant to student mental health
              </p>
              <p className="text-xs text-muted-foreground">
                • Report inappropriate content
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search */}
          <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Posts */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="shadow-soft border-0 bg-card/50 backdrop-blur-sm hover:shadow-medium transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-gradient-wellness rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                      >
                        {forumCategories.find(cat => cat.id === post.category)?.name}
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <h3 className="font-semibold mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{post.content}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`h-8 ${post.isLiked ? 'text-destructive' : 'text-muted-foreground'}`}
                        disabled
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-muted-foreground" disabled>
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.replies}
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`h-8 ${post.isBookmarked ? 'text-warning' : 'text-muted-foreground'}`}
                      disabled
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No discussions found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forum;