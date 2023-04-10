import React from "react";
import people from "@/image/people.png";
import Image from "next/image";

const Headers = () => {
  return (
    <div className="flex flex-col flex-warp items-center px-[50px] min-[768px]:px-[120px] bg-white-secondary ">
      <h2 className="mt-[2rem] text-center" id="heading2">The place where</h2>
      <h2 className="mb-[2rem] text-center" id="heading2">
        you get
        <span
          style={{ fontFamily: "Montserrat" }}
          className="font-sans  text-6xl text-pink-primary font-light "
        >
          {" "}
          that{" "}
        </span>
        job
      </h2>
      <h5 className="w-[100%] min-[768px]:w-[50%] text-center" id="heading5">
        With our Machine Learning algorithm you will get that job in no time. We
        promise you! Just give us the money and we will take care of it.
      </h5>
      <button className="uppercase mt-[2rem] mb-[2.063rem] w-[16.5rem] h-[3.5rem] rounded-[16px] bg-pink-primary text-white-primary tracking-[0.078rem] " id="btn">
        create an account now
      </button>
      <Image
        alt="profestional worker"
        src={people}
        className="w-[100%] min-[768px]:w-[70%] mb-[4rem] "
      />
    </div>
  );
};

export default Headers;
