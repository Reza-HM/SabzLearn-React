import React, { useEffect, useState } from "react";
import Editor from "../../../components/Form/Editor";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

const Draft = () => {
  const [articleInfos, setArticleInfos] = useState([]);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleShortName, setArticleShortName] = useState("");
  const [articleDesc, setArticleDesc] = useState("");
  const [articleBody, setArticleBody] = useState(null);
  const [articleCover, setArticleCover] = useState(null);
  const [articleCategory, setArticleCategory] = useState(null);
  const [coursesData, setCoursesData] = useState([]);

  const { shortName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://sabzlearnreactserver.iran.liara.run:4000/v1/articles/${shortName}`);
      const result = await res.json();
      console.log(result);
      setArticleInfos(result);
      setArticleTitle(result.title);
      setArticleDesc(result.description);
      setArticleBody(result.body);
      setArticleShortName(result.shortName);
      setArticleCover(result.cover);
      setArticleCategory(result.categoryID._id);
    };
    fetchData();
  }, [shortName]);

  useEffect(() => {
    getAllCourses();
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

  const createNewArticle = (event) => {
    event.preventDefault();
  };

  const draftArticle = async (event) => {
    event.preventDefault();

    const localStorageData = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();

    formData.append("title", articleTitle);
    formData.append("description", articleDesc);
    formData.append("body", articleBody);
    formData.append("shortName", articleShortName);
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
      swal({
        title: "مقاله جدید با موفقیت پیش نویس شد.",
        icon: "success",
        buttons: "OK",
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
                <input
                  type="text"
                  value={articleTitle}
                  onChange={(event) => setArticleTitle(event.target.value)}
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="flex-1 basis-1/2">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  لینک
                </label>
                <input
                  type="text"
                  value={articleShortName}
                  onChange={(event) => setArticleShortName(event.target.value)}
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

                <input
                  type="text"
                  className="article-textarea w-full min-h-[10rem] py-2 px-4 rounded-md"
                  value={articleDesc}
                  onChange={(event) => setArticleDesc(event.target.value)}
                />
                <span className="error-message text-red-600"></span>
              </div>
            </div>
            <div className="flex-1 basis-full">
              <Editor
                value={articleBody}
                setValue={(event) => setArticleBody(event)}
              />
            </div>
            <div className="flex-1 basis-1/2">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  کاور
                </label>
                <input
                  type="file"
                  defaultValue={articleCover}
                  onChange={(event) => setArticleCover(event.target.files[0])}
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
                  {coursesData.map((course) => (
                    <option value={course._id} key={course._id}>
                      {course.name}
                    </option>
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
                    onClick={createNewArticle}
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
    </div>
  );
};

export default Draft;
