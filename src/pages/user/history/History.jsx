import { NavLink } from "react-router-dom";
import Navbar from "../../../layout/user/navbar/Navbar";
import Footer from "../../../layout/user/footer/Footer";
import Back_To_Top from "../../../base/backtop/Back_To_Top";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatMoney } from "../../../utils/formatData";

export default function History() {
  const [history, setHistory] = useState([]);
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));

  // moi mot user dang nhap thi co mot history rieng
  useEffect(() => {
    axios
      .get(`http://localhost:1997/orders`)
      .then((response) => {
        const odUser = [];
        response.data.map((or) => {
          if (or.userId == userLocal.id) {
            odUser.push(or);
          }
        });
        setHistory(odUser);
      })
      .catch((error) => console.log(error));
  }, []);

  // ham xoa don hang
  const handleCancelOrder = (orderId) => {
    const shouldCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (shouldCancel) {
      axios
        .delete(`http://localhost:1997/orders/${orderId}`)
        .then((response) => {
          // Xoá thành công, cập nhật lại danh sách đơn hàng
          const updatedHistory = history.filter((ord) => ord.id !== orderId);
          setHistory(updatedHistory);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="hero-wrap hero-bread"
        style={{ backgroundImage: 'url("images/bg_1.jpg")' }}
      >
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center">
            <div className="col-md-9 text-center">
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="index.html">Home</a>
                </span>{" "}
                <span>History us</span>
              </p>
              <h1 className="mb-0 bread">Purchase History</h1>
            </div>
          </div>
        </div>
      </div>
      <section className=" ftco-cart mb-4 cart">
        <div className=" ">
          <div className="">
            <div className="cart-list">
              <table className="table">
                <thead className="bg-lime-200">
                  <tr className="text-center">
                    <th>STT</th>
                    <th>Full Name</th>
                    <th>Note</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Price</th>
                    <th>Products Detail</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((ord, index) => {
                    return (
                      <tr className="text-center" key={ord.id}>
                        <td>{index + 1}</td>
                        <td>{ord.fullName}</td>
                        <td>{ord.note}</td>
                        <td>{ord.phone}</td>
                        <td>{ord.address}</td>
                        <td>{formatMoney(ord.all_price)}</td>
                        <td>
                          {ord.cart.map((pr) => (
                            <>
                              <p style={{ textAlign: "center" }}>
                                product:{" "}
                                <span
                                  className="pt-4"
                                  style={{
                                    minWidth: 100,
                                    display: "inline-block",
                                  }}
                                >
                                  {pr.product_name}
                                </span>
                                , quantity: <span>{pr.quantity}</span>
                              </p>
                              <br></br>
                            </>
                          ))}
                        </td>
                        <td>
                          {ord.status == 0
                            ? "Pending"
                            : ord.status == 1
                            ? "Accept"
                            : "Deny"}
                        </td>
                        <td>
                          {ord.status == 0 ? (
                            <button
                              onClick={() => handleCancelOrder(ord.id)}
                              className="btn bg-red-300 p-1"
                            >
                              Cancel order
                            </button>
                          ) : (
                            <></>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Back_To_Top />
    </div>
  );
}
