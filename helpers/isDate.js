const moment = require("moment");


exports.isDate = (value,{req,location,path}) => {

    if(!value){
        return false;
    }

    const date = moment(value);
    if(date.isValid()){
        return true;
    }else{
        return false;
    }

}