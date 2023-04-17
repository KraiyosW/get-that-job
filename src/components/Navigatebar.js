import React from "react";
import signup from "../image/signup.svg";
import login from "../image/login.svg";
import GTJ from "../image/gtj.svg";
import Image from "next/image";
import Link from "next/link";


const Navigatebar = () => {
  return (
    <div className="w-full flex flex-row flex-wrap justify-between shadow-md relative z-10 max-[514px]:mt-5 max-[514px]:justify-center">
      <Link href="/">
        <Image
          alt="signup-icon"
          src={GTJ}
          className="max-[514px]:ml-2 max-[767px]:ml-[2.5rem] max-[767px]:mb-[20px] max-[1060px]:ml-[5rem] mt-[0.6rem] min-[1061px]:ml-[10rem]"
        />
      </Link>
      <div className="nav-button flex flex-row flex-wrap max-[514px]:mr-0 max-[514px]:justify-center max-[767px]:mr-[2.5rem] max-[1060px]:mr-[5rem] min-[1061px]:mr-[10rem]">
        <Link href="/register">
          <div className="group flex flex-row border-[1px] rounded-[16px] border-solid border-pink-primary w-[150px] my-[8px] h-[45px] justify-center gap-[7px] mr-2 min-[767px]:mr-[15px] hover:text-white hover:bg-pink-primary duration-[0.5s] active:opacity-[50%]" >
            <Image alt="signup-icon" src={signup} className="group-hover:brightness-[250%] duration-[0.5s]" />
            <button >SIGN UP</button>
          </div>
        </Link>
        <Link href="/Login">
        <div className="flex flex-row border-[1px] rounded-[16px] border-solid border-pink-primary w-[120px] my-[8px] h-[45px] justify-center gap-[7px] max-[767px]:mb-[30px]">
          <Image alt="login-icon" src={login} />
          <button>LOGIN</button>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Navigatebar;
