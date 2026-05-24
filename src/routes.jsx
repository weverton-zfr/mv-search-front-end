import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home"
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./pages/Register";
import AppLayout from "./layouts/AppLayout";
import Settings from "./pages/Settings/index";
import Plans from "./pages/Plans";
import Search from "./pages/Search";
import { Toaster } from "react-hot-toast";
import Payment from "./pages/Payment";
import Checkout from "./pages/Checkout";
import ResetPassword from "./pages/ResetPassword";

export default function RoutesApp() {
  return (
  <BrowserRouter>
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
            style: {
            background: '#022c22',
            color: '#fff',
            border: '1px solid #065f46'
            }
      }}/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={ 
          <ProtectedRoute> 
            <AppLayout /> 
          </ProtectedRoute>
        }>
          <Route path="/" element={<Home/>}/>

          <Route path="/plans" element={<Plans/>}/>
          <Route path="/plans/payment" element={<Payment/>}/>
          <Route path="/plans/checkout" element={<Checkout />} />
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/search" element={<Search/>}/>
        </Route>

        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}
