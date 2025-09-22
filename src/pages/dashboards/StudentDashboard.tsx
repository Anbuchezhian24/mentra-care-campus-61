import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Calendar, Book, Users, Heart, Phone } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Welcome to Your Mental Health Hub
        </h1>
        <p className="text-muted-foreground text-lg">
          Your safe space for mental wellness and support
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* AI Chat Support */}
        <Card className="hover:shadow-medium transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <CardTitle>AI Chat Support</CardTitle>
            <CardDescription>
              Get instant support and coping strategies from our AI assistant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/chat">Start Conversation</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Book Appointment */}
        <Card className="hover:shadow-medium transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="h-12 w-12 bg-gradient-secondary rounded-lg flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Book Appointment</CardTitle>
            <CardDescription>
              Schedule confidential sessions with campus counsellors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" className="w-full">
              <Link to="/booking">Book Now</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Resources Hub */}
        <Card className="hover:shadow-medium transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="h-12 w-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4">
              <Book className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Resources Hub</CardTitle>
            <CardDescription>
              Access wellness guides, videos, and relaxation tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/resources">Explore Resources</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Peer Support */}
        <Card className="hover:shadow-medium transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Peer Support Forum</CardTitle>
            <CardDescription>
              Connect with peers in a safe, moderated environment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" className="w-full">
              <Link to="/forum">Join Community</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Mood Tracker */}
        <Card className="hover:shadow-medium transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="h-12 w-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Mood Tracker</CardTitle>
            <CardDescription>
              Track your daily mood and emotional wellbeing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/mood">Track Mood</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Emergency Support */}
        <Card className="hover:shadow-medium transition-all duration-300 border-0 bg-destructive/10 backdrop-blur-sm">
          <CardHeader>
            <div className="h-12 w-12 bg-destructive rounded-lg flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Emergency Support</CardTitle>
            <CardDescription>
              Immediate help when you need it most
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="destructive" className="w-full">
              <Link to="/sos">Get Help Now</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};