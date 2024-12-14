import React from 'react'
import { Container,Logo, LogoutBtn } from '../index.js'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

function Header() {
  const authStatus= useSelector((state)=>state.auth.status)
  const navigate= useNavigate();

  const navItems= [
    {
      name:'Home',
     slug: "/",
     active: true   
    },
    {
      name:'Login',
     slug: "/login",
     active: !authStatus   
    },
    {
      name:'Signup',
     slug: "/Signup",
     active: !authStatus   
    },
    {
      name:'All posts',
     slug: "/all-posts",
     active: authStatus  
    },
    {
      name:'Add post',
     slug: "/add-post",
     active: authStatus   
    },
  ]

  
  return (
    <header className='py-3 shadow bg-gray-600'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='100px' />
            </Link>
          </div>
        <ul>
        {navItems.map((item)=>
          item.active?(
            <li className='mr-4' key={item.slug}>
            <button onClick={()=> navigate(item.slug)}
              className='inline-black px-6 py-2 duration-200 hover:bg-black rounded-full'>
              {item.name}
            </button>
          </li>
          ):null
        )}  
        {authStatus && <li className='mr-4'>
            <LogoutBtn/>
          </li>}
        </ul>  
        </nav>
      </Container>
    </header>
  )
}

export default Header