const app = getApp()
const globalData = app.globalData
const myRequest = require('../../lib/api/request')

Page({
  data: {
    showPopup: true,
  },



  bindSubmit: function(e) {
    let page = this 
    console.log(e)
    if (e.detail.value.verification_code === globalData.currentConfirmVerification) {
      myRequest.put({
          path: `packages/${globalData.currentConfirmPackage}`,
          data: {
            available: false,
            accepted: false,
            completed: true
          },
          success(res) {
           page.setData({showPopup: false});
          }
        })
        wx.showToast({ title: '本次快递结束!', icon: 'success', duration: 1000 })
        // setTimeout(function () {
        //   wx.navigateTo({
        //     url: '/pages/my_deliveries/my_deliveries'
        //   })
        // }, 1000)
               
    }else{
      wx.showModal({
        title: '错误!',
        content: '验证码有误',
        success: function (res) {}
      })
    }
  },

  onLoad: function() {
    this.setData({
      qr_code: globalData.userQR
    })
  }
})