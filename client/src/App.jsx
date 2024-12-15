import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import ProductByCategory from "./pages/ProductByCategory.jsx";
import ProductByBrandPage from "./pages/ProductByBrand.jsx";
import ProductByKeyword from "./pages/ProductByKeyword.jsx";
import ProductDetailspage from "./pages/ProductDetailspage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import RefundPage from "./pages/RefundPage.jsx";
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from "./pages/TermsPage.jsx";
import HowToBuyPage from "./pages/HowToBuyPage.jsx";
import ComplainPage from "./pages/ComplainPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import OtpPage from "./pages/OtpPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";



function App() {

  return (
    <>
     <BrowserRouter>
         <Routes>
             <Route path="/" element={<Homepage/>} />
             <Route path="/by-category/:id" element={<ProductByCategory/>} />
             <Route path="/by-brand/:id" element={<ProductByBrandPage/>} />
             <Route path="/by-keyword/:keyword" element={<ProductByKeyword/>} />
             <Route path="/details/:id" element={<ProductDetailspage/>} />
             <Route path="/about" element={<AboutPage/>} />
             <Route path="/refund" element={<RefundPage/>} />
             <Route path="/privacy" element={<PrivacyPage/>} />
             <Route path="/terms" element={<TermsPage/>} />
             <Route path="/howtobuy" element={<HowToBuyPage/>} />
             <Route path="/complain" element={<ComplainPage/>} />
             <Route path="/contact" element={<ContactPage/>} />
             <Route path="/profile" element={<ProfilePage/>} />

             <Route path="/login" element={<LoginPage/>} />
             <Route path="/otp" element={<OtpPage/>} />
         </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
