import React from "react"

const Registerform = () => {
  return (
    <div className="flex flex-col">
      <div className="mb-[20px]">
        <h1>Good choice!</h1>
        <h3>Create a new account as...</h3>
      </div>
      <div className="flex flex-row">
        <div className="mr-[5px] border-b-4 border-[#BDBDBD] hover:border-b-[#F48FB1] focus:border-b-[#F48FB1]">
          <p>PROFESSIONAL</p>
        </div>
        <div className="ml-[5px] border-b-4 border-[#BDBDBD] hover:border-b-[#F48FB1] focus:border-blue-400">
          <p>RECRUITER</p>
        </div>
      </div>
      <div className="flex flex-col gap-[20px] mt-[20px]">
        <div>
          <p>EMAIL</p>
          <input
            placeholder="some.user@email.com"
            className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-[360px] h-[36px]"
          ></input>
        </div>
        <div>
          <p>PASSWORD</p>
          <input
            placeholder="******"
            className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-[360px] h-[36px]"
          ></input>
        </div>
        <div>
          <p>PASSWORD CONFIRMATION</p>
          <input
            placeholder="******"
            className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-[360px] h-[36px]"
          ></input>
        </div>
      </div>
      <div>
        <button className="">NEXT</button>
      </div>
    </div>
  );
}

export default Registerform