var response = function (data) {

    this.status = 200;
    this.data=data;
    return this;

}



module.exports.response=response;