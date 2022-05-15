class Responser {

constructor(res){
    this.res = res;
    this.statusCode = null;
    this.response = {
        success: null,
        message: '',
        data: {},
    }
}

success(message='Success'){
if(!this.statusCode)this.statusCode = 200;
this.response.success = true;
this.response.message = message;
return this;
}

error(message='Error'){
    if(!this.statusCode)this.statusCode = 400;
    this.response.success = false;
    this.response.message = message;
    return this;
}

status(statusCode){
    this.statusCode = statusCode;
    if(statusCode>400 && !this.response.success)this.response.success=false;
    return this;
}

setData(obj={}){
    this.response.data = obj;
    return this;
}

send(){
    if(!this.statusCode)this.statusCode=200;
    this.res.status(this.statusCode).send(this.response);
}

}

module.exports = Responser;