var express = require('express');
var router = express.Router();
var error=require('../public/javascripts/response/error.js');
var response=require('../public/javascripts/response/response.js');
var groupDb=require('../public/javascripts/db/db_group.js');

/* GET picture group. */



/*
  获取我的照片组
 */
router.get('/create', function (req, res, next) {

    let params = req.query;

    groupDb.createGroup(params.uid,params.name,{

        success:id=> {

            res.json(response.response(id))

        },


        error: ()=> {
            res.json(error.error("创建群组失败"))
        }


    });


});


router.get('/delete', function (req, res, next) {

    let params = req.query;

    groupDb.deleteGroup(params.gid,params.self,{

        success:id=> {

            res.json(response.response(id))

        },


        error: ()=> {
            res.json(error.error("删除群组失败"))
        }


    });


});


router.get('/mygroup', function (req, res, next) {

    let params = req.query;

    groupDb.myGroup(params.uid,{

        success:groups=> {

            res.json(response.response(groups))

        },


        error: ()=> {
            res.json(error.error("获取群组失败"))
        }


    });


});


router.get('/hasGroup', function (req, res, next) {

    let params = req.query;

    groupDb.hasGroup(params.uid,params.gid,{

        success:groups=> {

            res.json(response.response(groups))

        },


        error: ()=> {
            res.json(error.error("获取群组失败"))
        }


    });


});


router.get('/joinGroup', function (req, res, next) {

    let params = req.query;

    groupDb.joinGroup(params.uid,params.gid,{

        success:groups=> {

            res.json(response.response(groups))

        },


        error: ()=> {
            res.json(error.error("获取群组失败"))
        }


    });


});

module.exports = router;
