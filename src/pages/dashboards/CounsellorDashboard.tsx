import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Clock, User, MessageCircle, FileText, AlertTriangle, Send, Phone, Users, TrendingUp, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    studentName: "Sarah Johnson",
    studentId: "STU001",
    date: "2024-01-15",
    time: "10:00 AM",
    type: "Individual Counseling",
    status: "pending",
    priority: "medium",
    reason: "Anxiety and stress management"
  },
  {
    id: 2,
    studentName: "Michael Chen",
    studentId: "STU002", 
    date: "2024-01-15",
    time: "2:00 PM",
    type: "Crisis Intervention",
    status: "confirmed",
    priority: "high",
    reason: "Depression symptoms"
  },
  {
    id: 3,
    studentName: "Emma Davis",
    studentId: "STU003",
    date: "2024-01-16", 
    time: "11:00 AM",
    type: "Follow-up Session",
    status: "confirmed",
    priority: "low",
    reason: "Progress check-in"
  }
];

// Mock data for student cases
const mockStudentCases = [
  {
    id: 1,
    studentName: "Sarah Johnson",
    studentId: "STU001",
    totalSessions: 5,
    lastSession: "2024-01-10",
    status: "Active",
    riskLevel: "Medium",
    primaryConcerns: ["Anxiety", "Academic Stress"],
    phq9Score: 12,
    gad7Score: 8
  },
  {
    id: 2,
    studentName: "Michael Chen", 
    studentId: "STU002",
    totalSessions: 3,
    lastSession: "2024-01-12",
    status: "Active",
    riskLevel: "High",
    primaryConcerns: ["Depression", "Social Anxiety"],
    phq9Score: 18,
    gad7Score: 14
  }
];

