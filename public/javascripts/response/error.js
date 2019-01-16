

var error = function (msg) {

    this.status = 0;
    this.msg = msg;

    return this;

}



module.exports.error=error;
