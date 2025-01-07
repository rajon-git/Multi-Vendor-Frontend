import './App.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Dashboard from './views/auth/Dashboard'
import Logout from './views/auth/Logout'
import ForgotPassword from './views/auth/ForgotPassword'
import CreatePassword from './views/auth/CreatePassword'
import StoreHeader from './views/base/StoreHeader'
import MainWrapper from './layout/MainWrapper'
import StoreFooter from './views/base/StoreFooter'
import Products from './views/shop/Products'

function App() {
  return (
    <>
      <BrowserRouter>
      <StoreHeader/>
    
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/create-new-password' element={<CreatePassword/>}/>

          {/* route components */}

          <Route path='/' element={<Products/>}/>
        </Routes>
        <StoreFooter/>
      
      </BrowserRouter>
    </>
  )
}

export default App
