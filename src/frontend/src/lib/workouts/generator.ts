export type WorkoutGoal = 'general' | 'strength' | 'endurance' | 'flexibility';
export type EquipmentType = 'bodyweight' | 'gym' | 'minimal';

export interface WorkoutPreferences {
  goal: WorkoutGoal;
  daysPerWeek: number;
  equipment: EquipmentType;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

export interface WorkoutDay {
  name: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  description: string;
  days: WorkoutDay[];
}

export function generateWorkout(preferences: WorkoutPreferences): WorkoutPlan {
  const { goal, daysPerWeek, equipment } = preferences;

  if (equipment === 'bodyweight') {
    return generateBodyweightPlan(goal, daysPerWeek);
  } else if (equipment === 'gym') {
    return generateGymPlan(goal, daysPerWeek);
  } else {
    return generateMinimalPlan(goal, daysPerWeek);
  }
}

function generateBodyweightPlan(goal: WorkoutGoal, days: number): WorkoutPlan {
  const basePlan: WorkoutDay[] = [
    {
      name: 'Day 1',
      focus: 'Upper Body Push',
      exercises: [
        { name: 'Push-ups', sets: 3, reps: '8-12', rest: '60s', notes: 'Modify on knees if needed' },
        { name: 'Pike Push-ups', sets: 3, reps: '6-10', rest: '60s', notes: 'Targets shoulders' },
        { name: 'Tricep Dips', sets: 3, reps: '8-12', rest: '60s', notes: 'Use a chair or bench' },
        { name: 'Plank', sets: 3, reps: '30-60s', rest: '45s', notes: 'Keep core tight' },
      ],
    },
    {
      name: 'Day 2',
      focus: 'Lower Body',
      exercises: [
        { name: 'Bodyweight Squats', sets: 3, reps: '12-15', rest: '60s', notes: 'Keep chest up' },
        { name: 'Lunges', sets: 3, reps: '10 each leg', rest: '60s', notes: 'Alternate legs' },
        { name: 'Glute Bridges', sets: 3, reps: '12-15', rest: '45s', notes: 'Squeeze at the top' },
        { name: 'Calf Raises', sets: 3, reps: '15-20', rest: '45s', notes: 'Use a step for range' },
      ],
    },
    {
      name: 'Day 3',
      focus: 'Upper Body Pull & Core',
      exercises: [
        { name: 'Inverted Rows', sets: 3, reps: '8-12', rest: '60s', notes: 'Use a table or bar' },
        { name: 'Superman Holds', sets: 3, reps: '20-30s', rest: '45s', notes: 'Strengthen lower back' },
        { name: 'Bicycle Crunches', sets: 3, reps: '15 each side', rest: '45s', notes: 'Slow and controlled' },
        { name: 'Mountain Climbers', sets: 3, reps: '20 total', rest: '45s', notes: 'Keep hips low' },
      ],
    },
  ];

  return {
    description: `A ${days}-day bodyweight home training program for ages 13+ focusing on ${goal} fitness. Perfect for home workouts with no equipment needed.`,
    days: basePlan.slice(0, Math.min(days, 3)),
  };
}

function generateGymPlan(goal: WorkoutGoal, days: number): WorkoutPlan {
  const basePlan: WorkoutDay[] = [
    {
      name: 'Day 1',
      focus: 'Upper Body Push',
      exercises: [
        { name: 'Dumbbell Bench Press', sets: 3, reps: '10-12', rest: '75s', notes: 'Start with light weight' },
        { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '75s', notes: 'Upper chest focus' },
        { name: 'Dumbbell Shoulder Press', sets: 3, reps: '10-12', rest: '60s', notes: 'Seated or standing' },
        { name: 'Tricep Pushdowns (Cable)', sets: 3, reps: '12-15', rest: '60s', notes: 'Keep elbows stable' },
        { name: 'Plank', sets: 3, reps: '30-60s', rest: '45s', notes: 'Core stability' },
      ],
    },
    {
      name: 'Day 2',
      focus: 'Lower Body',
      exercises: [
        { name: 'Goblet Squats', sets: 3, reps: '12-15', rest: '75s', notes: 'Hold dumbbell at chest' },
        { name: 'Dumbbell Lunges', sets: 3, reps: '10 each leg', rest: '60s', notes: 'Alternate legs' },
        { name: 'Leg Press (Machine)', sets: 3, reps: '12-15', rest: '75s', notes: 'Moderate weight' },
        { name: 'Leg Curls (Machine)', sets: 3, reps: '12-15', rest: '60s', notes: 'Controlled tempo' },
        { name: 'Calf Raises', sets: 3, reps: '15-20', rest: '60s', notes: 'Pause at top' },
      ],
    },
    {
      name: 'Day 3',
      focus: 'Upper Body Pull',
      exercises: [
        { name: 'Lat Pulldowns', sets: 3, reps: '10-12', rest: '75s', notes: 'Pull to upper chest' },
        { name: 'Seated Cable Rows', sets: 3, reps: '10-12', rest: '75s', notes: 'Squeeze shoulder blades' },
        { name: 'Dumbbell Rows', sets: 3, reps: '10-12 each', rest: '60s', notes: 'One arm at a time' },
        { name: 'Dumbbell Curls', sets: 3, reps: '10-12', rest: '60s', notes: 'No swinging' },
        { name: 'Face Pulls (Cable)', sets: 3, reps: '15-20', rest: '60s', notes: 'Rear delt focus' },
      ],
    },
    {
      name: 'Day 4',
      focus: 'Full Body',
      exercises: [
        { name: 'Dumbbell Thrusters', sets: 3, reps: '10-12', rest: '75s', notes: 'Squat to press' },
        { name: 'Dumbbell RDLs', sets: 3, reps: '12-15', rest: '60s', notes: 'Hinge at hips' },
        { name: 'Push-ups', sets: 3, reps: '10-15', rest: '60s', notes: 'Bodyweight finisher' },
        { name: 'Plank to Downward Dog', sets: 3, reps: '10-12', rest: '45s', notes: 'Core and mobility' },
      ],
    },
  ];

  return {
    description: `A ${days}-day home gym program for ages 13+ targeting ${goal}. Uses light to moderate dumbbells and basic home gym equipment with teen-safe exercises.`,
    days: basePlan.slice(0, Math.min(days, 4)),
  };
}

function generateMinimalPlan(goal: WorkoutGoal, days: number): WorkoutPlan {
  const basePlan: WorkoutDay[] = [
    {
      name: 'Day 1',
      focus: 'Upper Body',
      exercises: [
        { name: 'Dumbbell Bench Press', sets: 3, reps: '10-12', rest: '75s', notes: 'On floor or bench' },
        { name: 'Dumbbell Rows', sets: 3, reps: '10-12 each', rest: '60s', notes: 'One arm at a time' },
        { name: 'Dumbbell Shoulder Press', sets: 3, reps: '10-12', rest: '60s', notes: 'Seated or standing' },
        { name: 'Band Pull-aparts', sets: 3, reps: '15-20', rest: '45s', notes: 'Rear delts' },
      ],
    },
    {
      name: 'Day 2',
      focus: 'Lower Body',
      exercises: [
        { name: 'Goblet Squats', sets: 3, reps: '12-15', rest: '75s', notes: 'Hold dumbbell at chest' },
        { name: 'Dumbbell Lunges', sets: 3, reps: '10 each leg', rest: '60s', notes: 'Dumbbells at sides' },
        { name: 'Dumbbell RDLs', sets: 3, reps: '12-15', rest: '60s', notes: 'Hinge at hips' },
        { name: 'Band Glute Bridges', sets: 3, reps: '15-20', rest: '45s', notes: 'Band above knees' },
      ],
    },
    {
      name: 'Day 3',
      focus: 'Full Body',
      exercises: [
        { name: 'Dumbbell Thrusters', sets: 3, reps: '10-12', rest: '75s', notes: 'Squat to press' },
        { name: 'Renegade Rows', sets: 3, reps: '8 each side', rest: '60s', notes: 'In plank position' },
        { name: 'Band Chest Press', sets: 3, reps: '12-15', rest: '60s', notes: 'Anchor band behind' },
        { name: 'Dumbbell Curls to Press', sets: 3, reps: '10-12', rest: '60s', notes: 'Combo movement' },
      ],
    },
  ];

  return {
    description: `A ${days}-day home program for ages 13+ using light dumbbells and resistance bands. Efficient workouts for ${goal} fitness with minimal equipment.`,
    days: basePlan.slice(0, Math.min(days, 3)),
  };
}
