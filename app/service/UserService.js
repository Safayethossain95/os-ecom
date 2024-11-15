import OTPModel from "../model/otpModel.js";
import Users from "../model/UsersModel.js";
import ProfileModel from "./../model/profilesModel.js";
import SendEmail from './../utility/emailUtility.js';

export const UserOTPService = async (req) => {
  try {
    let email = req.params.email;
    let code = Math.floor(100000 + Math.random() * 900000);

    let EmailText = `Your Verification Code is= ${code}`;
    let EmailSubject = "Email Verification";

    

    let userCount = await Users.aggregate([
      { $match: { email: email } },
      { $count: "total" },
    ]);
    console.log(userCount);

    if (userCount[0].total === 1) {
      await OTPModel.updateOne({ email: email }, { otp: code, status: 0 },{upsert: true,new: true});

      let sendEmail = await SendEmail(email, EmailText, EmailSubject);
      return { status: true, data: sendEmail };
    }else{
        return { status: false, data: "No User Found" };
    }

  } catch (e) {
    return { status: "fail", message: e.toString() };
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

export const CodeVerifyService = async (req) => {
    let email = req.params.email;
    let otp = req.params.otp;
    otp = parseInt(otp)
  try {
    
    let otpCount = await OTPModel.aggregate([
        {$match: {email:email,otp:otp}},
        {$count:"total"}
    ])
    
    if(otpCount[0].total===1){
        await OTPModel.updateOne({email:email,otp:otp},{otp,status:1})
        return {status:"success",message:"Verification Successful"}
    }else{
        return {status:"fail",message:"Invalid OTP"}
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
