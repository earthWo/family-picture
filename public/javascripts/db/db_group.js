var db=require('./db_connection.js');
var relationship=require('./db_relationship.js');


function createGroup(userId,name,callback) {

   let sql = " REPLACE INTO picturegroup (name) VALUES('"+name+"')";
    console.log(sql);
    db.db_connection.query(sql,function (err, result) {
        if(err){
            console.log(err);
            callback.error();
            return;
        }

        relationship.createRelationship(userId,result.insertId,callback);

        console.log("创建群组成功"+result.insertId);

    });

}


function deleteGroup(gid,self,callback){
    let sql1 = "delete from picturegroup where id =?";
    let sql2 = "delete from picture_group_rel where  picture_group_rel.gid=?";
    let sql3 = "delete from relationship where gid =?";
    db.db_connection.beginTransaction(function (err) {

        if(err){
            callback.error();
        }else{
            db.db_connection.query(sql3,gid,function (err, result) {
                if(err){
                    db.db_connection.rollback(function () {
                        console.log(err);
                        callback.error();
                    })
                    return;
                }else if(self){
                    db.db_connection.query(sql2,gid,function (err, result) {
                        if(err){
                            db.db_connection.rollback(function () {
                                console.log(err);
                                callback.error();
                            })
                            return;
                        }else{

                            db.db_connection.query(sql1,gid,function (err, result) {
                                if(err){
                                    db.db_connection.rollback(function () {
                                        console.log(err);
                                        callback.error();
                                    })
                                    return;
                                }else{

                                    db.db_connection.commit(function(err) {
                                        if (err) {
                                            return db.db_connection.rollback(function() {
                                                console.log(err);
                                                callback.error();
                                            });
                                        }
                                        callback.success({"msg":'删除成功'});
                                    });


                                }
                            });


                        }
                    });
                }else{
                    db.db_connection.commit(function(err) {
                        if (err) {
                            return db.db_connection.rollback(function() {
                                console.log(err);
                                callback.error();
                            });
                        }
                        callback.success({"msg":'删除成功'});
                    });
                }

            });
        }

    })
}


function myGroup(uid,callback){
    let sql = " select picturegroup.*,relationship.uid from picturegroup,relationship where relationship.gid = picturegroup.id && relationship.uid="+uid;
    console.log(sql);
    db.db_connection.query(sql,function (err, result) {
        if(err){
            console.log(err);
            callback.error();
            return;
        }
        callback.success(result);

    });
}

function hasGroup(uid,gid,callback){
    let sql = "select * from relationship where uid =? and gid= '"+gid+"'";
    console.log(sql);
    db.db_connection.query(sql,uid,function (err, result) {
        if(err){
            console.log(err);
            callback.error();
            return;
        }
        callback.success(result);

    });
}

function joinGroup(uid,gid,callback) {

    relationship.createRelationship(uid,gid,callback);

}

module.exports={
    createGroup,
    deleteGroup,
    myGroup,
    hasGroup,
    joinGroup
}


