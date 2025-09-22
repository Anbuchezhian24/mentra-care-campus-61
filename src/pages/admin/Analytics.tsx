import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, AlertTriangle, Calendar, Activity } from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Mental Health Analytics
        </h1>
        <p className="text-muted-foreground text-lg">
          Comprehensive insights into student mental health trends
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 bg-gradient-primary text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Students</p>
                <p className="text-3xl font-bold">1,247</p>
                <p className="text-white/60 text-xs">+12% from last month</p>
              </div>
              <Users className="h-10 w-10 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-secondary text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Sessions This Month</p>
                <p className="text-3xl font-bold">324</p>
                <p className="text-white/60 text-xs">+8% from last month</p>
              </div>
              <Calendar className="h-10 w-10 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-warning text-warning-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-warning-foreground/80 text-sm">High Risk Cases</p>
                <p className="text-3xl font-bold">8</p>
                <p className="text-warning-foreground/60 text-xs">-2 from last week</p>
              </div>
              <AlertTriangle className="h-10 w-10 text-warning-foreground/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-success text-success-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-success-foreground/80 text-sm">Improvement Rate</p>
                <p className="text-3xl font-bold">78%</p>
                <p className="text-success-foreground/60 text-xs">+5% from last month</p>
              </div>
              <TrendingUp className="h-10 w-10 text-success-foreground/80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Mental Health Trends
            </CardTitle>
            <CardDescription>
              Weekly mood tracker submissions over the past 3 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              [Interactive Chart Placeholder]
              <br />
              Shows anxiety, depression, stress levels over time
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Resource Usage
            </CardTitle>
            <CardDescription>
              Most accessed resources and support tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Anxiety Coping Techniques</span>
                <span className="text-sm font-medium">234 views</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Sleep Hygiene Guide</span>
                <span className="text-sm font-medium">189 views</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Meditation Sessions</span>
                <span className="text-sm font-medium">156 views</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Study Stress Management</span>
                <span className="text-sm font-medium">143 views</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Crisis Interventions</CardTitle>
            <CardDescription>Emergency responses and outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-destructive/10 rounded-lg">
                <p className="text-sm font-medium">This Week: 2 interventions</p>
                <p className="text-xs text-muted-foreground">Both successfully resolved</p>
              </div>
              <div className="p-3 bg-success/10 rounded-lg">
                <p className="text-sm font-medium">Follow-up Success: 100%</p>
                <p className="text-xs text-muted-foreground">All students receiving ongoing support</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Department Breakdown</CardTitle>
            <CardDescription>Mental health needs by academic department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Engineering</span>
                <span className="font-medium">34%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Business</span>
                <span className="font-medium">28%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Arts & Sciences</span>
                <span className="font-medium">22%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Medicine</span>
                <span className="font-medium">16%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recommendation Engine</CardTitle>
            <CardDescription>AI-driven insights and suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium">Increase counsellor availability</p>
                <p className="text-xs text-muted-foreground">Demand up 15% in engineering dept</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-lg">
                <p className="text-sm font-medium">Stress management workshops</p>
                <p className="text-xs text-muted-foreground">Recommended for exam periods</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};