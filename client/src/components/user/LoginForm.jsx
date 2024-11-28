import { UserStore } from "../../store/UserStore.js";
import UserSubmitButton from "./UserSubmitButton.jsx";
import ValidationHelper from '../../utility/ValidationHelper.js'
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
const LoginForm = () => {
  const navigate = useNavigate()
  const { LoginFormData, LoginFormOnChange,UserOTPRequest } = UserStore();
  const handlesubmit=async(e)=>{
    e.preventDefault()
    if(!ValidationHelper.IsEmail(LoginFormData.email)){
      toast.error('Valid Email Required!')
      
    }else{
      let res = await UserOTPRequest(LoginFormData.email)
      res? navigate("/otp") : toast.error('something went wrong!')
    }

  }
  return (


    <div>
      <div className="container section">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <div className="card p-5">
              <h4>Enter Your Email</h4>
              <p>
                A verification code will be sent to the email address you
                provide
              </p>
              <input
                value={LoginFormData.email}
                onChange={(e)=>LoginFormOnChange("email",e.target.value)}
                placeholder="Email Address"
                type="email"
                className="form-control"
              />
              <UserSubmitButton
                onClick={handlesubmit}
                submit={false}
                className="btn mt-3 btn-success"
                text="Next"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
