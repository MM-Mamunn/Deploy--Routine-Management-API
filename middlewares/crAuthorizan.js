import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Middleware to verify the token
export default function(req, res, next) {
  // Get token from the header
  const token = req.header("jwtToken");

  // Check if token is not provided
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    // Verifies the token and extracts the user data
    const verify = jwt.verify(token, process.env.jwtSecret);

    // Attach the user data to the request object
    req.user = verify.user;
  
    console.log("User type:", req.user.type);
    
    if(req.user.type != "cr")
        return res.status(403).json({ msg: "authorization denied, not a CR type" });
    next();  // Move to the next middleware or route handler
  } catch (err) {
    // Handle invalid token case
    res.status(401).json({ msg: "Token is not valid" });
  }
}
