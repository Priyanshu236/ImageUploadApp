import { useState, useEffect } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams, useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'
import { client } from '../sanitySetup'
import Spinner from './Spinner'
import { userLogged } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import { userQuery, userSavedPinsQuery, userCreatedPinsQuery } from '../utils/data'
function UserProfile() {
  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [text, setText] = useState('Created')
  const [activeBtn, setActiveBtn] = useState('created')
  const navigate = useNavigate()
  const userId = useParams().userId
  console.log(userId)
  const clientId = process.env.REACT_APP_GOOGLEID

  const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none'
  const notActiveBtnStyles = 'text-black font-bold p-2 rounded-full w-20 outline-none'

  useEffect(() => {
    const query = userQuery(userId)
    client.fetch(query).then((data) => {
      setUser(data[0])
    })
  }, [userId])
  useEffect(() => {
    let query
    if (activeBtn == 'created') {
      query = userCreatedPinsQuery(userId)
    }
    else {
      query = userSavedPinsQuery(userId)
    }
    client.fetch(query).then((data) => {
      setPins(data)
    })
  }, [activeBtn])
  function onSuccess() {

    localStorage.clear();
    googleLogout()
    navigate('/login')

  }

  if (!user) {
    return <Spinner />
  }
  return (
    <div className='relative pb-2 h-full m-1 justify-content items-center'>
      <div className='flex flex-col pb-5x justify-content items-center'>
        <img src="https://source.unsplash.com/1600x900" alt="background-img" className='h-80 w-full shadow-lg object-cover' />
        <img src={user?.imageUrl} alt="background-img" className='h-20 w-20 -mt-10 shadow-xl rounded-full' />
        <h1 className='fond-bold  mt-2 text-2xl'>
          {user?.userName}
        </h1>
        <div className='absolute top-0 right-2 z-2'>
          {
            userLogged()?.googleId == userId && (
              <AiOutlineLogout fontSize={30} onClick={onSuccess} style={{ color: "red", cursor: "pointer", margin: "2px" }} />
            )
          }
        </div>
      </div>
      <div className='text-center mb-7'>
        <button
          type='button'
          onClick={(e) => {
            setText(e.target.text)
            setActiveBtn('created')
          }}
          className={(activeBtn == 'created' ? activeBtnStyles : notActiveBtnStyles)}
        >Created</button>
        <button
          type='button'
          onClick={(e) => {
            setText(e.target.text)
            setActiveBtn('saved')
          }}
          className={(activeBtn == 'saved' ? activeBtnStyles : notActiveBtnStyles)}
        >Saved</button>
      </div>
      <div>
        <MasonryLayout pins={pins} />
      </div>
    </div>
  )
}

export default UserProfile