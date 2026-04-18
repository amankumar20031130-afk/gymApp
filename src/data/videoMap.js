// Maps exercise names → { videoId, searchQuery }
// videoId: YouTube ID for embed; null = fall back to search link only
export const videoMap = {
  // ── From exercise library (verified) ──
  'Push-Up':                    { videoId: 'IODxDxX7oi4', searchQuery: 'perfect push up form tutorial' },
  'Bodyweight Squat':           { videoId: 'aclHkVaku9U', searchQuery: 'bodyweight squat perfect form' },
  'Plank':                      { videoId: 'ASdvN_XEl_c', searchQuery: 'perfect plank form tutorial' },
  'Glute Bridge':               { videoId: '8bbE64NuDTU', searchQuery: 'glute bridge proper form tutorial' },
  'Mountain Climber':           { videoId: 'nmwgirgXLYM', searchQuery: 'mountain climber exercise proper form' },
  'Dumbbell Bicep Curl':        { videoId: 'ykJmrZ5v0Oo', searchQuery: 'dumbbell bicep curl proper form' },
  'Barbell Bench Press':        { videoId: '4Y2ZdHCOXok', searchQuery: 'barbell bench press proper form Jeff Nippard' },
  'Pull-Up':                    { videoId: 'eGo4IYlbE5g', searchQuery: 'perfect pull up form no kipping' },
  'Barbell Back Squat':         { videoId: 'ultWZbUMPL8', searchQuery: 'barbell back squat perfect form' },
  'Overhead Press':             { videoId: '2yjwXTZbDtU', searchQuery: 'overhead press proper form tutorial' },
  'Bent-Over Barbell Row':      { videoId: '9efgcAjQe7E', searchQuery: 'barbell bent over row perfect form' },
  'Tricep Dips':                { videoId: '2z8JmcrW-As', searchQuery: 'tricep dips proper form tutorial' },
  'Walking Lunge':              { videoId: 'QOVaHwm-Q6U', searchQuery: 'walking lunge proper form no injury' },
  'Conventional Deadlift':      { videoId: 'op9kVnSso6Q', searchQuery: 'conventional deadlift perfect form' },
  'Pistol Squat (Assisted)':    { videoId: 'qDcniqddTeE', searchQuery: 'pistol squat tutorial progression' },

  // ── Additional exercises in suggestion programs ──
  'Dumbbell Bent-Over Row':     { videoId: 'GZbfZ033f74', searchQuery: 'dumbbell bent over row proper form' },
  'Dumbbell Shoulder Press':    { videoId: 'qEwKCR5JCog', searchQuery: 'dumbbell shoulder press proper form tutorial' },
  'Lateral Raises':             { videoId: '3VcKaXpzqRo', searchQuery: 'lateral raises proper form tutorial' },
  'Hammer Curl':                { videoId: 'TwD-YGVP4Bk', searchQuery: 'hammer curl proper form tutorial' },
  'Overhead Tricep Extension':  { videoId: 'nRiJVZDpdL0', searchQuery: 'overhead tricep extension proper form' },
  'Romanian Deadlift':          { videoId: 'JCXUYuzwNrM', searchQuery: 'romanian deadlift proper form tutorial' },
  'Incline Push-Up':            { videoId: 'cfns5BFkO_c', searchQuery: 'incline push up proper form tutorial' },
  'Calf Raise':                 { videoId: 'gwLzBJYoWlI', searchQuery: 'calf raise proper form standing' },
  'Leg Press':                  { videoId: 'IZxyjW7MPJQ', searchQuery: 'leg press proper form tutorial' },
  'Nordic Hamstring Curl':      { videoId: 'doNHBUKMIHQ', searchQuery: 'nordic hamstring curl tutorial form' },
  'Incline Dumbbell Press':     { videoId: 'IP4oeKh1Sd4', searchQuery: 'incline dumbbell press proper form' },
  'Seated Cable Row':           { videoId: 'GZbfZ033f74', searchQuery: 'seated cable row proper form tutorial' },
  'Face Pull':                  { videoId: 'eIq5CB9JfKE', searchQuery: 'face pull proper form tutorial' },
  'Incline Barbell Press':      { videoId: 'IP4oeKh1Sd4', searchQuery: 'incline barbell press proper form' },
  'Cable Lateral Raises':       { videoId: '3VcKaXpzqRo', searchQuery: 'cable lateral raises proper form' },
  'Tricep Pushdown':            { videoId: 'vB5OHsJ3EME', searchQuery: 'tricep pushdown cable proper form' },
  'Dumbbell Single-Arm Row':    { videoId: 'dFzSjGJpFdA', searchQuery: 'single arm dumbbell row proper form' },
  'Reverse Fly':                { videoId: 'Gs_QmAhDMKc', searchQuery: 'reverse fly rear delt proper form' },
  'Incline Dumbbell Curl':      { videoId: 'soxrZlIl35U', searchQuery: 'incline dumbbell curl long head bicep' },
  'Front Squat':                { videoId: 'uYumuL_G_V0', searchQuery: 'front squat proper form tutorial' },
  'Leg Curl':                   { videoId: 'ELOCsoDSmrg', searchQuery: 'leg curl hamstring machine proper form' },
  'Hip Flexor Stretch':         { videoId: '0N4HNqF8s3A', searchQuery: 'hip flexor stretch proper form' },
  'Brisk Walk / Jog':           { videoId: null,           searchQuery: 'proper running jogging form technique' },
  'Light Jog / Cycling':        { videoId: null,           searchQuery: 'zone 2 cardio running cycling beginner' },
}

export function getVideo(exerciseName) {
  return videoMap[exerciseName] ?? { videoId: null, searchQuery: `${exerciseName} proper form tutorial` }
}
