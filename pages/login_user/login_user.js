// pages/login_user/login_user.js
const app = getApp()
const globalData = app.globalData
const myRequest = require('../../lib/api/request')

Page({
  data: {
    address_name: "请选择宿舍楼",
  },

  getUserInfo: function (e) {
    let page = this
    console.log(1111,e)
    globalData.userInfo = e.detail.userInfo
    page.setData({
      avatar: e.detail.userInfo.avatarUrl
    })

    wx.showToast({ title: '登录中...', icon: 'loading', duration: 1000 })
    console.log(7777,     globalData)
    myRequest.put({ 
      path: `users/${globalData.userId}`,
      data: {
        name: page.data.name,
        student_number: page.data.student_number,
        phone_number: page.data.phone_number,
        address_name: page.data.address_name,
        address_lat: page.data.address_lat,
        address_lng: page.data.address_lng,
        avatar: page.data.avatar
      },
      success(res) {
        console.log(98989, res)
        if (res.statusCode != 200) {
          wx.showModal({
            title: '错误',
            content: '您输入的信息有误',
            success: function (res) {
              if (res.confirm) {
                console.log('confirm')
              } else if (res.cancel) {
                console.log('cancel')
              }
            }
          })
        }else{
        globalData.userName = res.data.name
        globalData.userStudentNumber = res.data.student_number
        globalData.userPhoneNumber = res.data.phone_number
        globalData.userAddressName = res.data.address_name
        globalData.userAddressLat = res.data.address_lat
        globalData.userAddressLng = res.data.address_lng
        globalData.userQR = res.data.static_pay_qr
        globalData.userPhoto = res.data.photo
        globalData.userAvatar = res.data.avatar

        wx.showToast({ title: '操作成功!', icon: 'success', duration: 1000 })
        }
      }
    })
    setTimeout(function () {
      wx.navigateBack({
        // url: '/pages/index/index'
        delta: 1
      })
    }, 1000)
  },
  bindSubmit: function (e) {
    let page = this
    page.setData({
      name: e.detail.value.name,
      phone_number: e.detail.value.phone_number,
      student_number: e.detail.value.student_number
    })  
  },

  grantAuthorizeLocation: function () {
    let page = this
    wx.authorize({
      scope: 'scope.userLocation',
      success(res) {
        console.log(33, res)
        wx.chooseLocation({
          success: function (res) {
            console.log(44, res)
            page.setData({
              address_name: res.name,
              address_lat: res.latitude,
              address_lng: res.longitude
            })
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