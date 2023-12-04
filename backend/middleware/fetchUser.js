var jwt = require('jsonwebtoken');
const JWT_SECRET="n@n!@jAY@";

const fetchuser=async (req,res,next)=>{
    let token= req.header('auth-token');
    console.log("Fetching user with token", token);
    try {
        let details= await jwt.verify(token, JWT_SECRET);
        console.log(details);
        req.body.user={is:true,details};
        // {
        //     "user": {
        //       "is": true,
        //       "details": {
        //         "id": "64feed7b4235b415a4366907",
        //         "email": "jaya@gmail.com",
        //         "name": "jayavardhan",
        //         "iat": 1695050932
        //       }
        //     }
        //   }
        next();
    } catch (error) {
        req.body.user={is:false,error};
        // {
        //     "user": {
        //       "is": false,
        //       "error": {
        //         "name": "JsonWebTokenError",
        //         "message": "invalid token"
        //      or "message": "jwt must be provided"
        //       }
        //     }
        //   }
        next();
    }
}

module.exports = fetchuser;