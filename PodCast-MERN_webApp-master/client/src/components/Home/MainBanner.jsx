import React from 'react'
import BannerImage from '../../assets/Home/MainBanner.png'

const MainBanner = () => {
  return (
        <img className='py-10 md:py-1 md:w-4/12' src={ BannerImage } alt="BannerImage" title="skailamia" />
  )
}

export default MainBanner