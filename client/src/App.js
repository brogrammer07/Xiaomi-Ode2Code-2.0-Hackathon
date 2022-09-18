import { Route, Routes } from "react-router-dom";
import Basic from "./Components/Basic";
import Home from "./Components/Home";
import Invoice from "./Components/Invoice";
import Login from "./Components/Login";
import Order from "./Components/Order";
import Payment from "./Components/Payment";
import PaymentSuccess from "./Components/PaymentSuccess";
import Product from "./Components/Product";
import Store from "./Components/Store";
import Summary from "./Components/Summary";
import TrackOrder from "./Components/TrackOrder";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/track-order/order/:orderId" element={<Order />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product" element={<Product />} />
        <Route path="/basic-details" element={<Basic />} />
        <Route path="/order-summary" element={<Summary />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
      </Routes>
    </div>
  );
}

export default App;
