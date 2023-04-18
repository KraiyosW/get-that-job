import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree"; //test

const Registerform = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      {currentStep === 1 ? (
        <StepOne />
      ) : currentStep === 2 ? (
        <StepTwo />
      ) : (
        <StepThree />
      )}
      {currentStep !== 1 && (
        <div className="flex max-[767px]:items-center items-start justify-center">
          <button className="button_pink mt-[16px]" onClick={handlePrev}>
            PREVIOUS<section id="arrow-right"></section>
          </button>
        </div>
      )}
      {currentStep !== 3 && (
        <div className="flex max-[767px]:items-center items-start justify-center">
          <button className="button_pink mt-[16px]" onClick={handleNext}>
            NEXT<section id="arrow-right"></section>
          </button>
        </div>
      )}
    </div>
  );
};

export default Registerform;
