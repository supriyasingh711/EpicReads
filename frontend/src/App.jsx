import React, { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'
import {Routes,Route} from "react-router-dom" 
import Books from './pages/Books'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import AboutUs from './pages/AboutUs'
import ViewBookDetails from './components/ViewBook/ViewBookDetails'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Favourites from './components/Profile/Favourites'
import UserOrderHistory from './components/Profile/UserOrderHistory'
import Settings from './components/Profile/Settings'
import AllOrders from './pages/AllOrders'
import AddBook from './pages/AddBook'
import UpdateBook from './pages/UpdateBook'


const App = () => {
  //to get the state even after refreshing
  const dispatch=useDispatch()
  const role=useSelector((state)=>state.auth.role)
  useEffect(()=>{
    if(localStorage.getItem("id")&&
        localStorage.getItem("token")&&
        localStorage.getItem("role")
  
  ){
    dispatch(authActions.login());
    dispatch(authActions.changeRole(localStorage.getItem("role")));
  }
  },[]);
  return (
    <div>
            <Navbar/>

        <Routes>
  
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/books' element={<Books/>} />
          <Route exact path='/log-in' element={<Login/>} />
          <Route exact path='/update-book/:id' element={<UpdateBook/>} />

          <Route exact path='/sign-up' element={<Signup/>} />
          <Route exact path='/cart' element={<Cart/>} />
          <Route exact path='/profile' element={<Profile/>} >
          {role==="user" ? (
            <Route index element={<Favourites/>} />
          ):(
            <Route path='/profile/all-orders' element={<AllOrders/>} />
          )}
          {role==="admin" && (
            <Route path='/profile/add-book' element={<AddBook/>} />

          )}
          
          <Route index element={<Favourites/>}/>
          <Route path='/profile/orderHistory' element={<UserOrderHistory/>}/>
          <Route path='/profile/settings' element={<Settings/>}/>


          </Route>
          <Route exact path='/about-us' element={<AboutUs/>} />
          <Route exact path='/view-book-details/:id' element={<ViewBookDetails/>} />



        </Routes>
      <Footer/>
 
     






    </div>
  )
}

export default App