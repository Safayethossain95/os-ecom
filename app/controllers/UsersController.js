import ProfileModel from "../model/profilesModel.js";
import Users from "../model/UsersModel.js";
import { CodeVerifyService, ProfileService, ReadProfileService, RegisterUserService, ResetPasswordService, UserOTPService } from "../service/UserService.js";
import SendEmail from "../utility/emailUtility.js";
import { TokenDecode, TokenEncode } from "../utility/tokenUtility.js";

export const UserOTP = async (req,res)=>{
    let result=await UserOTPService(req)
    return res.status(200).json(result)
}

export const RegisterUser = async (req,res)=>{
    let result=await RegisterUserService(req)
    return res.status(200).json(result)
}

export const Login=async(req,res)=>{

    
    try{
        let reqBody = req.body;
        let data = await Users.findOne({email:reqBody.email,password:reqBody.password})

        if(data==null){
            return res.json({status:"fail",message:"User not found"})
        }
        else{
            let token = TokenEncode(data['email'],data['_id'])
            const cookieOptions = {
                httpOnly: true, // Secure the cookie (not accessible via JavaScript)
                secure: true, // Ensure secure flag in production
                expires: new Date(Date.now() + 30 * 60 * 1000) // Expire in 5 minutes (if required)
              };
            
              res.cookie('token', token, cookieOptions);
            return res.json({status:"success",message:"User login successfully",data:{token:token}})
        }
     
    }catch(err){

        return res.json({status:"fail",message:err.toString()})
    }
}
export const Logout=async(req,res)=>{

    
    try {
        let cookieOption = {
            expires: new Date(0), // Set expiration to a past date
            httpOnly: true,      // Ensure this matches the original setting
            secure: false,        // Ensure this matches the original setting
            sameSite: 'None',     // Ensure this matches the original setting
            path: '/'             // Ensure this matches the original setting
          };
          console.log('Before removal:', req.cookies.token);
          res.cookie('token', '', cookieOption);
          console.log('After removal:', req.cookies.token);
        
        return res.json({
            status: "success",
            message: "User logged out successfully",
            token:""
        });
    } catch (err) {

        return res.json({
            status: "fail",
            message: err.toString()
        });
    }
    
}

export const ProfileDetails=async(req,res)=>{

    try{
        let user_id = req.headers['user_id']
       
    let data = await ProfileModel.find({"userID":user_id})
    res.cookie('userid', user_id, {
        httpOnly: true,          // Prevent access to the cookie from JavaScript
        secure: false, // Use secure cookies in production
        sameSite: 'None',      // CSRF protection
        maxAge: 60 * 60 * 1000,   // Cookie expiration time (5 minutes)
        path: '/',
      });
    return res.json({status:"success",message:"User profile view.",data:data})
    }catch(err){
        return res.json({status:"fail",message:err.toString()})
    }
}

export const ProfileUpdate=async(req,res)=>{

    try{
        let reqBody = req.body;
    let user_id = req.headers['user_id']
    await UsersModel.updateOne({"_id":user_id},reqBody)
    return res.json({status:"success",message:"User Updated successfully"})
    }catch(err){
        return res.json({status:"fail",message:err.toSTring()})
    }
}


export const CodeVerify=async(req,res)=>{

    let result = await CodeVerifyService(req,res)
    return res.status(200).json(result)
    
}
export const IsTokenthere=async(req,res)=>{
    if(res.cookie('token')!==""){
        
        return res.status(200).json({status:"success"})
    }else{
        return res.status(401).json({status:"fail"})
    }
}

export const ResetPassword=async(req,res)=>{

    let result=await ResetPasswordService(req)
    return res.status(200).json(result)
}
export const CreateProfile=async(req,res)=>{

    let result=await ProfileService(req)
    return res.status(200).json(result)
}
export const UpdateProfile=async(req,res)=>{

    let result=await ProfileService(req)
    return res.status(200).json(result)
}
export const ReadProfile=async(req,res)=>{

    let result=await ReadProfileService(req)
    return res.status(200).json(result)
}



