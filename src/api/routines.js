function token() {
  return localStorage.getItem('gymToken')
}

export async function fetchRoutines() {
  const res = await fetch('/api/routines', {
    headers: { Authorization: `Bearer ${token()}` },
  })
  if (!res.ok) throw new Error('Failed to load routines')
  return res.json()
}

export async function saveDay(day, exercises) {
  await fetch(`/api/routines/${day}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify({ exercises }),
  })
}
