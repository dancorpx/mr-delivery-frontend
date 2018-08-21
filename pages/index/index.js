const app = getApp()
const globalData = app.globalData
const myRequest = require('../../lib/api/request')

Page({
  onPullDownRefresh: function () {
    wx.startPullDownRefresh()
  },
  data: {
    showPopup: false,
    shouldNotPopup: false,
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

  bindAddPage: function(e) {
    if (globalData.userPhoneNumber === null ) {
      wx.navigateTo({
        url: '/pages/login_user/login_user',
      })
    }else{
      wx.navigateTo({
        url: '/pages/post_item/post_item',
      })
    }
  },

  openLocation: function (e) {
    console.log(1122334455,e.currentTarget.dataset.package.delivery_location_lat)
    wx.openLocation({
      latitude: e.currentTarget.dataset.package.delivery_location_lat,
      longitude: e.currentTarget.dataset.package.delivery_location_lng,
      scale: 18
    })
  },



  bindAddDelivery: function(e) {
    let page = this
    this.setData({ shouldNotPopup : true})
    if (globalData.userPhoto === null) {
      wx.navigateTo({
        url: `/pages/login_worker/login_worker?id=${e.currentTarget.dataset.hi}`,
      })
    } else if (globalData.userId ===  e.currentTarget.dataset.customer_id) {
      wx.showModal({
        title: ' 错误!',
        content: "你不能添加自己的包裹!",
        success: function (res) {
          if (res.confirm) {
            console.log('confirm')
          } else if (res.cancel) {
            console.log('cancel')
          }
        }
      })
    } else {
    wx.showModal({
      title: '是否确认?',
      content: '一旦确认，你需要将包裹送至目的地',
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
              wx.showToast({ title: '操作成功!', icon: 'success', duration: 1000 })
            }
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/my_deliveries/my_deliveries'
            })
          }, 1000)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    }
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
        
          page.setData({packages: res.data.packages.reverse()})
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

  },

  expandCard: function (e) {
    if(this.data.shouldNotPopup == false) {
    console.log(565656, e)
    this.setData({ delivery_location_name: e.currentTarget.dataset.delivery_location_name })
    this.setData({ delivery_time_start: e.currentTarget.dataset.delivery_time_start })
    this.setData({ delivery_time_end: e.currentTarget.dataset.delivery_time_end })
    this.setData({ price: e.currentTarget.dataset.price })
    this.setData({ size: e.currentTarget.dataset.size })
    this.setData({ avatar: e.currentTarget.dataset.avatar })
    this.setData({ name: e.currentTarget.dataset.name })
    this.setData({ phone_number: e.currentTarget.dataset.phone_number })
    this.setData({ kuai_di_code: e.currentTarget.dataset.kuai_di_code })
    this.setData({ comment: e.currentTarget.dataset.comment })
    this.setData({showPopup:true})
    }
    this.setData({ shouldNotPopup: false })
  },

  closePopup: function (e) {
    this.setData({showPopup:false})
  }
})