import React from 'react'
import assets from '../assets/assets'

const ChatContainer = ({selectedUser, setSelectedUser}) => {
  return (
    <div className='h-full overflow-scroll relative backdrop-burp-lg'>
        <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
          <img src={assets.profile_martin} alt="" className="w-8 ="/>
          <p className='flex-1 text-lg text-white flex items-center gap-2'>
            Lucas Johnson
            <span className='w-2 h-2 bg-green-500'></span>
          </p>
          <img onClick={()=> setSelectedUser(null)} src={assets.arrow_icon} alt="" 
          className='md:hidden max-w-7' />
          <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5' />
        </div>
    </div>
  )
}

export default ChatContainer