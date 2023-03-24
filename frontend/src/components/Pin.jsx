import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { client, urfFor } from '../sanitySetup'
import { MdDownloadForOffline, MdDelete } from "react-icons/md"
import { AiFillDelete } from "react-icons/ai"
import { BsArrowUpRightCircleFill } from "react-icons/bs"

function Pin({ pin: { postedBy, image, _id, destination, save } }) {
  const navigate = useNavigate()
  const [postHovered, setPostHovered] = useState(false)
  const user=localStorage.getItem('user')!==undefined?JSON.parse(localStorage.getItem('user')):null

  const narr =  save?.filter( (item) => {return item?.postedby?._id === user?.googleId} )
  // console.log(save)
  const alreadySaved= (narr && narr.length>0)?true:false
  
  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        // Ensure that the `reviews` arrays exists before attempting to add items to it
        .setIfMissing({ save: [] })
        // Add the items after the last item in the array (append)
        .insert('after', 'save[-1]', [{
          postedby: {
            _type: 'postedby',
            _ref: user?.googleId
          },
          userId: user?.googleId,
        }])
        .commit({
          // Adds a `_key` attribute to array items, unique within the array, to
          // ensure it can be addressed uniquely in a real-time collaboration context
          autoGenerateArrayKeys: true,
        }).then(() => {
          window.location.reload()
        })
    }
    else
    {
      console.log(save.length)
      const rem_arr= save.filter((item)=>item?.postedby?._id!==user.googleId)
      console.log(rem_arr.length)
      client
        .patch(id)
        // Ensure that the `reviews` arrays exists before attempting to add items to it
        .set({'save':rem_arr})
        .commit({
          // Adds a `_key` attribute to array items, unique within the array, to
          // ensure it can be addressed uniquely in a real-time collaboration context
          autoGenerateArrayKeys: true,
        }).then(() => {
          window.location.reload()
        })
    }
  }

  function deletePin(id)
  {
    client.delete(id).then(()=>{
      window.location.reload()
    })
  }
  if(!image) return;
  return (
    <div className='m-2'>
      <div
        onMouseEnter={() => {
          setPostHovered(true)
        }}
        onMouseLeave={() => {
          setPostHovered(false)
        }}
        onClick={() => {
          navigate(`/pin-detail/${_id}`)
        }}
        className="relative hover:shadow-lg overflow-hidden"
      >
        {image && <img className='rounded-lg w-full' alt="user-post" src={urfFor(image).width(250).url()} />}
        {postHovered && (
          <>
            <div className='absolute top-0 rounded-lg z-10'>
              <a href={`${image?.asset?.url}?dl=`} download onClick={(e) => e.stopPropagation()}>
                <MdDownloadForOffline fontSize={40} color="white" className="opacity-60 hover:opacity-90 hover:cursor-pointer" />
              </a>
            </div>
            <button className='absolute top-0 right-0 rounded-lg z-10 bg-red-500 text-sm text-white rounded-3xl m-0.5 p-1.5 hover:bg-red-300 outlined-none' onClick={(e)=>{savePin(_id); e.stopPropagation()}}>
              {alreadySaved===false ? "Save" : "Saved"}
            </button>
            {destination && (
              <a className='flex absolute z-10 bottom-0 left-0 bg-gray opacity-60 hover:opacity-90 bg-gray-300 rounded-2xl'
                href={destination}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <BsArrowUpRightCircleFill />
                <p>{
                  destination.slice(8, Math.min(20, destination.length - 1))
                }</p>
              </a>
            )}
            {postedBy._id===user?.googleId && (
              <div className='absolute bottom-1 right-1 rounded-lg z-10'>
              <MdDelete fontSize={25} color="black" onClick={(e)=>{
                e.stopPropagation()
                const confirmBox = window.confirm(
                    "Do you really want to delete this Post?"
                  )
                  if (confirmBox === true) {
                    deletePin(_id)
                  }
              }} className="bg-white rounded-full opacity-60 hover:opacity-90 hover:cursor-pointer" />
            </div>
            )}
          </>
        )}
      </div>
      <Link to={`/user-profile/${postedBy?._id}`} className="flex m-1">
            <img src={postedBy?.imageUrl}
              className="rounded-full object-cover mr-1"
              alt="user-profile"
              width={30}
            />
            <p>{postedBy?.userName}</p>
      </Link>


    </div>

  )
}

export default Pin