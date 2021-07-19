const path = require("path");
const config = {
  projectName: "AMAPDemo",
  date: "2021-6-23",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: "src",
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [],
  defineConstants: {
    IS_H5: process.env.TARO_ENV === "h5",
    IS_RN: process.env.TARO_ENV === "rn",
    IS_WEAPP: process.env.TARO_ENV === "weapp"
  },
  alias: {
    "@src": path.resolve(__dirname, "..", "src"),
    "@components": path.resolve(__dirname, "..", "src/components")
  },
  copy: {
    patterns: [],
    options: {}
  },
  framework: "react",
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    }
  },
  h5: {
    publicPath: "/AMAPDemo/",
    staticDirectory: "static",
    esnextModules: ['taro-ui'],
    postcss: {
      pxtransform: {
        enable: true,
      },
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    }
  },
  rn: {
    appName:'RNProject',
    output: {
      ios: 'ios/index.ios.jsbundle',
      iosAssetsDest: 'ios',
      android: 'android/index.android.bundle',
      androidAssetsDest: 'android',
      iosSourcemapOutput:'ios/index.ios.jsbundle.map',
      androidSourcemapOutput:'android/index.android.bundle.map',
    },
  }
};

module.exports = function(merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};