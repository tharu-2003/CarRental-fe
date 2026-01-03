import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';
import Footer from './components/Footer';
import Layout from './pages/owner/Layout';

import  { lazy, Suspense } from 'react'


const Home = lazy(() => import("./pages/Home"));
const CarDetails = lazy(() => import("./pages/CarDetails"));
const Cars = lazy(() => import("./pages/Cars"));
const MyBookings = lazy(() => import("./pages/MyBookings"));
const Dashboard = lazy(() => import("./pages/owner/Dashboard"));
const AddCar = lazy(() => import("./pages/owner/AddCar"));
const ManageCars = lazy(() => import("./pages/owner/ManageCars"));
const ManageBookings = lazy(() => import("./pages/owner/ManageBookings"));
const Login = lazy(() => import("./pages/Login"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"))

const App = () => {

  const {showLogin} = useAppContext()
  const isOwnerPath = useLocation().pathname.startsWith('/owner');

  return (
    <>
     <Toaster />
      {showLogin && <Login />}
      {!isOwnerPath && <Navbar />}

      {/* IMPORTANT: wrap lazy components */}
      <Suspense fallback={<h2 style={{textAlign:'center'}}>Loading...</h2>}>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/car-details/:id' element={<CarDetails />} />
            <Route path='/cars' element={<Cars />} />
            <Route path='/my-bookings' element={<MyBookings />} />
            <Route path='/owner' element={<Layout />}>
                <Route index element={<Dashboard />}/>
                <Route path='add-car' element={<AddCar />}/>
                <Route path='manage-cars' element={<ManageCars />}/>
                <Route path='manage-bookings' element={<ManageBookings />}/>
            </Route>
            <Route path='/reset-password/:token' element={<ResetPassword />} />
        </Routes>
      </Suspense>


      {!isOwnerPath && <Footer /> }
    </>
  )
}

export default App
