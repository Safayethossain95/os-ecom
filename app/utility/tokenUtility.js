import jwt from "jsonwebtoken";
import { JWT_EXPIRE_TIME, JWT_KEY } from "../config/config.js";

export const TokenEncode = (email, user_id) => {
  const PAYLOAD = { email: email, user_id: user_id };
  const token = jwt.sign(
    PAYLOAD, // Your data object
    JWT_KEY, // The secret key to sign the token
    { expiresIn: JWT_EXPIRE_TIME } // The token will expire in 5 minutes
  );
  // Setting the cookie
 

  return token;
};

export const TokenDecode =(token) => {

    try{
        const decoded = jwt.verify(token,JWT_KEY)

        if(!!decoded.email == true){
          let RefreshToken = jwt.sign(
             {email: decoded.email,user_id: decoded.user_id},
            JWT_KEY, // The secret key to sign the token
            { expiresIn: JWT_EXPIRE_TIME } // The token will expire in 5 minutes
          );
          return {token:RefreshToken,email:decoded.email,user_id: decoded.user_id}
        }
    }catch(err){
        return null
    }
};
