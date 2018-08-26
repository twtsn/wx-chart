// pages/map/index.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    loading: false,
    latitude: 30.2084,
    longitude: 120.21201, 
    markers: []
  },
  onReady () {
    qqmapsdk = new QQMapWX({ key: '5NLBZ-EOH3P-5FVDF-VBXT5-BFZ27-UNBFX' });
    this.getCurrentMap();
  },
  onLoad () {
    this.init();
  },
  init() {
    this.mapCtx = wx.createMapContext('myMap');
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  getLocationText(longitude, latitude) {
    let _this = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(res);
        _this.setMarkers(longitude, latitude, res.result.address);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  setMarkers(longitude, latitude, address) {
    let markers = [
      {
        id: 0
        , longitude: longitude
        , latitude: latitude
        , label: {
          content: "当前位置: " + address,
          color: "#ff0000",
          fontSize: "14",
          bgColor: "#ffffff",
          display: "ALWAYS",
          textAlign: 'center'
        }
      }
    ];
    this.setData(
      { markers: markers }
    )
  },
  getCurrentMap() {
    let _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        _this.loading = false;
        _this.getLocationText(res.longitude, res.latitude);
      
      }
    })
  }
})