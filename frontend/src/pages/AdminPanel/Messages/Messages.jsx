import React, { useEffect, useState } from "react";
import DataTable from "./../../../components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

const Messages = () => {
  const [messagesData, setMessagesData] = useState([]);

  useEffect(() => {
    getAllMessages();
  }, []);

  async function getAllMessages() {
    const res = await fetch("https://sabzlearnreactserver.iran.liara.run:4000/v1/contact");
    const messages = await res.json();
    console.log(messages);
    setMessagesData(messages);
  }

  const showMessage = (messageBody) => {
    swal({
      title: messageBody,
      icon: "success",
      buttons: "اوکی",
    });
  };

  const sendAnswerToUsers = (messageEmail) => {
    swal({
      title: "متن پاسخ را وارد کنید:",
      content: "input",
      buttons: "ارسال ایمیل",
    }).then(async (value) => {
      const localStorageData = JSON.parse(localStorage.getItem("user"));
      console.log(value);
      const res = await fetch("https://sabzlearnreactserver.iran.liara.run:4000/v1/contact/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: JSON.stringify({
          email: messageEmail,
          answer: value,
        }),
      });
      const answerResult = await res.json();

      if (res.ok) {
        console.log(answerResult);
        swal({
          title: "پیام مورد نظر با موفقیت پاسخ داده شد",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          getAllMessages();
        });
      }
    });
  };

  const removeMessage = (messageID) => {
    swal({
      title: "آیا از حذف پیام اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        const res = await fetch(
          `https://sabzlearnreactserver.iran.liara.run:4000/v1/contact/${messageID}`,
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
          getAllMessages();
        }
      }
    });
  };

  return (
    <DataTable title="پیام ها">
      <table className="my-10 w-full bg-white rounded-2xl overflow-hidden shadow-lg">
        <thead>
          <tr className="text-center">
            <th className="p-5">شناسه</th>
            <th className="p-5">نام فرستنده</th>
            <th className="p-5">شماره فرستنده</th>
            <th className="p-5">ایمیل فرستنده</th>
            <th className="p-5">مشاهده پیام</th>
            <th className="p-5">پاسخ به پیام</th>
            <th className="p-5">حذف</th>
          </tr>
        </thead>
        <tbody>
          {messagesData.map((message, index) => (
            <tr className="text-center" key={message._id}>
              <td
                className={`p-5 text-white ${
                  message.answer === 1 ? "!bg-green-600" : "!bg-red-600"
                }`}
              >
                {index + 1}
              </td>
              <td className="p-5">{message.name}</td>
              <td className="p-5">{message.phone}</td>
              <td className="p-5">{message.email}</td>
              <td className="p-5">
                <button
                  type="button"
                  className="rounded-lg py-4 px-8 bg-blue-600 text-white !text-2xl hover:bg-blue-400 !transition-all !duration-300 !ease-linear edit-btn"
                  onClick={() => showMessage(message.body)}
                >
                  مشاهده
                </button>
              </td>
              <td className="p-5">
                <button
                  type="button"
                  className="rounded-lg py-4 px-8 bg-blue-600 text-white !text-2xl hover:bg-blue-400 !transition-all !duration-300 !ease-linear edit-btn"
                  onClick={() => sendAnswerToUsers(message.email)}
                >
                  پاسخ
                </button>
              </td>
              <td className="p-5">
                <button
                  type="button"
                  className="rounded-lg py-4 px-8 bg-red-600 text-white !text-2xl hover:bg-red-400 !transition-all !duration-300 !ease-linear delete-btn"
                  onClick={() => {
                    removeMessage(message._id);
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
  );
};

export default Messages;
