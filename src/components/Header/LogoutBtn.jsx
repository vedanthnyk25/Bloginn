import React from 'react'
import { useDispatch } from 'react-redux'
import {authService} from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch= useDispatch()
    const logoutHandler= async ()=>{
        authService.logout().then(()=>{
          dispatch(logout())  
        })
    }
  return (
    <button
    className='inline-black px-6 py-2 duration-200
    hover:bg-black rounded-full'>
      Logout
    </button>
  )
}
export default LogoutBtn