import React from "react";
import FooterItem from "../FooterItem/FooterItem";
import { Link } from "react-router-dom";
import Input from "./../../components/Form/Input";
import { emailValidator } from "../../Validators/rules";
import useForm from "../../Hooks/useForm";
import swal from "sweetalert";

export default function Footer() {
  const [InputHandler, formState] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const addNewEmail = async (event) => {
    event.preventDefault();

    const newsLetterInfos = {
      email: formState.inputs.email.value,
    };

    const res = await fetch("https://sabzlearnreactserver.iran.liara.run:4000/v1/newsletters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newsLetterInfos),
    });

    const result = await res.json();

    if (res.ok) {
      console.log(result);
      swal({
        title: "شما با موفقیت در خبرنامه عضو شدید.",
        icon: "success",
        buttons: "خیلی هم عالی!",
      }).then((value) => {
        console.log(value);
        history.go(0);
      });
    } else {
      swal({
        title: "لطفا مجددا برای عضویت تلاش کنید.",
        icon: "error",
        buttons: "اعه!",
      });
    }
  };

  return (
    <footer>
      <div className="container">
        <div className="bg-[#f0f2f7] rounded-2xl py-16 px-14 relative mb-20 before:absolute before:right-0 before:left-0 before:mx-auto before:h-16 before:w-[50rem] before:bg-primary before:z-[-1] before:bottom-[-1.5rem] before:rounded-[5rem]">
          <div className="flex flex-wrap justify-center gap-8">
            <FooterItem title="درباره ما">
              <p className="text-[#7d7e7f]">
                وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که
                در فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل
                قبول بود که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی و
                فنی قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم!
                و خب امروز آکادمی آموزش برنامه نویسی سبزلرن به عنوان یک آکادمی
                خصوصی فعالیت میکنه و این به این معنی هست که هر مدرسی اجازه تدریس
                در اون رو نداره و باید از فیلترینگ های خاص آکادمی سبزلرن رد شه!
                این به این معنی هست که ما برامون فن بیان و نحوه تعامل مدرس با
                دانشجو بسیار مهمه! ما در آکادمی سبزلرن تضمین پشتیبانی خوب و با
                کیفیت رو به شما میدیم . چرا که مدرسین وب سایت سبزلرن حتی برای
                پشتیبانی دوره های رایگان شون هم هزینه دریافت میکنند و متعهد
                هستند که هوای کاربر های عزیز رو داشته باشند !
              </p>
            </FooterItem>

            <FooterItem title="آخرین مطالب">
              <div className="flex flex-col">
                <a href="#" className="block mb-4">
                  نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                </a>
                <a href="#" className="block mb-4">
                  چگونه پایتون را آپدیت کنیم؟ | آموزش صفر تا صد آپدیت کردن
                  پایتون
                </a>
                <a href="#" className="block mb-4">
                  آموزش نصب پایتون ( Python ) در در مک، ویندوز و لینوکس | گام به
                  گام و تصویری
                </a>
                <a href="#" className="block mb-4">
                  بهترین فریم ورک های فرانت اند | 16 فریم ورک Front end بررسی
                  معایب و مزایا
                </a>
                <a href="#" className="block mb-4">
                  معرفی بهترین سایت آموزش جاوا اسکریپت [تجربه محور] + آموزش
                  رایگان
                </a>
              </div>
            </FooterItem>

            <FooterItem title="دسترسی سریع">
              <div className="grid sm:grid-cols-1 lg:grid-cols-2 ">
                <div>
                  <a href="#" className="block mb-4">
                    آموزش HTML
                  </a>
                </div>

                <div>
                  <a href="#" className="block mb-4">
                    آموزش CSS
                  </a>
                </div>

                <div>
                  <a href="#" className="block mb-4">
                    آموزش جاوا اسکریپت
                  </a>
                </div>
                <div>
                  <a href="#" className="block mb-4">
                    آموزش بوت استرپ
                  </a>
                </div>
                <div>
                  <a href="#" className="block mb-4">
                    آموزش ریکت
                  </a>
                </div>

                <div>
                  <a href="#" className="block mb-4">
                    آموزش پایتون
                  </a>
                </div>

                <div className="">
                  <Link
                    to="/contact"
                    className="block mb-4 !text-3xl text-primary"
                  >
                    ارتباط با ما
                  </Link>
                </div>
              </div>
              <div className="w-full mt-6">
                <span className="block font-bold text-3xl mb-8 relative before:absolute before:w-[3.5rem] before:h-[3.5rem] before:bg-primary before:rounded-xl before:right-4 before:opacity-30 before:rotate-45">
                  اشتراک در خبرنامه
                </span>
                <span className="text-[#7d7e7f] text-center d-block">
                  جهت اطلاع از آخرین اخبار و تخفیف های سایت مشترک شوید!
                </span>
                <form
                  action="#"
                  className="flex items-center justify-center mt-8 w-full"
                >
                  <div className="w-full relative">
                    <Input
                      element="input"
                      id="email"
                      type="text"
                      className=" w-full h-14 border border-solid border-[#b8b8b8] rounded-md px-4 text-2xl"
                      placeholder="ایمیل خود را وارد کنید."
                      inputHandler={InputHandler}
                      validations={[emailValidator()]}
                    />
                    <button
                      type="submit"
                      className={`bg-[#7d7e7f] rounded-e-md text-white text-xl h-14 py-0 px-4 absolute left-0 top-0 transition-all duration-300 ease-in-out ${
                        formState.isFormValid === true
                          ? "!bg-primary"
                          : "!bg-red-600"
                      }`}
                      disabled={!formState.isFormValid}
                      onClick={addNewEmail}
                    >
                      عضویت
                    </button>
                  </div>
                </form>
              </div>
            </FooterItem>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center py-12 bg-[#f0f2f7]">
        <span className="font-bold text-darkColor">
          کلیه حقوق برای آکادمی آموزش برنامه نویسی سبز لرن محفوظ است.
        </span>
      </div>
    </footer>
  );
}
