import React from "react";
import { useRouter } from "next/router";
import SidebarProfessional from "@/components/SidebarProfessional";

function JobDetails() {
  const router = useRouter();
  const findThatJob = router.query["jobId"];
  return (
    <div className="job-detail-app flex flex-col flex-wrapitems-center">
      <div className="header flex flex-row justify-between">
        <div className="left-section">
          <button className="back-button">BACK</button>
          <div className="company-card flex flex-row">
            <div className="logo"></div>
            <div className="company-title">
              <h5 id="heading5" className="company-name">
                The Company Name SA
              </h5>
              <div className="subscription-status">
                <div className="status-logo"></div>
                <p>Following</p>
              </div>
            </div>
          </div>
        </div>
        <button className="apply-button">Apply Now</button>
      </div>
      <div className="title-header flex flex-col">
        <h3 id="heading3">The Job Title {findThatJob}</h3>
        <div className="flex flex-row justify-center">
          <p>Posted 2 days ago</p>
        </div>
        <div className="card-section flex flex-row justify-center">
          <div className="category">category</div>
          <div className="type">Type</div>
          <div className="salary">Salary</div>
        </div>
      </div>
      <section className="content-section flex flex-col">
        <div className="about-company">
          <h5 id="heading5">About The company name SA</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
            corporis ab. Dolor recusandae at laudantium temporibus perspiciatis
            amet commodi aut nemo nesciunt! A ipsum magnam facere saepe, quasi
            dolorum! Tempore saepe nesciunt consequatur quas animi modi ad,
            asperiores mollitia veritatis deleniti quo nemo voluptatum adipisci
            ipsam soluta laborum magnam illo. Iusto distinctio esse ea libero
            inventore asperiores. Laudantium eius, omnis rem beatae fugit
            molestias asperiores praesentium autem consequatur dolores ad
            accusamus voluptatem soluta velit architecto esse, odio nobis vel
            deserunt aliquid amet unde nam? Quos magnam nemo possimus ea
            obcaecati provident dolorum porro dolorem, mollitia, assumenda dicta
            unde sunt repellendus.
          </p>
        </div>
        <div className="about-job">
          <h5 id="heading5">About the job position</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque porta nunc viverra velit tincidunt, non vehicula augue
            vehicula. Donec viverra luctus nisl, sed vehicula ligula. Vivamus
            maximus metus a magna fermentum ullamcorper. Phasellus ultrices
            vestibulum ligula ut pellentesque. Quisque quis congue quam. Nunc
            porttitor risus lorem, in blandit augue iaculis vitae. Cras sit amet
            fringilla neque. Fusce ac elit ut quam ultrices bibendum. Curabitur
            vitae dignissim quam. Suspendisse aliquet massa id orci volutpat
            ullamcorper. Nunc at ante sem. Etiam elementum, mi eget aliquam
            lobortis, elit libero tempus ex, vel pretium nisi risus ac augue.
          </p>
        </div>
        <div className="mandatory-requirements">
          <h5 id="heading5">Mandatory Requirements</h5>
          <p>
            - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br />
            - Aeneanaliquam turpis eget egestas porta.
            <br />
            - Quisque tristique nuncut sem pretium bibendum.
            <br />
            - Phasellus sit amet turpis laoreet, mattis elit ut, luctus ligula.
            <br />- Nullam blandit arcu eget justo hendrerit finibus.
          </p>
        </div>
        <div className="optional-requirements">
          <h5 id="heading5">Optional Requirements</h5>
          <p>
            - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br />- Maecenas vel metus imperdiet, malesuada dolor a, pulvinar
            tellus.
          </p>
        </div>
        <button>APPLY NOW</button>
      </section>
    </div>
  );
}

export default JobDetails;
