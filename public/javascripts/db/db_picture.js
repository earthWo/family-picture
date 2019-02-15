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

    let sql1 = "delete from picture where  picture.id=?";
    let sql2 = "delete from picture_group_rel where  picture_group_rel.pid=?";
    db.db_connection.beginTransaction(function (err) {

        if(err){
            callback.error();
        }else{
            db.db_connection.query(sql1,id,function (err, result) {
                if(err){
                    db.db_connection.rollback(function () {
                        console.log(err);
                        callback.error();
                    })
                    return;
                }else{
                    db.db_connection.query(sql2,id,function (err, result) {
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
        }
        
    })


}

function deleteGroupPicture(pid,gid,callback) {

    let sql = "delete from picture_group_rel  where pid = '"+pid+"' and gid='"+gid+"';";
    console.log(sql);
    db.db_connection.query(sql,function (err, result) {
        if(err){
            console.log(err);
            callback.error();
            return;
        }

        callback.success({"id":pid});

    });

}


function pictureByGroup(gid,page,pageSize,callback) {

    if(page==undefined){
        page=1;
    }


    let sql = "select picture.* from picture,picture_group_rel where picture_group_rel.gid= "+gid+" and picture_group_rel.pid = picture.id order by createtime  limit "+ (page-1)*pageSize+","+pageSize ;;

    db.db_connection.query(sql,function (err, result) {
        if(err){
            console.log(err);
            callback.error();
            return;
        }

        callback.success(result);

    });

}




function pictureByUser(uid,page,pageSize,callback) {

    if(page==undefined){
        page=1;
    }

    let sql = "select * from picture where uid="+uid +" order by createtime desc limit "+ (page-1)*pageSize+","+pageSize ;

    console.log(sql);
    db.db_connection.query(sql,function (err, result) {
        if(err){
            console.log(err);
            callback.error();
            return;
        }else{
            callback.success(result);
        }
    });

}

module.exports={
    addPicture,
    deletePicture,
    pictureByGroup,
    pictureByUser,
    addGroupPicture,
    deleteGroupPicture
}

