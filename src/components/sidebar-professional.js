import React from "react";
import GTJ from "../image/gtj.svg";
import search from "../image/search.png"
import application from "../image/apllication.png"
import following from "../image/following.png"
import profile from "../image/profile.png"
import logout from "../image/logout.png"
import Image from "next/image";
import Link from "next/link";

const SideBarProfessional = () => {
    return (
        <div className=" gap-[10px]  py-[32px] bg-white-tertiary flex flex-col  w-[240px] h-[100vh]">
            <Link href="/">
                <Image src={GTJ} className="mb-4 pl-[16px] w-[160px] cursor-pointer" />
            </Link>

            <div className="flex gap-4 py-[12px] bg-white-secondary pl-[16px] cursor-pointer">
                <Image src={search} className="w-[20px]" />
                <p id="body1">Find that job</p>
            </div>

            <div className="flex gap-4 py-[12px] pl-[16px] cursor-pointer">
                <Image src={application} className="w-[20px]" />
                <p id="body1">Your applications</p>
            </div>

            <div className="flex gap-4 py-[12px] pl-[16px] cursor-pointer">
                <Image src={following} className="w-[20px] " />
                <p id="body1">Following</p>
            </div>

            <div className="flex gap-4 py-[12px] pl-[16px] cursor-pointer">
                <Image src={profile} className="w-[20px]" />
                <p id="body1">Profile</p>
            </div>

            <div className="flex gap-4 py-[12px] pl-[16px] cursor-pointer">
                <Image src={logout} className="w-[20px]" />
                <p id="body1">Log out</p>
            </div>
        </div>
    );
};

export default SideBarProfessional;
