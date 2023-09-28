import React, { useEffect, useState } from "react";
import Header from "./../../components/Header/Header";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Footer from "../../components/Footer/Footer";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import SchoolIcon from "@mui/icons-material/School";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LinkIcon from "@mui/icons-material/Link";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import CourseDetailBox from "../../components/CourseDetailBox/CourseDetailBox";
import Accordion from "../../components/Accordion/Accordion";
import CommentsTextArea from "../../components/CommentsTextArea/CommentsTextArea";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";

const CourseInfo = () => {
  const [comments, setComments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [courseTeacher, setCourseTeacher] = useState({});
  const [categoryTitle, setCategoryTitle] = useState("");
  const [userAccessability, setUserAccessability] = useState("");
  const [courseDetails, setCourseDetails] = useState({});
  const [relatedCourses, setRelatedCourses] = useState([]);

  const { courseName } = useParams();

  useEffect(() => {
    getCourseDetails();
    getRelatedCoursesDetails();
    window.scrollTo(0, 0);
  }, [courseName]);

  function getCourseDetails() {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:4000/v1/courses/${courseName}`,
        {
          headers: {
            Authorization: `Bearer ${
              localStorageData === null ? null : localStorageData.token
            }`,
          },
        }
      );
      const courseInfos = await res.json();
      console.log(courseInfos);
      if (res.ok) {
        console.log(courseInfos);
        setComments(courseInfos.comments);
        setSessions(courseInfos.sessions);
        setCreatedAt(courseInfos.createdAt);
        setUpdatedAt(courseInfos.updatedAt);
        setCategoryTitle(courseInfos.categoryID.title);
        setCourseTeacher(courseInfos.creator);
        setUserAccessability(courseInfos.isUserRegisteredToThisCourse);
        setCourseDetails(courseInfos);
      }
    };
    fetchData();
  }

  async function getRelatedCoursesDetails() {
    const res = await fetch(
      `http://localhost:4000/v1/courses/related/${courseName}`
    );
    const result = await res.json();
    console.log(result);
    setRelatedCourses(result);
  }

  const submitCommentHandler = async (commentBody, commentScore) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    const res = await fetch(`http://localhost:4000/v1/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify({
        body: commentBody,
        courseShortName: courseName,
        score: commentScore,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      console.log(result);
      swal({
        title: "کامنت شما با موفقیت ثبت شد",
        icon: "success",
        buttons: "بسیار عالی",
      }).then(() => {
        getCourseDetails();
      });
    } else {
      swal({
        title: "لطفا دوباره کامنت خود را ثبت کنید",
        icon: "error",
        buttons: "که اینطور",
      });
    }
  };

  const registerInCourse = (course) => {
    if (course.price === 0) {
      swal({
        title: "آیا از ثبت نام در دوره اطمینان دارید؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then((result) => {
        const formData = new FormData();
        formData.append("price", 0);
        if (result) {
          fetch(`http://localhost:4000/v1/courses/${course.id}/register`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
            body: formData,
          }).then((res) => {
            if (res.ok) {
              swal({
                title: "ثبت نام در دوره با موفقیت انجام شد.",
                icon: "success",
                buttons: "اوکی",
              }).then(() => {
                getCourseDetails();
              });
            }
          });
        }
      });
    } else {
      swal({
        title: "آیا از ثبت نام در دوره اطمینان دارید؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then((result) => {
        if (result) {
          swal({
            title: "در صورت داشتن کد تخفیف وارد کنید:",
            content: "input",
            buttons: ["ثبت نام بدون کد تخفیف", "اعمال کد تخفیف"],
          }).then((result) => {
            if (result === null) {
              fetch(`http://localhost:4000/v1/courses/${course.id}/register`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                  }`,
                },
              }).then((res) => {
                if (res.ok) {
                  swal({
                    title: "ثبت نام در دوره با موفقیت انجام شد.",
                    icon: "success",
                    buttons: "اوکی",
                  }).then(() => {
                    getCourseDetails();
                  });
                }
              });
            }
          });
        }
      });
    }
  };

  return (
    <>
      <Header />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: categoryTitle,
            to: "category-info/frontend",
          },
          {
            id: 3,
            title: courseDetails.name,
            to: "course-info/js-expert",
          },
        ]}
      />

      <section className="my-16">
        <div className="container">
          <div className="flex flex-wrap justify-between items-center gap-8">
            <div className="max-w-4xl">
              <a
                href="#"
                className="text-xl text-primary rounded-md py-2 px-4 bg-[#2bce5633] hover:text-primary"
              >
                {categoryTitle}
              </a>
              <h1 className="my-8 font-bold text-4xl text-[#464749]">
                {courseDetails.name}
              </h1>
              <p className="mb-12 text-2xl text-[#7b868a]">
                {courseDetails.description}
              </p>
              <div>
                <a
                  href="#"
                  className="text-[#b1bbbf] ml-7 transition-all duration-300 ease-in-out"
                >
                  <TelegramIcon className="!text-4xl" />
                </a>
                <a
                  href="#"
                  className="text-[#b1bbbf] ml-7 transition-all duration-300 ease-in-out"
                >
                  <TwitterIcon className="!text-4xl" />
                </a>
                <a
                  href="#"
                  className="text-[#b1bbbf] ml-7 transition-all duration-300 ease-in-out"
                >
                  <FacebookIcon className="!text-4xl" />
                </a>
              </div>
            </div>

            <div className="w-[550px]">
              <video
                src=""
                poster={`/images/courses/${courseDetails.cover}`}
                className="rounded-2xl w-full"
                controls
              ></video>
            </div>
          </div>
        </div>
      </section>

      <main className="my-8">
        <div className="container">
          <div className="flex flex-wrap justify-between gap-8">
            <div className="flex-[2]">
              <div className="course">
                {/* Start Course Boxes  */}

                <div className="course-boxes">
                  <div className="grid grid-cols-3 gap-4">
                    <CourseDetailBox
                      icon="School"
                      title="وضعیت دوره:"
                      text={
                        courseDetails.isComplete === 1
                          ? "به اتمام رسیده"
                          : "در حال برگزاری"
                      }
                    />
                    <CourseDetailBox
                      icon="AccessTime"
                      title="زمان برگزاری:"
                      text={createdAt.slice(0, 10)}
                    />
                    <CourseDetailBox
                      icon="CalendarMonth"
                      title="آخرین بروزرسانی:"
                      text={updatedAt.slice(0, 10)}
                    />
                    <CourseDetailBox
                      icon="ContactSupport"
                      title="روش پشتیبانی:"
                      text={courseDetails.support}
                    />
                    <CourseDetailBox
                      icon="HelpCenter"
                      title="پیش نیاز:"
                      text="HTML, CSS"
                    />
                    <CourseDetailBox
                      icon="Play"
                      title="نوع مشاهده:"
                      text="دانلودی / آنلاین"
                    />
                  </div>
                </div>

                {/* Finish Course Boxes  */}

                {/* Start Course Progress Bar  */}

                <div className="w-full my-12">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-xl font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-slate-100 shadow-xl">
                          درصد پیشرفت دوره: 75%
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-semibold inline-block text-teal-600 shadow-lg bg-slate-100 py-1 px-2 rounded-full">
                          100%
                        </span>
                      </div>
                    </div>
                    <div className="flex rounded-full bg-slate-100 shadow-xl">
                      <div className="rounded-full text-center text-xl text-white bg-primary w-3/4">
                        75%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Finish Course Progress Bar  */}

                {/* Start Introduction */}

                <div className="p-12 rounded-lg shadow-lg">
                  <div>
                    <span className="title">
                      آموزش 20 کتابخانه جاوا اسکریپت مخصوص بازار کار
                    </span>
                    <img
                      src="/images/info/1.gif"
                      alt="course info image"
                      className="block w-full mt-12 rounded-2xl"
                    />
                    <p className="mt-8 text-[#7a7a7a] text-2xl">
                      کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد
                      و سالانه چندین کتابخانه جدید نیز به این لیست اضافه می شود
                      که در بازار کار به شدت از آن ها استفاده می شود و اگر بدون
                      بلد بودن این کتابخانه ها وارد بازار کار شوید، خیلی اذیت
                      خواهید شد و حتی ممکن است ناامید شوید!
                    </p>
                    <p className="mt-8 text-[#7a7a7a] text-2xl">
                      در این دوره نحوه کار با 20 مورد از پر استفاده ترین
                      کتابخانه های جاوا اسکریپت به صورت پروژه محور به شما عزیزان
                      آموزش داده می شود تا هیچ مشکلی برای ورود به بازار کار
                      نداشته باشید
                    </p>
                  </div>
                  <div className="mt-16">
                    <span className="title">
                      هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب
                      درآمد)
                    </span>
                    <img
                      src="/images/info/2.jpg"
                      alt="course info image"
                      className="block w-full mt-12 rounded-2xl"
                    />
                    <p className="mt-8 text-[#7a7a7a] text-2xl">
                      وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم،
                      از کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در
                      حالی که من اولین بارم بود اسم Formik را می شنیدم و تا اون
                      موقع از این کتابخانه ها استفاده نکرده بودم.
                    </p>
                    <p className="mt-8 text-[#7a7a7a] text-2xl">
                      همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از
                      مهم ترین مباحثی هستند که هر برنامه نویس وب برای ورود به
                      بازار کار و کسب درآمد بهتر، راحت و بیشتر باید با آن ها کار
                      کرده باشد{" "}
                    </p>
                    <p className="mt-8 text-[#7a7a7a] text-2xl">
                      همان طور که از اسم این دوره مشخص است، هدف از این دوره
                      آموزش 20 مورد از کاربردی ترین و پر استفاده ترین کتابخانه
                      های جاوا اسکریپت است تا شما بتوانید بعد از این دوره با
                      قدرت و آمادگی بیشتر ادامه مسیر برنامه نویسی وب را ادامه
                      دهید، ری اکت یا نود یا … را راحت تر یاد بگیرید و در نهایت
                      وارد بازار کار شده و کسب درآمد کنید.
                    </p>
                    <p className="mt-8 text-[#7a7a7a] text-2xl">
                      شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی
                      کار نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه
                      جدید را یاد بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد.
                      آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه.
                    </p>
                    <p className="mt-8 text-[#7a7a7a] text-2xl">
                      در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه،
                      نحوه یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش
                      دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ دوره یا شخص
                      خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و
                      وب اضافه شد، به راحتی بتوانید آن را یاد بگیرید.
                    </p>
                  </div>
                  <div className="mt-16">
                    <a
                      href="#"
                      className="text-primary border-2 border-solid border-primary rounded-lg py-3 px-6 font-bold text-2xl m-2 hover:text-white hover:bg-primary"
                    >
                      دانلود همگانی ویدیوها
                    </a>
                    <a
                      href="#"
                      className="text-primary border-2 border-solid border-primary rounded-lg py-3 px-6 font-bold text-2xl m-2 hover:text-white hover:bg-primary"
                    >
                      دانلود همگانی پیوست‌ها
                    </a>
                  </div>

                  <div className="mt-16">
                    <Accordion
                      courseName={courseName}
                      sessions={sessions}
                      access={userAccessability}
                    />
                  </div>
                </div>

                {/* Finish Introduction */}

                {/* Start Teacher Details */}

                <div className="rounded-lg p-8 mt-8 shadow-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <img
                        src="/images/info/teacher.jfif"
                        alt="Teacher Profile"
                        className="w-20 h-auto rounded-[50%] shadow-lg"
                      />
                      <div className="flex flex-col">
                        <a href="#" className="text-[#7b868a]">
                          {courseTeacher.name}
                        </a>
                        <span className="text-[#7b868a] text-xl">
                          Front End & Back End Developer
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-white bg-primary py-2 px-4 rounded-lg">
                      <RecordVoiceOverIcon className="!text-3xl" />
                      <span className="text-2xl font-bold mr-2">مدرس</span>
                    </div>
                  </div>
                  <p className="mt-4 text-[#7b868a] text-2xl">
                    اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2
                    سال با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در
                    زمینه وب فعالیت داشته باشم.و..
                  </p>
                </div>

                {/* Finish Teacher Details */}

                <CommentsTextArea
                  comments={comments}
                  submitCommentHandler={submitCommentHandler}
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="sticky top-8">
                <div className="rounded-lg mt-4 p-9 shadow-lg border border-solid border-[#f2f2f2]">
                  {courseDetails.isUserRegisteredToThisCourse ? (
                    <div className="text-center bg-[#1fbd50] py-6 px-4 rounded-lg shadow-lg cursor-pointer">
                      <span className="text-3xl text-white font-bold">
                        <SchoolIcon className="!text-3xl" />
                        دانشجوی دوره هستید
                      </span>
                    </div>
                  ) : (
                    <div
                      className="text-center bg-red-600 py-6 px-4 rounded-lg shadow-lg cursor-pointer"
                      onClick={() => registerInCourse(courseDetails)}
                    >
                      <span className="text-3xl text-white font-bold">
                        ثبت نام در دوره
                      </span>
                    </div>
                  )}
                </div>
                <div className="rounded-lg mt-4 p-9 shadow-lg border border-solid border-[#f2f2f2]">
                  <div className="course-info__total">
                    <div className="flex justify-center items-center p-6 rounded-2xl border-2 border-solid border-[#f0f2f7]">
                      <div className="flex justify-center items-center gap-2">
                        <SchoolIcon className="text-[#555555] !text-[2.7rem]" />
                        <span className="text-[#7f8187]">تعداد دانشجو :</span>
                        <span className="text-white bg-[#c4c7cf] rounded-lg py-2 px-5">
                          {courseDetails.courseStudentsCount}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-evenly pt-8 text-[#7b868a]">
                      <div className="relative flex items-center gap-2">
                        <CommentIcon className="!text-4xl" />
                        <span className="text-2xl mt-4">67 دیدگاه</span>
                      </div>
                      <div className="relative flex items-center gap-2">
                        <VisibilityIcon className="!text-4xl" />
                        <span className="text-2xl mt-4">14,234 بازدید</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg mt-4 p-9 shadow-lg border border-solid border-[#f2f2f2]">
                  <div className="flex items-center text-[#7b868a]">
                    <LinkIcon className="!text-3xl" />
                    <span className="text-3xl mr-2">لینک کوتاه</span>
                  </div>
                  <span className="block my-4 border border-solid border-[#dcdcdc] text-[#a7a7a7] rounded-lg py-2 px-4 text-2xl">
                    https://sabzlearn.ir/?p=117472
                  </span>
                </div>
                <div className="rounded-lg space-y-4 mt-4 p-9 shadow-lg border border-solid border-[#f2f2f2]">
                  <span className="block text-darkColor text-3xl">
                    سرفصل های دوره
                  </span>
                  <span className="text-2xl text-[#707e7f] flex">
                    برای مشاهده و یا دانلود دوره روی کلمه‌
                    <a href="#" className=" text-blue-600 font-bold px-2">
                      لینک
                    </a>
                    کلیک کنید
                  </span>
                </div>
                <div className="rounded-lg mt-4 p-9 shadow-lg border border-solid border-[#f2f2f2]">
                  <span className="text-3xl block text-darkColor mb-6">
                    دوره های مرتبط
                  </span>
                  <ul className="space-y-8">
                    {relatedCourses.map((course) => (
                      <li className="" key={course._id}>
                        <Link
                          to={`/course-info/${course.shortName}`}
                          className="flex items-center"
                        >
                          <img
                            src={`/images/courses/${course.cover}`}
                            alt="Course Cover"
                            className="w-40 rounded-lg"
                          />
                          <span className="text-2xl mr-2 text-[#8d8d8d] font-bold">
                            {course.name}
                          </span>
                        </Link>
                      </li>
                    ))}
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

export default CourseInfo;
