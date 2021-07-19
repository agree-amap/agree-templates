// import lib
import { NativeModules,
  DeviceEventEmitter,
  Platform,
  NativeEventEmitter } from 'react-native';
import {webCore}  from './webPlugin';

//成功失败返回
var RNSuccRes = {
  code: '',
  data: ''
};
var RNErrorRes = {
  code: '',
  message: ''
};

function errorRes(result) {
  RNErrorRes.code = (result.resultCode || result.resultCode == 0) ? result.resultCode : '-1';
  RNErrorRes.message = result.resultMessage || "";
  return RNErrorRes;
};

/**
* 通用适配库成功返回码各端统一规范
* @params{vo:返回值}
*/
function successPipe(result) {

  RNSuccRes.code = result.status || "-1";
  RNSuccRes.data = result.data ? result.data : "";

  return RNSuccRes;
};

var AMAPJSBridge = {};

AMAPJSBridge.call = function(methodName, params, Callback) {

  if(Platform.OS==='web'){
      webCore(methodName,params,Callback);
  }else{
      if(typeof(params) == 'function'){
          NativeModules.AMAPJSBridge.call({ ...{'methodName':methodName,'value':{}} },function(result){
              params(successPipe(result));
          },function(result){
              params(errorRes(result));
          })
      }else{
          if(params == null){
              params = {};
          }
          NativeModules.AMAPJSBridge.call({ ...{'methodName':methodName,'value':params} },function(result){
              Callback(successPipe(result));
          },function(result){
              Callback(errorRes(result));
          });
      }
  }
}


const { AMAPRNEventEmiter } = NativeModules;
const AMAPRNEventEmiterManager = new NativeEventEmitter(AMAPRNEventEmiter);

var subscription=null;
/**
* 增加监听
*/
AMAPJSBridge.addListenAMAPRNEventEmiter = function(eventName, Callback) {
  if(Platform.OS === 'ios'){
      subscription = AMAPRNEventEmiterManager.addListener(eventName, (data)=>{
          Callback(data);
        });
  }else{
      subscription = DeviceEventEmitter.addListener(eventName, (data)=>{
          Callback(data);
        })
  }


}

/**
*移除监听
*/
AMAPJSBridge.removeListenAMAPRNEventEmiter = function(eventName) {
  subscription.remove();
}

export {
  AMAPJSBridge
}
