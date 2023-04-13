import React from "react";
import { useState } from "react";
import invisibility from "../../image/invisibility.png";
import visibility from "../../image/visibility.png";
import Image from "next/image";
import { useAuth } from "@/contexts/authentication";

const ProfessionalLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [errorPassword, setErrorPassword] = useState('');

  const {professionalLogin} = useAuth();

  function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage('');
    setErrorPassword('');
    setErrorCompany('')

    if (!email.match(/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
      setErrorMessage('Invalid email address.');
      return;
    }
    if (password.length < 7) {
      setErrorPassword('Password must be at least 8 characters long.');
      return;
    }

    const data  = {email,password,}
    professionalLogin(data);

}

function handleEmailChange(event) {
  setEmail(event.target.value);
}
function handlePasswordChange(event) {
  setPassword(event.target.value)
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

return(
    <div className="flex flex-col max-[767px]:items-center items-start">
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
          <div className="flex max-[767px]:items-center items-start justify-end">
            <button className="button_pink mt-[16px]">
              NEXT<section id="arrow-right"></section>
            </button>
          </div>
          </form>
      </div>
);


}
export { ProfessionalLogin };

