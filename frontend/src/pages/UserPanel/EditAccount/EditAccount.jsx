import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./../../../contexts/authContext";
import swal from "sweetalert";

import "./EditAccount.css";

export default function EditAccount() {
  const authContext = useContext(AuthContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setName(authContext.userInfos.name);
    setPhone(authContext.userInfos.phone);
    setUsername(authContext.userInfos.username);
    setEmail(authContext.userInfos.email);
  }, []);

  const updateUser = async (event) => {
    event.preventDefault();

    const updatedUserInfos = {
      name,
      username,
      phone,
      email,
      password,
    };

    const res = await fetch("http://localhost:4000/v1/users", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserInfos),
    });

    const result = await res.json();
    if (res.ok) {
      console.log(result.message);
      swal({
        title: "اطلاعات شما با موفقیت آپدیت شد.",
        icon: "success",
        buttons: "اوکی",
      });
    }
  };

  return (
    <div className="flex-[4]">
      <div className="edit">
        <form className="edit__form" action="#">
          <div className="edit__personal">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 basis-full">
                <label className="edit__label">شماره موبایل *</label>
                <input
                  className="edit__input"
                  type="text"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="لطفا شماره موبایل خود را وارد کنید"
                />
              </div>

              <div className="flex-1 basis-full">
                <label className="edit__label">نام و نام خانوادگی *</label>
                <input
                  className="edit__input"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="لطفا نام نمایشی خود را وارد کنید"
                />
              </div>
              <div className="flex-1 basis-full">
                <label className="edit__label">نام کاربری (نمایشی) *</label>
                <input
                  className="edit__input"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="لطفا نام نمایشی خود را وارد کنید"
                />
                <span className="edit__help">
                  اسم شما به این صورت در حساب کاربری و نظرات دیده خواهد شد.
                </span>
              </div>
              <div className="flex-1 basis-full">
                <label className="edit__label">آدرس ایمیل *</label>
                <input
                  className="edit__input"
                  type="text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="لطفا نام نمایشی خود را وارد کنید"
                />
              </div>
            </div>
          </div>
          <div className="edit__password">
            <span className="edit__password-title">تغییر گذرواژه</span>
            <div className="flex flex-wrap mt-4 gap-4">
              <div className="flex-1 basis-full">
                <label className="edit__label">
                  گذرواژه جدید (در صورتی که قصد تغییر ندارید خالی بگذارید)
                </label>
                <input
                  className="edit__input"
                  type="text"
                  placeholder="گذرواژه جدید"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
          </div>
          <button className="edit__btn" type="submit" onClick={updateUser}>
            ذخیره تغییرات
          </button>
        </form>
      </div>
    </div>
  );
}
