import {create} from 'zustand';
import axios  from "axios";
import {getEmail, setEmail} from "../utility/utility.js";

export const UserStore = create((set)=>({

    LoginFormValue:{email:"ABC"},
    isFormSubmit:false,
    UserOTPRequest:async(email)=>{
        try{

            set({isFormSubmit:true})
            let res=await axios.get(`/api/UserOTP/${email}`, );
            setEmail(email)
            set({isFormSubmit:false})
            return res.data['status']==="success"

        }catch(e){
            console.error(e)
        }
    },
    VerifyLoginRequest:async(otp)=>{
        try{
            set({isFormSubmit:true})
            const email = getEmail()
            let res=await axios.get(`/api/recover-verify-otp/${email}/${otp}`, );
            set({isFormSubmit:false})
            return res.data['status']==="success"

        }catch(e){
            console.error(e)
        }
    },


}))

