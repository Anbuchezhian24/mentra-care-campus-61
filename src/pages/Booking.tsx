import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, User, Heart, Shield, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/hooks/useBooking";
import { BookingForm } from "@/components/booking/BookingForm";
import { AppointmentList } from "@/components/booking/AppointmentList";

const Booking = () => {
  const { user, userRole } = useAuth();
  const { counsellors, appointments, loading } = useBooking();
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-gradient-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-medium">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Book a Counsellor</h1>
          <p className="text-muted-foreground mb-6">
            Schedule confidential one-on-one sessions with our professional counsellors
          </p>
          <Card className="max-w-md mx-auto shadow-medium border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <LogIn className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Sign In Required</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Please sign in to view counsellors and book appointments
              </p>
              <Button 
                onClick={() => window.location.href = '/login'} 
                className="bg-gradient-primary hover:opacity-90"
              >
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="h-16 w-16 bg-gradient-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-medium">
          <Calendar className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Book a Counsellor</h1>
        <p className="text-muted-foreground">
          Schedule confidential one-on-one sessions with our professional counsellors
        </p>
        <Badge variant="secondary" className="mt-2">
          🔒 100% Confidential
        </Badge>
      </div>

      <Tabs defaultValue="counsellors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="counsellors">Find Counsellors</TabsTrigger>
          <TabsTrigger value="appointments">My Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="counsellors" className="space-y-6">
          {/* Counsellors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <Card key={i} className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="animate-pulse space-y-4">
                      <div className="h-16 w-16 bg-muted rounded-full mx-auto"></div>
                      <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mx-auto"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : counsellors.length > 0 ? (
              counsellors.map((counsellor) => (
                <Card key={counsellor.id} className="shadow-medium border-0 bg-card/50 backdrop-blur-sm hover:shadow-strong transition-all">
                  <CardHeader className="pb-4">
                    <div className="h-16 w-16 bg-gradient-wellness rounded-full mx-auto mb-3 flex items-center justify-center">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-center text-lg">
                      {counsellor.profiles?.first_name} {counsellor.profiles?.last_name}
                    </CardTitle>
                    <div className="text-center">
                      <Badge variant="outline" className="text-xs">
                        ⭐ {counsellor.rating} rating
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium text-sm text-primary">{counsellor.speciality}</p>
                      <p className="text-xs text-muted-foreground">{counsellor.experience_years} years experience</p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {counsellor.availability}
                    </div>

                    {counsellor.bio && (
                      <p className="text-xs text-muted-foreground line-clamp-2">{counsellor.bio}</p>
                    )}
                    
                    <Dialog open={dialogOpen && selectedCounsellor?.id === counsellor.id} onOpenChange={(open) => {
                      setDialogOpen(open);
                      if (!open) setSelectedCounsellor(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full bg-gradient-secondary hover:opacity-90"
                          onClick={() => setSelectedCounsellor(counsellor)}
                          disabled={userRole === 'counsellor'}
                        >
                          {userRole === 'counsellor' ? 'Cannot Book (Counsellor)' : 'Book Appointment'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Book Appointment</DialogTitle>
                        </DialogHeader>
                        {selectedCounsellor && (
                          <BookingForm 
                            counsellor={selectedCounsellor} 
                            onSuccess={() => {
                              setDialogOpen(false);
                              setSelectedCounsellor(null);
                            }}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No counsellors available at the moment.</p>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Privacy & Confidentiality
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-success rounded-full mt-2"></div>
                  <p className="text-sm text-muted-foreground">All sessions are completely confidential</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-success rounded-full mt-2"></div>
                  <p className="text-sm text-muted-foreground">Encrypted video calls and secure booking</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-success rounded-full mt-2"></div>
                  <p className="text-sm text-muted-foreground">No judgment, safe space for all students</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-secondary" />
                  What to Expect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-secondary rounded-full mt-2"></div>
                  <p className="text-sm text-muted-foreground">Professional, qualified mental health counsellors</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-secondary rounded-full mt-2"></div>
                  <p className="text-sm text-muted-foreground">Personalized support for your unique needs</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-secondary rounded-full mt-2"></div>
                  <p className="text-sm text-muted-foreground">Flexible scheduling around your classes</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">My Appointments</h2>
            <p className="text-muted-foreground">
              {userRole === 'student' 
                ? 'View and manage your upcoming counselling sessions'
                : 'Manage your student appointments'
              }
            </p>
          </div>
          
          <AppointmentList appointments={appointments} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Booking;