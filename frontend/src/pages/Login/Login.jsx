import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Form/Input";
import PersonIcon from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Button from "../../components/Button/Button";
import {
  requiredValidator,
  minValidator,
  maxValidator,
} from "../../Validators/rules";
import useForm from "../../Hooks/useForm";
import AuthContext from "../../contexts/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ReCAPTCHA from "react-google-recaptcha";
import Header from "./../../components/Header/Header";

const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [isGoogleRecaptchaVerified, setIsGoogleRecaptchaVerified] =
    useState(false);

  const [inputHandler, formState] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loginUser = async (event) => {
    event.preventDefault();

    const userLoginInfos = {
      identifier: formState.inputs.username.value,
      password: formState.inputs.password.value,
    };

    const res = await fetch("http://localhost:4000/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLoginInfos),
    });

    const result = await res.json();

    if (res.ok) {
      swal({
        title: "ورود شما با موفقیت انجام شد",
        icon: "success",
        buttons: "ورود به پنل",
      }).then((value) => {
        navigate("/");
        authContext.login({}, result.accessToken);
      });
    } else {
      swal({
        title: "چنین کاربری وجود ندارد",
        icon: "error",
        buttons: "تلاش دوباره",
      });
    }

    console.log("Login User");
  };

  const onChangeHandler = () => {
    console.log("گوگل ری کپچا ران شد.");
    setIsGoogleRecaptchaVerified(true);
  };

  return (
    <>
      <Header />
      <section className="login-register flex items-center relative overflow-hidden">
        <div className="flex flex-col items-center my-16 pt-10 pb-20 px-8 bg-white shadow-lg rounded-lg w-[50rem] mx-auto border-b-4 border-solid border-primary">
          <span className="block text-[#7b868a] text-4xl">
            ورود به حساب کاربری
          </span>
          <span className="block text-[#7b868a] text-2xl">
            خوشحالیم دوباره میبینیمت دوست عزیز :)
          </span>
          <div className="bg-[#f0f2f7] my-6 rounded-lg w-full flex items-center justify-center py-6">
            <span className="text-[#7b868a] text-2xl">کاربر جدید هستید؟</span>
            <Link
              className="bg-[#a8aaaf] text-white text-xl mr-2 rounded-lg py-2 px-4"
              to="/register"
            >
              ثبت نام
            </Link>
          </div>
          <form action="#" className="w-full max-w-lg mx-auto">
            <div className="mb-4">
              <label
                for="username"
                className="block text-lg font-medium text-gray-700"
              >
                نام کاربری
              </label>
              <div className="relative">
                <Input
                  className="w-[30rem] px-12 py-4 mt-2 border rounded-lg text-2xl placeholder-gray-400 "
                  placeholder="نام کاربری یا آدرس ایمیل"
                  type="text"
                  element="input"
                  id="username"
                  inputHandler={inputHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(5),
                    maxValidator(20),
                  ]}
                />
                <PersonIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                for="password"
                className="block text-lg font-medium text-gray-700"
              >
                رمز عبور
              </label>
              <div className="relative">
                <Input
                  className="w-[30rem] px-12 py-4 mt-2 border rounded-lg text-2xl placeholder-gray-400 "
                  placeholder="رمز عبور"
                  type="password"
                  id="password"
                  element="input"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(18),
                  ]}
                  inputHandler={inputHandler}
                />
                <LockOpenIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={onChangeHandler}
              />
              ,
            </div>
            <div className="my-4">
              <Button
                className={`w-[30rem] px-4 py-2 text-white rounded-lg focus:outline-none focus:ring ${
                  !formState.isFormValid || !isGoogleRecaptchaVerified
                    ? "bg-red-600"
                    : "bg-primary"
                }`}
                type="submit"
                onClick={loginUser}
                disabled={!formState.isFormValid || !isGoogleRecaptchaVerified}
              >
                <ExitToAppIcon className=" !text-xl" />
                <span className="mr-2 !text-xl">ورود</span>
              </Button>
            </div>
            <div className="flex justify-between items-center max-w-lg">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  className="text-indigo-600 form-checkbox "
                  type="checkbox"
                />
                <span>مرا به خاطر داشته باش</span>
              </label>
              <a className="text-indigo-600 text-lg hover:underline" href="#">
                رمز عبور را فراموش کرده اید؟
              </a>
            </div>
          </form>

          <div className="mt-12 text-[#7b868a] text-xl w-full">
            <span className="">سلام کاربر محترم:</span>
            <ul className="list-disc mr-8 mt-4">
              <li className="">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li className="">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li className="">
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Login;
