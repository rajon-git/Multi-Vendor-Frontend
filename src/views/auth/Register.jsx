import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import { register } from '../../utils/auth'

function Register() {

  const [fullname, setFullname] = useState()
  const [email, setEmail] = useState()
  const [number, setNumber] = useState()
  const [password, setPassword] = useState()
  const [password2, setPassword2] = useState()

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const isLoggedIn = useAuthStore((state)=> state.isLoggedIn)

  useEffect(()=> {
    if(isLoggedIn()) {
        navigate('/')
  
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    const {error} = await register(
        fullname,
        email,
        number,
        password,
        password2
    )

    if (error) {
        alert(JSON.stringify(error))
    } else {
        navigate("/")
    }
  }

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder='Full Name'
                name=""
                id=""
                onChange={(e) => setFullname(e.target.value)}
            />
            <br/>

            <input 
                type="email" 
                placeholder='Email'
                name=""
                id=""
                onChange={(e) => setEmail(e.target.value)}
            />

            <br/>

            <input 
                type="number" 
                placeholder='Mobile'
                name=""
                id=""
                onChange={(e) => setNumber(e.target.value)}
            />

            <br/>

            <input 
                type="password" 
                placeholder='Enter Password'
                name=""
                id=""
                onChange={(e) => setPassword(e.target.value)}
            />

            <br/>

            <input 
                type="password" 
                placeholder='Confirm Password'
                name=""
                id=""
                onChange={(e) => setPassword2(e.target.value)}
            />

            <br/>

            <button type='submit'>Register</button>
      </form>
    </>
  )
}

export default Register
