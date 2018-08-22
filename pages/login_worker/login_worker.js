// pages/login_worker/login_worker.js
const app = getApp()
const globalData = app.globalData
const myRequest = require('../../lib/api/request')
const AV = require('../../utils/av-weapp-min.js');

Page({
    data: {
      // name: "姓名",
      // student_number: "学生卡号",
      // phone_number: "手机号",
      address_name: "请选择宿舍楼",
      show: 'display: none;'
    },

  getUserInfo: function (e) {
    let page = this
    console.log(1111, e)
    globalData.userInfo = e.detail.userInfo 
    page.setData({
      avatar: e.detail.userInfo.avatarUrl
    })

    wx.showToast({ title: '登录中...', icon: 'loading', duration: 1000 })
    console.log(7777, globalData)
  if (page.data.photo === undefined || page.data.static_pay_qr === undefined ){
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
  } else {
    myRequest.put({
      path: `users/${globalData.userId}`,
      data: {
        name: page.data.name,
        student_number: page.data.student_number,
        phone_number: page.data.phone_number,
        address_name: page.data.address_name,
        address_lat: page.data.address_lat,
        address_lng: page.data.address_lng,
        photo: page.data.photo,
        static_pay_qr: page.data.static_pay_qr,
        avatar: page.data.avatar
      },
      success(res) {
        console.log(98989, res)
        if (res.statusCode > 300) {
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
        } else {
          globalData.userName = res.data.name
          globalData.userStudentNumber = res.data.student_number
          globalData.userPhoneNumber = res.data.phone_number
          globalData.userAddressName = res.data.address_name
          globalData.userAddressLat = res.data.address_lat
          globalData.userAddressLng = res.data.address_lng
          globalData.userQR = res.data.static_pay_qr
          globalData.userPhoto = res.data.photo
          globalData.userAvatar = res.data.avatar

          console.log(987654321, page.data.currentPackage)

          myRequest.post({
            path: 'deliveries',
            data: {
              worker_id: globalData.userId,
              package_id: page.data.currentPackage
            },
            success(res) {
              console.log(98989, res)
              myRequest.put({
                path: `packages/${page.data.currentPackage}`,
                data: {
                  available: false,
                  accepted: true,
                },
                success(res) {
                  console.log(999999, res)
                }
              })
            }
          })
          wx.showToast({ title: '操作成功!', icon: 'success', duration: 1000 })
          setTimeout(function () {
          wx.reLaunch({
            url: '/pages/my_deliveries/my_deliveries'
          })
          }, 1000)
        }
        // setTimeout(function () {
        //   wx.navigateTo({
        //     // url: '/pages/my_deliveries/my_deliveries'
        //   })
        // }, 1000)
      }
    })
  }
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

takePhoto1: function () {
  let page = this
  wx.chooseImage({
    count: 1,
    sizeType: ['original'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      var tempFilePaths = res.tempFilePaths
      console.log(2323, tempFilePaths)
      let tempFilePath = res.tempFilePaths[0];
      page.setData({tempPhotoPlaceholder: tempFilePath})
      console.log('sending image to LeanCloud')
      new AV.File('file-name', {
        blob: {
          uri: tempFilePath,
        },
      }).save().then( function(file) {
            console.log(file.url()) 
            page.setData({ photo: file.url() })
            console.log(222, page.data.photo)
        
      }).catch(console.error);
    }
  });
},

takePhoto2: function () {
  let page = this
  wx.chooseImage({
    count: 1,
    sizeType: ['original'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      var tempFilePaths = res.tempFilePaths
      console.log(tempFilePaths)
      let tempFilePath = res.tempFilePaths[0];
      page.setData({ tempQrPlaceholder: tempFilePath })
      console.log('sending image to LeanCloud')
      new AV.File('file-name', {
        blob: {
          uri: tempFilePath,
        },
      }).save().then(function (file) {
        console.log(file.url())
        page.setData({ static_pay_qr: file.url() })
        console.log(222, page.data.static_pay_qr)
      }).catch(console.error);
    }
  });
},

  onLoad: function (options) {
    console.log(555,options)
    let cP = parseInt(options.id, 10)
    if (globalData.userName != null){
    this.setData({
      currentPackage: cP,
      name: globalData.userName,
      phone_number: globalData.userPhoneNumber,
      student_number: globalData.userStudentNumber,
      address_name: globalData.userAddressName,
      address_lat: globalData.userAddressLat,
      address_lng: globalData.userAddressLng,
    })
    console.log(112233, this.data)
    }else {
      this.setData({
        currentPackage: cP
      })
    }
    console.log(11223344, this.data.currentPackage)
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