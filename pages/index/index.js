const app = getApp()
const globalData = app.globalData
const myRequest = require('../../lib/api/request')

Page({
  data: {
  
 },
    goMyDeliveries: function() {
      wx.reLaunch({
       url: '/pages/my_deliveries/my_deliveries'
      })
    },
  goMyPackages: function () {
    wx.reLaunch({
      url: '/pages/my_packages/my_packages'
    })
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    let page = this
    // Fetch Items from API
    myRequest.get({
      path: 'packages/available',
        success(res) {
          console.log(3333, res)
          page.setData({packages: res.data.packages})
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(this.data.packages)
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