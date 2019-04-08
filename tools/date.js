const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const dayInMonth = date.getDate()
const selected = [year, month, dayInMonth]

export function isLeapYear(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)
}

export function isToday(y, m, d) {
  return y === year && m === month && d === dayInMonth
}

export function isWeekend(emptyGrids, d) {
  return (emptyGrids + d) % 7 === 0 || (emptyGrids + d - 1) % 7 === 0
}

export function calEmptyGrid(y, m) {
  return new Date(`${y}/${m}/01 00:00:00`).getUTCDay()
}

export function calDaysInMonth(y, m) {
  const leapYear = isLeapYear()
  if (month === 2 && leapYear) {
    return 29
  }
  if (month === 2 && !leapYear) {
    return 28
  }
  if ([4, 6, 9, 11].includes(m)) {
    return 30
  }
  return 31
}

export function calWeekDay(y, m, d) {
  return new Date(`${y}/${m}/${d} 00:00:00`).getUTCDay()
}

export function calDays(y, m) {
  const emptyGrids = calEmptyGrid(y, m)
  const days = []
  for (let i = 1; i <= 31; i++) {
    const ifToday = isToday(y, m, i)
    const isSelected = selected[0] === y && selected[1] === m && selected[2] === i
    const today = ifToday ? 'today' : ''
    const select = isSelected ? 'selected' : ''
    const weekend = isWeekend(emptyGrids, i) ? 'weekend' : ''
    const todaySelected = ifToday && isSelected ? 'today-selected' : ''
    const day = {value: i, class: `date-bg ${weekend} ${today} ${select} ${todaySelected}`}
    days.push(day)
  }
  return days.slice(0, calDaysInMonth(y, m))
}
