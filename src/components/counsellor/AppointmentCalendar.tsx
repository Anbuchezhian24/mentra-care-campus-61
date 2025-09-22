import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CalendarIcon, Clock, User, Phone, Video } from 'lucide-react';
import { format } from 'date-fns';

interface Appointment {
  id: number;
  studentName: string;
  studentId: string;
  date: Date;
  time: string;
  type: 'individual' | 'group' | 'crisis' | 'followup';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  mode: 'inperson' | 'online' | 'phone';
  reason: string;
  notes?: string;
}

const mockAppointments: Appointment[] = [
  {
    id: 1,
    studentName: "Sarah Johnson",
    studentId: "STU001",
    date: new Date(2024, 0, 15),
    time: "10:00 AM",
    type: "individual",
    status: "confirmed",
    priority: "medium",
    mode: "inperson",
    reason: "Anxiety and stress management"
  },
  {
    id: 2,
    studentName: "Michael Chen",
    studentId: "STU002",
    date: new Date(2024, 0, 15),
    time: "2:00 PM",
    type: "crisis",
    status: "pending",
    priority: "high",
    mode: "online",
    reason: "Depression symptoms"
  },
  {
    id: 3,
    studentName: "Emma Davis",
    studentId: "STU003",
    date: new Date(2024, 0, 16),
    time: "11:00 AM",
    type: "followup",
    status: "confirmed",
    priority: "low",
    mode: "phone",
    reason: "Progress check-in"
  }
];

export const AppointmentCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const getAppointmentsForDate = (date: Date) => {
    return mockAppointments.filter(
      appointment => appointment.date.toDateString() === date.toDateString()
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'online': return <Video className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar View */}
      <div className="lg:col-span-1">
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border-0"
              modifiers={{
                hasAppointment: (date) => getAppointmentsForDate(date).length > 0
              }}
              modifiersStyles={{
                hasAppointment: {
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                  borderRadius: '0.5rem'
                }
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Appointments List */}
      <div className="lg:col-span-2">
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>
              Appointments for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Selected Date'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedDate && getAppointmentsForDate(selectedDate).length > 0 ? (
                getAppointmentsForDate(selectedDate).map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{appointment.studentName}</h4>
                          <Badge variant="outline" className="text-xs">
                            {appointment.studentId}
                          </Badge>
                          <Badge variant={getPriorityColor(appointment.priority) as any}>
                            {appointment.priority}
                          </Badge>
                          <Badge variant={getStatusColor(appointment.status) as any}>
                            {appointment.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {appointment.time}
                          </span>
                          <span className="flex items-center gap-1">
                            {getModeIcon(appointment.mode)}
                            {appointment.mode}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {appointment.type}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedAppointment(appointment)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Appointment Details</DialogTitle>
                          </DialogHeader>
                          {selectedAppointment && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <label className="font-medium">Student:</label>
                                  <p className="text-muted-foreground">{selectedAppointment.studentName}</p>
                                </div>
                                <div>
                                  <label className="font-medium">Student ID:</label>
                                  <p className="text-muted-foreground">{selectedAppointment.studentId}</p>
                                </div>
                                <div>
                                  <label className="font-medium">Date & Time:</label>
                                  <p className="text-muted-foreground">
                                    {format(selectedAppointment.date, 'MMM d, yyyy')} at {selectedAppointment.time}
                                  </p>
                                </div>
                                <div>
                                  <label className="font-medium">Mode:</label>
                                  <p className="text-muted-foreground capitalize">{selectedAppointment.mode}</p>
                                </div>
                              </div>
                              
                              <div>
                                <label className="font-medium">Reason:</label>
                                <p className="text-sm text-muted-foreground mt-1">{selectedAppointment.reason}</p>
                              </div>
                              
                              <div className="flex gap-2 pt-4">
                                <Button size="sm" className="flex-1">
                                  Start Session
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1">
                                  Reschedule
                                </Button>
                                <Button size="sm" variant="destructive" className="flex-1">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No appointments scheduled for this date</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};