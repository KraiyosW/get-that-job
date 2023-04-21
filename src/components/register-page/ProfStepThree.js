import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/authentication";

const StepThree = (props) => {
  const userData = props.userData;
  const { professionalRegister } = useAuth();
  const router = useRouter();
  //user information
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [cv, setCv] = useState("");
  //validation
  const [errorJob, setErrorJob] = useState("");
  const [errorExp, setErrorExp] = useState("");
  const [errorEducation, setErrorEducation] = useState("");

  //checking button
  const [buttonClicked, setButtonClicked] = useState(null);
  const handleButtonClick = (event) => {
    const buttonId = event.target.id;
    setButtonClicked(buttonId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = true;

    if (jobTitle.trim() === "") {
      setErrorJob("Please enter your job title.");
      isValid = false;
    } else if (jobTitle.length < 5 || jobTitle.length > 50) {
      setErrorJob("Please enter a job title between 5 and 50 characters.");
      isValid = false;
    } else {
      setErrorJob("");
    }

    if (!experience || experience < 0) {
      setErrorExp("Please enter your professional experience.");
      isValid = false;
    } else if (education.length < 300 || education.length > 2000) {
      setErrorExp(
        "Professional experience must be between 300 and 2000 characters."
      );
      isValid = false;
    } else {
      setErrorExp("");
    }

    if (education.trim() === "") {
      setErrorEducation("Please enter your educational background");
      isValid = false;
    } else if (education.length < 300 || education.length > 2000) {
      setErrorEducation(
        "Education background must be between 300 and 2000 characters."
      );
      isValid = false;
    } else {
      setErrorEducation("");
    }

    if (buttonClicked === "previousButton") {
      props.onPrevious();
    } else if (buttonClicked === "skipButton") {
      props.onSkip();
    } else if (buttonClicked === "finishButton") {
      if (isValid) {
        router.push("/login");
        props.onFinishRegistration({
          job_title: jobTitle,
          experience: experience,
          education: education,
        });
        const profData = {
          job_title: jobTitle,
          experience: experience,
          education: education,
        };
        professionalRegister({ ...userData, ...profData });
      } else {
        // do nothing
      }
    }
  };

  function handleJobTitleChange(event) {
    setJobTitle(event.target.value);
  }
  function handleExpChange(event) {
    setExperience(event.target.value);
  }
  function handleEducationChange(event) {
    setEducation(event.target.value);
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
              DONE!
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
              <rect width="32" height="32" rx="16" fill="#616161" />
              <path
                d="M21.8 21.26V23H11.74V21.64L17.44 16.14C18.1333 15.4733 18.6 14.9 18.84 14.42C19.08 13.9267 19.2 13.4333 19.2 12.94C19.2 12.2067 18.94 11.64 18.42 11.24C17.9133 10.8267 17.18 10.62 16.22 10.62C14.6733 10.62 13.48 11.1267 12.64 12.14L11.28 10.96C11.8267 10.2933 12.54 9.77333 13.42 9.4C14.3133 9.02667 15.3067 8.84 16.4 8.84C17.8667 8.84 19.0333 9.19333 19.9 9.9C20.7667 10.5933 21.2 11.54 21.2 12.74C21.2 13.4867 21.04 14.1933 20.72 14.86C20.4 15.5267 19.7933 16.2867 18.9 17.14L14.62 21.26H21.8Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-all">
            <p className="text uppercase" id="overline">
              DONE!
            </p>
            <p className="text" id="body1">
              Personal
            </p>
            <p className="text" id="body1">
              information
            </p>
          </div>
        </div>
        <div className="flex flex-row mt-[32px]  mr-[35px]">
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
                d="M17.32 14.88C18.6933 15.0133 19.74 15.44 20.46 16.16C21.18 16.8667 21.54 17.7733 21.54 18.88C21.54 19.68 21.34 20.4067 20.94 21.06C20.54 21.7 19.94 22.2133 19.14 22.6C18.3533 22.9733 17.3867 23.16 16.24 23.16C15.24 23.16 14.28 23.0133 13.36 22.72C12.44 22.4133 11.6867 21.9933 11.1 21.46L12.02 19.88C12.5 20.3333 13.1133 20.7 13.86 20.98C14.6067 21.2467 15.4 21.38 16.24 21.38C17.28 21.38 18.0867 21.16 18.66 20.72C19.2467 20.28 19.54 19.6733 19.54 18.9C19.54 18.1267 19.2533 17.5267 18.68 17.1C18.1067 16.6733 17.24 16.46 16.08 16.46H14.96V15.06L18.48 10.74H11.74V9H20.98V10.36L17.32 14.88Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-all">
            <p className="text uppercase" id="overline">
              In Progress
            </p>
            <p className="text" id="body1">
              Professional
            </p>
            <p className="text" id="body1">
              information
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-[32px] max-[767px]:items-center items-start">
        <p id="overline">
          YOU CAN COMPLETE THIS INFORMAITON LATER BUT WE <br></br>RECCOMED YOU
          TO DO IT NOW
        </p>
        <form
          className="flex flex-col gap-[20px] mt-[20px] z-10"
          onSubmit={handleSubmit}
        >
          <div>
            <p id="overline mb-[4px]">TITLE</p>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[240px] w-[360px] h-[36px] text-left"
              name="job-title"
              placeholder="Mechanical administrator..."
              type="text"
              onChange={handleJobTitleChange}
            />
            {errorJob && <p className="text-rose-500">{errorJob}</p>}
          </div>
          <div>
            <p id="overline mb-[4px]">PROFESSIONAL EXPERIENCE</p>
            <div className="relative ">
              <textarea
                className="relative border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[240px] w-[600px] h-[76px] "
                name="experience"
                placeholder="Worked 6 years in a bitcoin farm until I decided to change my life...."
                style={{ resize: "none" }}
                onChange={handleExpChange}
              />
            </div>
            <p id="overline">Between 300 and 2000 characters</p>
            {errorExp && <p className="text-rose-500">{errorExp}</p>}
          </div>

          {/* css maybe use position for push in same div with password input */}

          <div className="w-full">
            <p id="overline mb-[4px]">EDUCATION</p>
            <div className="relative ">
              <textarea
                className="relative border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[240px] w-[600px] h-[76px]"
                name="birthdate"
                placeholder="Major in life experiences with a PHD in procrastination..."
                style={{ resize: "none" }}
                onChange={handleEducationChange}
              />
            </div>
            <p id="overline">Between 300 and 2000 characters</p>
            {errorEducation && (
              <p className="text-rose-500">{errorEducation}</p>
            )}
          </div>
          {/* //Button */}
          <div>
            <p id="overline mb-[4px]">UPLOAD/UPDATE YOUR CV</p>
            <div className="flex">
              <button className="button_pink">Choose a file</button>{" "}
              <p id="overline mb-[4px]">No file chosen</p>
            </div>
            <p id="overline">Only PDF, Max size 5MB</p>
          </div>

          <div className="flex justify-start">
            <div className="flex max-[767px]:items-center items-start justify-center">
              <button
                className="button_pink button_previous mt-[16px]"
                onClick={handleButtonClick}
                id="previousButton"
              >
                <section id="arrow-left"></section>PREVIOUS
              </button>
            </div>
            <div className="flex max-[767px]:items-center items-start justify-center">
              <button
                className="button_white my-[16px] mx-[10px]"
                onClick={handleButtonClick}
                id="skipButton"
              >
                SKIP THIS!
              </button>
            </div>
            <div className="flex max-[767px]:items-center items-start justify-center">
              <button
                className="button_pink mt-[16px]"
                onClick={handleButtonClick}
                id="finishButton"
              >
                FINISH<section id="arrow-right"></section>
              </button>
            </div>
          </div>
          {/* <input className="button_pink mt-[16px]" type="submit" name="NEXT" value="NEXT" /> */}
        </form>

        <div></div>
      </div>
    </div>
  );
};

export default StepThree;
