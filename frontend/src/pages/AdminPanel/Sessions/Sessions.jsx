import React, { useEffect, useState } from "react";
import Input from "./../../../components/Form/Input";
import DataTable from "./../../../components/AdminPanel/DataTable/DataTable";
import useForm from "./../../../Hooks/useForm";
import { minValidator } from "../../../Validators/rules";
import swal from "sweetalert";

const Sessions = () => {
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [sessionCourse, setSessionCourse] = useState("-1");
  const [sessionVideo, setSessionVideo] = useState({});
  const [sessionStatus, setSessionStatus] = useState("1");

  useEffect(() => {
    getAllSessions();

    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/v1/courses");
      const result = await res.json();
      console.log(result);
      setCourses(result);
    };
    fetchData();
  }, []);

  async function getAllSessions() {
    const res = await fetch("http://localhost:4000/v1/courses/sessions");
    const result = await res.json();
    console.log(result);
    setSessions(result);
  }

  const [inputHandler, formState] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      time: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const createNewSession = async (event) => {
    event.preventDefault();

    const localStorageData = JSON.parse(localStorage.getItem("user"));

    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("time", formState.inputs.time.value);
    formData.append("video", sessionVideo);
    formData.append("free", sessionStatus);

    const res = await fetch(
      `http://localhost:4000/v1/courses/${sessionCourse}/sessions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: formData,
      }
    );
    const result = await res.json();

    if (res.ok) {
      console.log(result);
      swal({
        title: "جلسه جدید با موفقیت اضافه شد.",
        icon: "success",
        buttons: "OK",
      }).then(() => {
        getAllSessions();
      });
    }
  };

  const removeSession = (sessionID) => {
    swal({
      title: "آیا از حذف جلسه اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        const res = await fetch(
          `http://localhost:4000/v1/courses/sessions/${sessionID}`,
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
          getAllSessions();
        }
      }
    });
  };

  return (
    <div>
      {" "}
      <div className="w-full" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن جلسه جدید</span>
          </div>
          <form className="form">
            <div className="flex-1 basis-1/2">
              <div className="name input">
                <label className="input-title">عنوان جلسه</label>
                <Input
                  element="input"
                  inputHandler={inputHandler}
                  type="text"
                  id="title"
                  validations={[minValidator(5)]}
                  placeholder="لطفا نام جلسه را وارد کنید..."
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="flex-1 basis-1/2">
              <div className="price input">
                <label className="input-title">مدت زمان جلسه</label>
                <Input
                  element="input"
                  inputHandler={inputHandler}
                  type="text"
                  id="time"
                  validations={[minValidator(5)]}
                  placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="flex-1 basis-1/2">
              <div className="price input">
                <label className="input-title" style={{ display: "block" }}>
                  دوره
                </label>
                <select
                  className="select cursor-pointer bg-slate-200 py-4 px-8 w-full rounded-lg text-darkColor text-2xl"
                  onChange={(event) => setSessionCourse(event.target.value)}
                >
                  <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses.map((course) => (
                    <option value={course._id} key={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <span className="error-message text-red-600"></span>
              </div>
            </div>

            <div className="flex-1 basis-1/2">
              <div className="price input">
                <label className="input-title" style={{ display: "block" }}>
                  فایل جلسه
                </label>
                <input
                  className="rounded-lg bg-slate-100 border-none outline-none text-darkColor file:bg-blue-500 file:text-white file:rounded-md file:border-none file:outline-none file:cursor-pointer file:hover:bg-blue-400 file:transition-all file:duration-300 file:ease-linear file:py-2 file:mx-4"
                  type="file"
                  onChange={(event) => setSessionVideo(event.target.files[0])}
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>

            <div className="flex basis-1/2">
              <div className="condition">
                <label className="input-title">وضعیت جلسه</label>
                <div className="radios">
                  <div className="available">
                    <label>
                      <span>رایگان</span>
                      <input
                        type="radio"
                        value="1"
                        name="condition"
                        checked
                        onInput={(event) =>
                          setSessionStatus(event.target.value)
                        }
                      />
                    </label>
                  </div>
                  <div className="unavailable">
                    <label>
                      <span>غیر رایگان</span>
                      <input
                        type="radio"
                        value="0"
                        name="condition"
                        onInput={(event) =>
                          setSessionStatus(event.target.value)
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    className="cursor-pointer"
                    onClick={createNewSession}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="جلسات دوره ها">
        <table className="my-10 w-full bg-white rounded-2xl overflow-hidden shadow-lg">
          <thead>
            <tr className="text-center">
              <th className="p-5">شناسه</th>
              <th className="p-5">عنوان جلسه</th>
              <th className="p-5">تایم جلسه</th>
              <th className="p-5">تاریخ ایجاد جلسه</th>
              <th className="p-5">رایگان یا غیررایگان</th>
              <th className="p-5">ویرایش</th>
              <th className="p-5">حذف</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => (
              <tr className="text-center" key={session._id}>
                <td className="p-5">{index + 1}</td>
                <td className="p-5">{session.title}</td>
                <td className="p-5">{session.time}</td>
                <td className="p-5">{session.createdAt.slice(0, 10)}</td>
                <td className="p-5">
                  {session.free === 1 ? "رایگان" : "غیر رایگان"}
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
                    onClick={() => removeSession(session._id)}
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
};

export default Sessions;
