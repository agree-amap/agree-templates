const fs = require('fs')
var path=require('path');
var defpath=path.join(__dirname, '../');

let config
function getConfig() {
  if (config) return config
  let fileName =path.join(defpath,"/config/index.js").replace(/\\/g,'/');
  if (fs.existsSync(fileName)) {
    config = require(`${defpath}/config/index.js`)(Object.assign)
    return config
  } else {
    config = {}
    return config
  }
}

function getRNConfig() {
  getConfig()
  if (config.rn) {
    rnConfig = config.rn
  } else {
    rnConfig = {}
  }
  return rnConfig
}

function getRNConfigOutput(p){
  getRNConfig()
  if (rnConfig.output) {
    if (p === 'ios') {
      return rnConfig.output.iosAssetsDest
    } else {
      return rnConfig.output.androidAssetsDest
    }
  } else {
    return 'dist/rn'
  }
}

function getBuildConfig (){
  let fileName =path.join(defpath,"/config/build.js").replace(/\\/g,'/');
  if (fs.existsSync(fileName)) {
    let buildConfig = require(`${fileName}`)
    return buildConfig
  } else {
    return {}
  }
}

module.exports = {
  getRNConfig,
  getRNConfigOutput,
  getBuildConfig
}

