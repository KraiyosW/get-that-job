import React from "react";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import LogoMockup from "../../image/logo-mockup.png";
const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

function ProfessionalProfile() {
    const supabase = createClient(
        supabaseURL,
        supabaseAnonKey
      );
      const [selectedFile, setSelectedFile] = useState(null);
      const [imagePreview, setImagePreview] = useState(null);
    
      function handleFileInputChange(event) {
        const file = event.target.files[0];
        setSelectedFile(file);
    
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
      }
      const handleUpdateProfile = async (event) => {
        event.preventDefault();
    
        const fileInput = document.getElementById("fileInput");
        const file = fileInput.files[0];
    
        if (!file) {
          alert("Please select a file to upload.");
          return;
        }
    
        const { data, error } = await supabase.storage
          .from("profiles/professional")
          .upload(`user-${Date.now()}`, file);
    
          if (error) {
          alert("Error uploading file: ", error.message);
        } else {
          alert("File uploaded successfully!");
        }
      };
  return (
    <>
      <main className="bg-white-secondary h-screen">
        <div className="max-[700px]:ml-0 ml-[240px] max-[700px]:py-[16px] py-[32px] max-[700px]:px-[64px] px-[128px] max-[700px]:items-center max-[700px]:text-center">
          <h4 className="mb-[24px]" id="heading4">
            Profile
          </h4>
          <h5 id="heading5">Personal information</h5>
          <div
            className="flex flex-col max-[700px]:items-center"
            id="file-form"
          >
            <div className="mb-[4px] mt-[8px]" id="overline">
              EMAIL
            </div>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[380px] h-[36px]"
              name="Email"
              placeholder="ramon.valdes@vecindad.com"
              type="text"
            />
            <div className="mb-[4px] mt-[8px]" id="overline">
              NAME
            </div>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[380px] h-[36px]"
              name="Name"
              placeholder="Ramón Valdés"
              type="text"
            />
            <div className="mb-[4px] mt-[8px]" id="overline">
            PHONE
            </div>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[380px] h-[36px]"
              name="phone"
              placeholder="+524831212891"
              type="text"
            />
            <p className="text-[#8E8E8E] mt-[4px]" id="overline">+[COUNTRY CODE][NUMBER]</p>
            <div className="mb-[4px] mt-[8px]" id="overline">
            BIRTHDATE
            </div>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[380px] h-[36px]"
              name="Birthdate"
              placeholder="07/02/1971"
              type="text"
            />
             <div className="mb-[4px] mt-[8px]" id="overline">
             LINKEDIN URL
            </div>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[380px] h-[36px]"
              name="Linkedin Url"
              placeholder="https://www.linkedin.com/in/donramon"
              type="text"
            />
            <h5 className="mt-[32px] mb-[8px]" id="heading5">Personal information</h5>
            <p className="text-[#616161] mb-[8px]" id="overline">Changes made here will be reflected in your future applications</p>
            <div className="mb-[4px] mt-[8px]" id="overline">
            TITLE
            </div>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[380px] h-[36px]"
              name="title"
              placeholder="Professional Multiservice"
              type="text"
            />
            <div className="mb-[4px] mt-[8px]" id="overline">
            PROFESSIONAL EXPERIENCE
            </div>
            <textarea
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[760px] h-[310px]"
              name="Professional Experience"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat quam ut tempor maximus. Sed neque arcu, rhoncus elementum sodales a, tristique sed quam. Aliquam nibh velit, pharetra ac faucibus in, ornare eu tortor. Vestibulum lacus ligula, elementum sit amet purus ut, sagittis molestie ex. In hendrerit orci tellus. Integer pharetra porttitor nulla, nec fringilla dolor ultricies et. Integer accumsan feugiat urna, eu hendrerit dui varius sit amet. Mauris eget tristique turpis. Curabitur eget hendrerit turpis. Etiam rutrum dolor eu posuere vehicula.
              Pellentesque ut mauris neque. Maecenas posuere sit amet erat at placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Donec tempor lobortis nisl. Maecenas sit amet massa in tortor pulvinar sollicitudin. Fusce vitae feugiat felis, ut malesuada purus. Curabitur felis velit, interdum vitae viverra quis, sagittis ac nulla. Quisque tempus pharetra ornare. In sed nulla eget risus cursus facilisis vel quis nibh. Praesent euismod lectus a."
            ></textarea>
             <div className="mb-[4px] mt-[8px]" id="overline">
             EDUCATION
            </div>
            <textarea
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[760px] h-[165px]"
              name="Education"
              placeholder="Pellentesque ut mauris neque. Maecenas posuere sit amet erat at placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Donec tempor lobortis nisl. Maecenas sit amet massa in tortor pulvinar sollicitudin. Fusce vitae feugiat felis, ut malesuada purus. Curabitur felis velit, interdum vitae viverra quis, sagittis ac nulla. Quisque tempus pharetra ornare. In sed nulla eget risus cursus facilisis vel quis nibh. Praesent euismod lectus a."
            ></textarea>
                        <div className="flex flex-col">
              <div>
                <div className="mt-[8px] mb-[4px]" id="overline">
                UPLOAD/UPDATE YOUR CV
                </div>
              </div>
              <label
                htmlFor="file-input"
                className="custom-file-upload relative max-[700px]:w-[190px] max-[700px]:ml-[35px]"
              >
                <input
                  type="file"
                  id="fileInput"
                  accept="pdf/*"
                  onChange={handleFileInputChange}
                />
                <div className="icon-file">
                  <svg
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
                </div>
              </label>
              <div>
                <div className="text-grey-secondary mt-[4px]" id="caption">
                Only PDF. Max size 5MB
                </div>
              </div>
            </div>
            <button
              className="button_pink_new mt-[24px] w-[170px]"
              onClick={handleUpdateProfile}
            >
              SAVE CHANGES
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default ProfessionalProfile