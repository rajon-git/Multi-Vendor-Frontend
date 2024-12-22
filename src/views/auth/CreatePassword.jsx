import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import apiInstance from '../../utils/axios'

function CreatePassword() {
  const [password, setPassword] =  useState()
  const [confirmPassword, setConfirmPassword] =  useState()

  const [searchParam] = useSearchParams()
  const otp = searchParam.get("otp")
  const uidb64 = searchParam.get("uidb64")

  const navigate = useNavigate()

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if(password != confirmPassword) {
        alert("Passwords do not match")
    } else {
        const formData = new FormData()
        formData.append('password',password)
        formData.append('otp',otp)
        formData.append('uidb64',uidb64)

        try {
            await apiInstance.post(`user/password-change/`, formData).then((res)=> {
                navigate("/login")
            })
        } catch (error) {
            console.log(error)
        }
    }
  }
  return (
    <div>
      <h1>Create New Password</h1>
      <form onSubmit={handleSubmitPassword}>
        <input 
            type="password"
            name=""
            id="" 
            placeholder='Enter New Password'
            onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <br/>
        <input 
            type="password"
            name=""
            id="" 
            placeholder='Enter New Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br/>
        <br/>
        <button type="submit">Save New Password</button>
      </form>
    </div>
  )
}

export default CreatePassword
