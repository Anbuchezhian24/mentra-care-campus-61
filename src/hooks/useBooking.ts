import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface Counsellor {
  id: string;
  user_id: string;
  speciality: string;
  experience_years: number;
  rating: number;
  bio: string;
  availability: string;
  created_at: string;
  profiles?: {
    first_name: string;
    last_name: string;
    avatar_url?: string;
  };
}

export interface Appointment {
  id: string;
  student_id: string;
  counsellor_id: string;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  created_at: string;
  counsellor?: {
    profiles?: {
      first_name: string;
      last_name: string;
    };
  };
}

// Mock data for demonstration (replace with real database once tables are created)
const mockCounsellors: Counsellor[] = [
  {
    id: '1',
    user_id: '1',
    speciality: 'Anxiety & Stress Management',
    experience_years: 8,
    rating: 4.9,
    bio: 'Dr. Sarah Johnson specializes in helping students manage anxiety and academic stress through evidence-based therapeutic approaches.',
    availability: 'Mon-Wed, 9AM-5PM',
    created_at: new Date().toISOString(),
    profiles: {
      first_name: 'Dr. Sarah',
      last_name: 'Johnson'
    }
  },
  {
    id: '2',
    user_id: '2',
    speciality: 'Depression & Academic Pressure',
    experience_years: 12,
    rating: 4.8,
    bio: 'Dr. Michael Chen has extensive experience in treating depression and helping students cope with academic pressure.',
    availability: 'Tue-Thu, 10AM-6PM',
    created_at: new Date().toISOString(),
    profiles: {
      first_name: 'Dr. Michael',
      last_name: 'Chen'
    }
  },
  {
    id: '3',
    user_id: '3',
    speciality: 'Social Anxiety & Relationships',
    experience_years: 6,
    rating: 4.9,
    bio: 'Dr. Emily Rodriguez focuses on social anxiety disorders and relationship counseling for young adults.',
    availability: 'Wed-Fri, 8AM-4PM',
    created_at: new Date().toISOString(),
    profiles: {
      first_name: 'Dr. Emily',
      last_name: 'Rodriguez'
    }
  }
];

export const useBooking = () => {
  const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user, userRole } = useAuth();

  // Fetch counsellors (using mock data for now)
  const fetchCounsellors = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCounsellors(mockCounsellors);
    } catch (error) {
      console.error('Error fetching counsellors:', error);
      toast({
        title: "Error",
        description: "Failed to load counsellors. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch user appointments (using localStorage for now)
  const fetchAppointments = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const stored = localStorage.getItem(`appointments_${user.id}`);
      const userAppointments = stored ? JSON.parse(stored) : [];
      setAppointments(userAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        title: "Error",
        description: "Failed to load appointments. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Book appointment (store in localStorage for now)
  const bookAppointment = async (
    counsellorId: string,
    date: Date,
    time: string,
    notes?: string
  ) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to book an appointment.",
        variant: "destructive",
      });
      return false;
    }

    try {
      setLoading(true);
      
      const counsellor = counsellors.find(c => c.id === counsellorId);
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        student_id: user.id,
        counsellor_id: counsellorId,
        appointment_date: date.toISOString().split('T')[0],
        appointment_time: time,
        status: 'pending',
        notes: notes || '',
        created_at: new Date().toISOString(),
        counsellor: {
          profiles: counsellor?.profiles
        }
      };

      const stored = localStorage.getItem(`appointments_${user.id}`);
      const existingAppointments = stored ? JSON.parse(stored) : [];
      const updatedAppointments = [...existingAppointments, newAppointment];
      
      localStorage.setItem(`appointments_${user.id}`, JSON.stringify(updatedAppointments));
      setAppointments(updatedAppointments);

      toast({
        title: "Appointment booked!",
        description: "Your appointment has been scheduled. The counsellor will confirm it soon.",
      });

      return true;
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Booking failed",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update appointment status
  const updateAppointmentStatus = async (appointmentId: string, status: string) => {
    if (!user) return false;

    try {
      setLoading(true);
      
      const stored = localStorage.getItem(`appointments_${user.id}`);
      const existingAppointments = stored ? JSON.parse(stored) : [];
      const updatedAppointments = existingAppointments.map((apt: Appointment) =>
        apt.id === appointmentId ? { ...apt, status } : apt
      );
      
      localStorage.setItem(`appointments_${user.id}`, JSON.stringify(updatedAppointments));
      setAppointments(updatedAppointments);

      toast({
        title: "Appointment updated",
        description: `Appointment ${status} successfully.`,
      });

      return true;
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast({
        title: "Update failed",
        description: "Failed to update appointment. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounsellors();
    if (user) {
      fetchAppointments();
    }
  }, [user, userRole]);

  return {
    counsellors,
    appointments,
    loading,
    fetchCounsellors,
    fetchAppointments,
    bookAppointment,
    updateAppointmentStatus,
  };
};