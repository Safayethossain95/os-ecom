
/* eslint-disable react/prop-types */
import AppNavBar from "./AppNavBar.jsx";
import Footer from "./Footer.jsx";
import {Toaster} from 'react-hot-toast';
const Layout = ({children}) => {
    return (
        <>
            <AppNavBar/>
            {children}
            <Toaster position="bottom-center"/>
            <Footer/>
        </>
    );
};

export default Layout;