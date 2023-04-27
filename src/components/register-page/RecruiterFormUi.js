import { useState } from "react";
import RecruiterForm from "../register-page/RecruiterForm";
import RecruiterFormPage3 from "../register-page/RecruiterFormPage3";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/authentication";

const RecruiterFormUi = () => {
  const { recruiterRegister } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    email: null,
    password: null,
    company_name: null,
    // company_website: null,
    // about_company: null,
    // logo: null,
  });

  const handleNextStep = (data) => {
    setUserData({ ...userData, ...data });
    setStep(step + 1);
  };

  const handleSkip = () => {
    setUserData({ ...userData, ...data });
    router.push("/login");
    recruiterRegister(userData);
  };

  const handleFinishRegistration = (data) => {
    setUserData({ ...userData, ...data });
  };

  return (
    <div>
      {step === 1 && <RecruiterForm onNext={handleNextStep} />}
      {step === 2 && (
        <RecruiterFormPage3 
        userData={userData}
        onSkip={handleSkip}
        onFinishRegistration={handleFinishRegistration} />
      )}
    </div>
  );
};

export default RecruiterFormUi;
