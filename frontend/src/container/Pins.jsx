import {useState,useRef} from 'react'
import {Routes,Route} from "react-router-dom"
import {Navbar,Feed,PinDetails,CreatePin,Search, UserProfile} from "../components"
function Pins({user}) {
  const [searchTerm, setsearchTerm] = useState('')
  return ( 
    <div className='h-screen overflow-y-auto'>
      <div className='p-0 m-1 h-14 '>
        <Navbar searchTerm={searchTerm} setsearchTerm={setsearchTerm} user={user}/>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Feed/>}/>
          <Route path="/category/:categoryId" element={<Feed/>}/>
          <Route path="/create-pin" element={<CreatePin user={user}/>}/>
          <Route path="/pin-detail/:pinId" element={<PinDetails user={user}/>}/>
          <Route path="/user-profile/:userId" element={<UserProfile/>}/>
          <Route path="/search" element={<Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Pins