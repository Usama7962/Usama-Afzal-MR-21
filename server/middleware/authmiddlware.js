// import jwt from 'jsonwebtoken'
// import User from '../models/User.js';
// const verifyUser = async (req, res, next)=>{
//     try{
//         const token = req.headers.authorization.split(' ')[1];
//         if(!token){
//             return res.status(404).json({success: false,error:"Token Not Provided"})
//         }
//         const decoded =  jwt.verify(token,process.env.JWT_KEY)
//         if(!decoded){
//             return res.status(404).json({success: false,error:"Token Not Valid"})

//         }
//         const user = await User.findById({_id:coded._id}).select('.password')
//         if(!user){
//             return res.status(404).json({success: false,error:"user not found"})
//         }
//         req.next = user
//         next()
//     }catch(error){
//         return res.status(500).json({success: false,error:"server error"})



//     }
// }
// export default verifyUser    



import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
    try {
        // Check if the authorization header exists
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ success: false, error: "Authorization header not provided" });
        }

        // Extract token from the authorization header
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, error: "Token not provided" });
        }

        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_KEY);
        } catch (error) {
            // If token is expired or invalid
            return res.status(401).json({ success: false, error: "Token is expired or invalid" });
        }

        // Find user using the decoded user ID and exclude password field for security
        const user = await User.findById(decoded._id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in verifyUser middleware:", error.message);
        return res.status(500).json({ success: false, error: "Server error" });
    }
};

export default verifyUser;


