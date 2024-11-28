import {create} from 'zustand';
import axios  from "axios";
import {getEmail, setEmail} from "../utility/utility.js";

export const UserStore = create((set)=>({

    LoginFormData:{email:""},
    LoginFormOnChange:(name,value)=>{
        set((state)=>({
            LoginFormData:{
                ...state.loginFormData,
                [name]:value
            }
        }))
    },
    isFormSubmit:false,
    UserOTPRequest:async(email)=>{
        try{

            set({isFormSubmit:true})
            let res=await axios.get(`/api/recover-verify-email/${email}`, );
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

