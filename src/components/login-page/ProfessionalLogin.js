import React from "react";
import { useForm } from "react-hook-form";

const ProfessionalLogin = () =>{
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
      };
      console.log(watch("example")); 

      return(
        <>
        <div className="flex flex-col  max-[767px]:items-center items-start">
         <form className="flex flex-col mt-[10px] z-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col  max-[767px]:items-center items-start">  
                <label> 
                <p style={{ fontFamily: "Montserrat" }} className="uppercase text-left">email</p>
                </label>
                <input 
                placeholder="some.user@email.com"
                className=" mb-[1rem] border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[240px] w-[360px] h-[36px]" 
                {...register("email",{required:true,pattern:/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/})}/>
                {errors && errors.email && errors.email.type === "required" && <p>Invalid email address.</p>}
                </div>
                <div className="flex flex-col  max-[767px]:items-center items-start">
                <label> 
                <p style={{ fontFamily: "Montserrat" }} className="uppercase">password</p>
                </label>
                <input 
                placeholder="********"
                className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[240px] w-[360px] h-[36px]" 
                {...register("password",{required:true,pattern:/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/})}/>
                {errors && errors.password && errors.password.type === "required" && <p>Password must be at least 8 characters long.</p>}
             </div>
             <div className="flex items-start justify-end max-[767px]:items-center ">
                    <button className="button_pink mt-[1rem]">
                    NEXT<section id="arrow-right"></section>
                    </button>
                </div>
         </form>
         </div>
        </>
      );
}

export {ProfessionalLogin};
