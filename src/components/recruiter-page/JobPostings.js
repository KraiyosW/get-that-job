import React from "react";
import Image from "next/image";
import TypeJob from "../../image/type-job.png";
import TimeWorking from "../../image/time-working.png";
import Salary from "../../image/salary.png";
import JobDate from "../../image/job-date.png";
import TTcandidate from "../../image/total-candidate.png";
import candidate from "../../image/candidate.png";
import show from "../../image/show.png";
import close from "../../image/close.png";
import pencil from "../../image/pencil.png";
import {useAuth} from "@/contexts/authentication.js"

function JobPostings() {
  const [selectedOption, setSelectedOption] = useState("all");
  const {isAuthenticated} = useAuth();


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  if(!isAuthenticated){
    return null ; 
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="bg-white px-[16px] py-[16px] border rounded-lg shadow-xl w-[100%] h-auto ">
          <div className="flex flex-col" id="box-job-all">
            <div
              className="max-[700px]:text-center flex flex-row flex-wrap justify-between w-[100%]"
              id="job-head-row"
            >
              <div id="job-title flex flex-col">
                <h6 className="mb-[4px]" id="heading6">
                  The job title
                </h6>
                <div className="max-[700px]:mb-[15px] flex flex-row">
                  <section className="flex flex-row mr-[9px]">
                    <Image
                      src={TypeJob}
                      alt="Type Job"
                      className="max-[700px]:w-[20px] max-[700px]:h-[20px] mr-[6px]"
                    />
                    <p className="text-grey-secondary" id="caption">
                      Manufactoring
                    </p>
                  </section>
                  <section className="flex flex-row mr-[9px]">
                    <Image
                      src={TimeWorking}
                      alt="Time working"
                      className="max-[700px]:w-[20px] max-[700px]:h-[20px] mr-[6px]"
                    />
                    <p className="text-grey-secondary" id="caption">
                      Full time
                    </p>
                  </section>
                  <section className="flex flex-row mr-[9px]">
                    <Image
                      src={Salary}
                      alt="Salary"
                      className="max-[700px]:w-[20px] max-[700px]:h-[20px] mr-[6px]"
                    />
                    <p className="text-grey-secondary" id="caption">
                      2.0k - 2.5k
                    </p>
                  </section>
                </div>
              </div>
              <div className="max-[700px]:flex-col flex flex-row">
                <div className="max-[700px]:flex-row mr-[20px] flex flex-col items-center justify-center">
                  <Image
                    src={JobDate}
                    alt="Job Date Open"
                    className="max-[700px]:mr-[10px]"
                  />
                  <p className="max-[700px]:mr-[5px]" id="caption">
                    Open on
                  </p>
                  <p id="caption">07/11/20</p>
                </div>
                <div className="max-[700px]:mt-[5px] max-[700px]:mb-[5px] max-[700px]:flex-row max-[700px]:justify-start mr-[20px] flex flex-col items-center justify-center">
                  <div className="flex flex-row">
                    <Image
                      src={TTcandidate}
                      alt="Total Candidates"
                      className="mr-[6px]"
                    />
                    <p className="max-[700px]:mr-[5px]" id="caption">
                      5
                    </p>
                  </div>
                  <p id="caption">Total</p>
                  <p id="caption">Candidates</p>
                </div>
                <div className="max-[700px]:flex-row max-[700px]:justify-start flex flex-col items-center justify-center">
                  <div className="flex flex-row">
                    <Image
                      src={candidate}
                      alt="Candidates on track"
                      className="mr-[6px]"
                    />
                    <p className="text-pink-primary" id="caption">
                      3
                    </p>
                  </div>
                  <p className="text-pink-primary" id="caption">
                    Candidates
                  </p>
                  <p className="text-pink-primary" id="caption">
                    on track
                  </p>
                </div>
              </div>
              <div className="max-[700px]:mt-[10px] max-[700px]:mb-[10px] flex flex-row items-center">
                <Image
                  src={show}
                  alt="Show"
                  className="w-[25px] h-[25px] mr-[5px]"
                />
                <p id="body2">SHOW</p>
              </div>
              <div className="flex flex-row items-center">
                <button className="button_pink_tertiary flex flex-row mr-[6px]">
                  <Image
                    src={close}
                    alt="Close Botton"
                    className="w-[25px] h-[25px] mr-[5px]"
                  />
                  CLOSE
                </button>
                <button className="button_pink_tertiary flex flex-row">
                  <Image
                    src={pencil}
                    alt="Edit Botton"
                    className="w-[20px] h-[20px] mr-[5px]"
                  />
                  EDIT
                </button>
              </div>
            </div>
            <div>
              <p className="text-pink-tertiary mt-[10px] mb-[8px]" id="body1">
                About the job position
              </p>
              <p className="" id="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                quis diam fringilla, luctus lectus dictum, volutpat lacus.
                Vivamus lacinia felis ut mauris lacinia elementum. Sed faucibus
                dapibus egestas. Etiam dolor neque, posuere at purus cursus,
                molestie eleifend lacus. Aenean eu diam eu enim commodo accumsan
                ut sit amet odio. Nam maximus varius leo, et porttitor ante
                sodales ut. Pellentesque euismod commodo nunc ut tincidunt. Sed
                fringilla nunc leo, a euismod ipsum aliquet placerat. Integer
                suscipit semper mi, sit amet mollis augue mollis in. Proin
                vestibulum accumsan elit, id pellentesque diam fermentum eget.
                Aliquam mattis quis quam ut faucibus. Duis finibus nulla nec
                enim eleifend dapibus.
              </p>
            </div>
            <div>
              <p className="text-pink-tertiary mt-[16px] mb-[8px]" id="body1">
                About the job position
              </p>
              <p className="" id="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                quis diam fringilla, luctus lectus dictum, volutpat lacus.
                Vivamus lacinia felis ut mauris lacinia elementum. Sed faucibus
                dapibus egestas. Etiam dolor neque, posuere at purus cursus,
                molestie eleifend lacus. Aenean eu diam eu enim commodo accumsan
                ut sit amet odio. Nam maximus varius leo, et porttitor ante
                sodales ut. Pellentesque euismod commodo nunc ut tincidunt. Sed
                fringilla nunc leo, a euismod ipsum aliquet placerat. Integer
                suscipit semper mi, sit amet mollis augue mollis in. Proin
                vestibulum accumsan elit, id pellentesque diam fermentum eget.
                Aliquam mattis quis quam ut faucibus. Duis finibus nulla nec
                enim eleifend dapibus.
              </p>
            </div>
            <div>
              <p className="text-pink-tertiary mt-[16px] mb-[8px]" id="body1">
                About the job position
              </p>
              <p className="" id="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                quis diam fringilla, luctus lectus dictum, volutpat lacus.
                Vivamus lacinia felis ut mauris lacinia elementum. Sed faucibus
                dapibus egestas. Etiam dolor neque, posuere at purus cursus,
                molestie eleifend lacus. Aenean eu diam eu enim commodo accumsan
                ut sit amet odio. Nam maximus varius leo, et porttitor ante
                sodales ut. Pellentesque euismod commodo nunc ut tincidunt. Sed
                fringilla nunc leo, a euismod ipsum aliquet placerat. Integer
                suscipit semper mi, sit amet mollis augue mollis in. Proin
                vestibulum accumsan elit, id pellentesque diam fermentum eget.
                Aliquam mattis quis quam ut faucibus. Duis finibus nulla nec
                enim eleifend dapibus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobPostings;
