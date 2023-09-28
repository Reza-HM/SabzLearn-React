import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getAllTickets();
  }, []);

  function getAllTickets() {
    fetch(`http://localhost:4000/v1/tickets`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTickets(data);
      });
  }

  const showTicket = (ticketBody) => {
    swal({
      title: ticketBody,
      icon: "success",
      buttons: "دیدم",
    });
  };

  const answerToTicket = (ticketID) => {
    swal({
      title: "متن پاسخ را وارد کنید:",
      content: "input",
      buttons: "ارسال پاسخ",
    }).then(async (value) => {
      const localStorageData = JSON.parse(localStorage.getItem("user"));

      const ticketAnswerInfos = {
        body: value,
        ticketID: ticketID,
      };

      const res = await fetch(`http://localhost:4000/v1/tickets/answer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketAnswerInfos),
      });

      const result = await res.json();

      if (res.ok) {
        console.log(result);
        swal({
          title: "تیکت مورد نظر با موفقیت پاسخ داده شد",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          getAllTickets();
        });
      }
    });
  };

  return (
    <>
      <DataTable title="تیکت‌ها">
        <table className="my-10 w-full bg-white rounded-2xl overflow-hidden shadow-lg">
          <thead>
            <tr className="text-center">
              <th className="p-5">شناسه</th>
              <th className="p-5">کاربر</th>
              <th className="p-5">عنوان</th>
              <th className="p-5">نوع تیکت</th>
              <th className="p-5">دوره</th>
              <th className="p-5">اولویت</th>
              <th className="p-5">مشاهده</th>
              <th className="p-5">پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {tickets
              .slice()
              .reverse()
              .map((ticket, index) => (
                <tr className="text-center" key={ticket._id}>
                  <td
                    className={`p-5 text-white ${
                      ticket.answer === 1 ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {index + 1}
                  </td>
                  <td className="p-5">{ticket.user}</td>
                  <td className="p-5">{ticket.title}</td>
                  <td className="p-5">{ticket.departmentSubID}</td>
                  <td className="p-5">
                    {ticket.course ? ticket.course : "---"}
                  </td>
                  <td>
                    {ticket.priority === 1 && "کم"}
                    {ticket.priority === 2 && "متوسط"}
                    {ticket.priority === 3 && "بالا"}
                  </td>
                  <td className="p-5">
                    <button
                      type="button"
                      className="rounded-lg py-4 px-8 bg-blue-600 text-white !text-2xl hover:bg-blue-400 !transition-all !duration-300 !ease-linear edit-btn"
                      onClick={() => showTicket(ticket.body)}
                    >
                      مشاهده
                    </button>
                  </td>
                  <td className="p-5">
                    <button
                      type="button"
                      className="rounded-lg py-4 px-8 bg-blue-600 text-white !text-2xl hover:bg-blue-400 !transition-all !duration-300 !ease-linear edit-btn"
                      onClick={() => {
                        answerToTicket(ticket._id);
                      }}
                    >
                      پاسخ
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
