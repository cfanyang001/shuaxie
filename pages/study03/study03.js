// pages/study03/study03.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 在页面的js文件中添加展示地图的函数
  showMap: function (latitude, longitude, accuracy) {
    const mapCtx = wx.createMapContext('myMap')
    mapCtx.moveToLocation({
      latitude,
      longitude,
      success(res) {
        // 设置标记点
        mapCtx.addMarker({
          iconPath: '/images/location.png',
          width: 32,
          height: 32,
          latitude,
          longitude,
          callout: {
            content: '您当前的位置',
            fontSize: 14,
            borderRadius: 5,
            bgColor: '#ffffff',
            padding: 5,
            display: 'ALWAYS'
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        // 在这里调用展示地图的函数，并把经纬度等信息传入
        showMap(latitude, longitude, accuracy)
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})