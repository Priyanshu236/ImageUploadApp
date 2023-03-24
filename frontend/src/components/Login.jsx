import React from 'react'
import { useNavigate } from "react-router-dom"
import bg from "../assets/SignImg.jpg"
import { client } from '../sanitySetup';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
function Login() {
  const navitgate = useNavigate()


  const onSuccess = (res) => {
    console.log(res)
    // var profile = auth2.currentUser.get().getBasicProfile();
    console.log(res)
    const userObj = jwt_decode(res.credential)
    console.log(userObj)
    const { name, sub: googleId, picture: imageUrl } = userObj
    const user = {
      name: name,
      googleId: googleId,
      imageUrl: imageUrl
    }
    localStorage.setItem('user', JSON.stringify(user))
    console.log(name)
    console.log(googleId)
    console.log(imageUrl)
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      imageUrl: imageUrl
    }
    client.createIfNotExists(doc).then(() => {
      navitgate("/", { replace: true })
    })
    console.log('success:', doc);
  };
  const onFailure = (err) => {
    console.log('failed:', err);
  };
  return (
    <div className='bg-cover bg-center flex h-screen justify-center items-center' style={{ backgroundImage: `url(${bg})` }} >
      <div>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </div>
  )
}

export default Login