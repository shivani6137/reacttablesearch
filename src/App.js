// import AddProduct from "./AddProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import ManageProduct from "./ManageProduct";
import AddProduct from "./AddProduct";


function App() {
  return (
   <>
    <BrowserRouter>
    <Routes>
      {/* website routing */}
      <Route path="/" element={<ManageProduct />}></Route>
      <Route path="/addproduct" element={<AddProduct />}></Route>

      </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
