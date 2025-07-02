import React from 'react'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '../../assets/common/HomeIcon.png'

const BacktoHome = () => {

    const navigate = useNavigate()

  return (
    <div onClick={ () => navigate('/') } className='flex justify-center border rounded-xl shadow-lg w-36 hover:bg-gray-300 cursor-pointer border-black p-1 gap-3'>
        <img className='w-5 ' src={ HomeIcon } alt="Home" title='Home' />
        <p className='font-roboto text-sm'> Back to Home </p>
        </div>
  )
}

export default BacktoHome