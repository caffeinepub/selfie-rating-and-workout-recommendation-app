import { Card, CardContent } from '@/components/ui/card';

export default function WorkoutIllustrationCard() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <img
          src="/assets/generated/workouts-illustration.dim_1200x800.png"
          alt="Workout illustration"
          className="w-full h-auto object-cover"
        />
      </CardContent>
    </Card>
  );
}
