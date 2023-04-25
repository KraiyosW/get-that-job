import { useState } from "react";
import RecruiterForm from "../register-page/RecruiterForm"
import RecruiterFormPage2 from "../register-page/RecruiterFormPage2"
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/authentication";


const RecruiterFormUi = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    companyWebsite: "",
    aboutCompany: "",
    logo: "",
  });

  const handleNextStep = (data) => {
    setUserData({ ...userData, ...data });
    setStep(step + 1);
  };


  const handleFinishRegistration = async (data) => {
    setUserData({ ...userData, ...data });
    try {
      const response = await axios.post("/api/signup-recruiter", userData, {
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
      {step === 1 && <RecruiterForm onNext={handleNextStep} />}
      {step === 2 && (
        <RecruiterFormPage2  onFinishRegistration={handleFinishRegistration}/>
      )}

    </div>
  );
};

export default RecruiterFormUi;