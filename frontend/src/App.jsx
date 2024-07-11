import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom" 
import Books from './pages/Books'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import AboutUs from './pages/AboutUs'
import ViewBookDetails from './components/ViewBook/ViewBookDetails'
const App = () => {
  
  return (
    <div>
      <Router>
      <Navbar/>

        <Routes>
  
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/books' element={<Books/>} />
          <Route exact path='/log-in' element={<Login/>} />
          <Route exact path='/sign-up' element={<Signup/>} />
          <Route exact path='/cart' element={<Cart/>} />
          <Route exact path='/profile' element={<Profile/>} />
          <Route exact path='/about-us' element={<AboutUs/>} />
          <Route exact path='/view-book-details/:id' element={<ViewBookDetails/>} />



        </Routes>
      <Footer/>
      </Router>
     






    </div>
  )
}

export default App