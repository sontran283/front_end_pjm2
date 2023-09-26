import React, { useEffect, useState } from "react";
import axios from "axios";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "./../../../utils/formatData";

export default function CheckOut({ productCart, sum }) {
  const navigate = useNavigate();
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  const cartId = JSON.parse(localStorage.getItem("cartId"));
  const [cartUser, setCartUser] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productsDetail, setProductsDetail] = useState([]);

  const [infoBill, setInfoBill] = useState({
    userId: userLocal?.id || null,
    fullName: "",
    note: "",
    phone: "",
    address: "",
    cart: [],
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInfoBill((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handlePay = async () => {
    for (const k of Object.keys(infoBill)) {
      if (!infoBill[k]) {
        notification.warning({
          message: "warning",
          description: "Please Insert Billing Details",
        });
        return;
      }
    }
    const dataBill = {
      ...infoBill,
      cart: productCart,
      all_price: sum,
      status: 0,
      products_detail: productsDetail, // Thay đổi giá trị của products_detail
    };

    for (let i = 0; i < cartUser.length; i++) {
      const resPro = await axios.get(
        `http://localhost:1997/products/${cartUser[i].idProduct}`
      );
      const proInfo = resPro.data;
      await axios.patch(
        `http://localhost:1997/products/${cartUser[i].idProduct}`,
        {
          quantity: proInfo.quantity - cartUser[i].quantity,
        }
      );
    }

    const res = await axios.post(`http://localhost:1997/orders`, dataBill);
    axios.patch(`http://localhost:1997/carts/${cartId}`, {
      cart: [],
    });
    if (res.status == 201) {
      notification.success({
        message: "success",
        description: "Successful purchase",
      });
      navigate("/history");
    } else {
      notification.error({
        message: "error",
        description: "Failed purchase",
      });
    }
  };

  useEffect(() => {
    const getInfoCartUser = async () => {
      const res = await axios.get(`http://localhost:1997/carts/${cartId}`);
      const cart = res.data.cart;
      let totalPriceI = 0;
      for (let i = 0; i < cart.length; i++) {
        const resPro = await axios.get(
          `http://localhost:1997/products/${cart[i].idProduct}`
        );
        const proInfo = resPro.data;
        productsDetail.push({
          id: proInfo.id,
          name: proInfo.name,
          price: proInfo.price,
          quantity: cart[i].quantity,
        });
        totalPriceI += cart[i].quantity * proInfo.price;
      }
      setTotalPrice(totalPriceI);
      setCartUser(res.data.cart);
      setProductsDetail(productsDetail); // Cập nhật state productsDetail
    };
    getInfoCartUser();
  }, []);

  return (
    <>
      <section className="ftco-section pr-14">
        {cartUser.length > 0 && (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-10">
                <form action="#" className="">
                  <h3 className="mb-4 billing-heading">Billing Details</h3>
                  <div className="row align-items-end">
                    <div className="flex">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="firstname">Full Name</label>
                          <input
                            type="text"
                            className="form-control px-2"
                            name="fullName"
                            onChange={handleChangeInput}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="lastname">Note</label>
                          <input
                            name="note"
                            onChange={handleChangeInput}
                            type="text"
                            className="form-control px-2"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="phone">Phone</label>
                          <input
                            name="phone"
                            onChange={handleChangeInput}
                            type="text"
                            className="form-control px-2"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="address">Address</label>
                          <input
                            name="address"
                            onChange={handleChangeInput}
                            type="email"
                            className="form-control px-2"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                {/* END */}
                <div className="flex justify-between gap-40">
                  <div className="col-md-6 d-flex">
                    <div className="cart-detail cart-total bg-light p-3 p-md-4">
                      <h3 className="billing-heading mb-4">Cart Total</h3>
                      <hr />
                      <br />
                      <p className="d-flex total-price">
                        <span>Total</span>
                        <span style={{ color: "red" }}>{formatMoney(sum)}</span>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="cart-detail bg-light p-3 p-md-4">
                      <h3 className="billing-heading mb-4">Payment Method</h3>
                      <div className="form-group">
                        <div className="col-md-12">
                          <div className="checkbox"></div>
                        </div>
                      </div>
                      <p>
                        <button
                          onClick={handlePay}
                          type="submit"
                          className="btn btn-primary"
                        >
                          Check out
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        )}
      </section>{" "}
    </>
  );
}
