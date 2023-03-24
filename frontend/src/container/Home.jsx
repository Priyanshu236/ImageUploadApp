import {useState,useRef,useEffect} from 'react'
import { Sidebar } from '../components'
import logo from "../assets/logo.png"
import {client} from "../sanitySetup"
import {Link,Routes,Route} from 'react-router-dom'
import Pins from './Pins'
import {AiOutlineMenu} from "react-icons/ai"
import {AiFillCloseCircle} from "react-icons/ai"
import {userQuery,userLogged} from '../utils/data'
function Home() {
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [user, setUser] = useState(null)
  const userInfo=userLogged()
  useEffect(() => {

    const query=userQuery(userInfo?.googleId)
    client.fetch(query).then((data)=>{

      setUser(data[0])
    }) 
  }, [])
  
  return (
    <>
    <div className='flex bg-gray-50 flex-col md:flex-row h-screen '>
      <div className='hidden md:flex h-screen min-w-[15%] flex-initial'>
        <Sidebar user={user && user} />
      </div>
      <div className='flex md:hidden flex-row w-full justify-around shadow-md'>
        <AiOutlineMenu fontSize={30} cursor="pointer" onClick={()=>{setToggleSidebar(true)}}/>
        <Link to="/">
          <img src={logo} alt="logo" width="80px"/>
        </Link>
        <Link to="/">
          <img src={user?.imageUrl} alt="image" className="w-10 h-10 rounded-full"/>
        </Link>
      </div>

      {toggleSidebar && (
          <div className='fixed w-3/5 bg-gray-100 h-screen flex-col justify-space transform duration-500 overflow-y-auto z-10 '>
            <div className='absolute right-1 top-1 '>
              <AiFillCloseCircle cursor="pointer" fontSize={25} onClick={()=>{setToggleSidebar(false)}}/>
            </div>
            
            <Sidebar user={user && user} classToggle={setToggleSidebar}/>
          </div>  
        )}
     <div className='w-full'>
        <Pins user={user && user}/>
     </div>
    </div>
    </>
  )
}

export default Home