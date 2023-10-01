import React, { useEffect, useState } from "react";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

export default function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getAllComments();
  }, []);

  function getAllComments() {
    fetch("https://sabzlearnreactserver.iran.liara.run:4000/v1/comments")
      .then((res) => res.json())
      .then((allComments) => setComments(allComments));
  }

  const seeComment = (commentBody) => {
    swal({
      title: commentBody,
      icon: "success",
      buttons: "دیدم",
    });
  };

  const removeComment = (commentID) => {
    swal({
      title: "آیا از حذف کامنت اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        const res = await fetch(
          `https://sabzlearnreactserver.iran.liara.run:4000/v1/comments/${commentID}`,
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
          getAllComments();
        }
      }
    });
  };

  const banUser = (commentID) => {
    swal({
      title: "آیا از بن کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        const res = await fetch(
          `https://sabzlearnreactserver.iran.liara.run:4000/v1/users/ban/${commentID}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorageData.token}`,
            },
          }
        );

        if (res.ok) {
          swal({
            title: "کاربر مورد نظر با موفقیت بن شد.",
            icon: "success",
            buttons: "اوکی",
          }).then(() => {
            getAllComments();
          });
        }
      }
    });
  };

  const answerComment = (commentID) => {
    swal({
      title: "پاسخ مورد نظر را وارد کنید:",
      content: "input",
      buttons: "ثبت پاسخ",
    }).then(async (value) => {
      const res = await fetch(
        `https://sabzlearnreactserver.iran.liara.run:4000/v1/comments/answer/${commentID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
          body: JSON.stringify({
            body: value,
          }),
        }
      );
      if (res.ok) {
        swal({
          title: "پاسخ کامنت با موفقیت ثبت شد",
          icon: "success",
          buttons: "OK",
        }).then(() => {
          getAllComments();
        });
      }
    });
  };

  const confirmComment = (commentID) => {
    swal({
      title: "آیا از تایید کامنت اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        const res = await fetch(
          `https://sabzlearnreactserver.iran.liara.run:4000/v1/comments/accept/${commentID}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorageData.token}`,
            },
          }
        );

        const removeResult = await res.json();

        if (res.ok) {
          console.log(removeResult);
          swal({
            title: "کامنت مورد نظر با موفقیت تایید شد.",
            icon: "success",
            buttons: "OK",
          }).then(() => {
            getAllComments();
          });
        }
      }
    });
  };

  const rejectComment = (commentID) => {
    swal({
      title: "آیا از رد کامنت اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        const res = await fetch(
          `https://sabzlearnreactserver.iran.liara.run:4000/v1/comments/reject/${commentID}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorageData.token}`,
            },
          }
        );

        const removeResult = await res.json();

        if (res.ok) {
          console.log(removeResult);
          swal({
            title: "کامنت مورد نظر با موفقیت رد شد.",
            icon: "success",
            buttons: "OK",
          }).then(() => {
            getAllComments();
          });
        }
      }
    });
  };

  return (
    <>
      <DataTable title="کامنت ها">
        <table className="my-10 w-full bg-white rounded-2xl overflow-hidden shadow-lg">
          <thead>
            <tr className="text-center">
              <th className="p-5">شناسه</th>
              <th className="p-5">کامنت دهنده</th>
              <th className="p-5">امتیاز</th>
              <th className="p-5">دوره مربوطه</th>
              <th className="p-5">متن کامنت</th>
              <th className="p-5">پاسخ به کامنت</th>
              <th className="p-5">تایید کامنت</th>
              <th className="p-5">حذف</th>
              <th className="p-5">بن</th>
            </tr>
          </thead>
          <tbody>
            {comments
              .slice()
              .reverse()
              .map((comment, index) => (
                <tr className="text-center" key={comment._id}>
                  <td
                    className={`p-5 text-white ${
                      comment.answer === 0 ? "bg-red-600" : "bg-green-600"
                    }`}
                  >
                    {index + 1}
                  </td>
                  <td className="p-5">{comment.creator.name}</td>
                  <td className="p-5 flex">
                    {Array(5 - comment.score)
                      .fill(0)
                      .map((item) => (
                        <img src="/images/svgs/star.svg" alt="score" />
                      ))}
                    {Array(comment.score)
                      .fill(0)
                      .map((item) => (
                        <img src="/images/svgs/star_fill.svg" alt="score" />
                      ))}
                  </td>
                  <td className="p-5">{comment.course}</td>
                  <td className="p-5">
                    <button
                      type="button"
                      className="rounded-lg py-4 px-8 bg-blue-600 text-white !text-2xl hover:bg-blue-400 !transition-all !duration-300 !ease-linear edit-btn"
                      onClick={() => seeComment(comment.body)}
                    >
                      مشاهده
                    </button>
                  </td>
                  <td className="p-5">
                    <button
                      type="button"
                      className="rounded-lg py-4 px-8 bg-blue-600 text-white !text-2xl hover:bg-blue-400 !transition-all !duration-300 !ease-linear edit-btn"
                      onClick={() => {
                        answerComment(comment._id);
                      }}
                    >
                      پاسخ
                    </button>
                  </td>
                  <td className="p-5">
                    {comment.answer === 1 ? (
                      <button
                        type="button"
                        className="rounded-lg py-4 px-8 bg-red-600 text-white !text-2xl hover:bg-red-400 !transition-all !duration-300 !ease-linear delete-btn"
                        onClick={() => {
                          rejectComment(comment._id);
                        }}
                      >
                        رد
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="rounded-lg py-4 px-8 bg-blue-600 text-white !text-2xl hover:bg-blue-400 !transition-all !duration-300 !ease-linear edit-btn"
                        onClick={() => {
                          confirmComment(comment._id);
                        }}
                      >
                        تایید
                      </button>
                    )}
                  </td>
                  <td className="p-5">
                    <button
                      type="button"
                      className="rounded-lg py-4 px-8 bg-red-600 text-white !text-2xl hover:bg-red-400 !transition-all !duration-300 !ease-linear delete-btn"
                      onClick={() => {
                        removeComment(comment._id);
                      }}
                    >
                      حذف
                    </button>
                  </td>
                  <td className="p-5">
                    <button
                      type="button"
                      className="rounded-lg py-4 px-8 bg-red-600 text-white !text-2xl hover:bg-red-400 !transition-all !duration-300 !ease-linear delete-btn"
                      onClick={() => {
                        banUser(comment._id);
                      }}
                    >
                      بن
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
