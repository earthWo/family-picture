var db=require('./db_connection.js');


function addPicture(uid,url,callback) {

    let currenttime=Date.parse(new Date());
    let sql = "REPLACE INTO picture ( uid,url,createtime ) VALUES('"+uid+"','"+url+"','"+currenttime+"')";
    console.log(sql);
    db.db_connection.query(sql,function (err, result) {
        if(err){
            console.log(err);
            callback.error();
            return;
        }

        callback.success({"msg":"添加图片成功","id":result.insertId});

    });

}


function addGroupPicture(pid,gid,callback) {
    let sql = "REPLACE INTO picture_group_rel ( pid,gid ) VALUES('"+pid+"','"+gid+"')";
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

    let sql = "select picture.* from picture,picture_group_rel where picture_group_rel.gid= "+gid+" and picture_group_rel.pid = picture.id";

    db.db_connection.query(sql,function (err, result) {
        if(err){
            console.log(err);
            callback.error();
            return;
        }

        callback.success(result);

    });

}


function pictureByUser(uid,callback) {

    let sql = "select * from picture where uid="+uid;

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
    pictureByGroup,
    pictureByUser,
    addGroupPicture
}

