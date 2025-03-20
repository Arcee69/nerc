import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";

import Logo from "../assets/svg/logo.svg" 

import './css/Header.css';

const Header = () => {


  const navigate = useNavigate()




  return (
    <div 
      className='bg-[#fff] fixed z-50 w-full pl-[32px] h-[80px] pr-[127px] py-5 flex items-center justify-between'
    >
        <img src={Logo} alt="Logo" className='w-auto h-[44px] cursor-pointer' onClick={() => {navigate("/"); window.scrollTo(0, 0)}}/>

        <div className='flex items-center gap-10'></div>
       
    </div>
  )
}

export default Header