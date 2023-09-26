import React from "react";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import PrivateRouter from "../privateRouter/PrivateRouter";
// import AdminHome from "./AdminHome";

export default function AdminHome() {
  return (
    <>
      <div>
        <PrivateRouter />
      </div>
    </>
  );
}
