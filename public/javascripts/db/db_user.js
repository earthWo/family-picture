

var db=require('./db_connection.js');

 function login (params,callback) {

    let token  = params.token;
    let userName = params.userName;
    let userPhone = params.userPhone;
    let userAvatar = params.userAvatar;
    let isRegister = params.isRegister;

     let gender = params.gender;
     let country = params.country;
     let province = params.province;
     let city = params.city;

    let sql = "SELECT * FROM user where token = '"+token +"'";

    db.db_connection.query(sql,function (err, result) {
        if(err){
            callback.error();
            return;
        }

        let user = {};

        // 更新信息
        if (result.length >0 ){

            user = result[0];


            if( isRegister == 1){

                user.name = userName;
                user.phone = userPhone;
                user.avatar = userAvatar;
                user.gender = gender;
                user.country = country;
                user.province = province;
                user.city = city;
            }


        }else{
        // 注册信息

            user.token = token;
            user.createtime = Date.parse(new Date());

        }

        addUser(user,isRegister,callback);



        console.log(result);

    });
    
    

    
    function addUser(user,isRegister,callback) {
        let sql;
        if(user.id == undefined || user.id==null ){

            sql = " REPLACE INTO user (token,createtime) VALUES('"+user.token+"','"+user.createtime+"')";

        } else if( isRegister == 1) {

            sql = " REPLACE INTO user (id,token,createtime) VALUES('"+user.id+"','"+user.token+"','"+user.createtime+"')";

        }else {

            sql = " REPLACE INTO user (id,name,phone,avatar,token,createtime,gender,country,province,city) VALUES('"+user.id+"','"+user.name+"','"+user.phone+"','"+user.avatar
                +"','"+user.token+"','"+user.createtime+"','"+user.gender+"','"+user.country+"','"+user.province+"','"+user.city+"')";

        }

        console.log(isRegister)

        db.db_connection.query(sql,function (err, result) {
            if(err){
                console.log(err);
                return;
            }
            user.id=result.insertId;
            callback.success(user)

            console.log("用户登录"+result.insertId);

        });

        
    };




};


module.exports={
    login
}