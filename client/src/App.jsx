import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";


function App() {

  return (
    <>
     <BrowserRouter>
         <Routes>
             <Route path="/" element={<Homepage/>} />q
         </Routes>
     </BrowserRouter>
    </>
  )
}

export default App