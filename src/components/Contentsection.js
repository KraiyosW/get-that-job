import React from "react";
import findjob from "../image/icon.svg";
import Image from "next/image";

const Contentsection = () => {
  return (
    <div className="w-full flex flex-col min-[768px]:flex-row">
      <div className="w-[100%] min-[768px]:w-[60%] bg-pink-tertiary flex flex-row px-[30px] min-[821px]:px-[120px] py-[64px]">
        <div className="flex flex-col">
          <h3 className=" text-white-primary text-center">
            Find your next job
          </h3>
          <br />
          <h5 className=" text-white-primary">
            Our Machine learning algorithm is so good that it's even illegal in
            some countries. Join us to use our barelly legal algorithm that is
            actually a group of interns that work on our basement.
          </h5>
          <br />
          <h5 className=" text-white-primary">
            We have a job for you, no matter your background or previous
            experience. Is sending random memes through chat your only skill?
            That's ok, we got you, our Rock Star Meme Curator role is here for
            you.
          </h5>
        </div>
      </div>
      <div className="w-[100%] min-[768px]:w-[40%] flex px-[30px] min-[1187px]:px-[120px] py-[64px] bg-white-primary justify-center items-center">
        <Image
          alt="find-your-next-job-icon"
          src={findjob}
          className="w-[100%]"
        />
      </div>
    </div>
  );
};

export default Contentsection;
