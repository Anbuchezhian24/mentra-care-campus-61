import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Plus, Calendar, User, Clock } from 'lucide-react';

export const SessionNotes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockSessions = [
    {
      id: 1,
      studentId: 'STU001',
      studentName: 'Anonymous Student A',
      date: '2024-01-22',
      duration: '50 minutes',
      type: 'Individual Therapy',
      status: 'Completed',
      severity: 'Moderate',
      notes: 'Student showing improvement in anxiety management. Discussed coping strategies and homework assignments.'
    },
    {
      id: 2,
      studentId: 'STU002',
      studentName: 'Anonymous Student B',
      date: '2024-01-22',
      duration: '30 minutes',
      type: 'Check-in',
      status: 'Completed',
      severity: 'Low',
      notes: 'Regular follow-up session. Student reports stable mood and good sleep patterns.'
    },
    {
      id: 3,
      studentId: 'STU003',
      studentName: 'Anonymous Student C',
      date: '2024-01-21',
      duration: '60 minutes',
      type: 'Crisis Intervention',
      status: 'Follow-up Required',
      severity: 'High',
      notes: 'Emergency session for acute stress reaction. Implemented safety plan and scheduled follow-up.'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Moderate': return 'outline';
      case 'Low': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Session Notes
        </h1>
        <p className="text-muted-foreground text-lg">
          Document and review counselling sessions
        </p>
      </div>

      {/* Search and New Note */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sessions by student ID, date, or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          New Session Note
        </Button>
      </div>

      {/* Session Notes List */}
      <div className="space-y-4">
        {mockSessions.map((session) => (
          <Card key={session.id} className="border-0 bg-card/80 backdrop-blur-sm hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5" />
                    Session #{session.id}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {session.studentName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {session.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {session.duration}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge variant={getSeverityColor(session.severity) as any}>
                    {session.severity} Risk
                  </Badge>
                  <Badge variant="outline">
                    {session.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Session Notes</h4>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {session.notes}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                  <Badge variant={session.status === 'Completed' ? 'secondary' : 'outline'}>
                    {session.status}
                  </Badge>
                    <span className="text-xs text-muted-foreground">
                      Student ID: {session.studentId}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit Notes
                    </Button>
                    <Button variant="outline" size="sm">
                      View History
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Session Note Form */}
      <Card className="mt-8 border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Create New Session Note</CardTitle>
          <CardDescription>
            Document your counselling session details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Student ID</label>
              <Input placeholder="Enter student ID" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Session Type</label>
              <select className="w-full px-3 py-2 border rounded-lg bg-background">
                <option>Individual Therapy</option>
                <option>Group Therapy</option>
                <option>Check-in</option>
                <option>Crisis Intervention</option>
                <option>Assessment</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Duration (minutes)</label>
              <Input type="number" placeholder="50" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Risk Level</label>
              <select className="w-full px-3 py-2 border rounded-lg bg-background">
                <option>Low</option>
                <option>Moderate</option>
                <option>High</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">Session Notes</label>
            <Textarea 
              placeholder="Document the session details, progress notes, and any important observations..."
              rows={6}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Save Draft</Button>
            <Button className="bg-gradient-primary hover:opacity-90">
              Save Session Note
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};