import React, { useState } from "react";
import swal from "sweetalert";

export default function Campaigns() {
  const [campaign, setCampaign] = useState("");

  const setcampaign = (event) => {
    event.preventDefault();
    const reqBody = {
      discount: campaign,
    };

    fetch(`https://sabzlearnreactserver.iran.liara.run:4000/v1/offs/all`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "کمپین با موفقیت ایجاد شد",
          icon: "success",
          buttons: "خیلی هم عالی",
        });
      }
    });
  };

  return (
    <>
      <div className="home-title mr-8">
        <span>برگزاری کمپین جدید</span>
      </div>
      <form className="form !flex flex-wrap gap-4">
        <div className="flex-1 basis-full">
          <div className="name input">
            <label className="input-title">عنوان</label>
            <input
              type="text"
              value={campaign}
              placeholder="لطفا درصد تخفیف همگانی را وارد کنید..."
              onChange={(event) => setCampaign(event.target.value)}
            />
            <span className="error-message text-red-600"></span>
          </div>
        </div>

        <div className="flex-1 basis-full">
          <div className="bottom-form">
            <div className="submit-btn">
              <input
                type="submit"
                value="ایجاد کمپین"
                className="cursor-pointer"
                onClick={setcampaign}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
