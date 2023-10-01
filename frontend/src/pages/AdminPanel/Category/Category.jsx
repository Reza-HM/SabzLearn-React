import React, { useEffect, useState } from "react";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";
import Input from "../../../components/Form/Input";
import { minValidator, maxValidator } from "../../../Validators/rules";
import useForm from "./../../../Hooks/useForm";
import swal from "sweetalert";

export default function Category() {
  const [categories, setCategories] = useState([]);

  const [inputHandler, formState] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortname: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    fetch(`https://sabzlearnreactserver.iran.liara.run:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        console.log(allCategories);
        setCategories(allCategories);
      });
  }

  const createNewCategory = async (event) => {
    event.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    const newCategoryInfos = {
      title: formState.inputs.title.value,
      name: formState.inputs.shortname.value,
    };

    const res = await fetch("https://sabzlearnreactserver.iran.liara.run:4000/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify(newCategoryInfos),
    });

    const result = await res.json();

    if (res.ok) {
      console.log(result);
      swal({
        title: "دسته‌بندی جدید با موفقیت ثبت شد.",
        icon: "success",
        buttons: "اوکی",
      }).then(() => {
        getAllCategories();
      });
    }
  };

  const removeCategory = (categoryID) => {
    swal({
      title: "آیا از حذف دسته‌بندی اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        const res = await fetch(
          `https://sabzlearnreactserver.iran.liara.run:4000/v1/category/${categoryID}`,
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
          getAllCategories();
        }
      }
    });
  };

  const updateCategory = (categoryID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "عنوان دسته‌بندی جدید را وارد کنید:",
      content: "input",
      buttons: "ثبت عنوان جدید",
    }).then(async (result) => {
      console.log(result);
      if (result.trim().length) {
        const res = await fetch(
          `https://sabzlearnreactserver.iran.liara.run:4000/v1/category/${categoryID}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorageData.token}`,
            },
            body: JSON.stringify({
              title: result.trim(),
              name: result.trim(),
            }),
          }
        );
        if (res.ok) {
          getAllCategories();
        }
      }
    });
  };

  return (
    <>
      <div className="w-full" id="home-content">
        <div className="container px-12">
          <div className="home-title">
            <span>افزودن دسته‌بندی جدید</span>
          </div>
          <form className="form !grid grid-cols-2 gap-8">
            <div className="">
              <div className="name input  ">
                <label className="input-title">عنوان</label>
                <Input
                  element="input"
                  inputHandler={inputHandler}
                  type="text"
                  id="title"
                  className="w-full py-2 px-4 rounded-lg text-2xl mt-2"
                  placeholder="لطفا عنوان را وارد کنید..."
                  validations={[minValidator(5), maxValidator(20)]}
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="">
              <div className="name input">
                <label className="input-title">اسم کوتاه</label>
                <Input
                  element="input"
                  inputHandler={inputHandler}
                  type="text"
                  className="w-full py-2 px-4 rounded-lg text-2xl mt-2"
                  id="shortname"
                  placeholder="لطفا اسم کوتاه را وارد کنید..."
                  validations={[minValidator(5), maxValidator(20)]}
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
          </form>
          <div className="">
            <div className="bottom-form">
              <div className="submit-btn">
                <input
                  type="submit"
                  value="افزودن"
                  className="flex justify-center items-center bg-blue-500 mt-8 py-2 px-4 rounded-lg text-white cursor-pointer hover:bg-blue-400 transition-all duration-300 ease-linear w-full"
                  onClick={createNewCategory}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <DataTable title="دسته‌بندی‌ها">
        <table className="my-10 w-full bg-white rounded-2xl overflow-hidden shadow-lg">
          <thead>
            <tr className="text-center">
              <th className="p-5">شناسه</th>
              <th className="p-5">عنوان</th>
              <th className="p-5">ویرایش</th>
              <th className="p-5">حذف</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr className="text-center">
                <td className="p-5">{index + 1}</td>
                <td className="p-5">{category.title}</td>
                <td className="p-5">
                  <button
                    type="button"
                    className="rounded-lg py-4 px-8 bg-blue-600 text-white !text-2xl hover:bg-blue-400 !transition-all !duration-300 !ease-linear edit-btn"
                    onClick={() => updateCategory(category._id)}
                  >
                    ویرایش
                  </button>
                </td>
                <td className="p-5">
                  <button
                    type="button"
                    className="rounded-lg py-4 px-8 bg-red-600 text-white !text-2xl hover:bg-red-400 !transition-all !duration-300 !ease-linear edit-btn"
                    onClick={() => removeCategory(category._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
