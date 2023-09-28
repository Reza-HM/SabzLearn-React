import React, { useEffect, useState } from "react";
import swal from "sweetalert";

import "./SendTicket.css";
import { Link, useNavigate } from "react-router-dom";

export default function SendTicket() {
  const [departments, setDepartments] = useState([]);
  const [departmentID, setDepartmentID] = useState("");
  const [departmentsSubs, setDepartmentsSubs] = useState([]);
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketBody, setTicketBody] = useState("");
  const [ticketPriority, setTicketPriority] = useState("");
  const [ticketCourse, setTicketCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [ticketTypeID, setTicketTypeID] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/v1/tickets/departments`)
      .then((res) => res.json())
      .then((data) => setDepartments(data));

    fetch(`http://localhost:4000/v1/users/courses`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCourses(data);
      });
  }, []);

  const getDepartmentsSub = (departmentID) => {
    fetch(`http://localhost:4000/v1/tickets/departments-subs/${departmentID}`)
      .then((res) => res.json())
      .then((subs) => setDepartmentsSubs(subs));
  };

  const createNewTicket = async (event) => {
    event.preventDefault();

    const newTicketInfos = {
      departmentID,
      departmentSubID: ticketTypeID,
      title: ticketTitle,
      body: ticketBody,
      priority: ticketPriority,
      course: ticketCourse.length ? ticketCourse : undefined,
    };

    const res = await fetch(`http://localhost:4000/v1/tickets`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTicketInfos),
    });

    const result = await res.json();

    if (res.ok) {
      console.log(result);
      swal({
        title: "تیکت جدید با موفقیت ثبت شد.",
        icon: "success",
        buttons: "اوکی",
      }).then(() => {
        navigate("/my-accounts/tickets");
      });
    }
  };

  return (
    <div className="flex-[4]">
      <div className="ticket">
        <div className="ticket-header">
          <span className="ticket-header__title">ارسال تیکت جدید</span>
          <Link className="ticket-header__link" to="/my-account/tickets">
            همه تیکت ها
          </Link>
        </div>
        <form className="ticket-form" action="#">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 basis-1/3">
              <label className="ticket-form__label">
                دپارتمان را انتخاب کنید:
              </label>
              <select
                className="ticket-form__select"
                onChange={(event) => {
                  getDepartmentsSub(event.target.value);
                  setDepartmentID(event.target.value);
                }}
              >
                <option className="ticket-form__option">
                  لطفا یک مورد را انتخاب نمایید.
                </option>
                {departments.map((department) => (
                  <option value={department._id}>{department.title}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 basis-1/3">
              <label className="ticket-form__label">
                نوع تیکت را انتخاب کنید:
              </label>
              <select
                className="ticket-form__select"
                onChange={(event) => setTicketTypeID(event.target.value)}
              >
                <option className="ticket-form__option">
                  لطفا یک مورد را انتخاب نمایید.
                </option>
                {departmentsSubs.map((sub) => (
                  <option value={sub._id} key={sub._id}>
                    {sub.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 basis-1/3">
              <label className="ticket-form__label">
                عنوان تیکت را وارد کنید:
              </label>
              <input
                className="ticket-form__input"
                type="text"
                value={ticketTitle}
                onChange={(event) => setTicketTitle(event.target.value)}
              />
            </div>

            <div className="flex-1 basis-1/3">
              <label className="ticket-form__label">
                اولویت تیکت را انتخاب کنید:
              </label>
              <select
                className="ticket-form__select"
                onChange={(event) => setTicketPriority(event.target.value)}
              >
                <option className="ticket-form__option">
                  لطفا یک مورد را انتخاب نمایید.
                </option>
                <option value="1">پایین</option>
                <option value="2">متوسط</option>
                <option value="3">بالا</option>
              </select>
            </div>
            {ticketTypeID === "63b688c5516a30a651e98156" && (
              <div className="flex-1 basis-1/3">
                <label className="ticket-form__label">
                  دوره را انتخاب کنید:
                </label>
                <select
                  className="ticket-form__select"
                  onChange={(event) => setTicketCourse(event.target.value)}
                >
                  <option className="ticket-form__option">
                    لطفا یک مورد را انتخاب نمایید.
                  </option>
                  {courses.map((course) => (
                    <option value={course._id} key={course._id}>
                      {course.course.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex-1 basis-full">
              <label className="ticket-form__label">
                محتوای تیکت را وارد نمایید:
              </label>
              <textarea
                className="ticket-form__textarea"
                value={ticketBody}
                onChange={(event) => setTicketBody(event.target.value)}
              ></textarea>
            </div>
            <div className="flex-1 basis-full">
              <div className="ticket-form__file">
                <span className="ticket-form__file-max">
                  حداکثر اندازه: 6 مگابایت
                </span>
                <span className="ticket-form__file-format">
                  فرمت‌های مجاز: jpg, png.jpeg, rar, zip
                </span>
                <input className="ticket-form__file-input" type="file" />
              </div>
            </div>
            <div className="basis-full">
              <button className="ticket-form__btn" onClick={createNewTicket}>
                ارسال تیکت
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
