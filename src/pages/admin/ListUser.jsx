import React, { useEffect, useState } from "react";
import { Pagination, notification } from "antd";
import { formatDate } from "../../utils/formatData";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveUser, getUser } from "../../redux/slice/userSlice";
import { Button } from "antd/es/radio";
import Search from "antd/es/input/Search";

export default function ListUser() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.data);
  const isLoadingChange = useSelector((state) => state.user.isLoadingChange);
  const [seachtext, setSeachText] = useState("");
  useEffect(() => {
    dispatch(getUser(seachtext));
  }, [seachtext]);

  useEffect(() => {
    dispatch(getUser());
  }, [isLoadingChange]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / pageSize);

  // Tạo mảng users cho trang hiện tại
  const currentUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="justify-end">
        <Search
          value={seachtext}
          onChange={(e) => setSeachText(e.target.value)}
          className="absolute right-0 mt-2 "
          style={{ width: 300 }}
          placeholder="search name..."
        />
      </div>

      <div className="w-full d-flex align-items-center justify-content-center flex-column mt-5">
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }} scope="col">
                STT
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Name
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Gender
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Date Of Birth
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Address
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Email
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Avatar
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Role
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Status
              </th>
              <th style={{ textAlign: "center" }} scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.user_name}</td>
                <td>
                  {user.gender === 0
                    ? "Male"
                    : user.gender === 1
                    ? "Female"
                    : "Other"}
                </td>
                <td>{formatDate(user.dateOfBirth)}</td>
                <td>{user.address}</td>
                <td>{user.email}</td>
                <td>
                  <img
                    style={{ width: "100%", height: 60, objectFit: "cover" }}
                    src={user.avatar}
                    alt=""
                  />
                </td>
                <td>{user.role === 0 ? "admin" : "user"}</td>
                <td>{user.active ? "block" : "active"}</td>
                <td>
                  <div>
                    {user.role == 1 ? (
                      <Button
                        className="bg-lime-400"
                        danger
                        onClick={() => dispatch(changeActiveUser(user))}
                      >
                        {user.active ? "Unlock" : "Lock"}
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-4 ">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalUsers}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
