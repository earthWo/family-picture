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


function deleteGroup(uid,gid,callback){
    let sql = " delete from picturegroup where id="+gid;
    console.log(sql);
    db.db_connection.query(sql,function (err, result) {
        if(err){
            console.log(err);
            callback.error();
            return;
        }
        callback.success(gid);
        relationship.deleteRelationship(uid,gid);


    });
}


function myGroup(uid,callback){
    let sql = " select picturegroup.* from picturegroup,relationship where relationship.gid = picturegroup.id && relationship.uid="+uid;
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

module.exports={
    createGroup,
    deleteGroup,
    myGroup
}


