import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import ProductByCategory from "./pages/ProductByCategory.jsx";
import ProductByBrandPage from "./pages/ProductByBrand.jsx";
import ProductByKeyword from "./pages/ProductByKeyword.jsx";
import ProductDetailspage from "./pages/ProductDetailspage.jsx";
import AboutPage from "./pages/AboutPage.jsx";



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
         </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
