import React from "react";
import { useAuth } from "@/contexts/authentication";
import { useRouter } from "next/router";


const LogoutButton = () => {
    const { logout } = useAuth();
    const router = useRouter();
    
    const handleLogout = async () => {
      try {
        await logout();
        router.push('/');
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    return (
      <div onClick={handleLogout} className="flex max-[767px]:items-center items-start justify-end">
        <button type="button" className="button_pink mt-[16px]">
          Logout <section id="arrow-right"></section>
        </button>
      </div>
    );
}

export { LogoutButton };