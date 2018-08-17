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

  bindPhone: function (e) {
    console.log(556644, e.currentTarget.dataset.userphone)
    wx.makePhoneCall({
      phoneNumber: `${e.currentTarget.dataset.userphone}`
    })
  },

  onLoad: function (options) {
    let page = this
    console.log(111222, globalData.userId)
    myRequest.get({
      path: `deliveries/accepted?worker_id=${globalData.userId}`,
      success(res) {
        console.log(33331111, res)
        page.setData({acceptedDeliveries: res.data.deliveries })
        console.log
      }
    })
    myRequest.get({
      path: `deliveries/completed?worker_id=${globalData.userId}`,
      success(res) {
        console.log(33331111, res)
        page.setData({ completedDeliveries: res.data.deliveries })
        console.log
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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