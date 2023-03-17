Page({
  data: {
    username: '',
    password: '',
  },

  inputUsername: function (event) {
    this.setData({
      username: event.detail.value,
    });
  },

  inputPassword: function (event) {
    this.setData({
      password: event.detail.value,
    });
  },

  login: function () {
    // 登录逻辑，调用微信登录API或者服务器API进行登录验证
    console.log('用户名:', this.data.username);
    console.log('密码:', this.data.password);
  },

  register: function () {
    // 跳转到注册页面
    wx.navigateTo({
      url: '/pages/register/register',
    });
  },
});
