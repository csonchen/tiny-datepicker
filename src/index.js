import {calEmptyGrid, calDays, calWeekDay} from '../tools/date'

const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const dayInMonth = date.getDate()
let selected = [year, month, dayInMonth]
const week = [
  {value: '周日', class: 'weekend'},
  {value: '周一', class: ''},
  {value: '周二', class: ''},
  {value: '周三', class: ''},
  {value: '周四', class: ''},
  {value: '周五', class: ''},
  {value: '周六', class: 'weekend'},
]
const weekMap = {
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六'
}

Component({
  properties: {

  },
  data: {
    currYear: year,
    currMonth: month,
    week,
    emptyGrids: calEmptyGrid(year, month),
    days: calDays(year, month),
    selected,
    dayInWeek: weekMap[calWeekDay(year, month, dayInMonth)]
  },
  lifetimes: {
    attached() {
    }
  },
  methods: {
    changeMonth(e) {
      const id = e.target.id
      let {currYear, currMonth} = this.data
      currMonth = id === 'prev' ? currMonth - 1 : currMonth + 1
      if (id === 'prev' && currMonth < 1) {
        currYear -= 1
        currMonth = 12
      }
      if (id === 'next' && currMonth > 12) {
        currYear += 1
        currMonth = 1
      }
      this.setData({
        currYear,
        currMonth,
        emptyGrids: calEmptyGrid(currYear, currMonth),
        days: calDays(currYear, currMonth)
      })
    },

    selectDate(e) {
      const data = e.target.dataset.selected
      selected = [...data]
      const days = calDays(data[0], data[1])
      const dayInWeek = weekMap[calWeekDay(data[0], data[1], data[2])]
      this.setData({
        selected,
        days,
        dayInWeek,
        currYear: data[0],
        currMonth: data[1],
      })
    }
  }
})
