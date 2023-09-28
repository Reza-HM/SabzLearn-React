import React, { useEffect, useState } from "react";

import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/orders`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      });
  }, []);

  return (
    <div className="flex-[4]">
      <div className="order">
        <table className="order__table">
          <thead className="order__table-header">
            <tr className="order__table-header-list">
              <th className="order__table-header-item">شناسه</th>
              <th className="order__table-header-item">تاریخ</th>
              <th className="order__table-header-item">وضعیت</th>
              <th className="order__table-header-item">دوره</th>
              <th className="order__table-header-item">مبلغ</th>
              <th className="order__table-header-item">عملیات ها</th>
            </tr>
          </thead>
          <tbody className="order__table-body">
            {orders.length ? (
              orders.map((order, index) => (
                <tr className="order__table-body-list">
                  <td className="order__table-body-item">
                    <a href="#" className="order__table-body-link">
                      {index + 1}
                    </a>
                  </td>
                  <td className="order__table-body-item">
                    {order.createdAt.slice(0, 10)}
                  </td>
                  <td className="order__table-body-item">
                    {order.course.isComplete === 1 ? "تکمیل شده" : "تکمیل نشده"}
                  </td>
                  <td className="order__table-body-item">
                    {order.course.name}
                  </td>
                  <td className="order__table-body-item">
                    {order.course.price === 0
                      ? "رایگان"
                      : order.course.price.toLocaleString()}
                  </td>
                  <td className="order__table-body-item">
                    <a className="order__table-body-btn" href="#">
                      نمایش
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <div
                className="bg-red-100 rounded-lg border border-b border-red-500 text-red-700 px-4 py-3 mx-2 my-4 w-full"
                role="alert"
              >
                <span className="block sm:inline">سفارشی از شما یافت نشد.</span>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
