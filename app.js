//app.js
const AV =  require('./utils/av-weapp-min.js')
const config = require('./key.js')
AV.init({
  appId: config.appId,
  appKey: config.appSecret,
});

App({
  onLaunch: function () {
    console.log(444, this.globalData)
    const host = 'https://mrdelivery.wogengapp.cn/api/v1/'
    console.log(111, 'processing to login')
    wx.login({
      success: (res) => {
        console.log(222, res)
        wx.request({
          url: host + 'login',
          method: 'post',
          data: {
            code: res.code
          },
          success: (res) => {
            console.log(333, res)
            this.globalData.userId = res.data.userId
            this.globalData.userName = res.data.userName
            this.globalData.userStudentNumber = res.data.userStudentNumber
            this.globalData.userPhoneNumber = res.data.userPhoneNumber
            this.globalData.userAddressName = res.data.userAddressName
            this.globalData.userAddressLat = res.data.userAddressLat
            this.globalData.userAddressLng = res.data.userAddressLng
            this.globalData.userQR = res.data.userQR
            this.globalData.userPhoto = res.data.userPhoto
            this.globalData.userAvatar = res.data.userAvatar
            console.log(444, this.globalData)
          }
        })
      }
    })
  },
  globalData: {
    // userId: null,
    // userName: null,
    // userStudentNumber: null,
    // userPhoneNumber: null,
    // userAddressName: null,
    // userAddressLat: null,
    // userAddressLng: null,
    // userQR: null,
    // userPhoto: null,
    // userAvatar: null
  }   
})