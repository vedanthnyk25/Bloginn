import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function Protected({children, authentication=true}){

    const navigate= useNavigate()
    const authStatus= useSelector(state=>state.auth.status) 
    const [loader, setLoader]= useState(true)
    

    useEffect(()=>{
        if(authentication && authStatus!==authentication){
        navigate("/login")
        }else if(!authentication && authStatus!== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])





return (
    loader? (
        <div className="flex items-center justify-center h-full w-full">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
        </div>
    ): <>{children}</>
)
}

