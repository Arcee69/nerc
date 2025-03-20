import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'



const PageLayout = () => {
 
  const location = useLocation()


  return (
    <div className="w-full overflow-hidden">
        <div className='hidden lg:block'>
            <Header />
        </div>
        <div className=''>
            <Outlet />
        </div>
        <div className=''>
            <Footer />
        </div>
    </div>
  )
}

export default PageLayout