Page({
  data: {
    switchChecked: false,
    nodes: [
      {
        name: 'div',
        attrs: {
          class: 'my-class',
          style: 'color: red;'
        },
        children: [
          {
            type: 'text',
            text: 'Hello, rich-text!'
          }
        ]
      },
      
    ]
  },
  onSwitchChange: function (e) {
    this.setData({
      switchChecked: e.detail.value
    });
    console.log('Switch 状态已更改为：', e.detail.value);
  }
});
