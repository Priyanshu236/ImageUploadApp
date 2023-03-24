import { useState,useEffect } from 'react'
import { AiOutlineCloudUpload } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { client } from '../sanitySetup'
import Spinner from './Spinner'
import {Categories} from "../utils/data"

function CreatePin({user}) {
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')
  const [destination, setDestination] = useState('')
  const [category, setCategory] = useState('other')
  const [imageAsset, setImageAsset] = useState(null)
  const [loading, setLoading] = useState(false)
  const [wrongImage, setWrongImage] = useState(false)
  const [fields, setFields] = useState(null)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user)
    {
      navigate("/login")
    }
  },[])
  function uploadImage(e)
  {
    if(e===undefined) return;

    const {type,name}=e.target.files[0]

    if(['image/gif','image/png','image/svg','image/jpg','image/jpeg'].includes(type) )
    {
      console.log("Photu2")
      setWrongImage(false)
      setLoading(true)
      client.assets.upload('image',e.target.files[0],{contentType:type,name}).then((doc)=>{
        setImageAsset(doc)
        setDestination(doc.url)
        setLoading(false)
      }).catch((err)=>{console.log(err)})
    }
    else
    {
      setWrongImage(true)
    }
  }
  function savePin(e)
  {
    if(category && title && about && imageAsset?._id)
    {
      const doc={
        _type: "pin",
        title: title,
        about: about,
        destination: destination,
        image:{
          _type: 'image',
          asset:{
            _type: "reference",
            _ref: imageAsset?._id
          }
        },
        userId:user._id,
        postedBy:{
          _type:'postedby',
          _ref: user._id
        },
        category
      }
      client.create(doc).then(()=>{
        navigate('/')
      })
    }
    else
    {
      setFields(true)
      setTimeout(()=>setFields(true))
    }
  }
  return (
    <div className='flex flex-col justify-center  w-4/5'>
      {fields && (
        <p className='text-red-400 mb-5 text-xl'>Please fill in all the details</p>
      )}
      
      <div className="flex items-center self-center justify-center w-3/5 h-60">
        <label className="flex flex-col items-center justify-center w-4/5 h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        {!imageAsset ?(
          <>
            <div className="flex flex-col  items-center justify-center pt-5 pb-6">
              <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={uploadImage}/>
          </>
        ):(
          <div className='relative h-full flex justify-center item-center'>
            <img src={imageAsset?.url} alt="uploaded image" className='object-contain'/>
            <button type='button'
            className='absolute bottom-3 right-3 p-3 rounded-full bg-white cursor-pointer hover:shadow-md'
            onClick={(e)=>{e.stopPropagation();setImageAsset(null) }}
            >
              <MdDelete/>
            </button>
          </div>
        )}
        </label>
      </div>
      <div className='mt-3 pl-3 flex flex-1 flex-col'>
          <input
            type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Add title"
            className='outline-none p-2 text-2xl font-bold border-b-2'
          ></input>
      </div>
      <input className='ml-3 p-2 outline-none border-b-2' placeholder="What's your Pin about ?" onChange={(e)=>(setAbout(e.target.value))} value={about} type="text"></input>
      <div className='flex flex-col'>
        <p className='font-semibold m-2 ml-3'>Choose a Category</p>
        <select className='ml-2 outline-none border-b-2 font-xl rounded-md cursor-pointer' onChange={(e)=>{ setCategory(e.target.value); console.log(category)}} value={category}>
          <option className='bg-white'>Other</option>
          {Categories.map((item)=>{
            return <option value={item.name}>{item.name}</option>
          })
          }
        </select>
      </div>
      <button type="submit" className='rounded-lg m-2 h-10 bg-black text-white' onClick={() =>{savePin()}}>Save Pin</button>
    </div>
  )
}

export default CreatePin