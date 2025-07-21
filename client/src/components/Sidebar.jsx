import assets from 'assets/assets'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
  return (
    <div>
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <img src={assets.logo} alt="logo" className='max-w-40' />
          <div className='relative py-2 group'>
            <img src={asstes.menu_icon} alt="Menu" className='max-h-5 cursor-pointer' />
          </div>
          <div>
            <p className='cursor-pointer text-sm'>Edit Profile</p>
            <hr className="my-2 border-t border-gray-500"/>
            <p className='cursor-pointer text-sm'>Logout</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar