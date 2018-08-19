const app = getApp()
const globalData = app.globalData
const myRequest = require('../../lib/api/request')

Page({

  data: { },

  goIndex: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  goMyPackages: function () {
    wx.reLaunch({
      url: '/pages/my_packages/my_packages'
    })
  },

  openLocation: function (e) {
    console.log(1122334455, e.currentTarget.dataset.package.delivery_location_lat)
    wx.openLocation({
      latitude: e.currentTarget.dataset.package.delivery_location_lat,
      longitude: e.currentTarget.dataset.package.delivery_location_lng,
      scale: 18
    })
  },

  bindPhone: function (e) {
    console.log(556644, e.currentTarget.dataset.userphone)
    wx.makePhoneCall({
      phoneNumber: `${e.currentTarget.dataset.userphone}`
    })
  },

  bindComplete: function (e) {
    console.log(1122334455, e)
    globalData.currentConfirmPackage = e.currentTarget.dataset.hi
    globalData.currentConfirmVerification = e.currentTarget.dataset.verification
    wx.showModal({
      title: '是否确认?',
      content: '包裹的主人已收到包裹',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/code_confirm_pay/code_confirm_pay',
          })
        }
      }
    })
  },


  onLoad: function (options) {
    let page = this
    console.log(111222, globalData.userId)
    myRequest.get({
      path: `deliveries/accepted?worker_id=${globalData.userId}`,
      success(res) {
        console.log(33331111, res)
        page.setData({acceptedDeliveries: res.data.deliveries.reverse() })
        console.log
      }
    })
    myRequest.get({
      path: `deliveries/completed?worker_id=${globalData.userId}`,
      success(res) {
        console.log(33331111, res)
        page.setData({ completedDeliveries: res.data.deliveries.reverse() })
        console.log
      }
    })
  },


  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})

// myRequest.put({
//   path: `packages/${e.currentTarget.dataset.hi}`,
//   data: {
//     available: false,
//     accepted: false,
//     completed: true
//   },
//   success(res) {
//     console.log(999999, res)
//   }
// })
// wx.showToast({ title: '本次快递结束!', icon: 'success', duration: 1000 })
// setTimeout(function () {
//   wx.navigateTo({
//     url: '/pages/my_deliveries/my_deliveries'
//   })
// }, 1000)
//         } else if (res.cancel) {
//   console.log('用户点击取消')