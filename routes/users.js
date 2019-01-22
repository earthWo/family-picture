var express = require('express');
var router = express.Router();
var userDb=require('../public/javascripts/db/db_user.js');
var error=require('../public/javascripts/response/error.js');
var response=require('../public/javascripts/response/response.js');
const https = require('https');

/* GET users listing. */
router.get('/userlogin', function (req, res, next) {

    let params = req.query;

    userDb.login(params,{

        success:user=> {

            res.json(response.response(user))

        },


        error: ()=> {
            res.json(error.error("登录失败"))
        }


    });


});


router.get('/login', function (req, res, next) {

    let code = req.query.code;

    https.get({
        host:'api.weixin.qq.com',
        path:'/sns/jscode2session?appid=wx648dfbdde324d584&secret=028d617038ceaced8e5c7cda8a28c4cb&js_code='+code+'&grant_type=authorization_code'
    }, function (r) {
        r.on('data', function(d) {
            var data='';
            data=data+d;
            console.log(data);
            data=JSON.parse(data);
            if(data.errcode && data.errcode != 0){
                res.json(error.error(data.errmsg))
            }else{
                console.log("成功");

                const crypto = require('crypto')

                const hash = crypto.createHash('md5')
                let openid=data.openid;
                let token = hash.update(Buffer.from(openid)).digest('hex')

                let params = {token:token,isRegister:1};

                userDb.login(params,{

                    success:user=> {

                        res.json(response.response(user))

                    },


                    error: ()=> {
                        res.json(error.error("登录失败"))
                    }


                });
            }
        });

    });
});


module.exports = router;
