import { useState } from "react";
import StepOne from "./ProfStepOne";
import StepTwo from "./ProfStepTwo";
import StepThree from "./ProfFinalStep"; //test

const Registerform = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleNextStep = (data) => {
    setUserData({ ...userData, ...data });
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleFinishRegistration = () => {
    // Send user data to server to complete registration process
  };

  return (
    <div>
      {step === 1 && <StepOne onNext={handleNextStep} />}
      {step === 2 && (
        <StepTwo onNext={handleNextStep} onPrevious={handlePreviousStep} />
      )}
      {step === 3 && (
        <StepThree
          userData={userData}
          onPrevious={handlePreviousStep}
          onFinishRegistration={handleFinishRegistration}
        />
      )}
    </div>
  );
};

export default Registerform;
