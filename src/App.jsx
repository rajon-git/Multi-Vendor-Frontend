import './App.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Login from './views/auth/Login'
import Home from './views/auth/Home'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
