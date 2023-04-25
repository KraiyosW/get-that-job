import React from "react";
import Image from "next/image";
import invisibility from "../../image/invisibility.png";
import visibility from "../../image/visibility.png";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "@/contexts/authentication";
import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const RecruiterFormPage2 = (props) => {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCompany, setErrorCompany] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const { recruiterRegister } = useAuth();
  const [fileChosen, setFileChosen] = useState(false);
  const [avatars, setAvatars] = useState({});
  const supabase = createClient(supabaseURL, supabaseAnonKey);
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
    let isValid = true;
    console.log("file", file);
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const { data, error } =
      (await supabase.storage
        .from("profiles/recruiter")
        .upload(`user-${Date.now()}`, file)) && isValid;
    props.onFinishRegistration({ companyWebsite, aboutCompany, logo });
    router.push("/login");

    if (error) {
      alert("Error uploading file: ", error.message);
    } else {
      alert("File uploaded successfully!");
    }
  };

  // console.log('file', file)
  // const handleFileChange = (event) => {
  //   const uniqueId = Date.now();
  //   setAvatars({
  //     ...avatars,
  //     [uniqueId]: event.target.files[0],
  //   });
  // };
  // const handleRemoveImage = (event, avatarKey) => {
  //   event.preventDefault();
  //   delete avatars[avatarKey];
  //   setAvatars({ ...avatars });
  // };

  const router = useRouter();
  //user information
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [logo, setLogo] = useState("");

  const [buttonClicked, setButtonClicked] = useState(null);
  const handleButtonClick = (event) => {
    const buttonId = event.target.id;
    setButtonClicked(buttonId);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    let isValid = true;
    setErrorCompany("");
    setErrorMessage("");
    if (buttonClicked === "skipButton") {
      router.push("/login");
    }
    if (!companyWebsite.match(/^[a-zA-Z0-9._:/]+\.[a-zA-Z0-9]+\.[A-Za-z/]+$/)) {
      setErrorCompany("Please fill a company website");
      isValid = false;
    }
    if (!aboutCompany.match(/[a-zA-Z0-9._/]/)) {
      setErrorMessage("Between 100 and 2000 characters");
      return;
    }
    if (buttonClicked === "finishButton") {
      if (isValid) {
        props.onFinishRegistration({ companyWebsite, aboutCompany, logo });
        router.push("/login");
      } else {
        // do nothing
      }
    }

    // const data = {email,password}
    // recruiterRegister(data);

    console.log("Company Name:", company);
    console.log("Email:", email);
    console.log("Password", password);
  }

  function handleCompanyWebsiteChange(event) {
    setCompanyWebsite(event.target.value);
  }
  function handleAboutCompanyChange(event) {
    setAboutCompany(event.target.value);
  }

  function handleShowPassword(event) {
    if (showPassword && passwordIcon) {
      setShowPassword(false);
      setPasswordIcon(false);
    } else {
      setShowPassword(true);
      setPasswordIcon(true);
    }
  }

  function handleShowPasswordConfirm(event) {
    if (showPasswordConfirm && showPasswordIcon) {
      setShowPasswordConfirm(false);
      setShowPasswordIcon(false);
    } else {
      setShowPasswordConfirm(true);
      setShowPasswordIcon(true);
    }
  }

  function handleFileChoose() {
    setFileChosen(true);
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row flex-wrap max-[767px]:justify-center justify-start">
        <div className="flex flex-row mt-[32px] mr-[35px]">
          <div className="mr-[10px]">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="16" fill="#616161" />
              <path d="M16.3 9V23H14.32V10.74H11.16V9H16.3Z" fill="white" />
            </svg>
          </div>
          <div className="text-all">
            <p className="text uppercase" id="overline">
              In Progress
            </p>
            <p className="text" id="body1">
              Login
            </p>
            <p className="text" id="body1">
              information
            </p>
          </div>
        </div>
        <div className="flex flex-row mt-[32px] mr-[35px]">
          <div className="mr-[10px]">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="16" fill="#F48FB1" />
              <path
                d="M21.8 21.26V23H11.74V21.64L17.44 16.14C18.1333 15.4733 18.6 14.9 18.84 14.42C19.08 13.9267 19.2 13.4333 19.2 12.94C19.2 12.2067 18.94 11.64 18.42 11.24C17.9133 10.8267 17.18 10.62 16.22 10.62C14.6733 10.62 13.48 11.1267 12.64 12.14L11.28 10.96C11.8267 10.2933 12.54 9.77333 13.42 9.4C14.3133 9.02667 15.3067 8.84 16.4 8.84C17.8667 8.84 19.0333 9.19333 19.9 9.9C20.7667 10.5933 21.2 11.54 21.2 12.74C21.2 13.4867 21.04 14.1933 20.72 14.86C20.4 15.5267 19.7933 16.2867 18.9 17.14L14.62 21.26H21.8Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-all">
            <p className="text uppercase" id="overline">
              Pending
            </p>
            <p className="text" id="body1">
              Company
            </p>
            <p className="text" id="body1">
              information
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-[32px] max-[767px]:items-center items-start ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[10px] mt-[20px] z-10"
        >
          <div>
            <p className="w-[380px] h-auto leading-tight uppercase mb-[10px]">
              You can complete this information later but we reccomend you to do
              it now
            </p>
            <p id="overline mb-[4px]">COMPANY WEBSITE</p>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[240px] w-[380px] h-[36px]"
              name="company"
              placeholder="https://www.mycompany.sa"
              type="text"
              value={companyWebsite}
              onChange={handleCompanyWebsiteChange}
            />
            {errorCompany && <p className="text-rose-500">{errorCompany}</p>}
          </div>
          <div>
            <p id="overline mb-[4px]">ABOUT THE COMPANY</p>
            <textarea
              className="sticky top-0 border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[240px] w-[600px] h-[76px]"
              placeholder="My Company SA has the vision to change thw way how..."
              type="text"
              value={aboutCompany}
              onChange={handleAboutCompanyChange}
            ></textarea>

            {errorMessage && <p className="text-[#8E8E8E]">{errorMessage}</p>}

            <div className="flex flex-col items-start">
              <p className="w-[380px] h-auto leading-tight uppercase mb-[3px] mt-[5px]">
                Upload the company logo
              </p>
              <div className="flex items-center relative">
                <label htmlFor="file-input" class="custom-file-upload">
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
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
              </div>
              <p className="text-[#8E8E8E] text-sm mt-1">
                Only PDF. Max size 5MB
              </p>
            </div>
          </div>

          <div className="flex max-[767px]:items-center items-start justify-center gap-[20px]">
            <button
              className="button_white mt-[16px]"
              onClick={handleButtonClick}
              id="skipButton"
            >
              SKIP THIS!
            </button>
            <button
              className="button_pink mt-[16px]"
              onClick={handleUpdateProfile}
              id="finishButton"
            >
              Finish<section id="arrow-right"></section>
            </button>
          </div>
          {/* <input className="button_pink mt-[16px]" type="submit" name="NEXT" value="NEXT" /> */}
        </form>
      </div>
    </div>
  );
};

export default RecruiterFormPage2;
