// pages/post_item/post_item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    items: [
      { name: 'small', value: '小', checked: 'true' },
      { name: 'medium', value: '中'},
      { name: 'large', value: '大' },
 
    ]

  },
  bindStartTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time1: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time2: e.detail.value
    })
  },
  
  grantAuthorizeLocation: function () {
    wx.authorize({
      scope: 'scope.userLocation',
      success(res) {
        console.log(33, res)
        wx.chooseLocation({
          success: function (res) {
            console.log(44, res)
          },
        })
      },
      fail(err) {
        console.log(44, err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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