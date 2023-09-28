import React, { useEffect, useState } from "react";
import DataTable from "./../../../components/AdminPanel/DataTable/DataTable";
import CheckIcon from "@mui/icons-material/Check";
import swal from "sweetalert";
import useForm from "./../../../Hooks/useForm";
import Input from "./../../../components/Form/Input";
import { minValidator } from "../../../Validators/rules";

export default function Menus() {
  const [menus, setMenus] = useState([]);
  const [menuParent, setMenuParent] = useState("-1");

  const [inputHandler, formState] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      href: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllMenus();
  }, []);

  function getAllMenus() {
    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/v1/menus/all");
      const menusData = await res.json();
      console.log(menusData);
      setMenus(menusData);
    };
    fetchData();
  }

  const removeMenu = (menuID) => {
    swal({
      title: "آیا از حذف منو اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        const res = await fetch(`http://localhost:4000/v1/menus/${menuID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        });

        const removeResult = await res.json();

        if (res.ok) {
          console.log(removeResult);
          getAllMenus();
        }
      }
    });
  };

  const createMenu = async (event) => {
    event.preventDefault();

    const newMenuInfo = {
      title: formState.inputs.title.value,
      href: formState.inputs.href.value,
      parent: menuParent,
    };

    const res = await fetch("http://localhost:4000/v1/menus", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuInfo),
    });

    const result = await res.json();

    if (res.ok) {
      console.log(result);
      swal({
        title: "منو جدید با موفقیت اضافه شد.",
        icon: "success",
        buttons: "اوکی",
      }).then(() => {
        getAllMenus();
      });
    }
  };

  return (
    <div>
      <div className="container">
        <div className="home-title">
          <span>افزودن منو جدید</span>
        </div>
        <form className="form gap-y-8">
          <div className="flex-1 basis-1/2">
            <div className="name input">
              <label className="input-title">عنوان</label>
              <Input
                element="input"
                inputHandler={inputHandler}
                id="title"
                type="text"
                isValid="false"
                placeholder="لطفا عنوان را وارد کنید..."
                validations={[minValidator(5)]}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="flex-1 basis-1/2">
            <div className="name input">
              <label className="input-title">مقصد</label>
              <Input
                element="input"
                inputHandler={inputHandler}
                id="href"
                type="text"
                isValid="false"
                validations={[minValidator(5)]}
                placeholder="لطفا مقصد را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="flex-1 basis-1/2">
            <div className="name input flex gap-4">
              <label className="input-title">عنوان</label>
              <select
                className="select cursor-pointer"
                onChange={(event) => setMenuParent(event.target.value)}
              >
                <option value="-1">منوی اصلی را انتخاب کنید</option>
                {menus.map((menu) => (
                  <>
                    {!Boolean(menu.parent) && (
                      <option value={menu._id}>{menu.title}</option>
                    )}
                  </>
                ))}
              </select>
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="flex-1 basis-full">
            <div className="bottom-form">
              <div className="submit-btn">
                <input
                  type="submit"
                  value="افزودن"
                  onClick={createMenu}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <DataTable title="منو ها">
        <table className="my-10 w-full bg-white rounded-2xl overflow-hidden shadow-lg">
          <thead>
            <tr className="text-center">
              <th className="p-5">شناسه</th>
              <th className="p-5">عنوان منو</th>
              <th className="p-5">مقصد منو</th>
              <th className="p-5">فرزند...</th>
              <th className="p-5">تاریخ ایجاد منو</th>
              <th className="p-5">ویرایش</th>
              <th className="p-5">حذف</th>
            </tr>
          </thead>
          <tbody>
            {menus.slice().reverse().map((menu, index) => (
              <tr className="text-center" key={menu._id}>
                <td className="p-5">{index + 1}</td>
                <td className="p-5">{menu.title}</td>
                <td className="p-5">{menu.href}</td>
                <td className="p-5">
                  {menu.parent ? menu.parent.title : <CheckIcon />}
                </td>
                <td className="p-5">{menu.createdAt.slice(0, 10)}</td>
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
                      removeMenu(menu._id);
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
