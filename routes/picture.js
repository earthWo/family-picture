var express = require('express');
var router = express.Router();
var error=require('../public/javascripts/response/error.js');
var response=require('../public/javascripts/response/response.js');
var pictureDb=require('../public/javascripts/db/db_picture.js');

/* GET users listing. */
router.post('/add', function (req, res, next) {

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


router.post('/delete', function (req, res, next) {

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

router.post('/grouppictures', function (req, res, next) {

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

module.exports = router;
