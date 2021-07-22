let fs = require("fs");
let os = require("os");
var path=require('path');
let zip_resource = require("./zipresource");
let rnConfig = require("./configHolder");
var defpath=path.join(__dirname, '../');
function inteBundle(platform){
    let buildConfig = rnConfig.getBuildConfig()
    //需要输入的参数
    let platForm = platform? platform:buildConfig.type
    let version =  buildConfig.version? buildConfig.version: '0.0.1'
    let isAllRN =  buildConfig.isAllRN? buildConfig.isAllRN: 'true' //默认为true
    let mainBundle = buildConfig.mainBundle? buildConfig.mainBundle:'mainBundle'
    let configObj = {}
    //获取bundle输出的路径
    let config = rnConfig.getRNConfig()
    let appName = config? config.appName:'RNProject'
    let getRNConfigOutput = rnConfig.getRNConfigOutput(platForm)
    let defaultbundlepath =path.join(defpath,getRNConfigOutput).replace(/\\/g,'/');
    
    let options = {
        bundlepath:defaultbundlepath,
        subbundlename:appName,
        version:version,
        isAllRN:isAllRN
    }
    
    buildAppConfigJson(options)
    zip_resource.zip(defaultbundlepath,mainBundle)
    
}

//生成config文件
function buildAppConfigJson(options){
    if(!fs.existsSync(options.bundlepath)){
        fs.mkdirSync(options.bundlepath,{
            recursive: true
        })
    }
    let appconfig =path.join(options.bundlepath,"appConfig.json");
    var configobj ={};
    let subBundleId =options.subbundlename == ""?'RNProject':options.subbundlename;
    configobj.version =options.version?options.version:"0.0.1";
    configobj.bundleName=subBundleId;
    configobj.modelId=subBundleId;
    configobj.isAllRN =options.isAllRN;
    fs.writeFileSync(appconfig,JSON.stringify(configobj,null,"\t"),{})
}
module.exports = {
    inteBundle
}