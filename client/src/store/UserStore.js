
import {create} from 'zustand';
import axios  from "axios";
import {getEmail, setEmail, unauthorized} from "../utility/utility.js";
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
           
           
            let res=await axios.get(`http://localhost:8000/api/ProfileDetails`,{
                headers:{'user_id':"65749b6036b023a8b6c5ea73"}
            });
            if(res.data.status=="success"){
                set({ProfileDetails:res.data['data'][0]})
                set({ProfileForm:res.data['data'][0]})
                console.log(res.data)
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
            set({ProfileDetails:null})
            let res = await axios.post(`/api/UpadateProfile`,postBody)
            return res.data['status']=== "success"
        }catch(e){
            unauthorized(e.response.status)
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
            }
            return res.data['status']==="success"

        }catch(e){
            console.error(e)
        }
    },


}))

