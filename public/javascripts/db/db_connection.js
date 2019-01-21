var mysql=require('mysql')


//连接数据库
const db_connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '071235!Wuzefeng',
    database : 'family_picture'
});


function connect(){
    db_connection.connect(function (err) {
        if(err == null){
            console.log('数据库连接成功');
        }else{
            console.log('数据库连接失败');
            console.log(err);
        }

    });
}


function close(){
    db_connection.end();
}





module.exports={
    connect,
    close,
    db_connection
}