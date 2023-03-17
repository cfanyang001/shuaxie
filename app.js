// app.js
App({
  onLaunch: function () {
    // 在小程序启动时执行的代码
    console.log('小程序启动');

    // 检查本地存储中是否有购物车数据，如果没有则初始化
    const cart = wx.getStorageSync('cart');
    if (!cart) {
      wx.setStorageSync('cart', []);
    }
  },
  globalData: {
    cartItems: []
  },
  onShow: function () {
    // 当小程序启动，或从后台进入前台显示时执行的代码
    console.log('小程序显示');
  },

  onHide: function () {
    // 当小程序从前台进入后台时执行的代码
    console.log('小程序隐藏');
  },

  onError: function (msg) {
    // 当小程序发生脚本错误，或者 api 调用失败时触发，会带上错误信息
    console.log('小程序发生错误：', msg);
  },

  // 全局数据
  globalData: {
    cart: [], // 购物车数据
  },

  // 添加商品到购物车的全局方法
  addToCart: function (product) {
    const cart = this.globalData.cart;
    const index = cart.findIndex((item) => item.id === product.id);

    if (index === -1) {
      // 商品不在购物车中，添加新商品
      product.count = 1;
      cart.push(product);
    } else {
      // 商品已经在购物车中，增加数量
      cart[index].count += 1;
    }

  
    // 更新全局购物车数据
    this.globalData.cart = cart;

    // 同步购物车数据到本地存储
    wx.setStorageSync('cart', cart);
  },
});
