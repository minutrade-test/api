var lib = {
    isEmpty:function(obj){
        return (obj==undefined || obj==null || obj=="");
    },
    getErrorObj: function(strError, code){
        var obj = {error:{}};
        if (!strError){
            strError = "system_error";
        }
        obj.error.description = strError;
        if (!code){
            code = 401;
        }
        obj.error.code = code;
        return obj;
    },
    getResultObj: function(obj){
        var obj = {data:obj};
        return obj;
    },
    getSuccessObj: function(){
        return "OK";
    },
};
module.exports = lib;