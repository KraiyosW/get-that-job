import Image from "next/image";
import invisibility from "../../image/invisibility.png";
import visibility from "../../image/visibility.png";
import React from "react";
import { useState } from "react";
const Registerform = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);


  function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage('');
    setErrorPassword('');
    setErrorPasswordConfirm('')
    if (!email.match(/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
      setErrorMessage('Invalid email address.');
      return;
    }

    if (password.length < 7) {
      setErrorPassword('Password must be at least 8 characters long.');
      return;
    }
    if (password !== passwordConfirm) {
      setErrorPasswordConfirm("* Password doesn't match");
      return;
    }
    fetch('/api/signup-professional', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        alert('Registration completed!');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Registration failed.');
      });

  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }
  function handlePasswordConfirmChange(event) {
    setPasswordConfirm(event.target.value)
  }


  function handleShowPassword(event) {
    if (showPassword && passwordIcon) {
      setShowPassword(false);
      setPasswordIcon(false);
    } else {
      setShowPassword(true);
      setPasswordIcon(true);
    }
  };

  function handleShowPasswordConfirm(event) {
    if (showPasswordConfirm && showPasswordIcon) {
      setShowPasswordConfirm(false);
      setShowPasswordIcon(false);
    } else {
      setShowPasswordConfirm(true);
      setShowPasswordIcon(true);
    }
  };



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
              <rect width="32" height="32" rx="16" fill="#F48FB1" />
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
              <rect width="32" height="32" rx="16" fill="#E1E2E1" />
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[20px] mt-[20px] z-10"
        >
          <div>
            <p id="overline mb-[4px]">EMAIL</p>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[240px] w-[360px] h-[36px]"
              name="email"
              placeholder="some.user@email.com"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
            {errorMessage && <p>{errorMessage}</p>}
          </div>
          <div>
            <p id="overline mb-[4px]">PASSWORD</p>
            <div className="flex flex-row ">
              <input
                className="relative border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[240px] w-[360px] h-[36px]"
                name="password"
                placeholder="******"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
              />


              <Image
                onClick={handleShowPassword}
                alt="far fa eye"
                src={passwordIcon ? visibility : invisibility}
                className="w-[1.6%] opacity-25 absolute ml-[315px] mt-[3px] cursor-pointer"

              />

            </div>
            {errorPassword && <p>{errorPassword}</p>}
          </div>

          {/* css maybe use position for push in same div with password input */}

          <div>
            <p id="overline mb-[4px]">PASSWORD CONFIRMATION</p>
            <div className="flex flex-row ">
              <input
                className="relative border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[240px] w-[360px] h-[36px]"
                name="password"
                placeholder="******"
                type={showPasswordConfirm ? "text" : "password"}
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
              />


              <Image
                onClick={handleShowPasswordConfirm}
                alt="far fa eye"
                src={showPasswordConfirm ? visibility : invisibility}
                className="w-[1.6%] opacity-25 absolute ml-[315px] mt-[3px] cursor-pointer"

              />

            </div>
            {errorPasswordConfirm && <p>{errorPasswordConfirm}</p>}
          </div>

          {/* css maybe use position for push in same div with passwordConfirm input */}
          <div className="flex max-[767px]:items-center items-start justify-center">
            <button className="button_pink mt-[16px]">
              NEXT<section id="arrow-right"></section>
            </button>
          </div>
          {/* <input className="button_pink mt-[16px]" type="submit" name="NEXT" value="NEXT" /> */}
        </form>

        <div></div>
      </div>
    </div>
  );

};

export default Registerform;
