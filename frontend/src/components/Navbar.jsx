  import React from 'react'
  import { AiOutlineSearch } from "react-icons/ai"
  import {RiAddBoxFill} from "react-icons/ri"
  import {Link,useNavigate} from "react-router-dom"
  function Navbar({searchTerm,setsearchTerm,user}) {
    const Navigate=useNavigate()
    return (

      <div className=" flex w-7/8 m-3 ">
      <div className='relative w-full justify-center align-center'>
        <span className="z-10 leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-1">
          <AiOutlineSearch/>
        </span>
        <input type="text" placeholder="Search" className="p-2 mt-2 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm w-full  border-slate-300 outline-none pl-10" 
          value={searchTerm}
          onChange={(e)=>setsearchTerm(e.target.value)}
          onFocus={()=>{(Navigate("/search"))}}
        />
      </div>
        {
          (user &&
          <div className='flex m-4 gap-5'>
            <Link to="/create-pin" >
              <RiAddBoxFill fontSize={50} cursor="pointer"/>
            </Link>
              <img src={user?.imageUrl} alt="profileImg" className='w-10 h-10 rounded-full' />
          </div>
          )
          
        }
        {
          (!user &&
          <Link to="/login">
            <p className='bg-red-500 rounded-full text-white p-2'>Login</p>
          </Link>
          )
        }
        
      </div>

    )
  }

  export default Navbar