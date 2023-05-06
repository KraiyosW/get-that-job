import React from "react";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useAuth } from "@/contexts/authentication";
import { useRouter } from "next/router";
import { useToast, Box, Button } from '@chakra-ui/react'
import Image from "next/image";
import LogoMockup from "../../image/logo-mockup.png";

function ProfessionalProfile() {
  const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabase = createClient(
    supabaseURL,
    supabaseAnonKey
  );
  const { professionalState } = useAuth();
  
  const [data, setData] = useState({})
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter()

  const userEmail = professionalState.email;

  const toast = useToast()


  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone_number: "",
    date_of_birth: "",
    linkedin_url: "",
    job_title: "",
    experience: "",
    education: "",
    email: userEmail,
  });

  function handleFileInputChange(event) {
    const file = event.target.files[0];
    setSelectedFile(file);

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
      .from("profiles/professional")
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
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async () => {

    try {
      const { data, error } = await supabase
        .from('professional')
        .update(formData)
        .eq('email', userEmail);

      if (error) {
        console.error(error);
        return;
      }

      console.log(data);
      router.push('/find-that-job');
    } catch (error) {
      console.error(error);
    }
    toast({
      position: 'top',
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
  };


  const fetchData = async () => {
    try {

      const result = await supabase
        .from("professional")
        .select('*')
        .eq("email", userEmail)
        .single();
      setData(result.data);
      console.log(result);
      setFormData({
        ...formData,
        email: result.data.email,
        name: result.data.name,
        phone_number: result.data.phone_number,
        date_of_birth: result.data.date_of_birth,
        linkedin_url: result.data.linkedin_url,
        job_title: result.data.job_title,
        experience: result.data.experience,
        education: result.data.education,
      });


    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);



  return (
    <>
      <main className="bg-white-secondary h-screen">
        <div className="max-[700px]:ml-0 ml-[240px] max-[700px]:py-[16px] py-[32px] max-[700px]:px-[64px] px-[128px] max-[700px]:items-center max-[700px]:text-center">
          <h4 className="mb-[24px]" id="heading4">
            Main information
          </h4>
          <h5 id="heading5">Personal information</h5>
          <form
            className="flex flex-col max-[700px]:items-center"
            id="file-form"
          >
            <div className="mb-[4px] mt-[8px]" id="overline">
              EMAIL
            </div>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[380px] h-[36px]"
              name="email"
              placeholder="ramon.valdes@vecindad.com"
              type="text"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="mb-[4px] mt-[8px]" id="overline">
              NAME
            </div>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[380px] h-[36px]"
              name="name"
              placeholder="Ramón Valdés"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
            <div className="mb-[4px] mt-[8px]" id="overline">
              PHONE
            </div>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[380px] h-[36px]"
              name="phone_number"
              placeholder="+524831212891"
              type="text"
              value={formData.phone_number}
              onChange={handleChange}
            />
            <div className="mb-[4px] mt-[8px]" id="overline">
              BIRTHDATE
            </div>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[380px] h-[36px]"
              name="date_of_birth"
              placeholder="07/02/1971"
              type="text"
              value={formData.date_of_birth}
              onChange={handleChange}
            />
            <div className="mb-[4px] mt-[8px]" id="overline">
              LINKEDIN URL
            </div>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[380px] h-[36px]"
              name="linkedin_url"
              placeholder="https://www.linkedin.com/in/donramon"
              type="text"
              value={formData.linkedin_url}
              onChange={handleChange}
            />
            <h5 className="mt-[32px] mb-[8px]" id="heading5">Personal information</h5>
            <p className="text-[#616161] mb-[8px]" id="overline">Changes made here will be reflected in your future applications</p>
            <div className="mb-[4px] mt-[8px]" id="overline">
              TITLE
            </div>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[380px] h-[36px]"
              name="job_title"
              placeholder="Professional Multiservice"
              type="text"
              value={formData.job_title}
              onChange={handleChange}
            />
            <div className="mb-[4px] mt-[8px]" id="overline">
              PROFESSIONAL EXPERIENCE
            </div>
            <textarea
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[760px] h-[310px]"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat quam ut tempor maximus. Sed neque arcu, rhoncus elementum sodales a, tristique sed quam. Aliquam nibh velit, pharetra ac faucibus in, ornare eu tortor. Vestibulum lacus ligula, elementum sit amet purus ut, sagittis molestie ex. In hendrerit orci tellus. Integer pharetra porttitor nulla, nec fringilla dolor ultricies et. Integer accumsan feugiat urna, eu hendrerit dui varius sit amet. Mauris eget tristique turpis. Curabitur eget hendrerit turpis. Etiam rutrum dolor eu posuere vehicula.
          Pellentesque ut mauris neque. Maecenas posuere sit amet erat at placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Donec tempor lobortis nisl. Maecenas sit amet massa in tortor pulvinar sollicitudin. Fusce vitae feugiat felis, ut malesuada purus. Curabitur felis velit, interdum vitae viverra quis, sagittis ac nulla. Quisque tempus pharetra ornare. In sed nulla eget risus cursus facilisis vel quis nibh. Praesent euismod lectus a."
            ></textarea>
            <div className="mb-[4px] mt-[8px]" id="overline">
              EDUCATION
            </div>
            <textarea
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[760px] h-[165px]"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Pellentesque ut mauris neque. Maecenas posuere sit amet erat at placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Donec tempor lobortis nisl. Maecenas sit amet massa in tortor pulvinar sollicitudin. Fusce vitae feugiat felis, ut malesuada purus. Curabitur felis velit, interdum vitae viverra quis, sagittis ac nulla. Quisque tempus pharetra ornare. In sed nulla eget risus cursus facilisis vel quis nibh. Praesent euismod lectus a."
            ></textarea>
            <div className="flex flex-col">
              <div>
                <div className="mt-[8px] mb-[4px]" id="overline">
                  UPLOAD/UPDATE YOUR CV
                </div>
              </div>
              <label
                htmlFor="file-input"
                className="custom-file-upload relative max-[700px]:w-[190px] max-[700px]:ml-[35px]"
              >
                <input
                  type="file"
                  id="fileInput"
                  accept="pdf/*"

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
                  Only PDF. Max size 5MB
                </div>
              </div>
            </div>
            <Button
              className="button_pink_new mt-[24px] w-[170px]"
              variant="unstyled"
              onClick={handleSubmit}
            >
              SAVE CHANGES
            </Button>



          </form>
        </div>
      </main>
    </>
  )
}

export default ProfessionalProfile