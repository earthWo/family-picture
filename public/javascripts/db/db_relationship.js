var db=require('./db_connection.js');


function createRelationship(userId,gId,callback) {
    console.log(gId);
    let sql = "REPLACE INTO relationship (uid,gid) VALUES('"+userId+"','"+gId+"')";

    db.db_connection.query(sql,function (err, result) {
        if(err){
            console.log(err);
            callback.error();
            return;
        }

        callback.success(gId);
        console.log("创建关系成功"+result.insertId);

    });

}



function deleteRelationship(userId,gid,callback) {

    let sql = "delete from relationship where uid=" +userId +" && gid=" +gid;
    console.log(sql);
    db.db_connection.query(sql,function (err, result) {
        if(err){
            console.log(err);
            callback.error();
            return;
        }

    });

}

module.exports={
    createRelationship,
    deleteRelationship
}

