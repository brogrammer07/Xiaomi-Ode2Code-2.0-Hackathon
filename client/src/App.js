import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Product from "./Components/Product";
import Store from "./Components/Store";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
