import {useState,useEffect} from 'react'
import {useParams} from "react-router-dom"
import Spinner from './Spinner'
import {client} from "../sanitySetup"
import { feedQuery, searchQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'


function Feed() {
  const [loading, setLoading] = useState(false)
  const {categoryId}=useParams()
  const [pins, setPins] = useState(null)
  
  useEffect(() => {
    setLoading(true)
    let query;
    if(categoryId)
    {
      query=searchQuery(categoryId) 
    }
    else
    {
      query=feedQuery()
    }
    client.fetch(query).then((data)=>{
      setPins(data)
      console.log(data)
      setLoading(false)
    })
  }, [categoryId])
  if(loading) return <Spinner/>

  return (
    <>
      {pins && <MasonryLayout pins={pins}/>}
    </>
  )
}

export default Feed