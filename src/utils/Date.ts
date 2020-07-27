export function calcTime (date: string): string {
  const now = Date.now()
  const target = new Date(date)
  if (target.toString() === 'Invalid Date') {
    throw new Error('invalid input')
  }
  const days = msToDay(now - target.getTime())
  if (days <= 7) return `${days}D`
  if (days <= 30) return `${Math.floor(days / 7)}W`
  if (days <= 365) return `${Math.floor(days / 30)}M`
  return `${Math.floor(days / 365)}Y`
}

function msToDay (ms: number): number {
  return Math.floor(ms / 1000 / 3600 / 24)
}