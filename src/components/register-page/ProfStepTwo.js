import { useState } from "react";
import Image from "next/image";
import calendar from "@/image/calendar.png";

const StepTwo = (props) => {
  //user information
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [linkedin, setLinkedin] = useState("");
  //validation
  const [errorName, setErrorName] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorBirthDate, setErrorBirthDate] = useState("");
  const [errorLinkedin, setErrorLinkedin] = useState("");
  //checking button
  const [buttonClicked, setButtonClicked] = useState(null);
  const handleButtonClick = (event) => {
    const buttonId = event.target.id;
    setButtonClicked(buttonId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = true;

    if (name.trim() === "") {
      setErrorName("Please enter your name.");
      isValid = false;
    } else if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(name)) {
      setErrorName(
        "Please enter a valid name in the format 'First Name Last Name'."
      );
      isValid = false;
    } else {
      setErrorName("");
    }

    if (phone.trim() === "") {
      setErrorPhone("Please enter your phone number.");
      isValid = false;
    } else if (!/^\+(?:[0-9]●?){6,14}[0-9]$/.test(phone)) {
      setErrorPhone("Please enter a valid phone number in the given format");
      isValid = false;
    } else {
      setErrorPhone("");
    }

    const today = new Date();
    const minBirthDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    const selectedBirthDate = new Date(birthDate);

    if (!birthDate) {
      setErrorBirthDate("Please enter your birth date.");
      isValid = false;
    } else if (selectedBirthDate > today) {
      setErrorBirthDate("Birth date cannot be in the future.");
      isValid = false;
    } else if (selectedBirthDate > minBirthDate) {
      setErrorBirthDate("You must be at least 18 years old to register");
      isValid = false;
    } else {
      setErrorBirthDate("");
    }

    if (!linkedin) {
      setErrorLinkedin("Please enter your LinkedIn profile URL.");
      isValid = false;
    } else if (
      linkedin.trim() === "" ||
      "" ||
      !/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w-]+)*\/?$/.test(linkedin)
    ) {
      setErrorLinkedin("Please enter a valid LinkedIn profile URL.");
      isValid = false;
    } else {
      setErrorLinkedin("");
    }

    if (buttonClicked === "skipButton") {
      props.onSkip();
    } else if (buttonClicked === "nextButton") {
      if (isValid) {
        props.onNext({
          name: name,
          phone_number: phone,
          date_of_birth: birthDate,
          linkedin_url: linkedin,
        });
      } else {
        // do nothing
      }
    }
  };

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }
  function handleDateChange(event) {
    const newDate = new Date(event.target.value);
    setBirthDate(newDate);
  }
  function handleLinkedinChange(event) {
    setLinkedin(event.target.value);
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
              <rect width="32" height="32" rx="16" fill="#F48FB1" />
              <path
                d="M21.8 21.26V23H11.74V21.64L17.44 16.14C18.1333 15.4733 18.6 14.9 18.84 14.42C19.08 13.9267 19.2 13.4333 19.2 12.94C19.2 12.2067 18.94 11.64 18.42 11.24C17.9133 10.8267 17.18 10.62 16.22 10.62C14.6733 10.62 13.48 11.1267 12.64 12.14L11.28 10.96C11.8267 10.2933 12.54 9.77333 13.42 9.4C14.3133 9.02667 15.3067 8.84 16.4 8.84C17.8667 8.84 19.0333 9.19333 19.9 9.9C20.7667 10.5933 21.2 11.54 21.2 12.74C21.2 13.4867 21.04 14.1933 20.72 14.86C20.4 15.5267 19.7933 16.2867 18.9 17.14L14.62 21.26H21.8Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-all">
            <p className="text uppercase" id="overline">
              IN PROGRESS
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
              <rect width="32" height="32" rx="16" fill="#E1E2E1" />
              <path
                d="M17.32 14.88C18.6933 15.0133 19.74 15.44 20.46 16.16C21.18 16.8667 21.54 17.7733 21.54 18.88C21.54 19.68 21.34 20.4067 20.94 21.06C20.54 21.7 19.94 22.2133 19.14 22.6C18.3533 22.9733 17.3867 23.16 16.24 23.16C15.24 23.16 14.28 23.0133 13.36 22.72C12.44 22.4133 11.6867 21.9933 11.1 21.46L12.02 19.88C12.5 20.3333 13.1133 20.7 13.86 20.98C14.6067 21.2467 15.4 21.38 16.24 21.38C17.28 21.38 18.0867 21.16 18.66 20.72C19.2467 20.28 19.54 19.6733 19.54 18.9C19.54 18.1267 19.2533 17.5267 18.68 17.1C18.1067 16.6733 17.24 16.46 16.08 16.46H14.96V15.06L18.48 10.74H11.74V9H20.98V10.36L17.32 14.88Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-all">
            <p className="text uppercase" id="overline">
              Pending
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
          YOU CAN COMPLETE THIS INFORMATION LATER BUT WE <br></br>RECCOMED YOU
          TO DO IT NOW
        </p>
        <form
          className="flex flex-col gap-[20px] mt-[0px] z-10"
          onSubmit={handleSubmit}
        >
          <div>
            <p id="overline mb-[4px]">NAME</p>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[240px] w-[360px] h-[36px]"
              name="email"
              placeholder="John Doe"
              type="text"
              onChange={handleNameChange}
            />
            {errorName && <p className="text-rose-500">{errorName}</p>}
          </div>
          <div>
            <p id="overline mb-[4px]">PHONE</p>
            <div className="relative">
              <input
                className="relative border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[240px] w-[360px] h-[36px]"
                name="password"
                placeholder="+XXXXXXXXX"
                type="tel"
                onChange={handlePhoneChange}
              />
            </div>
            <p id="overline">+[country code][number]</p>
            {errorPhone && <p className="text-rose-500">{errorPhone}</p>}
          </div>

          {/* css maybe use position for push in same div with password input */}

          <div className="w-full">
            <p id="overline mb-[4px]">BIRTH DATE</p>
            <div className="relative ">
              <input
                className="calendar relative border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[240px] w-[360px] h-[36px]"
                name="birthdate"
                type="text"
                placeholder="Pick a date"
                onClick={(event) => (event.target.type = "date")}
                onBlur={(event) => (event.target.type = "text")}
                onChange={handleDateChange}
              />
              <div class="open-button absolute right-[10px] top-[9px] calendar-picker-indicator">
                <Image
                  src={calendar}
                  alt="Calendar icon"
                  className="w-[20px] h-[20px]"
                />
              </div>
            </div>
            {errorBirthDate && (
              <p className="text-rose-500">{errorBirthDate}</p>
            )}
          </div>

          <div>
            <p id="overline mb-[4px]">LINKEDIN URL</p>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[240px] w-[360px] h-[36px]"
              name="LINKDINURL"
              placeholder="https://www.linkedin.com/in/username"
              type="text"
              onChange={handleLinkedinChange}
            />
            {errorLinkedin && <p className="text-rose-500">{errorLinkedin}</p>}
          </div>

          {/* //Button */}
          <div className="flex justify-center">
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
                className="button_pink my-[16px] mx-[10px]"
                onClick={handleButtonClick}
                id="nextButton"
              >
                NEXT<section id="arrow-right"></section>
              </button>
            </div>
          </div>
          {/* <input className="button_pink mt-[16px]" type="submit" name="NEXT" value="NEXT" /> */}
        </form>
      </div>
    </div>
  );
};

export default StepTwo;
