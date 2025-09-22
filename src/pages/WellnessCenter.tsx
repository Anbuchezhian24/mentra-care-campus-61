import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Sunrise, Moon, Waves, Mountain } from 'lucide-react';

export const WellnessCenter: React.FC = () => {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const breathingExercises = [
    {
      id: 1,
      name: '4-7-8 Breathing',
      description: 'A calming technique to reduce anxiety and promote sleep',
      duration: '5 minutes',
      icon: Sunrise,
      steps: ['Inhale for 4 counts', 'Hold for 7 counts', 'Exhale for 8 counts', 'Repeat cycle']
    },
    {
      id: 2,
      name: 'Box Breathing',
      description: 'Square breathing pattern for focus and relaxation',
      duration: '10 minutes', 
      icon: Mountain,
      steps: ['Inhale for 4 counts', 'Hold for 4 counts', 'Exhale for 4 counts', 'Hold for 4 counts']
    }
  ];

  const meditationTracks = [
    {
      id: 1,
      title: 'Ocean Waves',
      description: 'Gentle ocean sounds for deep relaxation',
      duration: '20 min',
      icon: Waves,
      category: 'Nature Sounds'
    },
    {
      id: 2,
      title: 'Forest Rain',
      description: 'Peaceful rainfall in a quiet forest',
      duration: '30 min',
      icon: Mountain,
      category: 'Nature Sounds'
    },
    {
      id: 3,
      title: 'Morning Meditation',
      description: 'Start your day with mindful awareness',
      duration: '15 min',
      icon: Sunrise,
      category: 'Guided Meditation'
    },
    {
      id: 4,
      title: 'Sleep Stories',
      description: 'Calming bedtime stories for better sleep',
      duration: '25 min',
      icon: Moon,
      category: 'Sleep Aid'
    }
  ];

  const handlePlayPause = (trackId: string) => {
    if (currentAudio === trackId && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentAudio(trackId);
      setIsPlaying(true);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-wellness bg-clip-text text-transparent mb-2">
          Wellness Center
        </h1>
        <p className="text-muted-foreground text-lg">
          Guided relaxation, meditation, and mindfulness tools
        </p>
      </div>

      {/* Breathing Exercises */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Sunrise className="h-6 w-6 text-primary" />
          Breathing Exercises
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {breathingExercises.map((exercise) => {
            const Icon = exercise.icon;
            return (
              <Card key={exercise.id} className="border-0 bg-card/80 backdrop-blur-sm hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>{exercise.name}</CardTitle>
                      <CardDescription>{exercise.duration}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {exercise.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <h4 className="font-medium text-sm">Steps:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {exercise.steps.map((step, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    <Play className="h-4 w-4 mr-2" />
                    Start Exercise
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Meditation & Audio */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Waves className="h-6 w-6 text-secondary" />
          Meditation & Relaxation Audio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {meditationTracks.map((track) => {
            const Icon = track.icon;
            const isCurrentTrack = currentAudio === track.id.toString();
            const isCurrentlyPlaying = isCurrentTrack && isPlaying;
            
            return (
              <Card key={track.id} className="border-0 bg-card/80 backdrop-blur-sm hover:shadow-medium transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Icon className="h-8 w-8 text-secondary" />
                    <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full">
                      {track.category}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{track.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {track.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">{track.duration}</span>
                    {isCurrentTrack && (
                      <div className="flex items-center gap-1">
                        <div className={`h-2 w-2 rounded-full ${isPlaying ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
                        <span className="text-xs text-muted-foreground">
                          {isPlaying ? 'Playing' : 'Paused'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handlePlayPause(track.id.toString())}
                    >
                      {isCurrentlyPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button size="sm" variant="outline">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Relaxation Tools */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Moon className="h-6 w-6 text-accent-foreground" />
          Quick Relaxation Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 bg-gradient-calm text-center p-8">
            <CardContent className="space-y-4">
              <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Sunrise className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Progressive Muscle Relaxation</h3>
              <p className="text-white/80 text-sm">
                Release tension throughout your body with guided exercises
              </p>
              <Button variant="secondary" className="mt-4">
                Start Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-secondary text-center p-8">
            <CardContent className="space-y-4">
              <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Mountain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Mindfulness Moments</h3>
              <p className="text-white/80 text-sm">
                Quick 2-minute mindfulness exercises for busy schedules
              </p>
              <Button variant="secondary" className="mt-4">
                Try Now
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-primary text-center p-8">
            <CardContent className="space-y-4">
              <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Waves className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Stress Relief Toolkit</h3>
              <p className="text-white/80 text-sm">
                Emergency techniques for immediate stress and anxiety relief
              </p>
              <Button variant="secondary" className="mt-4">
                Access Toolkit
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};