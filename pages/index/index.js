const app = getApp()
const globalData = app.globalData
const myRequest = require('../../lib/api/request')

Page({
  data: {},

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

  bindAddPage: function(e) {
    if (globalData.userName === undefined) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      wx.navigateTo({
        url: '/pages/post_item/post_item',
      })
    }
  },

  bindAddDelivery: function(e) {
    let page = this
    console.log(111122223333,e)
    wx.showModal({
      title: 'Accept?',
      content: 'Once accepted you have to delivery this package, you can call the other student to organise!"',
      success: function (res) {
        if (res.confirm) {
          myRequest.post({
            path: 'deliveries',
            data: {
              worker_id: globalData.userId,
              package_id: e.currentTarget.dataset.hi
            },
            success(res) {
              console.log(98989, res)
              myRequest.put({
                path: `packages/${e.currentTarget.dataset.hi}`,
                data: {
                  available: false,
                  accepted: true,
                },
                success(res){
                  console.log(999999, res)
                }
                })
              wx.showToast({ title: 'OK!', icon: 'success', duration: 1000 })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  onLoad: function (options) {
    let page = this
    // Fetch Items from API
    myRequest.get({
      path: 'packages/available',
        success(res) {
          console.log(9999,res)
          let trimmedNames = []
          res.data.packages.forEach(function (element) {
           
            trimmedNames.push(element.delivery_location_name.replace("四川大学江安校区", ""))
          })
          page.setData({packages: res.data.packages})
          page.setData({ trimmedNames: trimmedNames })
         console.log(88888, page.data)
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