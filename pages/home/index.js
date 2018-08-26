// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 20, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let data = res.tempFiles;
        data.forEach((item) => {
          item.size = _this.getSize(item.size);
        });
        data = data.concat(_this.data.tempFilePaths);
        _this.setData({
          tempFilePaths: data
        })
      }
    })
  },
  getSize (size) {
    let kb = size/1024;
    if (kb > 1024) {
      let mb = kb / 1024;
      return mb.toFixed(2) + 'M';
    }
    return kb.toFixed(2) + 'KB';
  }

})