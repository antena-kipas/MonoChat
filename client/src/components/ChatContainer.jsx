import React, { useReducer, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { useEffect } from 'react'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = ({selectedUser, setSelectedUser}) => {
    const scrollEnd = useRef(null)

    useEffect(()=>{
      if(scrollEnd.current){
        scrollEnd.current.scrollIntoView({ behavior: "smooth"})
      }
      
    },[])


  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-burp-lg'>
          {/* header */}
        <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
          <img src={assets.profile_martin} alt="" className="w-8 rounded-full"/>
          <p className='flex-1 text-lg text-white flex items-center gap-2'>
            Martin Johnson
            <span className='w-2 h-2 rounded-full bg-green-500'></span>
          </p>
          <img onClick={()=> setSelectedUser(null)} src={assets.arrow_icon} alt="" 
          className='md:hidden max-w-7' />
          <img src={assets.help_icon} alt="test" className='max-md:hidden max-w-5' />
        </div>

        {/* ------- Mono chat ------ */}
        <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
            {messagesDummyData.map((msg, index)=>(
              <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId
              !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'}`}>
                {msg.image ? (
                  <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 
                   rounded-lg overflow-hidden mb-8'/>
                ):(
                  <p className={`p-2 max-w-[200px] md:text-sm font-light 
                    rounded-lg mb-8 break-all bg-gray-500/30 text-white ${msg.
                    senderId === '680f50e4f10f3cd28382ecf9' ? 'rounded-br-none' : 
                    'rounded-bl-none'}`}>{msg.text}</p>
                )}
                <div className="text-center text-xs ">
                  <img src={msg.senderId === '680f50e4f10f3cd28382ecf9' ? assets.avatar_icon 
                    : assets.profile_martin} alt="" className='w-7 rounded-full' />
                    <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
                </div>
              </div>
            ))}
            <div ref={scrollEnd}></div>
        </div>
            {/* -------- send ---------*/}
        <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
            <div>
              <input type="text" placeholder="Send" className='flex-1 text-sm p-3 border-none 
              outline-none text-white placeholder-black-400' />
              <input type="file" id='image' accept='image/png, image/jpg' hidden />
              <label htmlFor="image">
                <img src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer' />
              </label>
            </div>
            <img src={assets.send_button}  alt="" className='w-7 cursor-pointer' />
        </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img src={assets.logo_icon} className='max-w-16' alt="" />
      <p className='text-lg font-medium text-white'>Mono Chat, this is odd room chat.</p>
    </div>
  )
}

export default ChatContainer