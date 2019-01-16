

var db=require('./db_connection.js');

 function login (params,callback) {

    let token  = params.token;
    let userName = params.userName;
    let userPhone = params.userPhone;
    let userAvatar = params.userAvatar;

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

            user.name = userName;
            user.phone = userPhone;
            user.avatar = userAvatar;

        }else{
        // 注册信息


            user.token = token;
            user.name = userName;
            user.phone = userPhone;
            user.avatar = userAvatar;
            user.createtime = "131321321";

        }

        addUser(user,callback);



        console.log(result);

    });
    
    

    
    function addUser(user,callback) {
        let sql;
        if(user.id ==null ){

            sql = " REPLACE INTO user (name,phone,avatar,token,createtime) VALUES('"+user.name+"','"+user.phone+"','"+user.avatar
        +"','"+user.token+"','"+user.createtime+"')";

        }else{

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