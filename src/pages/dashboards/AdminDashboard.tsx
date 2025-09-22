import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { BarChart3, Users, Settings, Shield, TrendingUp, AlertTriangle, Database, UserPlus, Download, Upload, FileText, Calendar, Clock, Activity, Brain, MessageSquare } from 'lucide-react';

// Mock analytics data
const mockAnalytics = {
  totalStudents: 1234,
  activeCounsellors: 12,
  weeklySessions: 87,
  highRiskCases: 3,
  monthlyTrends: {
    sessions: [45, 52, 48, 61, 55, 67, 87],
    stressLevels: [6.2, 6.8, 5.9, 7.1, 6.5, 7.3, 6.8],
    resourceUsage: [234, 267, 189, 298, 245, 312, 278]
  }
};

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    email: "s.wilson@university.edu",
    role: "counsellor",
    status: "active",
    sessionsThisWeek: 12,
    lastActive: "2024-01-15"
  },
  {
    id: 2,
    name: "Prof. Michael Johnson",
    email: "m.johnson@university.edu", 
    role: "admin",
    status: "active",
    sessionsThisWeek: 0,
    lastActive: "2024-01-14"
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.davis@student.edu",
    role: "student",
    status: "active",
    sessionsThisWeek: 2,
    lastActive: "2024-01-15"
  }
];

// Mock resources data
const mockResources = [
  {
    id: 1,
    title: "Stress Management Guide",
    type: "PDF",
    language: "English",
    downloadCount: 234,
    uploadDate: "2024-01-10",
    status: "active"
  },
  {
    id: 2,
    title: "Meditation Audio Series",
    type: "Audio",
    language: "English",
    downloadCount: 156,
    uploadDate: "2024-01-08",
    status: "active"
  },
  {
    id: 3,
    title: "गुनाशिलता व्यवस्थापन मार्गदर्शक",
    type: "PDF", 
    language: "Hindi",
    downloadCount: 89,
    uploadDate: "2024-01-05",
    status: "active"
  }
];

