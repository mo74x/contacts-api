const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authheader = req.headers.Authorization || req.headers.authorization;
    if(authheader && authheader.startsWith('Bearer')){
        token = authheader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET,(err,decode)=>{
            if(err)
                res.status(401).send('Invalid token');
                
           req.user = decode.user;
              next();

        } );
        if(!token){
            res.status(401);
            throw new Error('Not authorized to access this route');
        }
        
    }
    });     

module.exports = validateToken;