// pages/my_packages/my_packages.js
const app = getApp()
const globalData = app.globalData
const myRequest = require('../../lib/api/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  goMyDeliveries: function () {
    wx.reLaunch({
      url: '/pages/my_deliveries/my_deliveries'
    })
  },
  goIndex: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  bindAddPage: function (e) {
    if (globalData.userName === null) {
      wx.navigateTo({
        url: '/pages/login_user/login_user',
      })
    } else {
      wx.navigateTo({
        url: '/pages/post_item/post_item',
      })
    }
  },

 bindDestroy: function(e) {
   let page = this
   console.log(10000, e)

   wx.showModal({
     title: '删除',
     content: '你是否确定删除这个包裹?',
     success: function (res) {
       if (res.confirm) {
         myRequest.delete({
           path: `packages/${e.currentTarget.dataset.hi}`,
           success(res) {
             console.log(33331111, res)
             wx.showToast({ title: '成功删除!', icon: 'success', duration: 1000 })
           }
         })
         setTimeout(function () {
           wx.navigateTo({
             url: '/pages/my_packages/my_packages'
           })
         }, 1000)    
         } else if (res.cancel) {
         console.log('用户点击取消')
         }
     }
   })
 },

 bindPhone: function (e) {
    myRequest.get({
      path: `deliveries/${e.currentTarget.dataset.delivery.delivery.id}`,
      success(res) {
        wx.makePhoneCall({
      phoneNumber: `${res.data.worker.phone_number}`
    })
      }
    })
 },

  onLoad: function (options) {
   let page = this
    console.log(111222, globalData.userId)
    // myRequest.get({
    //   path: `packages/avaliable?${globalData.userId}`,
    //   success(res) {
    //     console.log(33331111, res)
    //     page.setData({ availablePackages: res.data.packages })
    //     console.log
    //   }
    // })
    myRequest.get({
          path: `packages/available?customer_id=${globalData.userId}`,
          success(res) {
          console.log(33331111, res)
          page.setData({ availablePackages: res.data.packages })
          console.log
        }
      })
    myRequest.get({
      path: `packages/accepted?customer_id=${globalData.userId}`,
        success(res) {
          console.log(33331111, res)
          page.setData({ acceptedPackages: res.data.packages })
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