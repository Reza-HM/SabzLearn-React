import React, { useEffect, useState } from "react";
import DataTable from "./../../../components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import useForm from "./../../../Hooks/useForm";
import Input from "./../../../components/Form/Input";
import {
  requiredValidator,
  minValidator,
  maxValidator,
} from "./../../../Validators/rules";

import "./Courses.css";

export default function Courses() {
  const [coursesData, setCoursesData] = useState([]);
  const [courseCategory, setCourseCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [courseStatus, setCourseStatus] = useState("start");
  const [courseCover, setCourseCover] = useState({});

  console.log(courseStatus);

  const [inputHandler, formState] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      support: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllCourses();

    const fetchData = async () => {
      const res = await fetch("https://sabzlearnreactserver.iran.liara.run:4000/v1/category");
      const categories = await res.json();

      if (res.ok) {
        console.log(categories);
        setCategories(categories);
      }
    };
    fetchData();
  }, []);

  function getAllCourses() {
    const fetchData = async () => {
      const res = await fetch("https://sabzlearnreactserver.iran.liara.run:4000/v1/courses");
      const courses = await res.json();

      if (res.ok) {
        console.log(courses);
        setCoursesData(courses);
      }
    };

    fetchData();
  }

  const removeCourse = (courseID) => {
    swal({
      title: "آیا از حذف دوره اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        const res = await fetch(
          `https://sabzlearnreactserver.iran.liara.run:4000/v1/courses/${courseID}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorageData.token}`,
            },
          }
        );

        const removeResult = await res.json();

        if (res.ok) {
          console.log(removeResult);
          getAllCourses();
        }
      }
    });
  };

  const selectCategory = (event) => {
    setCourseCategory(event.target.value);
  };

  const addNewCourse = async (event) => {
    event.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    let formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("shortName", formState.inputs.shortName.value);
    formData.append("categoryID", courseCategory);
    formData.append("price", formState.inputs.price.value);
    formData.append("status", courseStatus);
    formData.append("support", formState.inputs.support.value);
    formData.append("cover", courseCover);

    const res = await fetch("https://sabzlearnreactserver.iran.liara.run:4000/v1/courses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: formData,
    });

    const result = await res.json();

    console.log(result.message);
    if (res.ok) {
      swal({
        title: "دوره جدید با موفقیت اضافه شد.",
        icon: "success",
        buttons: "اوکی",
      }).then(() => {
        getAllCourses();
      });
    } else {
      swal({
        title: "ثبت دوره جدید با مشکل مواجه شد.",
        icon: "error",
        buttons: "متوجه شدم",
      });
    }
  };

  return (
    <div>
      <div className="w-full" id="home-content">
        <div className="container px-12">
          <div className="home-title">
            <span>افزودن دوره جدید</span>
          </div>
          <form className="form !grid grid-cols-2 shadow-lg p-16">
            <div className="">
              <div className="name input">
                <label className="input-title">نام دوره</label>
                <Input
                  id="name"
                  element="input"
                  inputHandler={inputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا نام دوره را وارد کنید..."
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="">
              <div className="price input">
                <label className="input-title">توضیحات دوره</label>
                <Input
                  id="description"
                  element="input"
                  inputHandler={inputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا توضیحات دوره را وارد کنید..."
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="">
              <div className="number input">
                <label className="input-title">URL دوره</label>
                <Input
                  id="shortName"
                  element="input"
                  inputHandler={inputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا Url دوره را وارد کنید..."
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="">
              <div className="price input">
                <label className="input-title">قیمت دوره</label>
                <Input
                  id="price"
                  element="input"
                  inputHandler={inputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="">
              <div className="price input">
                <label className="input-title">پشتیبانی دوره</label>
                <Input
                  id="support"
                  element="input"
                  inputHandler={inputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا نحوه پشتیبانی دوره را وارد کنید..."
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="">
              <div className="number input flex flex-col">
                <label className="input-title">دسته‌بندی دوره</label>
                <select
                  className="text-darkColor hover:bg-blue-600 transition-all duration-300 ease-linear py-2 px-4 hover:text-white rounded-lg"
                  onChange={selectCategory}
                >
                  <option value="-1">دسته بندی مد نظر را انتخاب کنید: </option>
                  {categories.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="">
              <div className="file">
                <label className="input-title">عکس دوره</label>
                <input
                  className=""
                  type="file"
                  id="file"
                  onChange={(event) => {
                    setCourseCover(event.target.files[0]);
                  }}
                />
              </div>
            </div>
            <div className="">
              <div className="bottom-form">
                <div className="condition">
                  <label className="input-title">وضعیت دوره</label>
                  <div className="radios">
                    <div className="available">
                      <label>
                        <span>در حال برگزاری</span>
                        <input
                          type="radio"
                          value="start"
                          name="condition"
                          checked
                          onInput={(event) =>
                            setCourseStatus(event.target.value)
                          }
                        />
                      </label>
                    </div>
                    <div className="unavailable">
                      <label>
                        <span>تکمیل شده</span>
                        <input
                          type="radio"
                          value="presell"
                          name="condition"
                          onInput={(event) =>
                            setCourseStatus(event.target.value)
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    className=" bg-blue-600 text-white mt-8 rounded-lg flex justify-center items-center py-2 px-4 w-40 cursor-pointer hover:bg-blue-500 transition-all duration-300 ease-linear"
                    onClick={addNewCourse}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="دوره ها">
        <table className="my-10 w-full bg-white rounded-2xl overflow-hidden shadow-lg">
          <thead>
            <tr className="text-center">
              <th className="p-5">شناسه</th>
              <th className="p-5">عنوان دوره</th>
              <th className="p-5">قیمت دوره</th>
              <th className="p-5">دسته بندی دوره</th>
              <th className="p-5">مدرس دوره</th>
              <th className="p-5">وضعیت</th>
              <th className="p-5">ویرایش</th>
              <th className="p-5">حذف</th>
            </tr>
          </thead>
          <tbody>
            {coursesData.map((course, index) => (
              <tr className="text-center" key={course._id}>
                <td className="p-5">{index + 1}</td>
                <td className="p-5">{course.name}</td>
                <td className="p-5">
                  {course.price === 0
                    ? "رایگان"
                    : course.price.toLocaleString()}
                </td>
                <td className="p-5">{course.categoryID.title}</td>
                <td className="p-5">{course.creator}</td>
                <td className="p-5">
                  {course.isComplete === 0
                    ? "در حال برگزاری"
                    : "به اتمام رسیده"}
                </td>
                <td className="p-5">
                  <button
                    type="button"
                    className="rounded-lg py-4 px-8 bg-blue-600 text-white !text-2xl hover:bg-blue-400 !transition-all !duration-300 !ease-linear edit-btn"
                  >
                    ویرایش
                  </button>
                </td>
                <td className="p-5">
                  <button
                    type="button"
                    className="rounded-lg py-4 px-8 bg-red-600 text-white !text-2xl hover:bg-red-400 !transition-all !duration-300 !ease-linear delete-btn"
                    onClick={() => {
                      removeCourse(course._id);
                    }}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}
