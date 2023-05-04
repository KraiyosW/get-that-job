import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import SideBarProfessional from "@/components/SidebarProfessional.js";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/authentication";

function ProfessionalProfile() {
    const router = useRouter();
    const id = router.query["jobid"]
    const { professionalState } = useAuth();
    const userEmail = professionalState.email;
    const [data, setData] = useState({})
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone_number: "",
        date_of_birth: "",
        linkedin_url: "",
        job_title: "",
        experience: "",
        education: "",
        p_email: userEmail,
    });

    const fetchData = async () => {
        try {
            if (!id) return; // check if id is null or undefined

            const result = await supabase
                .from("professional")
                .select(`*, professional (*)`)
                .eq("professional_id", Number(id))
                .single();

            if (!result.data) return; // check if post is undefined or null

            setData(result.data);

            setFormData({
                ...formData,
                professional_id: result.data.job_post_id,
                email: result.data.email,
                name: result.data.name,
                phone_number: result.data.phone_number,
                date_of_birth: result.data.date_of_birth,
                linkedin_url: result.data.linkedin_url,
                job_title: result.data.job_title,
                experience: result.data.experience,
                education: result.data.education,
                p_email: result.data.recruiters.email
            });

            setSelectedOption(result.data.job_category);
            setSelectedJobType(result.data.job_type);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        fetchData(),
            [id, userEmail]
    })



    return (
        <>
            <SideBarProfessional />
            <main className="bg-white-secondary h-screen">
                <div className="max-[700px]:ml-0 ml-[240px] max-[700px]:py-[16px] py-[32px] max-[700px]:px-[64px] px-[128px] max-[700px]:items-center max-[700px]:text-center">
                    <h4 className="mb-[24px]" id="heading4">
                        okok
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
                            onChange={handleChange}
                        />
                        <p className="text-[#8E8E8E] mt-[4px]" id="overline">+[COUNTRY CODE][NUMBER]</p>
                        <div className="mb-[4px] mt-[8px]" id="overline">
                            BIRTHDATE
                        </div>
                        <input
                            className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[380px] h-[36px]"
                            name="date_of_birth"
                            placeholder="07/02/1971"
                            type="text"
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
                            onChange={handleChange}
                        />
                        <div className="mb-[4px] mt-[8px]" id="overline">
                            PROFESSIONAL EXPERIENCE
                        </div>
                        <textarea
                            className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[760px] h-[310px]"
                            name="experience"
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
                        <button
                            className="button_pink_new mt-[24px] w-[170px]"

                        >
                            SAVE CHANGES
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}
export default ProfessionalProfile