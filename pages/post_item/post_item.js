// pages/post_item/post_item.js
const app = getApp()
const globalData = app.globalData
const myRequest = require('../../lib/api/request')

Page({

  data: {
    delivery_location_name: "请选择宿舍楼",
    name: "姓名",
    phone_number: "手机号",

    items: [
      { name: 'Small', value: '小', checked: 'true' },
      { name: 'Medium', value: '中'},
      { name: 'Large', value: '大' },
    ],
    size: "Small"
  },

  radioChange: function (e) {
    console.log(e)
    console.log(46464646464, e.detail.value)
    this.setData({size: e.detail.value})
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
    let page = this
    wx.authorize({
      scope: 'scope.userLocation',
      success(res) {
        console.log(33, res)
        wx.chooseLocation({
          success: function (res) {
            console.log(7777777, res)
            console.log(77778888, page.data)
            page.setData({
              delivery_location_name: res.name,
              delivery_location_lat: res.latitude,
              delivery_location_lng: res.longitude
            })
            console.log(78787878, page.data)
          },
        })
      },
      fail(err) {
        console.log(44, err)
      }
    })
  },
  
  bindSubmit: function (e) {
    let page = this
    console.log(11111, e)
    page.setData({
      name: e.detail.value.name,
      phone_number: e.detail.value.phone_number,
      student_number: e.detail.value.student_number
    })
    myRequest.post({
      path: `packages`,
      data: {
        customer_id: globalData.userId,
        name_on_package:  e.detail.value.name_on_package ,
        phone_on_package: e.detail.value.phone_on_package ,
        kuai_di_code: e.detail.value.kuai_di_code,
        size: page.data.size,
        price: 3,
        delivery_location_name: page.data.delivery_location_name ,
        delivery_location_lat: page.data.delivery_location_lat,
        delivery_location_lng: page.data.delivery_location_lng,
        delivery_time_start: page.data.time1,
        delivery_time_end: page.data.time2,
        comment: e.detail.value.comment
      },
      success(res) {
        console.log(98989, res)
        if (res.statusCode < 300 ) {
        wx.showToast({ title: '操作成功!', icon: 'success', duration: 1000 })
        wx.reLaunch({
          url: '/pages/my_packages/my_packages'
        })
        } else {
          wx.showModal({
            title: '错误',
            content: `${res.data.errors}`,
            success: function (res) {
              if (res.confirm) {
                console.log('confirm')
              } else if (res.cancel) {
                console.log('cancel')
              }
            }
          })
        }
      }
    })
    // setTimeout(function () {
    //   wx.reLaunch({
    //     url: '/pages/my_packages/my_packages'   
    //   })
    // }, 1000)
  },



  onLoad: function (options) {
    
    this.setData({
      name: globalData.userName,
      phone_number: globalData.userPhoneNumber,
      delivery_location_name: globalData.userAddressName,
      delivery_location_lat: globalData.userAddressLat,
      delivery_location_lng: globalData.userAddressLng,
    })
    console.log(112233, this.data)
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