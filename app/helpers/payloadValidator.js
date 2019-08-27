var Schema = require('validate');


var schemaProperties = {
    "username": {type: String, required: true},
    "password": {type: String, required: true}
}

exports.validatePayload = function (payload, schemaArray) {
    var schemaObj = {};

    for (var i= 0; i < schemaArray.length;i++) {
        schemaObj[schemaArray[i]] = schemaProperties[schemaArray[i]]
    }

    var schema = new Schema(schemaObj);
    const err = schema.validate(payload, {strip:false});
    

    if (err.length > 0) {
        console.log("###################Invalid payload errors###################");
        err.forEach((error) => {
            console.log("Invalid payload error: ",error.message);  
        })
    }

    return err.length > 0 ? false : true;
}