export const Categories=[
    {name: "Animals"},
    {name: "Photography"},
    {name: "Sports"},
    {name: "Action"},
    {name: "Nature"},
]
export const userLogged=()=>{
    return localStorage.getItem('user')!==undefined?JSON.parse(localStorage.getItem('user')):null
}
export const userQuery= (userId)=>{
    // console.log(userId)
    const query=`*[_type== "user" && _id == '${userId}']`
    // console.log(query)
    return query 
}
export const searchQuery= (searchTerm)=>{
    // console.log(userId)
   
    const query=`*[_type== "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{asset->{url}},
        _id,
        destination,
        postedBy->{
            _id,
            userName,
            imageUrl
        },
        save[]{
            _key,
            postedBy -> {
                _id,
                userName,
                image
            },
        }
    }`

    return query 
}
export const feedQuery= ()=>{
    // console.log(userId)
   
    const query=`*[_type== "pin"]| order(_createAt desc){
        image{asset->{url}},
        _id,
        destination,
        postedBy->{
            _id,
            userName,
            imageUrl
        },
        save[]{
            _key,
            postedby -> {
                _id,
                userName
            },
        }
    }`

    return query 
}
export const PinDetailsQuery= (pinId)=>{
    // console.log(userId)
   
    const query=`*[_type== "pin" && _id=='${pinId}']{
        image{asset->{url}},
        _id,
        destination,
        title,
        about,
        postedBy->{
            _id,
            userName,
            imageUrl
        },
        category,
        save[]{
            _key,
            postedBy -> {
                _id,
                userName,
                image
            },
        },
        comments[]{
            comment,
            postedby->{
                _id,
                userName,
                imageUrl
            }
        }
    }`

    return query 
}

export const pinDetailMorePinQuery = (pin) => {
    const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedby->{
          _id,
          userName
        },
      },
    }`;
    return query;
  };

  export const userSavedPinsQuery = (userId) => {
    const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedby->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };
  
export const userCreatedPinsQuery = (userId) => {
    const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedby->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };