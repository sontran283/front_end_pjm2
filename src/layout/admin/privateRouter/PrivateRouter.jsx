import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

export default function PrivateRouter() {
  const isLogin = JSON.parse(localStorage.getItem("userLocal"));

  return (
    <div>
      {isLogin && isLogin.role == 0 ? (
        <>
          <div className="flex">
            <Sidebar />
            <div style={{ width: "100%" }}>
              <Header />
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <Navigate to={"*"} />
      )}
    </div>
  );
}
