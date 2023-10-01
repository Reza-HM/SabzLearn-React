import React, { useEffect, useState } from "react";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";

import "./PAdminIndex.css";

const PAdminIndex = () => {
  const [pAdminInfos, setPAdminInfos] = useState([]);
  const [lastUsers, setLastUsers] = useState([]);
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    getPAdminInfos();
  }, []);

  async function getPAdminInfos() {
    const res = await fetch(`https://sabzlearnreactserver.iran.liara.run:4000/v1/infos/p-admin`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    });
    const result = await res.json();
    console.log(result);
    setPAdminInfos(result);
    setLastUsers(result.lastUsers);
    setStatistics(result.infos);
  }

  const removeUser = (userID) => {
    swal({
      title: "آیا از حذف کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));

        const res = await fetch(`https://sabzlearnreactserver.iran.liara.run:4000/v1/users/${userID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        });

        const removeResult = await res.json();

        if (res.ok) {
          console.log(removeResult);
          getPAdminInfos();
        }
      }
    });
  };

  const changeRoleHandler = async (userID, userRole) => {
    console.log(userID);
    const res = await fetch(`https://sabzlearnreactserver.iran.liara.run:4000/v1/users/role`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userID,
        role: userRole === "ADMIN" ? "USER" : "ADMIN",
      }),
    });
    const result = await res.json();
    if (res.ok) {
      console.log(result);
      swal({
        title: "نقش فرد مورد نظر با موفقیت تغییر کرد.",
        icon: "success",
        buttons: "اوکی",
      }).then(() => {
        getPAdminInfos();
      });
    }
  };

  return (
    <div>
      <div className="container">
        <div className="home-content-title">
          <span className="welcome flex gap-4">
            خوش آمدید؛
            <span className="name" id="admin-welcome-name">
              {pAdminInfos.adminName}
            </span>
          </span>
        </div>
        <div className="home-content-boxes">
          <div className="flex flex-wrap justify-between gap-8">
            {statistics.map((statistic) => (
              <div className="" key={statistic._id}>
                <div className="home-content-revanue box">
                  <div className="home-box">
                    <div className="home-box-left">
                      <div className="home-box-title">
                        <span>{statistic.title}</span>
                      </div>
                      <div className="home-box-value">
                        <div className="home-box-price"></div>
                        <div className="home-box-result">
                          <span>{statistic.count} عدد</span>
                        </div>
                      </div>
                      <div className="home-box-text">
                        <span>{statistic.title} در یک ماه گذشته</span>
                      </div>
                    </div>
                    <div className="home-box-right">
                      <div className="home-box-icon">
                        {statistic.title === "ثبت نامی‌ها" && (
                          <GroupIcon className="!text-5xl text-slate-500" />
                        )}
                        {statistic.title === "دوره‌ها" && (
                          <SchoolIcon className="!text-5xl text-slate-500" />
                        )}
                        {statistic.title === "جلسات" && (
                          <MenuBookIcon className="!text-5xl text-slate-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DataTable title="آخرین کاربرهای سایت">
        <table className="my-10 w-full bg-white rounded-2xl overflow-hidden shadow-lg">
          <thead>
            <tr className="text-center">
              <th className="p-5">شناسه</th>
              <th className="p-5">نام </th>
              <th className="p-5">نام کاربری </th>
              <th className="p-5">ایمیل</th>
              <th className="p-5">تاریخ ثبت نام</th>
              <th className="p-5">نقش</th>
              <th className="p-5">تغییر نقش</th>
              <th className="p-5">حذف</th>
            </tr>
          </thead>
          <tbody>
            {lastUsers.map((user, index) => (
              <tr className="text-center" key={user._id}>
                <td className="p-5">{index + 1}</td>
                <td className="p-5">{user.name}</td>
                <td className="p-5">{user.username}</td>
                <td className="p-5">{user.email}</td>
                <td className="p-5">
                  {user.role === "ADMIN" ? "ادمین" : "یوزر"}
                </td>
                <td className="p-5">{user.createdAt.slice(0, 10)}</td>
                <td className="p-5">
                  <button
                    type="button"
                    className="rounded-lg py-4 px-8 bg-blue-600 text-white !text-2xl hover:bg-blue-400 !transition-all !duration-300 !ease-linear edit-btn"
                    onClick={() => changeRoleHandler(user._id, user.role)}
                  >
                    تغییر نقش
                  </button>
                </td>
                <td className="p-5">
                  <button
                    type="button"
                    className="rounded-lg py-4 px-8 bg-red-600 text-white !text-2xl hover:bg-red-400 !transition-all !duration-300 !ease-linear delete-btn"
                    onClick={() => {
                      removeUser(user._id);
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
    </div>
  );
};

export default PAdminIndex;
