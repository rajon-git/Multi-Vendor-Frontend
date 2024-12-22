import React, { useState } from 'react'
import apiInstance from '../../utils/axios'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const [email, setEmail] =  useState("")
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      await apiInstance.get(`user/password-reset/${email}/`)
        .then((res) => {
            alert("An Email Has been sent to you")
        })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h1>Forgot Password</h1>
      <input 
        type="text" 
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter Email' 
        name='' 
        id ='' />
      <br/>
      <br/>
      <button onClick={handleSubmit}>Reset Password</button>
    </div>
  )
}

export default ForgotPassword
