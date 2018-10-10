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
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#000000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })

  },
  chooseWxImage: function (type) {
    var _this = this;
    wx.chooseImage({
      count: 20, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [type],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let data = res.tempFiles;
        data.forEach((item) => {
          item.size = _this.getSize(item.size);
        });
        data = data.concat(_this.data.tempFilePaths);
        _this.setImgWidthAndHeight(data);
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
  },
  setImgWidthAndHeight (imgList) {
    let _this = this;
    let maxLen = imgList.length - 1;
    let imgData = [];
    imgList.forEach((item, i) => {
      _this.getImgInfo(item).then((imgInfo) => {
        imgData.push(Object.assign(item, imgInfo));
        if (i === maxLen) {
          _this.setData({
            tempFilePaths: imgData
          })
        }
      });
    });
  },
  getImgInfo(item) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: item.path,
        success(data) {
          let obj = {};
          obj.w = data.width;
          obj.h = data.height;
          obj.imgType = data.type;
          resolve(obj);
        }
      })
    });
  },
  previewImage (e) {
    var current = e.target.dataset.src;
    wx.getImageInfo({
      src: current,
      success (data) {
        console.info(data);
      }
    })
    let imgs = [];
    this.data.tempFilePaths.forEach((item) => {
      imgs.push(item.path);
    });
     wx.previewImage({ 
       current: current, // 当前显示图片的http链接		  	
       urls: imgs // 需要预览的图片http链接列表		
       })
  }
})