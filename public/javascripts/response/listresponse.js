var response = function (data,size) {

    this.status = 200;
    this.data=data;
    if(data.length>=size){
        this.hasMore=true;
    }else{
        this.hasMore=false;
    }
    return this;

}



module.exports.response=response;