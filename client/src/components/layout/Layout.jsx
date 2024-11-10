import AppNavBar from "./AppNavBar.jsx";
import Footer from "./Footer.jsx";

const Layout = ({children}) => {
    return (
        <>
            <AppNavBar/>
            {children}
            <Footer/>
        </>
    );
};

export default Layout;