const config = require('../config');

function errorResponse() {
    this.code;
    this.message;
    this.debugMode = config?config.debugMode:undefined;
}

errorResponse.prototype = {
   
    sendValidationError: function (res, message, debug, logError) {
        this.sendError(res, 'VALIDATION', message, debug, logError);
    },
    sendNotFoundError: function (res, message, debug, logError) {
        this.sendError(res, 'NOTFOUND', message, debug, logError);
    }
    ,sendError: function (res, innerCode , message, debug, logError) {
        let responseCode = this.getHttpErrorCode(innerCode);
        let responseBody = { code: innerCode, message: message };
        if (this.debugMode) {
            responseBody.debug = debug; // attach debug to response only if debug mode
        }
        if (logError || this.debugMode) {
            console.log(res.req, 'error', innerCode, { code: innerCode, message: message, originalMessage: message, debug: debug });
        }
        else if(responseCode >= 500){
            // should 500s go out without logging? warn
            console.log('warning', '500 error with no log error flag', { code: innerCode, message: message, originalMessage: message, debug: debug });
        }
        //res.send(responseCode, responseBody);
        res.status(responseCode).send(responseBody);
    }
    ,getHttpErrorCode: function (innerCode) {
        let code = innerCode;
        switch (innerCode.toString().toUpperCase()) {
            case "SERVICE":
                code = 500;
                break;
            case "VALIDATION":
                code = 400;
                break;
            case "NOTFOUND":
                code = 404;
                break;
            case "AUTHORIZATION":
                code = 403;
                break;
            case "AUTHENTICATION":
                code = 401;
                break;
        }
        return code;
    }
};

module.exports = new errorResponse();