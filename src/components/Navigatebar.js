import React from "react";
import signup from "../image/signup.svg";
import login from "../image/login.svg";
import GTJ from "../image/gtj.svg";
import Image from "next/image";

const Navigatebar = () => {
  return (
    <div className="w-full flex flex-row flex-wrap justify-between shadow-md relative z-10 max-[514px]:mt-5 max-[514px]:justify-center">
      <Image
        alt="signup-icon"
        src={GTJ}
        className="max-[514px]:ml-2 max-[767px]:ml-[2.5rem] max-[767px]:mb-[20px] max-[1060px]:ml-[5rem] min-[1061px]:ml-[10rem]"
      />
      <div className="nav-button flex flex-row flex-wrap max-[514px]:mr-0 max-[514px]:justify-center max-[767px]:mr-[2.5rem] max-[1060px]:mr-[5rem] min-[1061px]:mr-[10rem]">
        <div className="flex flex-row border-[1px] rounded-[16px] border-solid border-pink-primary w-[150px] my-[8px] h-[45px] justify-center gap-[7px] mr-2 min-[767px]:mr-[15px]">
          <Image alt="signup-icon" src={signup} />
          <button>SIGN UP</button>
        </div>
        <div className="flex flex-row border-[1px] rounded-[16px] border-solid border-pink-primary w-[120px] my-[8px] h-[45px] justify-center gap-[7px] max-[767px]:mb-[30px]">
          <Image alt="login-icon" src={login} />
          <button>LOGIN</button>
        </div>
      </div>
    </div>
  );
};

export default Navigatebar;
