import React, { useState } from "react";
import { useAuth } from "@/contexts/authentication";

const FilterJob = () => {
  const { state } = useAuth();

  // สร้าง state สำหรับเก็บข้อมูลจากฟอร์ม
  const [formData, setFormData] = useState({
    job_category: "",
    job_type: "",
    salary_min_range: "",
    salary_max_range: "",
  });

  // สร้าง state สำหรับเก็บข้อมูล option ที่เลือก
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");

  // ฟังก์ชั่นสำหรับการเปลี่ยนค่าใน form
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      category: selectedOption,
      job_type: selectedJobType,
    });
  };

  // ฟังก์ชั่นสำหรับการเลือก option ของ job category
  const handleSelectOption = (event) => {
    setSelectedOption(event.target.value);
  };

  // ฟังก์ชั่นสำหรับการเลือก option ของ job type
  const handleSelectJobType = (event) => {
    setSelectedJobType(event.target.value);
  };

  // ฟังก์ชั่นสำหรับการ submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const authToken = JSON.parse(
        localStorage.getItem("sb-zsvpcibqzkxoqqpektgc-auth-token")
      );
      const response = await createPost(formData, authToken);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-[#616161] w-[100%] h-[100%] flex-col grid ml-[490px] mt-[10px]">
      <div>
        <h3 className="text-[34px]">FindThatJob</h3>
        <p>SEARCH BY JOB TITLE OR COMPANY NAME</p>
        <input
          className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[240px] w-[380px] h-[36px]"
          placeholder="manufacturing, sales, swim"
          type="text"
          id="input-glasses"
        />
        <div className="flex flex-row gap-[20px] mt-[7px]  text-[#616161]">
          <div>
            <p className="text-[#616161]">
              CATEGORY
            </p>
            <select
              className="text-[#616161] border-solid border border-[#F48FB1] rounded-[8px] w-[280px] max-w-[360px] h-[36px]"
              id="category"
              name="job_category"
              value={selectedOption}
              onChange={(event) => {
                handleSelectOption(event);
              }}
            >
              <option
                className="text-[#616161]/75"
                value="Select or create a category"
              >
                Select or create a category
              </option>
              <option value="Software-Developer">Software Developer</option>
              <option value="Sales">Sales</option>
              <option value="Graphic-Designer">Graphic Designer</option>
              <option value="Digital-Marketing">Digital Marketing</option>
            </select>
          </div>
          <div>
            <p className="text-[#616161]">
              TYPE
            </p>
            <select
              className="text-[#616161] border-solid border border-[#F48FB1] rounded-[8px] w-[280px] max-w-[360px] h-[36px]"
              id="type"
              name="job_type"
              value={selectedJobType}
              onChange={(event) => {
                handleSelectJobType(event);
              }}
            >
              <option className="text-[#616161]/75" value="Select a type">
                Select a type
              </option>
              <option value="Full-Time">Full Time</option>
              <option value="Past-Time">Past Time</option>
            </select>
          </div>
          <div>
            <p className="text-[#616161]">
              SALARY RANGE
            </p>
            <div className="flex flex-row items-center max-[700px]:justify-center">
              <input
                className="text-[#616161] border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[90px] w-[102px] h-[36px] mr-[8px]"
                name="salary_min_range"
                placeholder="min"
                type="text"
                id="input-range"
                value={formData.salary_min_range}
                onChange={handleChange}
              />
              <svg
                width="11"
                height="2"
                viewBox="0 0 11 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="1"
                  y1="1"
                  x2="10"
                  y2="1"
                  stroke="#8E8E8E"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <input
                className="text-[#616161] border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[90px] w-[102px] h-[36px] ml-[8px]"
                name="salary_max_range"
                placeholder="max"
                type="text"
                id="input-range"
                value={formData.salary_max_range}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterJob;
