import Taro from "@tarojs/taro";

var AMAPSDK = {};
/**
 * @description 拍照和从相册选择
 * @param paramObj | object | 拍照参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.chooseImage = function (paramObj, successCallBack) {
  Taro.chooseImage({
    count: paramObj.count, // 默认9
    sizeType: "original",
    sourceType: paramObj.sourceType, // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
    success: function (res) {
      console.log(res);
      successCallBack(res);
    },
  });
};

/**
 * @description 拍摄视频或从手机相册中选视频
 * @param paramObj | object | 拍照参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.chooseVideo = function (paramObj, successCallBack) {
  Taro.chooseVideo({
    sourceType: paramObj.sourceType, // 可以指定来源是相册还是相机，默认二者都有
    maxDuration: 60,
    camera: "back",
    success: function (res) {
      console.log(res);
      successCallBack(res);
    },
  });
};

/**
 * @description 保存文件
 * @param paramObj | object | 参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.saveFile = function (paramObj, successCallBack) {
  Taro.saveFile({
    tempFilePath: paramObj.tempFilePath,
    success: function (res) {
      successCallBack(res);
    },
  });
};

/**
 * @description 删除文件
 * @param paramObj | object | 参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.deleteFile = function (paramObj, successCallBack) {
  Taro.removeSavedFile({
    filePath: paramObj.filePath,
    complete: function (res) {
      successCallBack(res);
    },
  });
};

/**
 * @description 存储数据
 * @param paramObj | object | 参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.setStorage = function (paramObj, successCallBack) {
  Taro.setStorage({
    key: paramObj.key,
    data: paramObj.value,
  });
};

/**
 * @description 获取数据
 * @param paramObj | object | 参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.getStorage = function (paramObj, successCallBack) {
  Taro.getStorage({
    key: paramObj.key,
    success: function (res) {
      successCallBack(res);
    },
  });
};

/**
 * @description 移除数据
 * @param paramObj | object | 参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.removeStorage = function (paramObj, successCallBack) {
  Taro.removeStorage({
    key: paramObj.key,
    success: function (res) {
      successCallBack(res);
    },
  });
};

/**
 * @description 二维码扫描
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.scanCode = function (successCallBack) {
  Taro.scanCode({
    onlyFromCamera: true,
    success: (res) => {
      successCallBack(res);
    },
  });
};

/**
 * @description  -获取当前位置
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.getLocation = function (successCallBack) {
  Taro.getLocation({
    type: "wgs84",
    success: function (res) {
      successCallBack(res);
    },
  });
};

/**
 * @description  打电话
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.makePhoneCall = function (paramObj, successCallBack) {
  Taro.makePhoneCall({
    phoneNumber: paramObj.phoneNumber,
    success: function (res) {
      successCallBack(res);
    },
  })
};

export { AMAPSDK };
