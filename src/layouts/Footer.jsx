import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuFacebook, LuMail } from "react-icons/lu";
import { SlLocationPin, SlSocialTwitter } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { LuLinkedin } from "react-icons/lu";
import { TbPhoneCall } from "react-icons/tb";

import Logo from "../assets/svg/logo.svg" 

const Footer = () => {

  const navigate = useNavigate()

  const isMobile = window.innerWidth < 768

  return (
    <div className="w-full flex flex-col py-[68px] px-[144px] gap-[48px] bg-[#1D1D1F]">  
      <div className="grid grid-cols-4 gap-[44px]">
        <div className="flex flex-col gap-6">
          <p className="font-roboto text-[#fff] leading-[28px] text-[20px] font-medium">NERC</p>
          <p className="font-roboto text-base leading-[26px] text-[#D1D5DB] ">
            Nigerian Electricity Regulatory
            Commission is an independent
            regulatory body responsible for
            regulating the Nigerian
            electricity industry.
          </p>
          <div className="flex items-center gap-4">
            <LuFacebook className="text-[#fff] w-5 h-5"/>
            <SlSocialTwitter className="text-[#fff] w-5 h-5"/>
            <FaInstagram className="text-[#fff] w-5 h-5" />
            <FiYoutube className="text-[#fff] w-5 h-5"/>
            <LuLinkedin className="text-[#fff] w-5 h-5"/>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-roboto text-[#fff] leading-[28px] text-[20px] font-medium">Quick Links</p>
          <ul className="font-roboto text-base leading-[26px] gap-3 flex flex-col text-[#D1D5DB]">
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
            <li>News</li>
            <li>Contact Us</li>
            <li>Help Center</li>
          </ul>
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-roboto text-[#fff] leading-[28px] text-[20px] font-medium">Services</p>
          <ul className="font-roboto text-base leading-[26px] gap-3 flex flex-col text-[#D1D5DB]">
            <li>Licensing</li>
            <li>Tariff Regulation</li>
            <li>Market Competition</li>
            <li>Standards & Codes</li>
            <li>Compliance Monitoring</li>
            <li>Consumer Protection</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-roboto text-[#fff] leading-[28px] text-[20px] font-medium">Contact Us</p>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <SlLocationPin className="w-10 h-10 text-[#026487]" />
              <p className="font-roboto text-base leading-6 text-[#D1D5DB]">
                Plot 1387, Cadastral Zone A00, Central Business District, Abuja, FCT Nigeria
              </p>
            </div>
            <div className="flex items-start gap-3">
              <TbPhoneCall className="w-5 h-5 text-[#026487]" />
              <p className="font-roboto text-base leading-6 text-[#D1D5DB]">
                0800-CALL-NERC (0800-2255-6372)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <LuMail className="w-4 h-4 text-[#026487]" />
              <p className="font-roboto text-base leading-6 text-[#D1D5DB]">
                info@nerc.gov.ng
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="border border-x-0 border-b-0 border-[#1F2937] flex items-center justify-between pt-[33px]">
        <p className="text-sm text-[#9CA3AF] leading-5 font-roboto">© 2025 Nigerian Electricity Regulatory Commission. All rights reserved.</p>
        <div className="flex items-center gap-6 ">
          <p className="text-[14px] text-[#9CA3AF] leading-5">Privacy Policy</p>
          <p className="text-[14px] text-[#9CA3AF] leading-5">Terms of Service</p>
          <p className="text-[14px] text-[#9CA3AF] leading-5">Accessibility</p>
        </div>
      </div>  
    </div>
  );
};

export default Footer;
