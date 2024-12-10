/* eslint-disable no-unused-vars */
import {create} from 'zustand';
import axios  from "axios";
import {getEmail, setEmail} from "../utility/utility.js";
import Cookies from "js-cookie";
export const UserStore = create((set)=>({
   
    isLogin:!!Cookies.get('token'),
    

    LoginFormData:{email:""},
    LoginFormOnChange:(name,value)=>{
        set((state)=>({
            LoginFormData:{
                ...state.loginFormData,
                [name]:value
            }
        }))
    },
    OTPFormData:{otp:""},
    OTPFormOnChange:(name,value)=>{
        set((state)=>({
            OTPFormData:{
                ...state.OTPFormData,
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
    UserLogoutRequest:async()=>{
        try{

            let res=await axios.get(`/api/logout`, { withCredentials: true } );
            set({isLogin:!!Cookies.get('token')})
            return res.data

        }catch(e){
            console.error(e)
        }
    },
    VerifyLoginRequest:async(otp)=>{
        try{
            set({isFormSubmit:true})
            const email = getEmail()
            let res=await axios.post(`/api/recover-verify-otp/${email}/${otp}`, { withCredentials: true } );
            set({isFormSubmit:false})
            if(res.data.status=="success"){
                set({isLogin:true})
            }
            return res.data['status']==="success"

        }catch(e){
            console.error(e)
        }
    },


}))

