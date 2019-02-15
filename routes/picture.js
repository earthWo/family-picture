const express = require('express');
const router = express.Router();
const error=require('../public/javascripts/response/error.js');
const response=require('../public/javascripts/response/response.js');
const listresponse=require('../public/javascripts/response/listresponse.js');
const pictureDb=require('../public/javascripts/db/db_picture.js');
const qiniu = require("qiniu");


//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'V8aIn8cL3-RdhtxlLWiBevtRb4kIY9M2rwKCYEsW';
qiniu.conf.SECRET_KEY = 'OgrvmgrHqxilXJ280Izute5pLB_h1Vg1CjaH2JSg';


var pageSize=15;

/* GET users listing. */
router.get('/add', function (req, res, next) {

    let params = req.query;

    pictureDb.addPicture(params.uid,params.url,{

        success:msg=> {
            res.json(response.response(msg))
        },

        error: ()=> {
            res.json(error.error("添加图片失败"))
        }

    });

});

router.get('/addGroupPicture', function (req, res, next) {

    let params = req.query;

    pictureDb.addGroupPicture(params.pid,params.gid,{

        success:msg=> {
            res.json(response.response(msg))
        },

        error: ()=> {
            res.json(error.error("添加图片失败"))
        }

    });

});


router.get('/delete', function (req, res, next) {

    let params = req.query;

    pictureDb.deletePicture(params.id,{

        success:msg=> {
            res.json(response.response(msg))
        },

        error: ()=> {
            res.json(error.error("删除图片失败"))
        }

    });

});

router.get('/groupDeletePicture', function (req, res, next) {

    let params = req.query;

    pictureDb.deleteGroupPicture(params.pid,params.gid,{

        success:msg=> {
            res.json(response.response(msg))
        },

        error: ()=> {
            res.json(error.error("删除图片失败"))
        }

    });

});

router.get('/grouppictures', function (req, res, next) {

    let params = req.query;

    pictureDb.pictureByGroup(params.gid,params.page,pageSize,{

        success:pictures=> {
            res.json(listresponse.response(pictures,pageSize));
        },

        error: ()=> {
            res.json(error.error("获取图片失败"))
        }

    });

});



router.get('/userpictures', function (req, res, next) {

    let params = req.query;

    pictureDb.pictureByUser(params.uid,params.page,pageSize,{

        success:pictures=> {
            res.json(listresponse.response(pictures,pageSize));
        },

        error: ()=> {
            res.json(error.error("获取图片失败"))
        }

    });

});

/*
  获取全部照片组
 */
router.get('/picturetoken', function (req, res, next) {
    let accessKey = 'V8aIn8cL3-RdhtxlLWiBevtRb4kIY9M2rwKCYEsW';
    let secretKey = 'OgrvmgrHqxilXJ280Izute5pLB_h1Vg1CjaH2JSg';
    let bucket = 'family-picture';
    let options = {
        scope: bucket
    };

    let putPolicy = new qiniu.rs.PutPolicy(options);
    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    let uploadToken=putPolicy.uploadToken(mac);
    res.json(response.response(uploadToken))

});


module.exports = router;
