import { useState } from "react";
import StepOne from "./ProfStepOne";
import StepTwo from "./ProfStepTwo";
import StepThree from "./ProfStepThree";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/authentication";

const RegisterForm = () => {
  const { professionalRegister } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(2);
  const [userData, setUserData] = useState({
    email: null,
    password: null,
    name: null,
    phone_number: null,
    date_of_birth: null,
    linkedin_url: null,
    job_title: null,
    experience: null,
    education: null,
    cv: null,
  });

  const handleNextStep = (data) => {
    setUserData({ ...userData, ...data });
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSkip = (data) => {
    setUserData({ ...userData, ...data });
    router.push("/login");
    professionalRegister(userData);
  };

  const handleFinishRegistration = (data) => {
    setUserData({ ...userData, ...data });
  };

  return (
    <div>
      {step === 1 && <StepOne onNext={handleNextStep} />}
      {step === 2 && (
        <StepTwo
          onNext={handleNextStep}
          onSkip={handleSkip}
          onPrevious={handlePreviousStep}
        />
      )}
      {step === 3 && (
        <StepThree
          userData={userData}
          onPrevious={handlePreviousStep}
          onSkip={handleSkip}
          onFinishRegistration={handleFinishRegistration}
        />
      )}
    </div>
  );
};

export default RegisterForm;
