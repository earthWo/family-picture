

var db=require('./db_connection.js');

 function login (params,callback) {

    let token  = params.token;
    let userName = params.userName;
    let userPhone = params.userPhone;
    let userAvatar = params.userAvatar;
    let isRegister = params.isRegister;

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


            if( !isRegister){
                user.name = userName;
                user.phone = userPhone;
                user.avatar = userAvatar;
            }


        }else{
        // 注册信息

            user.token = token;

        }

        addUser(user,isRegister,callback);



        console.log(result);

    });
    
    

    
    function addUser(user,isRegister,callback) {
        let sql;
        console.log(user.id)
        if(user.id == undefined ||isRegister ){

            sql = " REPLACE INTO user (token,createtime) VALUES('"+user.token+"','"+user.createtime+"')";

        } else {

            sql = " REPLACE INTO user (id,name,phone,avatar,token,createtime) VALUES('"+user.id+"','"+user.name+"','"+user.phone+"','"+user.avatar
                +"','"+user.token+"','"+user.createtime+"')";

        }
        console.log(sql);

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