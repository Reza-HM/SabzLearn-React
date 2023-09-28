import React, { useEffect } from "react";
import Header from "./../../components/Header/Header";  
import Footer from "./../../components/Footer/Footer";
import Input from "../../components/Form/Input";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../Validators/rules";

import "./Contact.css";
import useForm from "../../Hooks/useForm";
import Button from "../../components/Button/Button";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [inputHandler, formState] = useForm({
    name: {
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
    body: {
      value: "",
      isValid: false,
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addNewContact = async (event) => {
    event.preventDefault();

    let newContactInfos = {
      name: formState.inputs.name.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      body: formState.inputs.body.value,
    };

    const res = await fetch("http://localhost:4000/v1/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContactInfos),
    });

    const result = await res.json();

    if (res.ok) {
      console.log(result);
      swal({
        title: "پیام شما با موفقیت ارسال شد.",
        icon: "success",
        buttons: "خیلی هم عالی",
      }).then((value) => {
        console.log(value);
        navigate("/");
      });
    } else {
      swal({
        title: "پیام شما ارسال نشد؛ مجددا تلاش کنید.",
        icon: "error",
        buttons: "متوجه شدم",
      });
    }
  };

  return (
    <>
      <Header />
      <section className="login-register">
        <div className="flex flex-col items-center my-16 pt-10 pb-20 px-8 bg-white shadow-lg rounded-lg w-[50rem] border-4 border-solid border-primary">
          <span className="block text-[#7b868a] text-4xl">ارتباط با ما</span>
          <span className="block text-[#7b868a] text-2xl my-2">
            نظر یا انتقادتو بنویس برامون :)
          </span>
          <form action="#" className="w-full">
            <div className="relative">
              <Input
                element="input"
                id="name"
                className="w-full border border-solid border-[#e6e6e6] py-4 px-5 shadow-lg my-3 mx-0 rounded-md text-2xl"
                type="text"
                placeholder="نام و نام خانوادگی"
                validations={[
                  requiredValidator(),
                  minValidator(6),
                  maxValidator(20),
                ]}
                inputHandler={inputHandler}
              />
              <PersonIcon className="absolute left-6 top-8 !text-4xl text-[#ccc]" />
            </div>
            <div className="relative">
              <Input
                element="input"
                id="email"
                className="w-full border border-solid border-[#e6e6e6] py-4 px-5 shadow-lg my-3 mx-0 rounded-md text-2xl"
                type="text"
                placeholder="آدرس ایمیل"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(40),
                  emailValidator(),
                ]}
                inputHandler={inputHandler}
              />
              <EmailIcon className="absolute left-6 top-8 !text-4xl text-[#ccc]" />
            </div>
            <div className="relative">
              <Input
                element="input"
                id="phone"
                className="w-full border border-solid border-[#e6e6e6] py-4 px-5 shadow-lg my-3 mx-0 rounded-md text-2xl"
                type="text"
                placeholder="شماره تماس"
                validations={[
                  requiredValidator(),
                  minValidator(10),
                  maxValidator(11),
                ]}
                inputHandler={inputHandler}
              />
              <PhoneIcon className="absolute left-6 top-8 !text-4xl text-[#ccc]" />
            </div>
            <div className="relative">
              <Input
                element="textarea"
                id="body"
                className="w-full border border-solid border-[#e6e6e6] py-4 px-5 shadow-lg rounded-md text-2xl h-32"
                placeholder="متن خود را وارد کنید"
                validations={[requiredValidator(), minValidator(10)]}
                inputHandler={inputHandler}
              />
            </div>
            <Button
              className={`w-full rounded-md py-5 px-0 mt-3 flex items-center ${
                formState.isFormValid === true ? "bg-primary" : "bg-red-600"
              }`}
              type="submit"
              onClick={addNewContact}
              disabled={!formState.isFormValid}
            >
              <span className="text-white my-0 mx-auto">ارسال</span>
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
