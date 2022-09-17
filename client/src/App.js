import { Route, Routes } from "react-router-dom";
import Basic from "./Components/Basic";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Product from "./Components/Product";
import Store from "./Components/Store";
import Summary from "./Components/Summary";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product" element={<Product />} />
        <Route path="/basic-details" element={<Basic />} />
        <Route path="/order-summary" element={<Summary />} />
      </Routes>
    </div>
  );
}

export default App;
