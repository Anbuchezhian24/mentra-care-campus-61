import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBooking, type Appointment } from '@/hooks/useBooking';
import { useAuth } from '@/contexts/AuthContext';

interface AppointmentListProps {
  appointments: Appointment[];
}

export const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
  const { updateAppointmentStatus, loading } = useBooking();
  const { userRole } = useAuth();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-primary" />;
      default:
        return <AlertCircle className="h-4 w-4 text-warning" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'cancelled':
        return 'destructive';
      case 'completed':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (appointments.length === 0) {
    return (
      <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No appointments scheduled yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                {getStatusIcon(appointment.status)}
                {userRole === 'student' 
                  ? `${appointment.counsellor?.profiles?.first_name} ${appointment.counsellor?.profiles?.last_name}`
                  : 'Appointment'
                }
              </CardTitle>
              <Badge variant={getStatusVariant(appointment.status) as any}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(new Date(appointment.appointment_date), 'PPP')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.appointment_time}</span>
              </div>
            </div>

            {appointment.notes && (
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">{appointment.notes}</p>
              </div>
            )}

            {userRole === 'counsellor' && appointment.status === 'pending' && (
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                  disabled={loading}
                  className="bg-gradient-secondary hover:opacity-90"
                >
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            )}

            {userRole === 'counsellor' && appointment.status === 'confirmed' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                disabled={loading}
              >
                Mark as Completed
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};