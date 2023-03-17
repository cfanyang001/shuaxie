
const app = getApp();

Page({
  data: {
    orders: [],
    currentStatus: 'all',
  },

  onLoad: function () {
    this.updateOrderData();
  },

  updateOrderData: function () {
    const orders = app.globalData.orders;

    // 过滤订单，仅显示符合当前状态的订单
    const filteredOrders = this.data.currentStatus === 'all'
      ? orders
      : orders.filter((order) => order.status === this.data.currentStatus);

    this.setData({
      orders: filteredOrders,
    });
  },

  changeStatus: function (event) {
    const status = event.currentTarget.dataset.status;
    this.setData({
      currentStatus: status,
    });

    this.updateOrderData();
  },

  cancelOrder: function (event) {
    const orderId = event.currentTarget.dataset.orderid;
    app.globalData.orders = app.globalData.orders.filter((order) => order.orderId !== orderId);
    wx.setStorageSync('orders', app.globalData.orders);
    this.updateOrderData();
  },

  confirmReceipt: function (event) {
    const orderId = event.currentTarget.dataset.orderid;
    const orders = app.globalData.orders;
    const index = orders.findIndex((order) => order.orderId === orderId);

    orders[index].status = '已完成';
    wx.setStorageSync('orders', orders);
    this.updateOrderData();
  },
});
