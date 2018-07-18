const {User} = require('./../models/user');

let authenticate = (req,res,next) => {
    // take the value from request header named 'x-auth'
    let token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if(!user){
            return Promise.reject(); // reject and run the catch code
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((error) => {
        res.status(401).send(error);
    });
};  

module.exports = {
    authenticate
};