import React from "react";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import LogoMockup from "../../image/logo-mockup.png";
import { useAuth } from "@/contexts/authentication";
import { useRouter } from "next/router";
import { useToast, Box, Button } from "@chakra-ui/react";
const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseURL, supabaseAnonKey);

function Profile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [myState, setMyState] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { recruiterState } = useAuth();
  const userEmail = String(myState);
  const [data, setData] = useState({});
  const router = useRouter();
  const toast = useToast();

  const [formData, setFormData] = useState({
    email: null,
    company_name: null,
    company_website: null,
    about_company: null,
    logo: null,
    email: userEmail,
  });
  console.log(formData.logo);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    try {
      const result = await supabase
        .from("recruiters")
        .update(formData)
        .eq("email", userEmail);
      if (result.error) {
        console.error(result.error);
        return;
      }
      console.log(result.data);

      const { error: uploadError } = await supabase.storage
        .from("recruiters_logo")
        .upload(formData.logo, file);

      if (uploadError) {
        throw uploadError;
      }
      toast({
        position: "top",
        render: () => (
          <Box
            className="bg-pink-primary flex flex-col justify-center text-center"
            p={3}
            color="white"
            borderRadius="md"
            boxShadow="md"
          >
            <div>Profile updated .</div>
            <div>Profile has been successfully updated .</div>
          </Box>
        ),
        duration: 3000,
        isClosable: true,
      });

      router.push("/job-postings");
    } catch (error) {
      console.error(error);
      toast({
        position: "top",
        render: () => (
          <Box
            className="bg-pink-primary flex flex-col justify-center text-center"
            p={3}
            color="white"
            borderRadius="md"
            boxShadow="md"
          >
            <div>Profile updated .</div>
            <div>Profile has been successfully updated .</div>
          </Box>
        ),
        duration: 3000,
        isClosable: true,
      });
      router.push("/job-postings");
    }
  };

  function handleFileInputChange(event) {
    const file = event.target.files[0];
    setSelectedFile(file);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    setFormData({
      ...formData,
      logo: filePath,
    });

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  }

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const { data, error } = await supabase.storage
      .from("profiles/recruiter")
      .upload(`user-${Date.now()}`, file);

    if (error) {
      alert("Error uploading file: ", error.message);
    } else {
      alert("File uploaded successfully!");
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const fetchData = async () => {
    try {
      const result = await supabase
        .from("recruiters")
        .select("*")
        .eq("email", userEmail)
        .single();
      setData(result.data);
      console.log(result);
      setFormData({
        ...formData,
        email: result.data.email,
        company_name: result.data.company_name,
        company_website: result.data.company_website,
        about_company: result.data.about_company,
        logo: result.data.logo,
        email: userEmail,
      });

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const storedState = localStorage.getItem("email");
    const token = localStorage.getItem("sb:token");
    setIsAuthenticated(!!token);
    if (storedState) {
      setMyState(storedState);
    }
    fetchData();
  }, [isAuthenticated, myState]);

  useEffect(() => {
    localStorage.setItem("myState", myState);
  }, [myState]);

  return (
    <>
      <main className="bg-white-secondary h-screen">
        <div className="max-[700px]:ml-0 ml-[240px] max-[700px]:py-[16px] py-[32px] max-[700px]:px-[64px] px-[128px] max-[700px]:items-center max-[700px]:text-center">
          <h4 className="mb-[27px]" id="heading4">
            Profile
          </h4>
          <div
            className="py-[10px] pr-[10px] pl-0 flex flex-row items-center"
            id="file-upload"
          >
            <div className="flex items-center max-[700px]:mt-[-4px] border-shadow w-[75px] h-[75px] rounded-[8px] drop-shadow-lg mr-[11px]">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Selected file preview"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
              ) : (
                <Image
                  src={
                    formData.logo === null
                      ? LogoMockup
                      : `https://zsvpcibqzkxoqqpektgc.supabase.co/storage/v1/object/public/recruiters_logo/${formData.logo}`
                  }
                  width={100}
                  height={100}
                  alt="Company Logo"
                  className="w-[100%] h-auto rounded-[8px]"
                />
              )}
            </div>
            <div className="flex flex-col">
              <div>
                <div className="mb-[4px]" id="overline">
                  COMPANY LOGO
                </div>
              </div>
              <label
                htmlFor="file-input"
                className="custom-file-upload relative max-[700px]:w-[190px]"
              >
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  name="logo"
                  onChange={handleFileInputChange}
                />
                <div className="icon-file">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 15.8333H17.5V17.5H2.5V15.8333ZM10.8333 4.85663V14.1666H9.16667V4.85663L4.1075 9.91663L2.92917 8.73829L10 1.66663L17.0708 8.73746L15.8925 9.91579L10.8333 4.85829V4.85663Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </label>
              <div>
                <div className="text-grey-secondary mt-[4px]" id="caption">
                  PNG, JPEG, IMG
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col max-[700px]:items-center"
            id="file-form"
          >
            <div className="mb-[4px] mt-[11px]" id="overline">
              COMPANY EMAIL
            </div>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[300px] h-[36px]"
              name="email"
              placeholder="web.works@mail.com"
              type="text"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="mb-[4px] mt-[8px]" id="overline">
              COMPANY NAME
            </div>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[300px] h-[36px]"
              name="company_name"
              placeholder="The Web Works"
              type="text"
              value={formData.company_name}
              onChange={handleChange}
            />
            <div className="mb-[4px] mt-[8px]" id="overline">
              COMPANY WEBSITE
            </div>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[300px] h-[36px]"
              name="company_website"
              placeholder="www.webworks.com"
              type="text"
              value={formData.company_website}
              onChange={handleChange}
            />
            <div className="mb-[4px] mt-[8px]" id="overline">
              ABOUT THE COMPANY
            </div>
            <textarea
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[760px] h-[250px]"
              name="about_company"
              value={formData.about_company}
              onChange={handleChange}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta nunc viverra velit tincidunt, non vehicula augue vehicula. Donec viverra luctus nisl, sed vehicula ligula. Vivamus maximus metus a magna fermentum ullamcorper. Phasellus ultrices vestibulum ligula ut pellentesque. Quisque quis congue quam. Nunc porttitor risus lorem, in blandit augue iaculis vitae. Cras sit amet fringilla neque. Fusce ac elit ut quam ultrices bibendum. Curabitur vitae dignissim quam. Suspendisse aliquet massa id orci volutpat ullamcorper. Nunc at ante sem. Etiam elementum, mi eget aliquam lobortis, elit libero tempus ex, vel pretium nisi risus ac augue."
            ></textarea>
            <button
              className="button_pink_new mt-[24px] w-[180px]"
              onClick={handleSubmit}
            >
              UPDATE PROFILE
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;
