import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Users, Brain, AlertTriangle, Calendar, MessageSquare } from 'lucide-react';

// Mock data for charts
const weeklySessionData = [
  { day: 'Mon', individual: 12, group: 4, crisis: 2, total: 18 },
  { day: 'Tue', individual: 15, group: 6, crisis: 1, total: 22 },
  { day: 'Wed', individual: 18, group: 5, crisis: 3, total: 26 },
  { day: 'Thu', individual: 14, group: 7, crisis: 2, total: 23 },
  { day: 'Fri', individual: 16, group: 8, crisis: 1, total: 25 },
  { day: 'Sat', individual: 8, group: 3, crisis: 0, total: 11 },
  { day: 'Sun', individual: 6, group: 2, crisis: 1, total: 9 }
];

const monthlyTrendData = [
  { month: 'Jan', stress: 6.2, anxiety: 5.8, depression: 4.5, wellbeing: 7.2 },
  { month: 'Feb', stress: 6.8, anxiety: 6.1, depression: 4.8, wellbeing: 6.9 },
  { month: 'Mar', stress: 5.9, anxiety: 5.5, depression: 4.2, wellbeing: 7.5 },
  { month: 'Apr', stress: 7.1, anxiety: 6.8, depression: 5.1, wellbeing: 6.5 },
  { month: 'May', stress: 6.5, anxiety: 6.0, depression: 4.7, wellbeing: 7.0 },
  { month: 'Jun', stress: 7.3, anxiety: 7.0, depression: 5.4, wellbeing: 6.2 },
  { month: 'Jul', stress: 6.8, anxiety: 6.3, depression: 4.9, wellbeing: 6.8 }
];

const resourceUsageData = [
  { resource: 'PDF Guides', downloads: 234, color: '#3b82f6' },
  { resource: 'Audio Content', plays: 156, color: '#10b981' },
  { resource: 'Video Resources', views: 89, color: '#f59e0b' },
  { resource: 'Interactive Tools', uses: 67, color: '#ef4444' },
  { resource: 'Forum Posts', engagement: 145, color: '#8b5cf6' }
];

const riskDistribution = [
  { name: 'Low Risk', value: 65, color: '#10b981' },
  { name: 'Medium Risk', value: 28, color: '#f59e0b' },
  { name: 'High Risk', value: 7, color: '#ef4444' }
];

const assessmentScores = [
  { category: 'PHQ-9 (Depression)', mild: 45, moderate: 28, severe: 12 },
  { category: 'GAD-7 (Anxiety)', mild: 38, moderate: 35, severe: 18 },
  { category: 'Stress Scale', mild: 52, moderate: 31, severe: 9 }
];

export const AnalyticsCharts: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 bg-gradient-primary text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Weekly Sessions</p>
                <p className="text-2xl font-bold">134</p>
                <div className="flex items-center gap-1 text-white/60 text-xs">
                  <TrendingUp className="h-3 w-3" />
                  <span>+18% from last week</span>
                </div>
              </div>
              <Activity className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-secondary text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Active Students</p>
                <p className="text-2xl font-bold">1,247</p>
                <div className="flex items-center gap-1 text-white/60 text-xs">
                  <TrendingUp className="h-3 w-3" />
                  <span>+5.2% this month</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-accent text-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary/80 text-sm">Resource Usage</p>
                <p className="text-2xl font-bold">691</p>
                <div className="flex items-center gap-1 text-primary/60 text-xs">
                  <TrendingUp className="h-3 w-3" />
                  <span>+12% this week</span>
                </div>
              </div>
              <Brain className="h-8 w-8 text-primary/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-destructive text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">High Risk Cases</p>
                <p className="text-2xl font-bold">7</p>
                <div className="flex items-center gap-1 text-white/60 text-xs">
                  <TrendingDown className="h-3 w-3" />
                  <span>-2 from last week</span>
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Session Breakdown */}
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Session Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklySessionData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="individual" fill="hsl(var(--primary))" name="Individual" />
                <Bar dataKey="group" fill="hsl(var(--secondary))" name="Group" />
                <Bar dataKey="crisis" fill="hsl(var(--destructive))" name="Crisis" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Mental Health Trends */}
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Mental Health Trends (7 months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 10]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="stress" stroke="hsl(var(--destructive))" strokeWidth={2} name="Stress Level" />
                <Line type="monotone" dataKey="anxiety" stroke="hsl(var(--warning))" strokeWidth={2} name="Anxiety Level" />
                <Line type="monotone" dataKey="depression" stroke="hsl(var(--muted-foreground))" strokeWidth={2} name="Depression Level" />
                <Line type="monotone" dataKey="wellbeing" stroke="hsl(var(--success))" strokeWidth={2} name="Wellbeing Score" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Distribution */}
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Student Risk Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {riskDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resource Usage */}
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Resource Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resourceUsageData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.resource}</span>
                    <span className="text-muted-foreground">
                      {Object.values(item)[1] as number}
                    </span>
                  </div>
                  <Progress 
                    value={(Object.values(item)[1] as number / 250) * 100} 
                    className="h-2"
                    style={{ 
                      backgroundColor: 'hsl(var(--muted))'
                    }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessment Score Distribution */}
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Assessment Score Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={assessmentScores} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis type="number" />
                <YAxis dataKey="category" type="category" width={100} fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="mild" stackId="a" fill="hsl(var(--success))" name="Mild" />
                <Bar dataKey="moderate" stackId="a" fill="hsl(var(--warning))" name="Moderate" />
                <Bar dataKey="severe" stackId="a" fill="hsl(var(--destructive))" name="Severe" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Card className="border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Detailed Engagement Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Session Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Attendance Rate</span>
                  <Badge variant="secondary">94.2%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Session Duration</span>
                  <span className="text-sm font-medium">47 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">No-Show Rate</span>
                  <Badge variant="outline">5.8%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Same-Day Booking</span>
                  <span className="text-sm font-medium">23%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Platform Usage</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Daily Active Users</span>
                  <span className="text-sm font-medium">347</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mobile App Usage</span>
                  <Badge variant="secondary">72%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Peak Usage Time</span>
                  <span className="text-sm font-medium">2-4 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Resource Downloads</span>
                  <span className="text-sm font-medium">1,247</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Intervention Outcomes</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Improvement Rate</span>
                  <Badge variant="secondary">78%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Crisis Interventions</span>
                  <span className="text-sm font-medium">12 this week</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Referral Success</span>
                  <Badge variant="secondary">85%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Follow-up Completion</span>
                  <Badge variant="secondary">91%</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};