import OTPModel from "../model/otpModel.js";
import Users from "../model/UsersModel.js";
import { TokenEncode } from "../utility/tokenUtility.js";
import ProfileModel from "./../model/profilesModel.js";
import SendEmail from './../utility/emailUtility.js';

export const UserOTPService = async (req) => {
  try {
    let email=req.params.email;
    let code=Math.floor(100000+Math.random()*900000);

    let EmailText=`Your Verification Code is= ${code}`
    let EmailSubject='Email Verification'

    await SendEmail(email,EmailText,EmailSubject);

    await Users.updateOne({email:email},{$set:{otp:code}},{upsert:true})

    return {status:"success", message:"6 Digit OTP has been send"}
}catch (e) {
    return {status:"fail", message:e.toString()}
}
};

export const RegisterUserService = async (req) => {
  try {
    let user = new Users(req.body);
    await user.save();
    return { status: "success", message: "User Registration Successful" };
  } catch (err) {
    return { status: "fail", message: err.toString() };
  }
};

export const ResetPasswordService = async (req) => {
    let email = req.params.email;
    let otp = req.params.otp;
    otp = parseInt(otp);
    
    let reqBody = {
        password: req.body.password
    }
    try {

   let otpUsedCount = await OTPModel.aggregate([
    {$match:{email,otp,status:1}},
    {$count:"total"}
   ])
   console.log(otpUsedCount)
    if(otpUsedCount[0].total === 1){
        let passUpdate = await Users.updateOne({email:email},reqBody)

        await OTPModel.updateOne(
            {email,otp,status:1},
            {otp:null,status:null}
        )
        return { status: "success", message: passUpdate }
    }else{
        return { status: "fail", message: "Invalid OTP or Email" }
    }

   
  } catch (err) {
    return { status: "fail", message: err.toString() };
  }
};

export const CodeVerifyService = async (req,res) => {
    let email = req.params.email;
    let otp = req.params.otp;
    otp = parseInt(otp)
  try {
    
    let total=await Users.find({email:email,otp:otp})
   
        if(total.length==1){

            // User ID Read
            let user_id=await Users.find({email:email,otp:otp}).select('_id');

            // User Token Create
            let token=TokenEncode(email,user_id[0]['_id'].toString())
            res.cookie('token', token, {
              httpOnly: true,          // Prevent access to the cookie from JavaScript
              secure: false, // Use secure cookies in production
              sameSite: 'None',      // CSRF protection
              maxAge: 60 * 60 * 1000,   // Cookie expiration time (5 minutes)
              path: '/',
            });
            // OTP Code Update To 0
            await Users.updateOne({email:email},{$set:{otp:"0"}})
          
            return {status:"success", message:"Valid OTP",token:token,uid:user_id[0]._id}

        }
        else{
            return {status:"fail", message:"Invalid OTP"}
        }
    
  } catch (e) {
    return { status: "fail", message: e.toString() };
  }
};

export const ProfileService = async (req) => {
  try {
    const user_id = req.headers.user_id;
    const reqBody = req.body;

    await ProfileModel.updateOne(
      { userID: user_id },
      { $set: reqBody },
      { upsert: true }
    );
    return { status: "success", message: "Profile Updated Successfully" };
  } catch (err) {
    return { status: "fail", message: err.toString() };
  }
};
export const ReadProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let data = await ProfileModel.find({ userID: user_id });
    return { status: "success", data: data };
  } catch (err) {
    return { status: "fail", message: err.toString() };
  }
};
