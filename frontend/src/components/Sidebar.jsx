import React from 'react'
import {NavLink,Link} from "react-router-dom"
import logo from "../assets/logo.png"
import { Categories } from '../utils/data'
function Sidebar({user,classToggle}) {
    console.log(user)
    
    function closeSidebar()
    {
        console.log("hell")
            classToggle(false)   
    }
    const isActiveStyle="m-1.5 item-center align-center font-bold"
    const isNotActiveStyle="m-1.5 item-center font-normal"
  return (
    <div className='flex flex-col justify-between h-full overflow-y-scroll align-center bg-gray-100 p-6 shadow-sm scrollbar-hide '>
    <div className='flex flex-col my-2'>

        <img src={logo} width="100px" className='my-3'></img>
        
       
        <NavLink to="/" onClick={closeSidebar} className={({isActive})=>isActive?isActiveStyle:isNotActiveStyle}>
            Home
        </NavLink>
   
        <div className='my-2 item-center font-semiBold'>Categories</div>
        {Categories.map((categ,index)=>{
            return (
                <NavLink key={index} to={`/category/${categ.name}`} onClick={closeSidebar} className={({isActive})=>isActive?isActiveStyle:isNotActiveStyle}>
                    {categ.name}
                </NavLink>
            )
            
        })}
    </div>
        {user && (
            <Link
          to={`user-profile/${user._id}`}
          className="flex mb-3 gap-2 items-center  bg-white rounded-lg shadow-lg mx-3"
          onClick={closeSidebar}
        >
          <img src={user.imageUrl} className="w-7 h-7 m-1 rounded-full" alt="user-profile" />
          <p className='p-2 overflow-clip overflow-hidden'>{user.userName}</p>
    
        </Link>
        )}
    </div>
  )
}

export default Sidebar