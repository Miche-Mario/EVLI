import React from 'react'
import { useSelector } from 'react-redux'

import Welcomee from "./../assets/welcome.PNG"

const Welcome = () => {

  const { user} = useSelector(
    (state) => state.auth
  );
  return (
    <div>
    <div className='lg:flex lg:justify-center'>
    <div className='lg:w-8/12 lg:m-6 w-full bg-blue-400 p-3 flex items-center '>
     <div className='lg:ml-10'>
       <p className='font-light text-white text-2xl'>Welcome <span className=' font-bold'>{user && user.name}</span> back to your dashboard</p>
     </div>
     <div className='lg:ml-10'>
       <img src={Welcomee} className="w-52" alt="welcome"/>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Welcome