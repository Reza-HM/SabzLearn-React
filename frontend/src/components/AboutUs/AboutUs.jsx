import React from "react";

import AboutUsBox from "../AboutUsBox/AboutUsBox";
import SectionHeader from "../SectionHeader/SectionHeader";

const AboutUs = () => {
  return (
    <div className="my-24">
      <div className="container">
        <SectionHeader
          title="ما چه کمکی بهتون می کنیم؟"
          desc="از اونجایی که آکادمی آموزشی سبزلرن یک آکادمی خصوصی هست"
        />

        <div className="flex flex-wrap items-center justify-between">
          <AboutUsBox
            title="دوره های اختصاصی"
            desc="با پشتیبانی و کیفیت بالا ارائه میده !"
          />
          <AboutUsBox
            title="دوره های اختصاصی"
            desc="با پشتیبانی و کیفیت بالا ارائه میده !"
          />
          <AboutUsBox
            title="دوره های اختصاصی"
            desc="با پشتیبانی و کیفیت بالا ارائه میده !"
          />
          <AboutUsBox
            title="دوره های اختصاصی"
            desc="با پشتیبانی و کیفیت بالا ارائه میده !"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
