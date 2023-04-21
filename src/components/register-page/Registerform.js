import { useState } from "react";
import StepOne from "./ProfStepOne";
import StepTwo from "./ProfStepTwo";
import StepThree from "./ProfFinalStep"; //test

const Registerform = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    birthDate: "",
    linkedin: "",
    jobTitle: "",
    experience: "",
    education: "",
    cv: "",
  });

  const handleNextStep = (data) => {
    setUserData({ ...userData, ...data });
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleFinishRegistration = async (data) => {
    setUserData({ ...userData, ...data });
    try {
      const response = await axios.post("/api/signup-professional", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      alert("Information completed!");
    } catch (error) {
      console.error("Error:", error);
      alert("Information failed.");
    }
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
