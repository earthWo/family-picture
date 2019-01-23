var express = require('express');
var router = express.Router();
var error=require('../public/javascripts/response/error.js');
var response=require('../public/javascripts/response/response.js');
var pictureDb=require('../public/javascripts/db/db_picture.js');
var qiniu = require("qiniu");


//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'V8aIn8cL3-RdhtxlLWiBevtRb4kIY9M2rwKCYEsW';
qiniu.conf.SECRET_KEY = 'OgrvmgrHqxilXJ280Izute5pLB_h1Vg1CjaH2JSg';

/* GET users listing. */
router.get('/add', function (req, res, next) {

    let params = req.query;

    pictureDb.addPicture(params.uid,params.url,params.gid,{

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

router.get('/grouppictures', function (req, res, next) {

    let params = req.query;

    pictureDb.pictureByGroup(params.gid,{

        success:pictures=> {
            res.json(response.response(pictures))
        },

        error: ()=> {
            res.json(error.error("删除图片失败"))
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
