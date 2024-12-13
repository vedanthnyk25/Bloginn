
import { useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {authService} from './appwrite/auth.js'
import {login, logout} from './store/authSlice'
import {Header, Footer} from './componenets/index.js'
function App() {
  const [loading, setLoading]= useState(true)
  const dispatch= useDispatch()

  useEffect(()=>{
     authService.getCurrentUser()
     .then((userData)=>{
      if (userData){
        dispatch(login({userData}))
      }else 
      dispatch(logout())
     })
     .finally(()=> setLoading(false))

  },[])

  return !loading?(
    <div className='min-h-screen flex flex-wrap
    content-between bg-gray-500'>
      <div className='w-full block'>
        <Header/>
        <main>
          {/*<Outlet/>*/}
        </main>
        <Footer/>
      </div>
    </div>
  ):(
    <div className="min-h-screen flex justify-center items-center bg-gray-800">
      <div
        className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"
        aria-label="Loading..."
      ></div>
    </div>
  );

  return (
    <>
      <h1>Let's Start our first mega Project!</h1>
    </>
  )
}

export default App
