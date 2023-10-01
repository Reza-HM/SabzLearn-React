import React, { useEffect, useState } from "react";
import Header from "./../../components/Header/Header";
import Footer from "./../../components/Footer/Footer";
import Breadcrumb from "./../../components/Breadcrumb/Breadcrumb";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import CommentsTextArea from "../../components/CommentsTextArea/CommentsTextArea";
import { useParams } from "react-router-dom";
import Dompurify from "dompurify";

const ArticleInfo = () => {
  const { articleName } = useParams();

  const [articleDetails, setArticleDetails] = useState([]);
  const [articleCreatorDetails, setArticleCreatorDetails] = useState({});
  const [articleCategoryDetails, setArticleCategoryDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://sabzlearnreactserver.iran.liara.run:4000/v1/articles/${articleName}`
      );
      const articleInfo = await res.json();

      if (res.ok) {
        console.log(articleInfo);
        setArticleDetails(articleInfo);
        setArticleCreatorDetails(articleInfo.creator);
        setArticleCategoryDetails(articleInfo.categoryID);
      }
    };
    fetchData();
  }, [articleName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "مقاله ها",
            to: "category-info/frontend",
          },
          {
            id: 3,
            title: "ویو Vs ری‌اکت",
            to: "course-info/js-expert",
          },
        ]}
      />

      <main className="my-16">
        <div className="container">
          <div className="flex flex-wrap gap-8">
            <div className="flex-[2]">
              <div className="p-10 rounded-lg shadow-lg">
                <h1 className="text-5xl leading-relaxed font-bold text-darkColor border-b-2 border-solid pb-4">
                  {articleDetails.title}
                </h1>
                <div className="flex items-center pt-4 gap-8">
                  <div className="flex gap-2 items-center">
                    <FolderIcon className="text-[#c7c7c7] !text-3xl" />
                    <a href="#" className="text-[#8f8f8f] text-xl">
                      {articleCategoryDetails.title}
                    </a>
                  </div>
                  <div className="flex gap-2 items-center">
                    <PersonIcon className="text-[#c7c7c7] !text-3xl" />
                    <span className="text-[#8f8f8f] text-xl">
                      {" "}
                      ارسال شده توسط {articleCreatorDetails.name}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <AccessTimeIcon className="text-[#c7c7c7] !text-3xl" />
                    <span className="text-[#8f8f8f] text-xl">
                      {" "}
                      ارسال شده توسط {articleCreatorDetails.name}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <VisibilityIcon className="text-[#c7c7c7] !text-3xl" />
                    <span className="text-[#8f8f8f] text-xl">
                      {" "}
                      2.14k بازدید
                    </span>
                  </div>
                </div>
                <img
                  src={`/images/blog/${articleDetails.cover}`}
                  alt="Article Cover"
                  className="mt-16 block mx-auto"
                />
                <div className="flex items-center my-8 gap-8">
                  <div className="flex items-center">
                    <img src="/images/svgs/star_fill.svg" />
                    <img src="/images/svgs/star_fill.svg" />
                    <img src="/images/svgs/star_fill.svg" />
                    <img src="/images/svgs/star_fill.svg" />
                    <img src="/images/svgs/star.svg" />
                  </div>
                  <span className="text-3xl text-[#7d7d7f]">
                    4.2/5 - (5 امتیاز)
                  </span>
                </div>

                <p className="text-2xl text-[#7d7e7f]">
                  {articleDetails.description}
                </p>

                <div className="bg-[#f2f2f2] rounded-[3rem] py-8 px-12 my-12">
                  <span className="block text-[#333333] text-2xl mb-2 font-bold">
                    آنچه در این مقاله خواهید خواند
                  </span>
                  <ul className="">
                    <li className="">
                      <a
                        href="#"
                        className="text-2xl text-[#1e83f0] hover:underline"
                      >
                        معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                      </a>
                    </li>
                    <li className="">
                      <a
                        href="#"
                        className="text-2xl text-[#1e83f0] hover:underline"
                      >
                        یک راه آسان‌تر، دوره‌ های جاوا اسکریپت آکادمی سبزلرن!
                      </a>
                    </li>
                    <li className="">
                      <a
                        href="#"
                        className="text-2xl text-[#1e83f0] hover:underline"
                      >
                        ثبت نام در دوره‌ های جاوا اسکریپت سبزلرن:
                      </a>
                    </li>
                  </ul>
                </div>

                <img
                  src="/images/blog/2.jpg"
                  alt="Article Image"
                  className="block mx-auto my-0"
                />
                <div
                  className="my-20"
                  dangerouslySetInnerHTML={{
                    __html: Dompurify.sanitize(articleDetails.body),
                  }}
                >
                  {/* <h2 className="text-4xl leading-tight text-green-600 font-bold">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                  </h2>
                  <p className="text-2xl text-[#7d7e7f] my-8">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین
                    سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی
                    هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه
                    شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید
                    و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه
                    کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا
                    به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا
                    اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان
                    و به زبان فارسی این زبان را یاد بگیرید.
                  </p> */}
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-2xl text-[#7d7e7f]">
                    اشتراک گذاری :
                  </span>
                  <a href="#" className="flex items-center m-2 text-[#7b868a]">
                    <TelegramIcon className="!text-4xl" />
                  </a>
                  <a href="#" className="flex items-center m-2 text-[#7b868a]">
                    <TwitterIcon className="!text-4xl" />
                  </a>
                  <a href="#" className="flex items-center m-2 text-[#7b868a]">
                    <FacebookIcon className="!text-4xl" />
                  </a>
                </div>
              </div>

              <div className="my-16 py-14 px-10 rounded-lg  bg-[#f0f2f7]">
                <div className="flex flex-wrap items-center gap-8">
                  <div className="flex-1">
                    <div className="relative flex items-center suggestion-articles__right">
                      <a href="#" className="text-[#adb5db]">
                        <EastIcon className="!text-3xl" />
                      </a>
                      <a href="#" className="text-center mx-8">
                        سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ |
                        تجربه برنامه نویسان
                      </a>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-row-reverse relative items-center suggestion-articles__left">
                      <a href="#" className="text-[#adb5db]">
                        <WestIcon className="!text-3xl" />
                      </a>
                      <a href="#" className="text-center mx-8">
                        سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ |
                        تجربه برنامه نویسان
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="sticky top-20">
                <div className="overflow-hidden">
                  <span className="title">پر امتیازترین دوره ها</span>
                  <ul className="mt-8">
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 hover:pr-8 bg-[#f8f9fa] transition-all duration-300">
                      <a href="#" className="">
                        <img
                          src="/images/courses/js_project.png"
                          alt="Course Cover"
                          className=""
                        />
                        <span className="">
                          پروژه های تخصصی با جاوا اسکریپت
                        </span>
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 hover:pr-8 bg-[#f8f9fa] transition-all duration-300">
                      <a href="#" className="">
                        <img
                          src="/images/courses/fareelancer.png"
                          alt="Course Cover"
                          className=""
                        />
                        <span className="">تعیین قیمت پروژه های فریلنسری</span>
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 hover:pr-8 bg-[#f8f9fa] transition-all duration-300">
                      <a href="#" className="">
                        <img
                          src="/images/courses/nodejs.png"
                          alt="Course Cover"
                          className=""
                        />
                        <span className="">دوره Api نویسی</span>
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 hover:pr-8 bg-[#f8f9fa] transition-all duration-300">
                      <a href="#" className="">
                        <img
                          src="/images/courses/jango.png"
                          alt="Course Cover"
                          className=""
                        />
                        <span className="">متخصص جنگو</span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="overflow-hidden my-16">
                  <span className="title">دسترسی سریع</span>
                  <ul className="mt-8">
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <ChevronLeftIcon />
                      <a href="#" className="text-2xl mr-2">
                        صفحه اصلی
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <ChevronLeftIcon />

                      <a href="#" className="text-2xl mr-2">
                        فرانت اند
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <ChevronLeftIcon />

                      <a href="#" className="text-2xl mr-2">
                        امنیت
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <ChevronLeftIcon />

                      <a href="#" className="text-2xl mr-2">
                        پایتون
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <ChevronLeftIcon />

                      <a href="#" className="text-2xl mr-2">
                        مهارت های نرم
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="overflow-hidden my-16">
                  <span className="title">مقاله های جدید</span>
                  <ul className="mt-8">
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <a href="#" className="text-2xl">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <a href="#" className="text-2xl">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <a href="#" className="text-2xl">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <a href="#" className="text-2xl">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <a href="#" className="text-2xl">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <a href="#" className="text-2xl">
                        نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="overflow-hidden my-16">
                  <span className="title">دسته بندی مقالات</span>
                  <ul className="mt-8">
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="text-2xl mr-2">
                        صفحه اصلی
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="text-2xl mr-2">
                        فرانت اند
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="text-2xl mr-2">
                        امنیت
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="text-2xl mr-2">
                        پایتون
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="text-2xl mr-2">
                        مهارت های نرم
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="overflow-hidden my-16">
                  <span className="title">دوره های جدید</span>
                  <ul className="mt-8">
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="text-2xl mr-2">
                        صفحه اصلی
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="text-2xl mr-2">
                        فرانت اند
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="text-2xl mr-2">
                        امنیت
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="text-2xl mr-2">
                        پایتون
                      </a>
                    </li>
                    <li className="flex items-center border-b border-solid border-[#eeeeee] py-4 px-6 transition-all duration-300 ease-linear hover:pr-8 hover:bg-[#f8f9fa]">
                      <i className="fas fa-angle-left sidebar-articles__icon"></i>
                      <a href="#" className="text-2xl mr-2">
                        مهارت های نرم
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ArticleInfo;
