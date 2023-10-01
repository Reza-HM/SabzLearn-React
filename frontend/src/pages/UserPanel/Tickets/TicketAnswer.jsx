import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MicIcon from "@mui/icons-material/Mic";
import PushPinIcon from "@mui/icons-material/PushPin";
import BarChartIcon from "@mui/icons-material/BarChart";
import AddIcon from "@mui/icons-material/Add";

import "./TicketAnswer.css";

export default function TicketAnswer() {
  const { id } = useParams();
  const [ticketInfo, setTicketInfo] = useState({});
  const [ticketAnswer, setTicketAnswer] = useState({});

  useEffect(() => {
    fetch(`https://sabzlearnreactserver.iran.liara.run:4000/v1/tickets/answer/${id}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTicketInfo(data);
      });

    fetch(`https://sabzlearnreactserver.iran.liara.run:4000/v1/tickets/answer/${id}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTicketAnswer(data);
      });
  }, []);

  return (
    <div className="flex-[4]">
      <div className="ticket">
        <div className="ticket-header">
          <span className="ticket-header__title">پاسخ به تیکت ها</span>
          <Link className="ticket-header__link" to="/my-account/send-ticket">
            ارسال تیکت جدید
          </Link>
        </div>
        <div className="ticket-top">
          <div className="ticket-top__right">
            <Link className="ticket-top__link" to="/my-account/tickets">
              <ChevronRightIcon className="ticket-top__icon !text-3xl" />
            </Link>
          </div>
          <div className="ticket-top__left">
            <span className="ticket-top__title">تیکت تست</span>
            <span className="ticket-top__text">شناسه تیکت : 2070</span>
          </div>
        </div>
        <div className="ticket-send">
          <div className="ticket-send__header">
            <div className="ticket-send__header-right">
              <div className="ticket-send__header-mic">
                <MicIcon className="ticket-send__header-icon !text-3xl " />
                <span className="ticket-send__header-text">0</span>
              </div>
              <div className="ticket-send__header-pin">
                <PushPinIcon className="ticket-send__header-icon !text-3xl " />
                <span className="ticket-send__header-text">0</span>
              </div>
            </div>
            <div className="ticket-send__header-left">
              <BarChartIcon className="ticket-send__header-icon- !text-3xl " />
              <i className="fa fa-bars "></i>
            </div>
          </div>
          <div className="ticket-send__title">
            <span className="ticket-send__title-text">
              <AddIcon className="ticket-send__title-icon !text-3xl" />
              ارسال پاسخ
            </span>
          </div>
          <div className="ticket-send__answer">
            <div className="ticket-send__answer-box">
              <p className="ticket-send__answer-text">{ticketInfo.ticket}</p>
            </div>
            <div className="ticket-send__answer-bottom">
              <span className="ticket-send__answer-name ticket-send__answer-span">
                محمد امین سعیدی راد
              </span>
              <span className="ticket-send__answer-date ticket-send__answer-span">
                2022-11-29
              </span>
              <span className="ticket-send__answer-time ticket-send__answer-span">
                14:28
              </span>
            </div>
          </div>
          <div className="ticket-send__title">
            <span className="ticket-send__title-text">
              <AddIcon className="ticket-send__title-icon !text-3xl" />
              پاسخ ها
            </span>
          </div>

          {ticketInfo.answer === null ? (
            <div
              className="bg-red-100 rounded-lg border border-b border-red-500 text-red-700 px-4 py-3 w-full"
              role="alert"
            >
              <span className="block sm:inline">پاسخی وجود ندارد.</span>
            </div>
          ) : (
            <div className="ticket-send__answer-user">
              <div className="ticket-send__answer-user-box">
                <p className="ticket-send__answer-user-text">
                  {ticketAnswer.answer}
                </p>
              </div>
              <div className="ticket-send__answer-user-bottom">
                <span className="ticket-send__answer-user-name ticket-send__answer-user-span">
                  محمد امین سعیدی راد
                </span>
                <span className="ticket-send__answer-user-date ticket-send__answer-user-span">
                  2022-11-29
                </span>
                <span className="ticket-send__answer-user-time ticket-send__answer-user-span">
                  14:28
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
