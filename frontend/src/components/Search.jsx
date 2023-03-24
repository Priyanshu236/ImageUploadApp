import React,{useState,useEffect} from 'react'
import MasonryLayout from './MasonryLayout'
import { client } from '../sanitySetup'
import { feedQuery,searchQuery } from '../utils/data'
import Spinner from './Spinner'
function Search({searchTerm}) {
  const [pins,setPins] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    if(searchTerm!==''){
      setLoading(true)
      const query = searchQuery(searchTerm.toLowerCase())
      client.fetch(query).then((data)=>{
        setPins(data)
        setLoading(false)
      })
    }
    else
    {
      setLoading(true)
      client.fetch(feedQuery()).then((data)=>{
        setPins(data)
        setLoading(false)
      })
    }
  },[searchTerm])
  return (
    <div>

    {loading && <Spinner/>}
    {pins?.length!==0 && <MasonryLayout pins={pins}/>}
    {pins?.length===0 && searchTerm!=='' && !loading && (
      <div>No Pins</div>
    )}
    </div>
  )
}

export default Search