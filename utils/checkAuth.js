require('dotenv').config();
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    //get authcookie from request
    const authCookie = req.cookies.authCookie;
    //verify token which is in cookie value
    jwt.verify(authCookie, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) {
            let msg = 'You do not have permission to access this resource.'
            res.status(403).render('error', {code: 403,codeErr:'Forbidden' ,message: msg});
        }
        else {
            next();
        }
    });

}