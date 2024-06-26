const jwt= require('jsonwebtoken');

const auth= (req,res,next)=>{
    const token= req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg:'Access denied. No token provided'});
    }
    try {
        const decoded= jwt.verify(token,'Hello@1234#$%');
        req.user=decoded.user;
        next();
    } catch (error) {
        return res.status(400).json({msg:"Token is not valid"});
    }
}

module.exports=auth;