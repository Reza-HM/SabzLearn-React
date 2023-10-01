import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link, useParams } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "./Session.css";

const Session = () => {
  const { courseName, sessionID } = useParams();
  const [session, setSession] = useState({});
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://sabzlearnreactserver.iran.liara.run:4000/v1/courses/${courseName}/${sessionID}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      const result = await res.json();
      console.log(result);
      setSession(result.session);
      setSessions(result.sessions);
    };
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <section className="content flex flex-wrap">
          <div className="flex-1">
            <div className="sidebar">
              <div className="sidebar__header">
                <a
                  className="sidebar__header-link flex gap-2 items-center"
                  href="#"
                >
                  <MenuBookIcon className="sidebar__haeder-icon !text-3xl" />
                  لیست جلسات
                </a>
              </div>
              <div className="sidebar-topics">
                <div className="sidebar-topics__item">
                  <ul className="sidebar-topics__list">
                    {sessions.map((session) => (
                      <Link to={`/${courseName}/${session._id}`}>
                        <li className="sidebar-topics__list-item">
                          <div className="sidebar-topics__list-right flex items-center gap-2">
                            <PlayCircleIcon className="sidebar-topics__list-item-icon !text-3xl" />
                            <a
                              className="sidebar-topics__list-item-link"
                              href="#"
                            >
                              {session.title}
                            </a>
                          </div>
                          <div className="sidebar-topics__list-left">
                            <span className="sidebar-topics__list-item-time">
                              {session.time}
                            </span>
                          </div>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-[2]">
            <div className="episode">
              <div className="episode-haeder">
                <div className="episode-header__right flex items-center">
                  <a className="episode-header__right-back-link" href="#">
                    <ChevronRightIcon className="episode-header__right-back-icon !text-4xl" />
                    <div className="episode-header__right-home">
                      <Link
                        className="episode-header__right-home-link"
                        to={`/course-info/${courseName}`}
                      >
                        به دوره خانه بروید
                      </Link>
                      <HomeIcon className="episode-header__right-home-icon !text-4xl" />
                    </div>
                  </a>
                </div>
                <div className="episode-header__left">
                  <PlayCircleIcon className="episode-header__left-icon !text-4xl" />
                  <span className="episode-header__left-text">
                    {" "}
                    سوالات متداول در مورد جاوااسکریپت و دوره
                  </span>
                </div>
              </div>
              <div className="episode-content">
                <video
                  className="episode-content__video rounded-lg"
                  controls
                  src={`https://sabzlearnreactserver.iran.liara.run:4000/courses/covers/${session.video}`}
                ></video>
                <a className="episode-content__video-link" href="#">
                  دانلود ویدئو
                </a>
                <div className="episode-content__bottom">
                  <a className="episode-content__backward" href="#">
                    <ArrowForwardIcon className="episode-content__backward-icon !text-3xl" />
                    قبلی
                  </a>
                  <a className="episode-content__forward" href="#">
                    بعدی
                    <ArrowBackIcon className="episode-content__backward-icon !text-3xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Session;
