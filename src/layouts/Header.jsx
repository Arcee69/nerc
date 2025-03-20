import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";

import Logo from "../assets/svg/logo.svg" 

const Header = () => {

  const navigate = useNavigate()


  return (
    <div 
      className='bg-[#026487] fixed z-50 w-full px-[144px] h-[92px] py-4 flex items-center justify-between'
    >
        <img src={Logo} alt="Logo" className='w-auto h-[60px] cursor-pointer' onClick={() => {navigate("/"); window.scrollTo(0, 0)}}/>

        <div className='flex items-center gap-[32px]'>
          <p className='text-[#fff] font-roboto text-base leading-6 cursor-pointer font-medium'>
            Home
          </p>
          <p className='text-[#fff] font-roboto text-base leading-6 cursor-pointer font-medium'>
            About
          </p>
          <p className='text-[#fff] font-roboto text-base leading-6 cursor-pointer font-medium'>
            Services
          </p>
          <p className='text-[#fff] font-roboto text-base leading-6 cursor-pointer font-medium'>
            News
          </p>
          <p className='text-[#fff] font-roboto text-base leading-6 cursor-pointer font-medium'>
            Contact
          </p>
          <div className='flex items-center justify-center bg-[#FEDA5E] w-[110px] h-[48px] rounded-full cursor-pointer'>
            <p className='font-roboto text-base leading-6 font-medium text-[#026487]'>Get Help</p>
          </div>
        </div>
       
    </div>
  )
}

export default Header