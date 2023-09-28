import React, { useEffect, useState } from "react";
import Input from "./../../../components/Form/Input";
import useForm from "./../../../Hooks/useForm";
import { minValidator, requiredValidator } from "../../../Validators/rules";
import swal from "sweetalert";
import DataTable from "./../../../components/AdminPanel/DataTable/DataTable";

const Offs = () => {
  const [offs, setOffs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseValue, setCourseValue] = useState("");
  const [inputHandler, formState] = useForm(
    {
      code: {
        value: "",
        isValid: false,
      },
      percent: {
        value: "",
        isValid: false,
      },
      max: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/v1/courses");
      const coursesData = await res.json();
      setCourses(coursesData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    getAllOffs();
  }, []);

  async function getAllOffs() {
    const res = await fetch(`http://localhost:4000/v1/offs`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    });
    const offCodes = await res.json();
    console.log(offCodes);
    setOffs(offCodes);
  }

  const createOffCode = async (event) => {
    event.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    const newOffInfo = {
      code: formState.inputs.code.value,
      percent: formState.inputs.percent.value,
      max: formState.inputs.max.value,
      course: courseValue,
    };

    const res = await fetch(`http://localhost:4000/v1/offs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify(newOffInfo),
    });

    const result = await res.json();

    if (res.ok) {
      console.log(result);
      swal({
        title: "کد تخفیف جدید با موفقیت افزوده شد.",
        icon: "success",
        buttons: "OK",
      }).then(() => {
        getAllOffs();
      });
    }
  };

  const removeOff = async (offID) => {
    swal({
      title: "آیا از حذف کد تخفیف اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        const res = await fetch(`http://localhost:4000/v1/offs/${offID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        });

        const removeResult = await res.json();

        if (res.ok) {
          console.log(removeResult);
          getAllOffs();
        }
      }
    });
  };

  return (
    <div>
      <div className="w-full" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن کد تخفیف</span>
          </div>
          <form className="form">
            <div className="flex-1 basis-1/2">
              <div className="name input">
                <label className="input-title">کد تخفیف</label>
                <Input
                  element="input"
                  inputHandler={inputHandler}
                  type="text"
                  id="code"
                  validations={[minValidator(5)]}
                  placeholder="لطفا کد تخفیف را وارد کنید..."
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="flex-1 basis-1/2">
              <div className="price input">
                <label className="input-title"> درصد تخفیف </label>
                <Input
                  element="input"
                  inputHandler={inputHandler}
                  type="text"
                  id="percent"
                  validations={[requiredValidator()]}
                  placeholder="لطفا درصد تخفیف را وارد کنید..."
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="flex-1 basis-1/2">
              <div className="price input">
                <label className="input-title">حداکثر تعداد استفاده</label>
                <Input
                  element="input"
                  inputHandler={inputHandler}
                  type="text"
                  id="max"
                  validations={[requiredValidator()]}
                  placeholder="لطفا حداکثر تعداد استفاده از کد تخفیف را وارد کنید..."
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
                  onChange={(event) => setCourseValue(event.target.value)}
                  className="select cursor-pointer bg-slate-200 py-2 px-8 w-full rounded-lg text-darkColor text-2xl"
                >
                  <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses
                    .filter((course) => course.price !== 0)
                    .map((course) => (
                      <option value={course._id} key={course._id}>
                        {course.name}
                      </option>
                    ))}
                </select>
                <span className="error-message text-red-600"></span>
              </div>
            </div>

            <div className="">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    className="cursor-pointer"
                    onClick={createOffCode}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="کد های تخفیف">
        <table className="my-10 w-full bg-white rounded-2xl overflow-hidden shadow-lg">
          <thead>
            <tr className="text-center">
              <th className="p-5">شناسه</th>
              <th className="p-5">کد تخفیف</th>
              <th className="p-5">حداکثر تعداد استفاده</th>
              <th className="p-5">درصد تخفیف</th>
              <th className="p-5">سازنده</th>
              <th className="p-5">ویرایش</th>
              <th className="p-5">حذف</th>
            </tr>
          </thead>
          <tbody>
            {offs
              .slice()
              .reverse()
              .map((off, index) => (
                <tr className="text-center" key={off._id}>
                  <td className="p-5">{index + 1}</td>
                  <td className="p-5">{off.code}</td>
                  <td className="p-5">{off.max}</td>
                  <td className="p-5">{off.percent}%</td>
                  <td className="p-5">{off.creator}</td>
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
                        removeOff(off._id);
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
};

export default Offs;
