module.exports = {
    version: "0.0.1", //发布版本
    type:'android', //平台
    mainBundle:"mainBundle", // bundle管理端所需zip文件名
    androidpath:'D:\\amap-android-64', // android 壳子路径
    iospath:'',// ios 壳子路径
    bundlename:'index.android.bundle', //bundle名称
    bundleOutDir:{ //文件输出路径
        androidPath:'android',
        iosPath:'ios'
    },
    output:'D:/work/agreeCli/ZTEST/android', //输出目录
    bundlepath:'D:/work/agreeCli/ZTEST/android', //bundle存放路径
    jdkpath:'D:/AMAP-3.1.2/jre',
    nodepath:'E:/node/nodejs',
    sdkpath:'C:\\Users\\jnn83\\AppData\\Local\\Android\\Sdk',
    projectpath:'D:/work/agreeCli/ZTEST', //项目目录
    isAllRN:true,//禁用拆包模式
    isAppPack:true,
    isBundle:false, //编译bundle
    isConvert:false, //全量转换
    isShowConfig:true,
    subbundlename:''
}