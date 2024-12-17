
import {create} from 'zustand';
import axios  from "axios";
import {getEmail, setEmail} from "../utility/utility.js";
import Cookies from "js-cookie";
import { persist } from 'zustand/middleware';

export const UserStore = create(persist((set,get)=>({
   
    isLogin:!!Cookies.get('token'),
    uid:null,
    token:null,

    LoginFormData:{email:""},
    LoginFormOnChange:(name,value)=>{
        set((state)=>({
            LoginFormData:{
                ...state.loginFormData,
                [name]:value
            }
        }))
    },
    ProfileForm:{cus_add:"",cus_city:"",cus_country:"",cus_fax:"",cus_name:"",cus_phone:"",cus_postcode:"",cus_state:"",ship_add:"",ship_city:"",ship_country:"",ship_name:"",ship_phone:"",ship_postcode:"",ship_state:""},
    ProfileFormChange:(name,value)=>{
        set((state)=>({
            ProfileForm:{
                ...state.ProfileForm,
                [name]:value
            }
        }))
    },
    ProfileDetails:null,
    ProfileDetailsRequest:async()=>{
        try {
           
            let uid = get().uid
           
            let res=await axios.get(`http://localhost:8000/api/ProfileDetails`,{
                headers:{'user_id':uid}
            });
            if(res.data.status=="success"){
                set({ProfileDetails:res.data['data'][0]})
                set({ProfileForm:res.data['data'][0]})
                console.log(res.data)
                console.log(uid)
            }else{
                set({ProfileDetails:[]})
            }
        }catch (e) {
            // unauthorized(e.response.status)
            console.log("unauthorized",e)
        }
    },
    ProfileSaveRequest:async(postBody)=>{
        try{
            let uid = get().uid
            set({ProfileDetails:null})
            let res = await axios.post(`http://localhost:8000/api/UpadateProfile`,postBody,{
                headers:{'user_id':uid}
            })
            return res.data['status']=== "success"
        }catch(e){
            console.log("unauthorized",e)
        }
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
                set({uid:res.data.uid})
                set({uid:res.data.uid})
            }
            return res.data['status']==="success"

        }catch(e){
            console.error(e)
        }
    },


})))

