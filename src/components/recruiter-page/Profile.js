import React from "react";
import LogoMockup from "../../image/logo-mockup.png";
import Image from "next/image";

function Profile() {
  return (
    <>
      <main className="bg-white-secondary h-screen">
        <div className="max-[700px]:ml-0 ml-[240px] max-[700px]:py-[16px] py-[32px] max-[700px]:px-[64px] px-[128px] max-[700px]:items-center max-[700px]:text-center">
          <h4 className="mb-[27px]" id="heading4">
            Profile
          </h4>
          <div
            className="py-[10px] pr-[10px] pl-0 flex flex-row items-center"
            id="file-upload"
          >
            <div className="flex items-center max-[700px]:mt-[-4px] border-shadow w-[75px] h-[75px] rounded-[8px] drop-shadow-lg mr-[11px]">
              <Image
                src={LogoMockup}
                alt="Company Logo"
                className="w-[100%] h-auto rounded-[8px]"
              />
            </div>
            <div className="flex flex-col">
            <div><p className="mb-[4px]" id="overline">COMPANY LOGO</p></div>
              <button className="bg-pink-primary px-[16px] py-[8px] text-white rounded-[8px] flex flex-row items-center h-[45px]">
                <svg className="mr-[8px] max-[700px]:w-[70px]"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 15.8333H17.5V17.5H2.5V15.8333ZM10.8333 4.85663V14.1666H9.16667V4.85663L4.1075 9.91663L2.92917 8.73829L10 1.66663L17.0708 8.73746L15.8925 9.91579L10.8333 4.85829V4.85663Z"
                    fill="white"
                  />
                </svg>
                Choose a file
              </button>
              <div><p className="text-grey-secondary mt-[4px]" id="caption">PNG, JPEG, IMG</p></div>
            </div>
            <div><h2 className="text-grey-primary ml-[8px]" id="subtitle2">No file chosen</h2></div>
          </div>
          <div className="flex flex-col max-[700px]:items-center" id="file-form">
          <p className="mb-[4px] mt-[11px]" id="overline">
          COMPANY EMAIL
            </p>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[300px] h-[36px]"
              name="companyEmail"
              placeholder="web.works@mail.com"
              type="text"
            />
            <p className="mb-[4px] mt-[8px]" id="overline">
            COMPANY NAME
            </p>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[300px] h-[36px]"
              name="companyName"
              placeholder="The Web Works"
              type="text"
            />
             <p className="mb-[4px] mt-[8px]" id="overline">
             COMPANY WEBSITE
            </p>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[300px] h-[36px]"
              name="companyWebsite"
              placeholder="www.webworks.com"
              type="text"
            />
            <p className="mb-[4px] mt-[8px]" id="overline">
            ABOUT THE COMPANY
            </p>
            <textarea
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[760px] h-[250px]"
              name="aboutTheCompany"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta nunc viverra velit tincidunt, non vehicula augue vehicula. Donec viverra luctus nisl, sed vehicula ligula. Vivamus maximus metus a magna fermentum ullamcorper. Phasellus ultrices vestibulum ligula ut pellentesque. Quisque quis congue quam. Nunc porttitor risus lorem, in blandit augue iaculis vitae. Cras sit amet fringilla neque. Fusce ac elit ut quam ultrices bibendum. Curabitur vitae dignissim quam. Suspendisse aliquet massa id orci volutpat ullamcorper. Nunc at ante sem. Etiam elementum, mi eget aliquam lobortis, elit libero tempus ex, vel pretium nisi risus ac augue."
            ></textarea>
            <button className="button_pink_new mt-[24px] w-[180px]">UPDATE PROFILE</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;
