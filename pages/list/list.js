const dayMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', ]

Page({
  data: {
    futureWeather: [],
  },
  onPullDownRefresh() {
    this.getFuture(() => {
      wx.stopPullDownRefresh()
    })
  },
  onLoad() {
    this.getFuture()
  },
  getFuture(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',
      data: {
        city: '广州市',
        time: new Date().getTime()
      },
      success: res => {
        let result = res.data.result
        this.setFuture(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  setFuture(result){    
    let futureWeather = []
    for (let i = 0; i < 7; i++) {
      let date = new Date()
      date.setDate(date.getDate() + i)
      futureWeather.push({
        day: dayMap[date.getDay()],
        date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
        temp: `${result[i].minTemp}° - ${result[i].maxTemp}°`,
        iconPath: '/images/' + result[i].weather + '-icon.png'
      })
    }
    futureWeather[0].day = '今天'
    this.setData({
      futureWeather
    })
  }
})