export const AdminDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [alertThreshold, setAlertThreshold] = useState(70);

  const handleExportReport = (format: string) => {
    console.log(`Exporting report in ${format} format`);
    // TODO: Implement export logic
  };

  const handleUserStatusChange = (userId: number, newStatus: string) => {
    console.log(`Changing user ${userId} status to ${newStatus}`);
    // TODO: Implement user status change logic
  };

  const handleResourceUpload = () => {
    console.log('Uploading new resource');
    // TODO: Implement resource upload logic
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Administrator Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage the mental health intervention system
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-0 bg-gradient-primary text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Students</p>
                <p className="text-2xl font-bold">{mockAnalytics.totalStudents}</p>
                <p className="text-white/60 text-xs">+12% from last month</p>
              </div>
              <Users className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-gradient-secondary text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Active Counsellors</p>
                <p className="text-2xl font-bold">{mockAnalytics.activeCounsellors}</p>
                <p className="text-white/60 text-xs">All systems operational</p>
              </div>
              <UserPlus className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-accent text-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary/80 text-sm">Weekly Sessions</p>
                <p className="text-2xl font-bold">{mockAnalytics.weeklySessions}</p>
                <p className="text-primary/60 text-xs">+18% from last week</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-destructive text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">High Risk Cases</p>
                <p className="text-2xl font-bold">{mockAnalytics.highRiskCases}</p>
                <p className="text-white/60 text-xs">Requires attention</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="alerts">Early Warnings</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Mental Health Trends
                </CardTitle>
                <CardDescription>
                  Anonymous aggregate data showing student wellbeing patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Stress Level</span>
                    <Badge variant="destructive">6.8/10</Badge>
                  </div>
                  <Progress value={68} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Anxiety Indicators</span>
                    <Badge variant="destructive">5.9/10</Badge>
                  </div>
                  <Progress value={59} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overall Wellbeing</span>
                    <Badge variant="secondary">7.2/10</Badge>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Session Statistics
                </CardTitle>
                <CardDescription>
                  Counselling session booking and attendance data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">87</p>
                      <p className="text-sm text-muted-foreground">Sessions This Week</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-secondary">94%</p>
                      <p className="text-sm text-muted-foreground">Attendance Rate</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Individual Counseling</span>
                      <span>65%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Group Therapy</span>
                      <span>25%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Crisis Intervention</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Resource Usage Analytics
              </CardTitle>
              <CardDescription>
                Track usage of mental health resources and materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <FileText className="h-8 w-8 mx-auto text-primary" />
                  <p className="text-lg font-semibold">234</p>
                  <p className="text-sm text-muted-foreground">PDF Downloads</p>
                </div>
                <div className="text-center space-y-2">
                  <Activity className="h-8 w-8 mx-auto text-secondary" />
                  <p className="text-lg font-semibold">156</p>
                  <p className="text-sm text-muted-foreground">Audio Plays</p>
                </div>
                <div className="text-center space-y-2">
                  <MessageSquare className="h-8 w-8 mx-auto text-accent-foreground" />
                  <p className="text-lg font-semibold">89</p>
                  <p className="text-sm text-muted-foreground">Forum Posts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage students, counsellors, and system access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="student">Students</SelectItem>
                        <SelectItem value="counsellor">Counsellors</SelectItem>
                        <SelectItem value="admin">Admins</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Search users..." className="w-64" />
                  </div>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>

                <div className="border rounded-lg">
                  <div className="grid grid-cols-6 gap-4 p-4 border-b font-medium text-sm">
                    <span>Name</span>
                    <span>Email</span>
                    <span>Role</span>
                    <span>Status</span>
                    <span>Activity</span>
                    <span>Actions</span>
                  </div>
                  
                  <ScrollArea className="h-[400px]">
                    {mockUsers.map((user) => (
                      <div key={user.id} className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-muted/50">
                        <div>
                          <p className="font-medium">{user.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div>
                          <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'counsellor' ? 'secondary' : 'outline'}>
                            {user.role}
                          </Badge>
                        </div>
                        <div>
                        <Badge variant={user.status === 'active' ? 'secondary' : 'outline'}>
                          {user.status}
                        </Badge>
                        </div>
                        <div>
                          <p className="text-sm">{user.sessionsThisWeek} sessions</p>
                          <p className="text-xs text-muted-foreground">Last: {user.lastActive}</p>
                        </div>
                        <div>
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Resource Management
              </CardTitle>
              <CardDescription>
                Upload and manage institution-specific mental health resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Languages</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="regional">Regional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleResourceUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Resource
                  </Button>
                </div>

                <div className="grid gap-4">
                  {mockResources.map((resource) => (
                    <div key={resource.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-semibold">{resource.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{resource.type}</Badge>
                            <Badge variant="secondary">{resource.language}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {resource.downloadCount} downloads
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Uploaded: {resource.uploadDate}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Download</Button>
                          <Button size="sm" variant="destructive">Delete</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Reports & Insights
              </CardTitle>
              <CardDescription>
                Generate and export comprehensive mental health reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Quick Reports</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Weekly Mental Health Summary</p>
                        <p className="text-sm text-muted-foreground">Anonymous aggregate data</p>
                      </div>
                      <Button size="sm" onClick={() => handleExportReport('pdf')}>
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Counselling Session Statistics</p>
                        <p className="text-sm text-muted-foreground">Booking and attendance data</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleExportReport('csv')}>
                        <Download className="h-4 w-4 mr-2" />
                        CSV
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Resource Usage Report</p>
                        <p className="text-sm text-muted-foreground">Download and engagement metrics</p>
                      </div>
                      <Button size="sm" variant="secondary" onClick={() => handleExportReport('excel')}>
                        <Download className="h-4 w-4 mr-2" />
                        Excel
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Custom Report Builder</h4>
                  <div className="space-y-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">Last Week</SelectItem>
                        <SelectItem value="month">Last Month</SelectItem>
                        <SelectItem value="quarter">Last Quarter</SelectItem>
                        <SelectItem value="year">Last Year</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select data categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sessions">Session Data</SelectItem>
                        <SelectItem value="resources">Resource Usage</SelectItem>
                        <SelectItem value="trends">Mental Health Trends</SelectItem>
                        <SelectItem value="all">All Categories</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button className="w-full">
                      Generate Custom Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Early Warnings Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Early Warning System
              </CardTitle>
              <CardDescription>
                Configure alerts for high-risk situations and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Alert Thresholds</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">High Stress Threshold (%)</label>
                      <div className="flex items-center gap-4">
                        <Input 
                          type="number" 
                          value={alertThreshold} 
                          onChange={(e) => setAlertThreshold(Number(e.target.value))}
                          className="w-20"
                        />
                        <span className="text-sm text-muted-foreground">
                          Alert when {alertThreshold}% of students show high stress
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Crisis Detection</label>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm">Enable automatic crisis detection</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Active Alerts</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-destructive/20 bg-destructive/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <div>
                          <p className="font-medium">High Stress Detected</p>
                          <p className="text-sm text-muted-foreground">
                            73% of students showing elevated stress levels
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm">Take Action</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-warning/20 bg-warning/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-warning" />
                        <div>
                          <p className="font-medium">Counsellor Capacity Alert</p>
                          <p className="text-sm text-muted-foreground">
                            90% of counsellor slots booked for this week
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Schedule More</Button>
                        <Button size="sm">Dismiss</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                System Configuration
              </CardTitle>
              <CardDescription>
                Configure platform settings and manage system preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">General Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Default Session Duration (minutes)</label>
                      <Input type="number" defaultValue="50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Booking Window (days ahead)</label>
                      <Input type="number" defaultValue="14" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Privacy & Security</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Data Encryption</p>
                        <p className="text-sm text-muted-foreground">Encrypt all sensitive data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Audit Logging</p>
                        <p className="text-sm text-muted-foreground">Log all system access and changes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Require 2FA for admin access</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Counsellor Management</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-assign Students</p>
                        <p className="text-sm text-muted-foreground">Automatically assign students to available counsellors</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Max Students per Counsellor</label>
                      <Input type="number" defaultValue="25" className="w-32" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button>Save Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};