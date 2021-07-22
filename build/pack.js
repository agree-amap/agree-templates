let fs = require('fs');
var path = require('path');
let os = require("os");
let platform = os.platform();  
let homedir = os.homedir();
let amapUtils = require('amap-build-utils')
let rnConfig = require("./configHolder");

function pack (){
   let buildConfig = rnConfig.getBuildConfig()
   let options = buildConfig
   amapUtils.runcmd(options, (data, type) => {
      console.log('文件输出位置',data)
   });
}
// 可添加判断，查看是否有bundle文件，否则先进行bundle打包
module.exports = {
   pack
}