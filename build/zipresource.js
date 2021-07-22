let fs = require("fs");
let path=require("path");
var os = require("os");
let JSZIP = require("jszip");

const RES_NAMES= ["value","color","layout","drawable","animator","anim","menu","raw"
                         ,"drawable-hdpi"
                         ,"drawable-mdpi"
                         ,"drawable-xhdpi"
                         ,"drawable-xxhdpi"
                         ,"drawable-xxxhdpi"
                         ,"mipmap-hdpi"
                         ,"mipmap-mdpi"
                         ,"mipmap-xhdpi"
                         ,"mipmap-xxhdpi"
                         ,"assets"];
const FILES =["appConfig.json","index.android.bundle","index.android.bundle.map","index.ios.jsbundle.meta","index.ios.jsbundle.map","index.ios.jsbundle","resources.zip"];
function zip(projectrnpath,subname){
    let resourceZipName =projectrnpath+"/resources.zip";
    let subZipName =projectrnpath+"/"+subname+".zip";
    let resourcezip = new JSZIP();
    let subzip = new JSZIP();
    let files = fs.readdirSync(projectrnpath);//读取目录中的所有文件及文件夹（同步操作）
    files.forEach(function (fileName, index) {//遍历检测目录中的文件
        let fillPath = projectrnpath + "/" + fileName;
        let file = fs.statSync(fillPath);//获取一个文件的属性
        if (file.isDirectory() && RES_NAMES.indexOf(fileName) !=-1) {
            let dirlist = resourcezip.folder(fileName);//压缩对象中生成该目录
            readDir(dirlist, fillPath);//重新检索目录文件
        }
    })
   
   
    resourcezip.generateAsync({//设置压缩格式，开始打包
        type: "nodebuffer",//nodejs用
        compression: "DEFLATE",//压缩算法
        // streamFiles:true,
        compressionOptions: {//压缩级别
            level: 9
        }
    }).then(function (content) {
        fs.writeFileSync(resourceZipName, content, "utf-8");//将打包的内容写入 当前目录下的 zip中
        
        // readDir(subzip,projectrnpath);//重新检索目录文件
        let files = fs.readdirSync(projectrnpath);//读取目录中的所有文件及文件夹（同步操作）
        files.forEach(function (fileName, index) {//遍历检测目录中的文件
            let fillPath = projectrnpath + "/" + fileName;
            let file = fs.statSync(fillPath);//获取一个文件的属性
            
            if (!file.isDirectory() && FILES.indexOf(fileName) >-1) {
                subzip.file(fileName, fs.readFileSync(fillPath));//压缩目录添加文件
            }
        })
        subzip.generateAsync({//设置压缩格式，开始打包
            type: "nodebuffer",//nodejs用
            compression: "DEFLATE",//压缩算法
            // streamFiles:true,
            compressionOptions: {//压缩级别
                level: 9
            }
        }).then(function (content) {
            fs.writeFileSync(subZipName, content, "utf-8");//将打包的内容写入 当前目录下的zip中     
            fs.unlinkSync(resourceZipName);
            console.log("操作结束,输出目录",projectrnpath);
        }); 
    });
  
}
function readDir(obj,nowPath,folderfilter,filefilter) {
    let files = fs.readdirSync(nowPath);//读取目录中的所有文件及文件夹（同步操作）
    files.forEach(function (fileName, index) {//遍历检测目录中的文件
        let fillPath = nowPath + "/" + fileName;
        let file = fs.statSync(fillPath);//获取一个文件的属性
        if (file.isDirectory()) {//如果是目录的话，继续查询
            if(folderfilter == undefined ||folderfilter.indexOf(fileName) !=-1){
                let dirlist = obj.folder(fileName);//压缩对象中生成该目录
                readDir(dirlist, fillPath);//重新检索目录文件
            }
        } else {
            if(filefilter == undefined ||filefilter.indexOf(fileName) != -1)
                obj.file(fileName, fs.readFileSync(fillPath));//压缩目录添加文件
        }     
        
    });
}

exports.zip = zip
 


  



   