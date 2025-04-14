const jwt=require('jsonwebtoken');
const User = require('../models/User');

// Protect middleware for verifying JSON Web Tokens
const protect=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {
            token=req.headers.authorization.split(' ')[1]
            const decoded=jwt.verify(token,process.env.JWT_TOKEN)
            req.user=await User.findById(decoded.user.id).select('-password')
            next()
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({message:"Token invalid/expired"})
        }
    }
    else{
        return res.status(500).json({message:'No token provided'})
        
    }
}

// Admin middleware verifies the admin
const admin=async (req,res,next)=>{
if (req.user && req.user.role == 'admin') {
    next()
} else {
    return res.status(404).json({message:'Not authorizes as an admin'})
}
}

module.exports={protect,admin}