import React, { useEffect, useState } from "react";
import DataTable from "./../../../components/AdminPanel/DataTable/DataTable";
import Input from "./../../../components/Form/Input";
import useForm from "./../../../Hooks/useForm";
import { minValidator } from "../../../Validators/rules";
import Editor from "../../../components/Form/Editor";
import swal from "sweetalert";
import CheckIcon from "@mui/icons-material/Check";

import { Link } from "react-router-dom";

export default function Articles() {
  const [articlesData, setArticlesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [articleCategory, setArticleCategory] = useState("-1");
  const [articleCover, setArticleCover] = useState({});
  const [articleBody, setArticleBody] = useState("");

  const [inputHandler, formState] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllArticles();

    fetch(`https://sabzlearnreactserver.iran.liara.run:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      });
  }, []);

  async function getAllArticles() {
    const res = await fetch("https://sabzlearnreactserver.iran.liara.run:4000/v1/articles");
    const articles = await res.json();

    console.log(articles);
    setArticlesData(articles);
  }

  const removeArticle = (articleID) => {
    swal({
      title: "آیا از حذف این مقاله اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        const res = await fetch(
          `https://sabzlearnreactserver.iran.liara.run:4000/v1/articles/${articleID}`,
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
          getAllArticles();
        }
      }
    });
  };

  const addNewArticle = async (event) => {
    event.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();

    formData.append("title", formState.inputs.title.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("body", articleBody);
    formData.append("shortName", formState.inputs.shortName.value);
    formData.append("categoryID", articleCategory);
    formData.append("cover", articleCover);

    const res = await fetch("https://sabzlearnreactserver.iran.liara.run:4000/v1/articles", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (res.ok) {
      console.log(result.message);
      swal({
        title: "مقاله جدید با موفقیت اضافه شد.",
        icon: "success",
        buttons: "OK",
      }).then(() => {
        getAllArticles();
      });
    }
  };

  const draftArticle = async (event) => {
    event.preventDefault();

    const localStorageData = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();

    formData.append("title", formState.inputs.title.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("body", articleBody);
    formData.append("shortName", formState.inputs.shortName.value);
    formData.append("categoryID", articleCategory);
    formData.append("cover", articleCover);

    const res = await fetch("https://sabzlearnreactserver.iran.liara.run:4000/v1/articles/draft", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (res.ok) {
      console.log(result.message);
      swal({
        title: "مقاله جدید با موفقیت پیش نویس شد.",
        icon: "success",
        buttons: "OK",
      }).then(() => {
        getAllArticles();
      });
    }
  };

  return (
    <div>
      <div className="w-full" id="home-content">
        <div className="container px-12">
          <div className="home-title">
            <span>افزودن مقاله جدید</span>
          </div>
          <form className="form">
            <div className="flex-1 basis-1/2">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  عنوان
                </label>
                <Input
                  element="input"
                  type="text"
                  id="title"
                  inputHandler={inputHandler}
                  validations={[minValidator(8)]}
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="flex-1 basis-1/2">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  لینک
                </label>
                <Input
                  element="input"
                  type="text"
                  id="shortName"
                  inputHandler={inputHandler}
                  validations={[minValidator(5)]}
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="flex-1 basis-full">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  چکیده
                </label>
                {/* <textarea style={{ width: "100%", height: "200px" }}></textarea> */}

                <Input
                  element="textarea"
                  type="text"
                  id="description"
                  inputHandler={inputHandler}
                  validations={[minValidator(5)]}
                  className="article-textarea w-full min-h-[10rem] py-2 px-4 rounded-md"
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="flex-1 basis-full">
              <Editor value={articleBody} setValue={setArticleBody} />
            </div>
            <div className="flex-1 basis-1/2">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  کاور
                </label>
                <input
                  type="file"
                  onChange={(event) => {
                    setArticleCover(event.target.files[0]);
                  }}
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="flex-1 basis-1/2">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  دسته بندی
                </label>
                <select
                  onChange={(event) => setArticleCategory(event.target.value)}
                >
                  <option value="-1">دسته بندی مقاله را انتخاب کنید:</option>
                  {categories.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="flex-1 basis-full">
              <div className="bottom-form">
                <div className="submit-btn w-full space-y-4">
                  <input
                    type="submit"
                    value="انتشار"
                    className="w-full cursor-pointer"
                    onClick={addNewArticle}
                  />
                  <input
                    type="submit"
                    value="پیش نویس"
                    className="w-full cursor-pointer"
                    onClick={draftArticle}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title="مقاله ها">
        <table className="my-10 w-full bg-white rounded-2xl overflow-hidden shadow-lg">
          <thead>
            <tr className="text-center">
              <th className="p-5">شناسه</th>
              <th className="p-5">عنوان مقاله</th>
              <th className="p-5">تاریخ انتشار مقاله</th>
              <th className="p-5">لینک مقاله</th>
              <th className="p-5">وضعیت مقاله</th>
              <th className="p-5">نویسنده دوره</th>
              <th className="p-5">ادامه نوشتن</th>
              <th className="p-5">ویرایش</th>
              <th className="p-5">حذف</th>
            </tr>
          </thead>
          <tbody>
            {articlesData.map((article, index) => (
              <tr className="text-center" key={article._id}>
                <td className="p-5">{index + 1}</td>
                <td className="p-5">{article.title}</td>
                <td className="p-5">{article.createdAt.slice(0, 10)}</td>
                <td className="p-5">{article.shortName}</td>
                <td className="p-5">
                  {article.publish === 1 ? "منتشر شده" : "پیش نویس"}
                </td>
                <td className="p-5">{article.creator.name}</td>

                <td className="p-5">
                  {article.publish === 1 ? (
                    <CheckIcon className="!text-4xl" />
                  ) : (
                    <Link
                      to={`draft/${article.shortName}`}
                      className="rounded-lg py-4 px-8  bg-blue-600 text-white !text-2xl hover:bg-blue-400 hover:text-white !transition-all !duration-300 !ease-linear edit-btn"
                    >
                      ادامه
                    </Link>
                  )}
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
                      removeArticle(article._id);
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
