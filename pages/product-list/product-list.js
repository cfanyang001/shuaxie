Page({
  data: {
    searchValue: '',
    products: [], // 示例数据，实际开发中请根据需要获取商品数据
    currentPage: 1,
    totalPages: 10,
  },

  onSearchInput: function (event) {
    this.setData({
      searchValue: event.detail.value,
    });
  },

  addToCart: function () {
    // 实现添加到购物车的逻辑，如将商品信息添加到本地存储或全局数据
  },

  prevPage: function () {
    if (this.data.currentPage > 1) {
      this.setData({
        currentPage: this.data.currentPage - 1,
      });
      // 在此处添加请求上一页商品数据的逻辑
    }
  },

  nextPage: function () {
    if (this.data.currentPage < this.data.totalPages) {
      this.setData({
        currentPage: this.data.currentPage + 1,
      });
      // 在此处添加请求下一页商品数据的逻辑
    }
  },

  onLoad: function () {
    // 在此处添加获取商品列表数据的逻辑
    // 示例数据
    this.setData({
      products: [
        {
          id: 1,
          image: 'https://via.placeholder.com/100',
          name: '商品1',
          price: 100,
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/100',
          name: '商品2',
          price: 200,
        },
        // 更多商品数据...
      ],
    });
  },
});
