import { AMAPJSBridge } from "./RNAgreeSDK";

var AMAPSDK = {};

/**
 * @description 拍照和从相册选择
 * @param paramObj | object | 拍照参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.chooseImage = function (paramObj, successCallBack) {
  //React Native端
  if ((paramObj.sourceType == "camera")) {
    AMAPJSBridge.call(
      "getPhoto",
      {
        photoMaxNum: paramObj.count,
        pixeLW: "300",
        pixeLH: "300",
        selectType: "01",
        isEdit:false
      },
      function (result) {
        successCallBack(result);
      }
    );
  } else {
    AMAPJSBridge.call(
      "picture",
      {
        photoMaxNum: paramObj.count,
        pixeLW: "300",
        pixeLH: "300",
        isEdit:false
      },
      function (result) {
        successCallBack(result);
        alert(JSON.stringify(result));
      }
    );
  }
};

/**
 * @description 拍摄视频或从手机相册中选视频
 * @param paramObj | object | 拍照参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.chooseVideo = function (paramObj, successCallBack) {
  //录制视频
  if ((paramObj.sourceType = "camera")) {
    AMAPJSBridge.call(
      "getMovie",
      {
        qulity: "1",
        pixeLW: "400",
        pixeLH: "400",
      },
      function (result) {
        successCallBack(result);
      }
    );
  } else {
    AMAPJSBridge.call(
      "picture",
      {
        photoMaxNum: paramObj.count,
        pixeLW: "300",
        pixeLH: "300",
        selectType: "02",
      },
      function (result) {
        successCallBack(result);
      }
    );
  }
};

/**
 * @description 保存文件
 * @param paramObj | object | 参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.saveFile = function (paramObj, successCallBack) {
  AMAPJSBridge.call(
    "saveFile",
    {
      content: paramObj.content,
      fileName: paramObj.fileName,
      isEncrypt: paramObj.isEncrypt,
      secretKey: paramObj.secretKey,
    },
    function (result) {
      successCallBack(result);
    }
  );
};

/**
 * @description 删除文件
 * @param paramObj | object | 参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.deleteFile = function (paramObj, successCallBack) {
  AMAPJSBridge.call(
    "saveFile",
    {
      srcPath: paramObj.srcPath,
    },
    function (result) {
      successCallBack(result);
    }
  );
};


/**
 * @description 读取文件
 * @param paramObj | object | 参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.openDocument = function (paramObj, successCallBack) {
  AMAPJSBridge.call(
    "openLocalFile",
    {
      srcPath: paramObj.filePath,
    },
    function (result) {
      successCallBack(result);
    }
  );
};

/**
 * @description 存储数据
 * @param paramObj | object | 参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.setStorage = function (paramObj, successCallBack) {
  AMAPJSBridge.call(
    "saveDefaults",
    {
      key: paramObj.key,
      value: paramObj.value,
    },
    function (result) {
      successCallBack(result);
    }
  );
};

/**
 * @description 获取数据
 * @param paramObj | object | 参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.getStorage = function (paramObj, successCallBack) {
  AMAPJSBridge.call(
    "getDefaults",
    {
      key: paramObj.key,
    },
    function (result) {
      successCallBack(result);
    }
  );
};

/**
 * @description 移除数据
 * @param paramObj | object | 参数| 是 |
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.removeStorage = function (paramObj, successCallBack) {
  AMAPJSBridge.call(
    "removeDefaults",
    {
      key: paramObj.key,
    },
    function (result) {
      successCallBack(result);
    }
  );
};

/**
 * @description 二维码扫描
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.scanCode = function (successCallBack) {
  AMAPJSBridge.call("scanCode", function (result) {
    if (result.code == "1") {
      successCallBack(result);
    }
  });
};

/**
 * @description  -获取当前位置
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.getLocation = function (successCallBack) {
  AMAPJSBridge.call(
    "getLocation",
    {
      preciseEnabled: "0",
    },
    function (result) {
      successCallBack(result);
    }
  );
};

/**
 * @description  打电话
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
AMAPSDK.makePhoneCall = function (paramObj, successCallBack) {
  AMAPJSBridge.call(
    "getCallPhone",
    {
      phone: paramObj.phoneNumber,
    },
    function (result) {
      successCallBack(result);
    }
  );
};


/**
 * @description  打电话
 * @param successCallBack | function | 成功回调 | 是 |
 * @return |
 */
 AMAPSDK.makePhoneCall = function (paramObj, successCallBack) {
  AMAPJSBridge.call(
    "getCallPhone",
    {
      phone: paramObj.phoneNumber,
    },
    function (result) {
      successCallBack(result);
    }
  );
};


//音频只是支持安卓
export { AMAPSDK };
