import {useState,useEffect} from 'react'
import { MdDownloadForOffline, MdDelete } from "react-icons/md"
import {Link,useParams} from "react-router-dom"
import {client,urlFor} from "../sanitySetup"
import MasonryLayout from './MasonryLayout'
import { PinDetailsQuery,pinDetailMorePinQuery } from '../utils/data'
import Spinner from './Spinner'
function PinDetails({user}) {
  const [pins,setPins]=useState(null)
  const [pinDetail,setPinDetail]=useState(undefined)
  const [comment,setComment]=useState('')
  const [addingComment,setAddingComment]=useState(false)
  const {pinId}=useParams()
  
  
  const fetchPinDetail= () =>{
    let query=PinDetailsQuery(pinId)
    
    if(query)
    {
      client.fetch(query).then((data)=>{
        console.log(data)
        if(data[0])
        {
          setPinDetail(data[0])
          fetchMorePinDetail(data[0])
        }
      })
    }
  }
  const fetchMorePinDetail= (pin) =>{
    let query=pinDetailMorePinQuery(pin)
    if(query)
    {
      client.fetch(query).then((data)=>{
        console.log(data)
        if(data)
        {
          setPins(data)
        }
      })
    }
  }
  function addComment()
  {
    if(!user)
    {
      alert("login first")
      return;
    }
    if(comment)
    {
      setAddingComment(true)
      client.patch(pinId).setIfMissing({comments:[]}).insert('after','comments[-1]',[{
        comment,
        postedby:{
          _type: 'postedby',
          _ref: user._id
        }
      }]).commit({
        autoGenerateArrayKeys: true
      })
      .then(()=>{
        setComment('')
        setAddingComment(false)
        fetchPinDetail()
      })
    }
  }
  useEffect(()=>{
    fetchPinDetail()
  },[pinId])
  if(pinDetail===undefined)  return <Spinner/>
  return (
    <div className='flex flex-col justify-center align-center '>
      <div className='m-auto'>
        <img src={pinDetail?.image?.asset?.url} className="rounded-t-3xl max-h-80 object-contain"/>
      </div>
      <div className='flex flex-row m-2 gap-10 justify-center align-center'>
        <a href={`${pinDetail?.image?.asset?.url}?dl=`} download onClick={(e) => e.stopPropagation()}>
          <MdDownloadForOffline fontSize={30} color="black" className="z-10 m-2 hover:cursor-pointer" />
        </a>
        {pinDetail?.destination && 
        <a className='m-2 ' href={pinDetail.destination} target="_blank"> {(pinDetail.destination).substring(0,Math.min(pinDetail.destination.length,40))+"..."} </a>
        }
      </div>
      <div className='mx-10 text-2xl'>
        <p className='font-bold'>{pinDetail?.title}</p>
      </div>
      <div className='m-1 mx-10'>
        <p className='font-semibold'>About: {pinDetail?.about}</p>
      </div>
      <div className='m-1 mx-10'>
        <p className='font-semibold'>Category: {pinDetail?.category}</p>
      </div>
      <div className='mx-10'>
        <Link to={`/user-profile/${ pinDetail?.postedby?._id }`} className="flex m-1">
            <img src={pinDetail?.postedBy?.imageUrl}
              className="rounded-full object-cover mr-1"
              alt="user-profile"
              width={30}
            />
            <p>PostedBy: {pinDetail?.postedBy?.userName}</p>
        </Link>
      </div>
      <div className='m-2'>
        <h2 className='m-1'>Comments:</h2>
        <div className='max-h-52 overflow-y-auto'>
          {
            pinDetail?.comments?.map((comment)=>{
              console.log(comment)
              return (<div className='flex m-1'>
                <img src={comment?.postedby?.imageUrl} alt="" className='w-5 h-5 rounded-full object-cover' />
                <p className='ml-1 mr-2 font-semibold'>{comment?.postedby?.userName}</p>
                <p>{comment?.comment}</p>
              </div>)
            })
          }
        </div>
        <div className='flex flex-row m-2'>
          <input className='flex-1 mx-10 p-2 rounded-xl outline-none border-2 focus:border-gray-300' placeholder='Add a Comment' type="text" value={comment} onChange={(e)=>{setComment(e.target.value)}}/>
            <button type="submit" className='mr-15 p-1 px-2 bg-orange-500 rounded-xl' onClick={addComment}>{addingComment?"Sending":"Send"}</button> 
        </div>
      </div>
      {pins?(<MasonryLayout pins={pins}/>):(<Spinner/>)}
    </div>

  )
}

export default PinDetails