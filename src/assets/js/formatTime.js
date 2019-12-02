export default {
  install (Vue) {
    class DateTime {
      static ensureLength (reg, value, formatter) {
        let execRes = reg.exec(formatter)
        if (!execRes) {
          return ''
        }
        let res = '' + value
        while (execRes[0].length > res.length) {
          res = '0' + res
        }
        return res
      }

      constructor (timestamp) {
        this.charRegAndVal = [
          { reg: /y+/g, val: 0 },
          { reg: /m+/g, val: 0 },
          { reg: /d+/g, val: 0 },
          { reg: /H+/g, val: 0 },
          { reg: /M+/g, val: 0 },
          { reg: /S+/g, val: 0 }
        ]
        this.timestamp = timestamp
        this.date = new Date(timestamp * 1000)
        this.charRegAndVal[0].val = this.date.getFullYear()
        this.charRegAndVal[1].val = this.date.getMonth() + 1
        this.charRegAndVal[2].val = this.date.getDate()
        this.charRegAndVal[3].val = this.date.getHours()
        this.charRegAndVal[4].val = this.date.getMinutes()
        this.charRegAndVal[5].val = this.date.getSeconds()
      }

      format (formatter) {
        this.charRegAndVal.forEach(label => {
          let replacer = DateTime.ensureLength(label.reg, label.val, formatter)
          formatter = formatter.replace(label.reg, replacer)
        })
        return formatter
      }
    }

    let cachedDateTime = new DateTime()
    /** mount formatTime */
    Vue.prototype.$formatTime = function formatTime (timestamp, formatter = 'yyyy/mm/dd') {
      if (!timestamp || timestamp < 0) {
        return ''
      }
      if ((timestamp - 0) !== cachedDateTime.timestamp) {
        cachedDateTime = new DateTime(timestamp)
      }
      return cachedDateTime.format(formatter)
    }
  }
}
