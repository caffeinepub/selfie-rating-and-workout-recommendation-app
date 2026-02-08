import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateWorkout, type WorkoutPreferences, type WorkoutPlan } from '../../lib/workouts/generator';
import { Dumbbell, Clock, Target, AlertCircle } from 'lucide-react';
import WorkoutIllustrationCard from './WorkoutIllustrationCard';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function WorkoutsPage() {
  const [preferences, setPreferences] = useState<WorkoutPreferences>({
    goal: 'general',
    daysPerWeek: 3,
    equipment: 'bodyweight',
  });
  const [generatedPlan, setGeneratedPlan] = useState<WorkoutPlan | null>(null);

  const handleGenerate = () => {
    const plan = generateWorkout(preferences);
    setGeneratedPlan(plan);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Home Workouts</h2>
        <p className="text-muted-foreground">
          Get personalized home workout routines designed for ages 13+ based on your goals and available equipment.
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>For ages 13+:</strong> These workouts are designed for teens and beginners. Always focus on proper form first, 
          stop if you feel pain, and consider working with a parent, coach, or trainer when starting out.
        </AlertDescription>
      </Alert>

      <WorkoutIllustrationCard />

      <Card>
        <CardHeader>
          <CardTitle>Workout Preferences</CardTitle>
          <CardDescription>
            Tell us about your fitness goals and we'll create a custom home workout plan for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="goal">Fitness Goal</Label>
            <Select
              value={preferences.goal}
              onValueChange={(value: any) => setPreferences({ ...preferences, goal: value })}
            >
              <SelectTrigger id="goal">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Fitness</SelectItem>
                <SelectItem value="strength">Build Strength</SelectItem>
                <SelectItem value="endurance">Improve Endurance</SelectItem>
                <SelectItem value="flexibility">Increase Flexibility</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="days">Days Per Week</Label>
            <Select
              value={preferences.daysPerWeek.toString()}
              onValueChange={(value) =>
                setPreferences({ ...preferences, daysPerWeek: parseInt(value) })
              }
            >
              <SelectTrigger id="days">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 days</SelectItem>
                <SelectItem value="3">3 days</SelectItem>
                <SelectItem value="4">4 days</SelectItem>
                <SelectItem value="5">5 days</SelectItem>
                <SelectItem value="6">6 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="equipment">Available Equipment</Label>
            <Select
              value={preferences.equipment}
              onValueChange={(value: any) => setPreferences({ ...preferences, equipment: value })}
            >
              <SelectTrigger id="equipment">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bodyweight">Bodyweight Only (No Equipment)</SelectItem>
                <SelectItem value="minimal">Light Dumbbells/Resistance Bands</SelectItem>
                <SelectItem value="gym">Home Gym Equipment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleGenerate} size="lg" className="w-full">
            <Target className="mr-2 h-5 w-5" />
            Generate Workout Plan
          </Button>
        </CardContent>
      </Card>

      {generatedPlan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-primary" />
              Your Custom Home Workout Plan
            </CardTitle>
            <CardDescription>{generatedPlan.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {generatedPlan.days.map((day, dayIndex) => (
              <div key={dayIndex} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <h3 className="text-xl font-semibold">{day.name}</h3>
                  <span className="text-sm text-muted-foreground">({day.focus})</span>
                </div>

                <div className="space-y-4">
                  {day.exercises.map((exercise, exIndex) => (
                    <div
                      key={exIndex}
                      className="p-4 rounded-lg bg-accent/50 space-y-2"
                    >
                      <h4 className="font-semibold text-lg">{exercise.name}</h4>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          <span>{exercise.sets} sets × {exercise.reps}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{exercise.rest} rest</span>
                        </div>
                      </div>
                      {exercise.notes && (
                        <p className="text-sm text-muted-foreground italic">
                          💡 {exercise.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t space-y-2">
              <h4 className="font-semibold">Important Safety Notes (Ages 13+):</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Always warm up for 5-10 minutes before starting (light cardio, dynamic stretches)</li>
                <li>Focus on proper form over speed or heavy weights - quality beats quantity</li>
                <li>Stop immediately if you feel sharp pain or discomfort</li>
                <li>Stay hydrated throughout your workout</li>
                <li>Rest at least one day between intense sessions to allow recovery</li>
                <li>Consider working with a parent, coach, or certified trainer when starting out</li>
                <li>This is not medical advice - consult a healthcare professional before starting any new exercise program</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
