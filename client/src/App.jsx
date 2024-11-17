import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import ProductByCategory from "./pages/ProductByCategory.jsx";
import ProductByBrandPage from "./pages/ProductByBrand.jsx";
import ProductByKeyword from "./pages/ProductByKeyword.jsx";



function App() {

  return (
    <>
     <BrowserRouter>
         <Routes>
             <Route path="/" element={<Homepage/>} />
             <Route path="/by-category/:id" element={<ProductByCategory/>} />
             <Route path="/by-brand/:id" element={<ProductByBrandPage/>} />
             <Route path="/by-keyword/:id" element={<ProductByKeyword/>} />
         </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
