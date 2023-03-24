import React from 'react'
import Masonry from "react-masonry-css"

import Pin from './Pin'
const breakPoints={
    default:4,
    3000:6,
    2000:5,
    1200:3,
    1000:2,
    500:1
}
function MasonryLayout({pins}) {
  return (
    <Masonry className='flex' breakpointCols={breakPoints}>
        {

            pins?.map( (pin)=>{
                console.log(pin)
                return <Pin pin={pin}/>
            } )
       
        }
    </Masonry>
  )
}

export default MasonryLayout