export const CounsellorDashboard: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [sessionNotes, setSessionNotes] = useState<string>('');

  const handleAppointmentAction = (appointmentId: number, action: 'accept' | 'reject' | 'reschedule') => {
    console.log(`${action} appointment ${appointmentId}`);
    // TODO: Implement appointment action logic
  };

  const handleSaveNotes = () => {
    console.log('Saving notes for student:', selectedStudent, 'Notes:', sessionNotes);
    // TODO: Implement save notes logic
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'outline';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getRiskLevelColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'destructive';
      case 'Medium': return 'outline';
      case 'Low': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Counsellor Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your counselling practice and support students
        </p>
      </div>

      <Tabs defaultValue="appointments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="cases">Student Cases</TabsTrigger>
          <TabsTrigger value="notes">Session Notes</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
        </TabsList>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="space-y-6">
          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Appointment Requests
              </CardTitle>
              <CardDescription>
                Manage incoming appointment requests and your schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAppointments.map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{appointment.studentName}</h4>
                          <Badge variant="outline" className="text-xs">
                            {appointment.studentId}
                          </Badge>
                          <Badge variant={getPriorityColor(appointment.priority) as any}>
                            {appointment.priority} priority
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {appointment.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {appointment.time}
                          </span>
                        </div>
                        <p className="text-sm">{appointment.reason}</p>
                        <Badge variant={appointment.status === 'confirmed' ? 'secondary' : 'outline'}>
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAppointmentAction(appointment.id, 'accept')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAppointmentAction(appointment.id, 'reschedule')}
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Reschedule
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleAppointmentAction(appointment.id, 'reject')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Student Cases Tab */}
        <TabsContent value="cases" className="space-y-6">
          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Student Case Management
              </CardTitle>
              <CardDescription>
                Track student progress and manage confidential case information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {mockStudentCases.map((studentCase) => (
                  <div key={studentCase.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{studentCase.studentName}</h4>
                          <Badge variant="outline">{studentCase.studentId}</Badge>
                          <Badge variant={getRiskLevelColor(studentCase.riskLevel) as any}>
                            {studentCase.riskLevel} Risk
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{studentCase.totalSessions} sessions</span>
                          <span>Last: {studentCase.lastSession}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        View Full Case
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium mb-1">Primary Concerns:</p>
                        <div className="flex gap-1 flex-wrap">
                          {studentCase.primaryConcerns.map((concern, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {concern}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Assessment Scores:</p>
                        <div className="space-y-1">
                          <span className="text-xs">PHQ-9: {studentCase.phq9Score}/27</span>
                          <span className="text-xs block">GAD-7: {studentCase.gad7Score}/21</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Session Notes Tab */}
        <TabsContent value="notes" className="space-y-6">
          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Confidential Session Notes
              </CardTitle>
              <CardDescription>
                Document and manage confidential counselling session notes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Student</label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a student" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockStudentCases.map((student) => (
                        <SelectItem key={student.id} value={student.studentId}>
                          {student.studentName} ({student.studentId})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Session Date</label>
                  <Input type="date" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Session Notes</label>
                <Textarea
                  placeholder="Enter confidential session notes here..."
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">Save Draft</Button>
                <Button onClick={handleSaveNotes}>Save Notes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assessments Tab */}
        <TabsContent value="assessments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>PHQ-9 Depression Assessment</CardTitle>
                <CardDescription>
                  Patient Health Questionnaire for depression screening
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Over the last 2 weeks, how often have you been bothered by any of the following problems?
                  </p>
                  <Button className="w-full">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Start PHQ-9 Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>GAD-7 Anxiety Assessment</CardTitle>
                <CardDescription>
                  Generalized Anxiety Disorder scale for anxiety screening
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Over the last 2 weeks, how often have you been bothered by the following problems?
                  </p>
                  <Button className="w-full" variant="secondary">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Start GAD-7 Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Communication Tab */}
        <TabsContent value="communication" className="space-y-6">
          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Secure Communication
              </CardTitle>
              <CardDescription>
                Communicate securely with students and share resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <h4 className="font-medium mb-3">Active Conversations</h4>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2">
                      {mockStudentCases.map((student) => (
                        <div key={student.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{student.studentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{student.studentName}</p>
                            <p className="text-xs text-muted-foreground">Last active 2h ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="border rounded-lg h-[400px] flex flex-col">
                    <div className="p-4 border-b">
                      <h4 className="font-medium">Sarah Johnson</h4>
                      <p className="text-sm text-muted-foreground">Active now</p>
                    </div>
                    
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        <div className="bg-muted/50 rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm">Hi, I've been feeling quite anxious about my upcoming exams.</p>
                          <p className="text-xs text-muted-foreground mt-1">10:30 AM</p>
                        </div>
                        <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%] ml-auto">
                          <p className="text-sm">I understand your concern. Let's discuss some coping strategies in our next session.</p>
                          <p className="text-xs opacity-80 mt-1">10:35 AM</p>
                        </div>
                      </div>
                    </ScrollArea>
                    
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Input placeholder="Type your message..." className="flex-1" />
                        <Button size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Referrals Tab */}
        <TabsContent value="referrals" className="space-y-6">
          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Referral & Escalation System
              </CardTitle>
              <CardDescription>
                Manage emergency situations and external referrals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Emergency Contacts</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Crisis Helpline</p>
                        <p className="text-sm text-muted-foreground">24/7 Emergency Support</p>
                      </div>
                      <Button size="sm" variant="destructive">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Campus Security</p>
                        <p className="text-sm text-muted-foreground">Immediate campus assistance</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">External Referrals</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Psychiatrist Network</p>
                        <p className="text-sm text-muted-foreground">Specialized mental health care</p>
                      </div>
                      <Button size="sm" variant="secondary">
                        <Users className="h-4 w-4 mr-2" />
                        Refer
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Community Resources</p>
                        <p className="text-sm text-muted-foreground">Local support groups</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        View Options
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h4 className="font-medium mb-4">Create New Referral</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockStudentCases.map((student) => (
                        <SelectItem key={student.id} value={student.studentId}>
                          {student.studentName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Referral type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="psychiatrist">Psychiatrist</SelectItem>
                      <SelectItem value="emergency">Emergency Services</SelectItem>
                      <SelectItem value="support-group">Support Group</SelectItem>
                      <SelectItem value="medical">Medical Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Textarea 
                  placeholder="Referral notes and recommendations..."
                  className="mt-4"
                />
                
                <div className="flex justify-end mt-4">
                  <Button>Create Referral</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};