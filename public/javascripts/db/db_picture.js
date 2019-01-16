var db=require('./db_connection.js');


function addPicture(uid,url,gid,callback) {

    let sql = "REPLACE INTO picture ( uid,gid,url,createtime ) VALUES('"+uid+"','"+gid+"','"+url+"','"+'2012/12/21'+"')";
    console.log(sql);
    db.db_connection.query(sql,function (err, result) {
        if(err){
            console.log(err);
            callback.error();
            return;
        }

        callback.success({"msg":"添加图片成功"});

    });

}

function deletePicture(id,callback) {

    let sql = "delete from picture where id="+id;
    console.log(sql);
    db.db_connection.query(sql,function (err, result) {
        if(err){
            console.log(err);
            callback.error();
            return;
        }

        callback.success({"id":id});

    });

}


function pictureByGroup(gid,callback) {

    let sql = "select * from picture where gid="+gid;

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
    addPicture,
    deletePicture,
    pictureByGroup
}

