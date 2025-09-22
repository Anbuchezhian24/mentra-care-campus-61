import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { StudentDashboard } from './dashboards/StudentDashboard';
import { CounsellorDashboard } from './dashboards/CounsellorDashboard';
import { AdminDashboard } from './dashboards/AdminDashboard';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8 flex items-center justify-center min-h-[50vh]">
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Route to appropriate dashboard based on user role
  switch (userRole) {
    case 'counsellor':
      return <CounsellorDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'student':
    default:
      return <StudentDashboard />;
  }
};