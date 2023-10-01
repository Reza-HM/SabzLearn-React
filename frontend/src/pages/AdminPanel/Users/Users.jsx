import React, { useEffect, useState } from "react";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import Input from "../../../components/Form/Input";
import useForm from "../../../Hooks/useForm";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "./../../../Validators/rules";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function Users() {
  const [usersData, setUsersData] = useState([]);
  const [inputHandler, formState] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    const fetchData = async () => {
      const res = await fetch(`https://sabzlearnreactserver.iran.liara.run:4000/v1/users`, {
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
      });
      const users = await res.json();

      console.log(users);
      setUsersData(users);
    };
    fetchData();
  }

  const removeUser = (userID) => {
    swal({
      title: "آیا از حذف کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        const res = await fetch(`https://sabzlearnreactserver.iran.liara.run:4000/v1/users/${userID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        });

        const removeResult = await res.json();

        if (res.ok) {
          console.log(removeResult);
          getAllUsers();
        }
      }
    });
  };

  const banUser = (userID) => {
    swal({
      title: "آیا از بن کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        const res = await fetch(
          `https://sabzlearnreactserver.iran.liara.run:4000/v1/users/ban/${userID}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorageData.token}`,
            },
          }
        );

        const banResult = await res.json();

        if (res.ok) {
          swal({
            title: "کاربر مورد نظر با موفقیت بن شد.",
            icon: "success",
            buttons: "اوکی",
          });
          console.log(banResult);
          removeUser(userID);
        }
      }
    });
  };

  const registerNewUser = async (event) => {
    event.preventDefault();

    const newUserInfos = {
      name: formState.inputs.name.value,
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value,
    };

    const res = await fetch(`https://sabzlearnreactserver.iran.liara.run:4000/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfos),
    });

    const result = await res.json();

    if (res.ok) {
      console.log(result);
      swal({
        title: "کاربر جدید با موفقیت ثبت نام شد.",
        icon: "success",
        buttons: "خیلی هم عالی",
      }).then(() => {
        getAllUsers();
      });
    }
  };

  return (
    <div>
      <div className="container px-16">
        <div className="home-content-edit">
          <ArrowRightAltIcon className="!text-4xl font-bold bg-blue-500 text-white rounded-lg my-4 cursor-pointer" />
          <form className="grid grid-cols-2 gap-8">
            <div className="">
              <div className="name input   space-y-2">
                <label className="input-title">نام و نام خانوادگی</label>
                <Input
                  type="text"
                  className="w-full py-2 px-4 rounded-lg"
                  id="name"
                  element="input"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                  ]}
                  inputHandler={inputHandler}
                  placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="">
              <div className="family input  space-y-2">
                <label className="input-title">نام کاربری</label>
                <Input
                  type="text"
                  className="w-full py-2 px-4 rounded-lg"
                  id="username"
                  element="input"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                  ]}
                  inputHandler={inputHandler}
                  placeholder="لطفا نام کاربری را وارد کنید..."
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="">
              <div className="email input space-y-2">
                <label className="input-title">ایمیل</label>
                <Input
                  type="text"
                  className="w-full py-2 px-4 rounded-lg"
                  id="email"
                  element="input"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(30),
                    emailValidator(),
                  ]}
                  inputHandler={inputHandler}
                  placeholder="لطفا ایمیل کاربر را وارد کنید..."
                />
                <span className="error-message text-red-500"></span>
              </div>
            </div>
            <div className="">
              <div className="password input space-y-2">
                <label className="input-title">رمز عبور</label>
                <Input
                  type="text"
                  className="w-full py-2 px-4 rounded-lg"
                  id="password"
                  element="input"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                  ]}
                  inputHandler={inputHandler}
                  placeholder="لطفا رمز عبور کاربر را وارد کنید..."
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="">
              <div className="phone input space-y-2">
                <label className="input-title">شماره تلفن</label>
                <Input
                  type="text"
                  className="w-full py-2 px-4 rounded-lg"
                  id="phone"
                  element="input"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                  ]}
                  inputHandler={inputHandler}
                  placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
          </form>
          <div className="w-full">
            <div className="bottom-form">
              <div className="submit-btn">
                <input
                  type="submit"
                  value="افزودن"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full mt-12 cursor-pointer hover:bg-blue-400 transition-all duration-300 ease-linear"
                  onClick={registerNewUser}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <DataTable title="کاربران">
        <table className="my-10 w-full bg-white rounded-2xl overflow-hidden shadow-lg">
          <thead>
            <tr className="text-center">
              <th className="p-5">شناسه</th>
              <th className="p-5">نام کاربری</th>
              <th className="p-5">نام خانوادگی</th>
              <th className="p-5">شماره</th>
              <th className="p-5">ایمیل</th>
              <th className="p-5">نقش</th>
              <th className="p-5">ویرایش</th>
              <th className="p-5">حذف</th>
              <th className="p-5">بن</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, index) => (
              <tr className="text-center" key={user._id}>
                <td className="p-5">{index + 1}</td>
                <td className="p-5">{user.username}</td>
                <td className="p-5">{user.name}</td>
                <td className="p-5">{user.phone}</td>
                <td className="p-5">{user.email}</td>
                <td className="p-5">
                  {user.role === "ADMIN" ? "ادمین" : "یوزر"}
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
                      removeUser(user._id);
                    }}
                  >
                    حذف
                  </button>
                </td>
                <td className="p-5">
                  <button
                    type="button"
                    className="rounded-lg py-4 px-8 bg-red-600 text-white !text-2xl hover:bg-red-400 !transition-all !duration-300 !ease-linear delete-btn"
                    onClick={() => banUser(user._id)}
                  >
                    بن
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
