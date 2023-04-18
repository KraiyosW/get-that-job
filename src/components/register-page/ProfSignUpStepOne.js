import Image from "next/image";
import invisibility from "../../image/invisibility.png";
import visibility from "../../image/visibility.png";
import React from "react";
import { useState } from "react";
import { useAuth } from "@/contexts/authentication";

const ProfSignUpStepOne = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);

  const { professionalRegister } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setErrorPassword("");
    setErrorPasswordConfirm("");
    if (!email.match(/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
      setErrorMessage("Invalid email address.");
      return;
    }

    if (password.length < 7) {
      setErrorPassword("Password must be at least 8 characters long.");
      return;
    }
    if (password !== passwordConfirm) {
      setErrorPasswordConfirm("* Password doesn't match");
      return;
    }

    const data = { email, password };
    professionalRegister(data);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handlePasswordConfirmChange(event) {
    setPasswordConfirm(event.target.value);
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

  return (
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
          {errorMessage && <p className="text-rose-500">{errorMessage}</p>}
        </div>
        <div>
          <p id="overline mb-[4px]">PASSWORD</p>
          <div className="relative ">
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
              className="w-[20px] absolute top-[8px] right-[10px] opacity-25 cursor-pointer"
            />
          </div>
          {errorPassword && <p className="text-rose-500">{errorPassword}</p>}
        </div>

        {/* css maybe use position for push in same div with password input */}

        <div className="w-full">
          <p id="overline mb-[4px]">PASSWORD CONFIRMATION</p>
          <div className="relative ">
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
              className="w-[20px] absolute top-[8px] right-[10px] opacity-25 cursor-pointer"
            />
          </div>
          {errorPasswordConfirm && (
            <p className="text-rose-500">{errorPasswordConfirm}</p>
          )}
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
  );
};

export default ProfSignUpStepOne;
