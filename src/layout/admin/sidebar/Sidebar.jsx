import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import {AppstoreOutlined,AreaChartOutlined,PicLeftOutlined,} from "@ant-design/icons";

export default function Sidebar() {
  return (
    <>
      <div className="m-menu">
        <a to="" className="m-logo-container mt-2">
          <img
            height={50}
            width={50}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Unofficial_Windows_logo_variant_-_2002%E2%80%932012_%28Multicolored%29.svg/1161px-Unofficial_Windows_logo_variant_-_2002%E2%80%932012_%28Multicolored%29.svg.png"
            alt=""
          />
          <span className="up ">ADMIN</span>
        </a>
        <div className="m-menu-item">
          <div className="m-tooltip-content">
            <NavLink to="/admin/dashboard" className="m-item-router">
              <AppstoreOutlined className="m-icon-15-fs" />
              <div className="m-item-title">Dashboard</div>
            </NavLink>
          </div>
          <div className="m-tooltip-content">
            <NavLink to="/admin/listuser" className="m-item-router">
              <i className="fa-solid fa-user m-icon-15-fs" />
              <div className="m-item-title">User Management</div>
            </NavLink>
          </div>
          <div className="m-tooltip-content">
            <NavLink to="/admin/listproduct" className="m-item-router">
              <i className="fa-solid fa-book m-icon-15-fs" />
              <div className="m-item-title">Product Management</div>
            </NavLink>
          </div>
          <div className="m-tooltip-content">
            <NavLink to="/admin/listorder" className="m-item-router">
              <AreaChartOutlined className="m-icon-15-fs" />
              <div className="m-item-title">Order Management</div>
            </NavLink>
          </div>
          <div className="m-tooltip-content">
            <NavLink to="/admin/listcategory" className="m-item-router">
              <PicLeftOutlined className="m-icon-15-fs" />
              <div className="m-item-title">Category Management</div>
            </NavLink>
          </div>
          {/* <div className="m-tooltip-content">
            <NavLink to="/admin/upload-file" className="m-item-router">
              <PicLeftOutlined className="m-icon-15-fs" />
              <div className="m-item-title">upload file</div>
            </NavLink>
          </div> */}
        </div>
      </div>
    </>
  );
}
