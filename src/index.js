Component({
  properties: {

  },
  data: {
    weekday: ['一', '二', '三', '四', '五', '六', '日']
  },
  lifetimes: {
    attached() {
    }
  },
  methods: {
    _getMonthDays(year, month) {
      return new Date(year, month + 1, 0).getDate()
    },

    _getWeekDay(year, month, day) {
      return new Date(year, month, day).getDate + 1
    },

    _tf(i) {
      i = (typeof i == 'string' ? parseInt(i) : i);
      return (i < 10 ? '0' : '') + i
    },

    _formatDate(startStamp, format) {
      const dateObj = new Date(startStamp)
      const year = _tf(dateObj.getFullYear())
      const month = _tf(dateObj.getMonth() + 1)
      const date = _tf(dateObj.getDate())

      switch(format) {
        case 'YYYY-MM':
          return `${year}-${month}`
        default:
          return `${year}-${month}-${date}`
      }
    },
    _initStartEnd() {
      const startStamp = new Date().getTime()

    }
  }
})
