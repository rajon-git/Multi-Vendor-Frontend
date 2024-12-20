import React from 'react'
import { useAuthStore } from '../../store/auth'
import { Link } from 'react-router-dom'

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useAuthStore((state)=> [
    state.isLoggedIn,
    state.user
  ])
  return (
    <div>
      {
        isLoggedIn()
            ?<div>
                <h1>Dashboard</h1>
                <Link to={`/logout`}>Logout</Link>
            </div>
            :<div>
                Homepage
                <Link to={"/register"}>Register</Link>
                <Link to={"/login"}>Login</Link>
            </div>
      }
    </div>
  )
}

export default Dashboard
