const express = require('express')
const app = express()
const upload = require('multer')
const fs = require('fs')
//监听端口
app.listen(300)
app.get('/',(req, res)=>{
    fs.readFile('./index.html','utf-8',(err,data)=>{
        if (err){
            res.json(err)
        }else {
            res.end(data)
        }
    })
})
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 设置文件上传目录
const uploadObj = upload({dest: '../../upLoad/wxbsUpload/'});
//单文件上传
app.post('/singleFileUpload',uploadObj.single('file'),(req,res,next)=>{
    if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
        res.json({
            resultInfo:'error',
            msg:'上传文件不能为空！'
        });
    } else {
        let file = req.file;
        let fileInfo = {};
        const newName = Date.now() + file.originalname
        // 获取文件信息
        fileInfo.mimetype = file.mimetype;
        fileInfo.originalname = file.originalname;
        fileInfo.size = file.size;
        fileInfo.path = file.path;
        //修改文件名
        fs.rename(file.path,'../../upLoad/wxbsUpload/' +  newName,(err)=>{
            if(err){
                res.json({
                    resultInfo:'error',
                    data:null
                });
            }else{
                res.json({
                    resultInfo:'success',
                    data:{
                        fileInfo,
                        url : 'https://file.gxnudsl.xyz/wxbsUpload/' + newName
                    }
                });
            }
        });
    }
})
//多文件上传
app.post('/marryFileUpload',uploadObj.array('file',10),(req,res,next) =>{
    if (req.files.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
        res.json({
            resultInfo:'error',
            msg:'上传文件不能为空！'
        });
    } else {
        let files = req.files;
        let filesInfo = []
        files.forEach(item =>{
            const fileInfo = {}
            const newName = Date.now() + item.originalname
            // 获取文件信息
            fileInfo.mimetype = item.mimetype;
            fileInfo.originalname = item.originalname;
            fileInfo.size = item.size;
            fileInfo.path = item.path;
            fileInfo.url = 'https://file.gxnudsl.xyz/wxbsUpload/' + newName
            //修改文件名
            fs.renameSync(item.path,'../../upLoad/wxbsUpload/' +  newName)
            filesInfo.push(fileInfo)
        })
        res.json({
            resultInfo:'success',
            data:filesInfo
        });
    }
})

//wangeditor多文件上传
app.post('/wangeditorFileUpload',uploadObj.array('file',10),(req,res,next) =>{
    if (req.files.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
        res.json({
            errno:'-1',
            msg:'上传文件不能为空！'
        });
    } else {
        let files = req.files;
        let filesInfo = []
        files.forEach(item =>{
            const newName = Date.now() + item.originalname
            //修改文件名
            fs.renameSync(item.path,'../../upLoad/wxbsUpload/' +  newName)
            const newUrl = 'https://file.gxnudsl.xyz/wxbsUpload/' + newName
            filesInfo.push(newUrl)
        })
        res.json({
            errno:'0',
            data:filesInfo
        });
    }
})

//微信小程序景点信息上传
//设置上传目录
const wxSceneryUploadUrl = upload({dest: '../../upLoad/image/wxbs/scenery/'});
app.post('/wxSceneryUpload',wxSceneryUploadUrl.array('file',10),(req,res,next) =>{
    if (req.files.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
        res.json({
            resultInfo:'error',
            msg:'上传文件不能为空！'
        });
    } else {
        let files = req.files;
        let filesInfo = []
        files.forEach(item =>{
            const newName = Date.now() + item.originalname
            //修改文件名
            fs.renameSync(item.path,'../../upLoad/image/wxbs/scenery/' +  newName)
            const newUrl = 'https://file.gxnudsl.xyz/image/wxbs/scenery/' + newName
            filesInfo.push(newUrl)
        })
        res.json({
            resultInfo:'success',
            data:filesInfo
        });
    }
})

//微信小程序景点信息上传
//设置上传目录
const wxBannerUploadUrl = upload({dest: '../../upLoad/image/wxbs/banner/'});
app.post('/wxBannerUpload',wxBannerUploadUrl.single('file'),(req,res,next)=>{
    if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
        res.json({
            resultInfo:'error',
            msg:'上传文件不能为空！'
        });
    } else {
        let file = req.file;
        let fileInfo = {};
        const newName = Date.now() + file.originalname
        // 获取文件信息
        fileInfo.mimetype = file.mimetype;
        fileInfo.originalname = file.originalname;
        fileInfo.size = file.size;
        fileInfo.path = file.path;
        //修改文件名
        fs.rename(file.path,'../../upLoad/image/wxbs/banner/' +  newName,(err)=>{
            if(err){
                res.json({
                    resultInfo:'error',
                    data:null
                });
            }else{
                res.json({
                    resultInfo:'success',
                    data:{
                        fileInfo,
                        url : 'https://file.gxnudsl.xyz/image/wxbs/banner/' + newName
                    }
                });
            }
        });
    }
})
