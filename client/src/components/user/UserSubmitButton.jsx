import {UserStore} from "../../store/UserStore.js";


const UserSubmitButton = (props) => {

    let {isFormSubmit}= UserStore();

    if(isFormSubmit===false){
        // eslint-disable-next-line react/prop-types
        return  <button onClick={props.onClick} type="submit" className={props.className}>{props.text}</button>
    }else {
        return (
            // eslint-disable-next-line react/prop-types
            <button disabled={true} className={props.className}><div className="spinner-border spinner-border-sm" role="status"></div> Processing...</button>
        );
    }
};
export default UserSubmitButton;