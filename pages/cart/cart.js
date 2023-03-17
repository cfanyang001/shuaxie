const app = getApp();

Page({
  data: {
    cartItems: [],
    totalPrice: 0,
  },

  onLoad: function () {
    this.updateCartData();
  },

  onShow: function () {
    this.updateCartData();
  },

  updateCartData: function () {
    const cartItems = app.globalData.cart;
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.count, 0);

    this.setData({
      cartItems,
      totalPrice,
    });
  },

  decreaseQuantity: function (event) {
    const id = event.currentTarget.dataset.id;
    const cartItems = this.data.cartItems;
    const index = cartItems.findIndex((item) => item.id === id);

    if (cartItems[index].count > 1) {
      cartItems[index].count -= 1;
    } else {
      cartItems.splice(index, 1);
    }

    app.globalData.cart = cartItems;
    wx.setStorageSync('cart', cartItems);
    this.updateCartData();
  },

  increaseQuantity: function (event) {
    const id = event.currentTarget.dataset.id;
    const cartItems = this.data.cartItems;
    const index = cartItems.findIndex((item) => item.id === id);

    cartItems[index].count += 1;

    app.globalData.cart = cartItems;
    wx.setStorageSync('cart', cartItems);
    this.updateCartData();
  },

  deleteItem: function (event) {
    const id = event.currentTarget.dataset.id;
    const cartItems = this.data.cartItems.filter((item) => item.id !== id);

    app.globalData.cart = cartItems;
    wx.setStorageSync('cart', cartItems);
    this.updateCartData();
  },

  checkout: function () {
    // 实现结算功能，例如跳转到订单确认页面或直接下单
  },
});
