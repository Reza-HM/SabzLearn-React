import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Input from "../../components/Form/Input";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import Button from "../../components/Button/Button";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../Validators/rules";
import useForm from "../../Hooks/useForm";
import AuthContext from "../../contexts/authContext";
import { useContext } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Header from "./../../components/Header/Header";

const Register = () => {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  console.log(authContext);

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
      phone: {
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

    const res = await fetch(`http://localhost:4000/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfos),
    });

    const result = await res.json();

    if (res.ok) {
      swal({
        title: "ثبت نام شما با موفقیت انجام شد",
        icon: "success",
        buttons: "ورود به پنل",
      }).then(() => {
        navigate("/");
        authContext.login(result.user, result.accessToken);
      });
    } else {
      if (res.status === 403) {
        swal({
          title: "این شماره تماس مسدود شده است.",
          icon: "error",
          buttons: "متوجه شدم",
        });
      }
    }
  };

  return (
    <>
      <Header />
      <section className="login-register flex items-center relative overflow-hidden">
        <div className="flex flex-col items-center my-16 pt-10 pb-20 px-8 bg-white shadow-lg rounded-lg w-[50rem] mx-auto border-b-4 border-solid border-primary">
          <span className="block text-[#7b868a] text-4xl">
            ساخت حساب کاربری
          </span>
          <span className="block text-[#7b868a] text-2xl">
            خوشحالیم قراره به جمع ما بپیوندی
          </span>
          <div className="bg-[#f0f2f7] my-6 rounded-lg w-full flex items-center justify-center py-6">
            <span className="text-[#7b868a] text-2xl">
              قبلا ثبت‌نام کرده‌اید؟{" "}
            </span>
            <Link
              className="bg-[#a8aaaf] text-white text-xl mr-2 rounded-lg py-2 px-4"
              to="/login"
            >
              وارد شوید
            </Link>
          </div>
          <form action="#" className="w-full max-w-lg mx-auto">
            <div className="mb-4">
              <label
                for="name"
                className="block text-lg font-medium text-gray-700"
              >
                نام و خانوادگی
              </label>
              <div className="relative">
                <Input
                  className="w-[30rem] px-12 py-4 mt-2 border rounded-lg text-2xl placeholder-gray-400 "
                  placeholder="نام و خانوادگی"
                  type="text"
                  element="input"
                  id="name"
                  inputHandler={inputHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(25),
                  ]}
                />
                <FamilyRestroomIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
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
                  placeholder="نام کاربری"
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
                for="email"
                className="block text-lg font-medium text-gray-700"
              >
                آدرس ایمیل
              </label>
              <div className="relative">
                <Input
                  className="w-[30rem] px-12 py-4 mt-2 border rounded-lg text-2xl placeholder-gray-400 "
                  placeholder="آدرس ایمیل"
                  type="email"
                  element="input"
                  id="email"
                  inputHandler={inputHandler}
                  validations={[requiredValidator(), emailValidator()]}
                />
                <EmailIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                for="phone"
                className="block text-lg font-medium text-gray-700"
              >
                شماره تلفن
              </label>
              <div className="relative">
                <Input
                  className="w-[30rem] px-12 py-4 mt-2 border rounded-lg text-2xl placeholder-gray-400 "
                  placeholder="شماره تلفن"
                  type="text"
                  element="input"
                  id="phone"
                  inputHandler={inputHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(11),
                    maxValidator(11),
                  ]}
                />
                <PhoneAndroidIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
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
                  className="w-[30rem] px-12 mt-2 text-xl py-4 border rounded-lg placeholder-gray-400 "
                  type="password"
                  placeholder="رمز عبور"
                  element="input"
                  id="password"
                  inputHandler={inputHandler}
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                  ]}
                />
                <LockOpenIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <Button
                className={`w-[30rem] px-4 py-2 text-white rounded-lg focus:outline-none focus:ring ${
                  !formState.isFormValid ? "bg-red-600" : "bg-primary"
                }`}
                type="submit"
                onClick={registerNewUser}
                disabled={!formState.isFormValid}
              >
                <PersonAddAltIcon className="!text-xl" />
                <span className="mr-2 !text-xl">عضویت</span>
              </Button>
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

export default Register;
