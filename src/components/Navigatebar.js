import React from 'react'
import signup from '../image/signup.svg'
import login from '../image/login.svg'
import GTJ from '../image/gtj.svg'
import Image from 'next/image'


const Navigatebar = () => {
  return (
    <div className="w-full h-[64px] flex flex-row justify-end gap-[15px] shadow-md">
      <Image alt="signup-icon" src={GTJ} className='mr-[1080px]'/>
      <div className="flex flex-row border-[1px] rounded-[16px] border-solid border-[#F48FB1] w-[150px] my-[8px] h-[45px] justify-center gap-[7px]">
        <Image alt="signup-icon" src={signup} />
        <button>SIGN UP</button>
      </div>
      <div className="flex flex-row border-[1px] rounded-[16px] border-solid border-[#F48FB1] w-[120px] my-[8px] mr-[200px] h-[45px] justify-center gap-[7px]">
        <Image alt="login-icon" src={login} />
        <button>LOGIN</button>
      </div>
    </div>
  );
}

export default Navigatebar