// Each program has a plan for every day of the week.
// exercises: array of { name, sets, reps, category, notes }
// type: 'workout' | 'rest' | 'cardio'

export const PROGRAMS = [
  {
    id: 'full-body-3x',
    name: 'Full Body 3×/Week',
    tag: 'Beginner',
    tagColor: '#22c55e',
    icon: '🌱',
    description: 'Train your whole body every session, 3 days a week. Perfect for beginners — easy to recover from and builds a solid foundation across all muscle groups.',
    frequency: '3 days/week',
    goal: 'Build Overall Strength',
    plan: {
      Monday: {
        type: 'workout',
        label: 'Full Body A',
        focus: 'Quad-dominant lower + Push upper',
        exercises: [
          { name: 'Bodyweight Squat', sets: '3', reps: '12', category: 'Legs', notes: 'Focus on depth and knee tracking' },
          { name: 'Push-Up', sets: '3', reps: '10', category: 'Chest', notes: 'Elbows at 45° — no flaring' },
          { name: 'Dumbbell Bent-Over Row', sets: '3', reps: '10', category: 'Back', notes: 'Flat back, elbows back' },
          { name: 'Dumbbell Shoulder Press', sets: '3', reps: '10', category: 'Shoulders', notes: 'Keep core braced' },
          { name: 'Plank', sets: '3', reps: '30 sec', category: 'Core', notes: 'Straight line head to heels' },
        ],
      },
      Tuesday: {
        type: 'rest',
        label: 'Rest & Recovery',
        focus: 'Let your muscles rebuild — this is when growth happens.',
        exercises: [],
      },
      Wednesday: {
        type: 'workout',
        label: 'Full Body B',
        focus: 'Hip-dominant lower + Pull upper',
        exercises: [
          { name: 'Glute Bridge', sets: '3', reps: '15', category: 'Legs', notes: 'Drive through heels, squeeze glutes at top' },
          { name: 'Dumbbell Bicep Curl', sets: '3', reps: '12', category: 'Arms', notes: 'No swinging — control the descent' },
          { name: 'Tricep Dips', sets: '3', reps: '10', category: 'Arms', notes: 'Use a chair or low bench' },
          { name: 'Lateral Raises', sets: '3', reps: '12', category: 'Shoulders', notes: 'Light weight, lead with elbows' },
          { name: 'Mountain Climber', sets: '3', reps: '20 each', category: 'Cardio', notes: 'Keep hips level — no bouncing' },
        ],
      },
      Thursday: {
        type: 'rest',
        label: 'Rest & Recovery',
        focus: 'Active rest — go for a walk or do light stretching.',
        exercises: [],
      },
      Friday: {
        type: 'workout',
        label: 'Full Body C',
        focus: 'Full compound movement day',
        exercises: [
          { name: 'Walking Lunge', sets: '3', reps: '10 each leg', category: 'Legs', notes: 'Long stride, upright torso' },
          { name: 'Push-Up', sets: '4', reps: '8', category: 'Chest', notes: 'Slow descent — 3 seconds down' },
          { name: 'Dumbbell Bent-Over Row', sets: '4', reps: '8', category: 'Back', notes: 'Heavier than Wednesday if possible' },
          { name: 'Overhead Press', sets: '3', reps: '10', category: 'Shoulders', notes: 'Core tight, ribs down' },
          { name: 'Plank', sets: '3', reps: '40 sec', category: 'Core', notes: 'Longer hold than Monday' },
        ],
      },
      Saturday: {
        type: 'cardio',
        label: 'Light Cardio / Mobility',
        focus: 'Optional — a 20–30 min walk, stretch, or yoga session.',
        exercises: [
          { name: 'Brisk Walk / Jog', sets: '1', reps: '20–30 min', category: 'Cardio', notes: 'Comfortable pace — not a sprint' },
          { name: 'Hip Flexor Stretch', sets: '2', reps: '30 sec each', category: 'Core', notes: 'Hold gently, don\'t force it' },
        ],
      },
      Sunday: {
        type: 'rest',
        label: 'Full Rest Day',
        focus: 'Complete rest. Sleep well and eat enough protein.',
        exercises: [],
      },
    },
  },

  {
    id: 'upper-lower-4x',
    name: 'Upper / Lower Split',
    tag: 'Beginner–Intermediate',
    tagColor: '#f97316',
    icon: '🔥',
    description: 'Train upper body and lower body on separate days, 4 days a week. Great for adding volume while still recovering properly.',
    frequency: '4 days/week',
    goal: 'Build Strength & Size',
    plan: {
      Monday: {
        type: 'workout',
        label: 'Upper Body A',
        focus: 'Chest, Back, Shoulders, Arms',
        exercises: [
          { name: 'Barbell Bench Press', sets: '4', reps: '8', category: 'Chest', notes: 'Control descent — 2 sec down' },
          { name: 'Pull-Up', sets: '4', reps: '6', category: 'Back', notes: 'Full dead hang at bottom, chin over bar' },
          { name: 'Overhead Press', sets: '3', reps: '8', category: 'Shoulders', notes: 'Press strict — no leg drive' },
          { name: 'Dumbbell Bicep Curl', sets: '3', reps: '10', category: 'Arms', notes: 'Supinate at top for peak contraction' },
          { name: 'Tricep Dips', sets: '3', reps: '10', category: 'Arms', notes: 'Upright torso = tricep focus' },
        ],
      },
      Tuesday: {
        type: 'workout',
        label: 'Lower Body A',
        focus: 'Quads, Glutes, Hamstrings, Core',
        exercises: [
          { name: 'Barbell Back Squat', sets: '4', reps: '8', category: 'Legs', notes: 'Knees out, chest up, hit depth' },
          { name: 'Romanian Deadlift', sets: '3', reps: '10', category: 'Legs', notes: 'Hinge at hips, feel hamstring stretch' },
          { name: 'Walking Lunge', sets: '3', reps: '10 each', category: 'Legs', notes: 'Add dumbbells for extra challenge' },
          { name: 'Glute Bridge', sets: '3', reps: '15', category: 'Legs', notes: 'Squeeze at top for 1 sec' },
          { name: 'Plank', sets: '3', reps: '45 sec', category: 'Core', notes: 'Brace core as if taking a punch' },
        ],
      },
      Wednesday: {
        type: 'rest',
        label: 'Rest & Recovery',
        focus: 'You\'ve hit every muscle — let them grow. Walk, stretch, hydrate.',
        exercises: [],
      },
      Thursday: {
        type: 'workout',
        label: 'Upper Body B',
        focus: 'Back-heavy upper + Arms',
        exercises: [
          { name: 'Bent-Over Barbell Row', sets: '4', reps: '8', category: 'Back', notes: 'Flat back — hinge to 45°' },
          { name: 'Incline Push-Up', sets: '4', reps: '10', category: 'Chest', notes: 'Hands elevated for upper chest' },
          { name: 'Lateral Raises', sets: '3', reps: '12', category: 'Shoulders', notes: 'Light weight — feel the burn' },
          { name: 'Hammer Curl', sets: '3', reps: '10', category: 'Arms', notes: 'Neutral grip — targets brachialis' },
          { name: 'Overhead Tricep Extension', sets: '3', reps: '12', category: 'Arms', notes: 'Elbows close to head' },
        ],
      },
      Friday: {
        type: 'workout',
        label: 'Lower Body B',
        focus: 'Hip-dominant lower + Core',
        exercises: [
          { name: 'Conventional Deadlift', sets: '4', reps: '6', category: 'Back', notes: 'Mid-foot under bar, brace before pulling' },
          { name: 'Leg Press', sets: '3', reps: '12', category: 'Legs', notes: 'Feet shoulder-width, don\'t lock knees' },
          { name: 'Nordic Hamstring Curl', sets: '3', reps: '8', category: 'Legs', notes: 'Slow controlled descent' },
          { name: 'Calf Raise', sets: '4', reps: '15', category: 'Legs', notes: 'Full range — all the way up and down' },
          { name: 'Mountain Climber', sets: '3', reps: '20 each', category: 'Cardio', notes: 'Steady pace, hips stable' },
        ],
      },
      Saturday: {
        type: 'cardio',
        label: 'Active Recovery',
        focus: 'Light cardio, mobility work, or sports.',
        exercises: [
          { name: 'Light Jog / Cycling', sets: '1', reps: '20 min', category: 'Cardio', notes: 'Low intensity — zone 2 effort' },
        ],
      },
      Sunday: {
        type: 'rest',
        label: 'Full Rest Day',
        focus: 'Complete rest. Prioritise sleep (7–9 hrs) and protein intake.',
        exercises: [],
      },
    },
  },

  {
    id: 'push-pull-legs',
    name: 'Push / Pull / Legs',
    tag: 'Intermediate',
    tagColor: '#ef4444',
    icon: '⚡',
    description: 'The classic PPL split — Push muscles (chest, shoulders, triceps), Pull muscles (back, biceps), and Legs each get their own dedicated session, twice a week.',
    frequency: '6 days/week',
    goal: 'Maximize Muscle Growth',
    plan: {
      Monday: {
        type: 'workout',
        label: 'Push Day A',
        focus: 'Chest, Shoulders, Triceps',
        exercises: [
          { name: 'Barbell Bench Press', sets: '4', reps: '6–8', category: 'Chest', notes: 'Primary chest movement — progressive overload focus' },
          { name: 'Overhead Press', sets: '4', reps: '8', category: 'Shoulders', notes: 'Strict press, no leg drive' },
          { name: 'Incline Dumbbell Press', sets: '3', reps: '10', category: 'Chest', notes: 'Upper chest emphasis' },
          { name: 'Lateral Raises', sets: '4', reps: '15', category: 'Shoulders', notes: 'Light weight, high reps' },
          { name: 'Tricep Dips', sets: '3', reps: '10', category: 'Arms', notes: 'Upright torso for tricep focus' },
          { name: 'Overhead Tricep Extension', sets: '3', reps: '12', category: 'Arms', notes: 'Long head stretch at bottom' },
        ],
      },
      Tuesday: {
        type: 'workout',
        label: 'Pull Day A',
        focus: 'Back, Biceps, Rear Delts',
        exercises: [
          { name: 'Pull-Up', sets: '4', reps: '6–8', category: 'Back', notes: 'Add weight with a belt if possible' },
          { name: 'Bent-Over Barbell Row', sets: '4', reps: '8', category: 'Back', notes: 'Primary back thickness movement' },
          { name: 'Seated Cable Row', sets: '3', reps: '10', category: 'Back', notes: 'Squeeze shoulder blades at end ROM' },
          { name: 'Face Pull', sets: '3', reps: '15', category: 'Shoulders', notes: 'Rear delt and external rotation health' },
          { name: 'Dumbbell Bicep Curl', sets: '3', reps: '10', category: 'Arms', notes: 'Supinate at top' },
          { name: 'Hammer Curl', sets: '3', reps: '10', category: 'Arms', notes: 'Brachialis emphasis' },
        ],
      },
      Wednesday: {
        type: 'workout',
        label: 'Legs Day A',
        focus: 'Quads, Glutes, Hamstrings, Calves',
        exercises: [
          { name: 'Barbell Back Squat', sets: '4', reps: '6–8', category: 'Legs', notes: 'Depth and knee tracking are key' },
          { name: 'Romanian Deadlift', sets: '3', reps: '10', category: 'Legs', notes: 'Feel the hamstring stretch — don\'t rush' },
          { name: 'Leg Press', sets: '3', reps: '12', category: 'Legs', notes: 'Full range of motion' },
          { name: 'Walking Lunge', sets: '3', reps: '10 each', category: 'Legs', notes: 'Add dumbbells for progression' },
          { name: 'Calf Raise', sets: '5', reps: '15', category: 'Legs', notes: 'Slow — calves respond to controlled reps' },
          { name: 'Plank', sets: '3', reps: '45 sec', category: 'Core', notes: 'Squeeze glutes and brace abs' },
        ],
      },
      Thursday: {
        type: 'workout',
        label: 'Push Day B',
        focus: 'Chest, Shoulders, Triceps (Volume)',
        exercises: [
          { name: 'Incline Barbell Press', sets: '4', reps: '8', category: 'Chest', notes: 'Upper chest focus — 30° incline' },
          { name: 'Dumbbell Shoulder Press', sets: '4', reps: '10', category: 'Shoulders', notes: 'Greater ROM than barbell' },
          { name: 'Push-Up', sets: '3', reps: '15', category: 'Chest', notes: 'Pump finisher — slow and controlled' },
          { name: 'Cable Lateral Raises', sets: '4', reps: '15', category: 'Shoulders', notes: 'Constant tension throughout' },
          { name: 'Tricep Pushdown', sets: '4', reps: '12', category: 'Arms', notes: 'Elbows tucked, squeeze at bottom' },
        ],
      },
      Friday: {
        type: 'workout',
        label: 'Pull Day B',
        focus: 'Back, Biceps (Volume)',
        exercises: [
          { name: 'Conventional Deadlift', sets: '3', reps: '5', category: 'Back', notes: 'Heavy compound — full body pull' },
          { name: 'Pull-Up', sets: '3', reps: '8', category: 'Back', notes: 'Wide grip for lat width' },
          { name: 'Dumbbell Single-Arm Row', sets: '3', reps: '10 each', category: 'Back', notes: 'Full stretch at bottom of each rep' },
          { name: 'Reverse Fly', sets: '3', reps: '15', category: 'Shoulders', notes: 'Rear delt isolation — light weight' },
          { name: 'Incline Dumbbell Curl', sets: '4', reps: '10', category: 'Arms', notes: 'Long head stretch on the incline' },
        ],
      },
      Saturday: {
        type: 'workout',
        label: 'Legs Day B',
        focus: 'Legs (Volume + Posterior Chain)',
        exercises: [
          { name: 'Front Squat', sets: '4', reps: '8', category: 'Legs', notes: 'More quad emphasis than back squat' },
          { name: 'Glute Bridge', sets: '4', reps: '15', category: 'Legs', notes: 'Add a barbell for progression' },
          { name: 'Leg Curl', sets: '3', reps: '12', category: 'Legs', notes: 'Hamstring isolation — control the descent' },
          { name: 'Pistol Squat (Assisted)', sets: '3', reps: '5 each', category: 'Legs', notes: 'Use a band or door for balance' },
          { name: 'Mountain Climber', sets: '3', reps: '20 each', category: 'Cardio', notes: 'Core finisher — keep hips level' },
        ],
      },
      Sunday: {
        type: 'rest',
        label: 'Rest Day',
        focus: 'Full rest. You\'ve earned it. Stretch, sleep, and eat well.',
        exercises: [],
      },
    },
  },
]

export const TYPE_META = {
  workout: { icon: '💪', color: '#ff4757', label: 'Workout Day' },
  rest: { icon: '😴', color: '#6b7280', label: 'Rest Day' },
  cardio: { icon: '🏃', color: '#06b6d4', label: 'Cardio / Active Recovery' },
}
