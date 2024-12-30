 const {constants} = require('../constants');
 const errorHandler = (err, req, res, next) => {    
     const statusCode = res.statusCode ? res.statusCode :500;
     switch(statusCode){
            case constants.VALIDATION_ERROR:
                return res.json({
                    message: err.message,
                    stackTrace: err.stack
                });
            case constants.SERVER_ERROR:
                return res.json({
                    message: 'Internal Server Error',
                    stackTrace: err.stack
                });
            case constants.NOT_FOUND:
                return res.json({
                    message: 'Resource not found',
                    stackTrace: err.stack
                });
            case constants.FORBIDDEN:
                return res.json({
                    message: 'Access denied',
                    stackTrace: err.stack
                });
            default:
                   console.log("All is well");
                   break;
     }

}
module.exports = errorHandler;