import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { Pagination } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../redux/slice/orderSlice";
import { formatMoney } from "../../utils/formatData";
import Search from "antd/es/input/Search";

export default function ListOrder() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const dispatch = useDispatch();
  const isLoadingChange = useSelector((state) => state.order.isLoadingChange);
  const listOrder = useSelector((state) => state.order.data);
  const [seachtext, setSeachText] = useState("");
  useEffect(() => {
    dispatch(getOrder(seachtext));
  }, [seachtext]);

  useEffect(() => {
    dispatch(getOrder());
  }, [isLoadingChange]);

  // phân trang
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const displayedOrder = listOrder.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const loadData = () => {
   dispatch(getOrder(searchText))
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const delaySearch = debounce(() => {
      loadData();
    }, 1000);
    delaySearch();
    return () => {
      delaySearch.cancel();
    };
  }, [searchText]);

 


  const handleChangeStatus = async (order, status) => {
    await axios.patch(`http://localhost:1997/orders/${order.id}`, {
      status: status,
    });

    dispatch(getOrder());
  };

 

  return (
    <>
      <div className="justify-end">
        <Search
          value={seachtext}
          onChange={(e) => setSeachText(e.target.value)}
          className="absolute right-0 mt-2 "
          style={{ width: 300 }}
          placeholder="Search name..."
        />
      </div>

      <div className="w-full d-flex align-items-center justify-content-center flex-column mt-5">
        <table className="table table-striped table-hover table-bordered css">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Note</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Price</th>
              <th scope="col">Products Detail</th>
              <th scope="col">Status</th>
              <th scope="col" style={{ width: 150 }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedOrder.map((order, index) => (
              <tr key={order.id}>
                <td>{startIndex + index + 1}</td>
                <td>{order.userId}</td>
                <td>{order.fullName}</td>
                <td>{order.note}</td>
                <td>{order.phone}</td>
                <td>{order.address}</td>
                <td>{formatMoney(order.all_price)}</td>
                <td>
                  {order.cart.map((product) => (
                    <div key={product.id}>
                      <p>Name: {product.product_name}</p>
                      <p>Quantity: {product.quantity}</p>
                      <hr />
                      {/* <p>Detail: {product.description}</p> */}
                    </div>
                  ))}
                </td>
                <td>
                  <span>
                    {order.status === 0
                      ? "Pending"
                      : order.status === 1
                      ? "Accept"
                      : "Deny"}
                  </span>
                </td>
                <td>
                  {order.status === 0 && (
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleChangeStatus(order, 1)}
                      >
                        Confirm
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleChangeStatus(order, 2)}
                      >
                        Deny
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="text-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={listOrder.length}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
