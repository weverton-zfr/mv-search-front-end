import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home"
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./pages/Register";
import AppLayout from "./layouts/AppLayout";
import Settings from "./pages/Settings";
import Plans from "./pages/Plans";
import Search from "./pages/Search";
import Results from "./pages/Results";
import { Toaster } from "react-hot-toast";

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
        <Route path="/*" element={<NotFound/>}/>
        <Route element={ <ProtectedRoute> <AppLayout /> </ProtectedRoute>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/plans" element={<Plans/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/results" element={<Results/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
