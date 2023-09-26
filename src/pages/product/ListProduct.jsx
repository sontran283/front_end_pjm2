import React, { useEffect, useState } from "react";
import { formatMoney } from "../../utils/formatData";
import FormAdd from "../../components/admin/manager-product/FormAdd";
import FormEdit from "../../components/admin/manager-product/FormEdit";
import debounce from "lodash.debounce";
import { Pagination } from "antd";
import { storage } from "../../firebase/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import axios from "axios";
import Search from "antd/es/input/Search";

export default function ListProduct() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState([]);

  // phan trang
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const displayedProduct = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    axios
      .get("http://localhost:1997/categories")
      .then((response) => setCategory(response.data))
      .catch((error) => console.log(error));
  }, []);

  // goi API lay thong tin tat ca san pham
  const loadData = () => {
    fetch(`http://localhost:1997/products?product_name_like=${searchText}`)
      .then((response) => response.json()) // ep kieu ve dang json
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => console.log(error)); // noi co du lieu tra ve--bat loi
  };

  // ham search
  useEffect(() => {
    const delaySearch = debounce(loadData, 500); // dat do tre cho ham search tinh tu khi bo tay khoi ban phim
    delaySearch();

    return delaySearch.cancel; // huy debounce khi khong thuc hien chuc nang search
  }, [searchText]);

  // khi lam viec voi components khong duoc goi ham truc tiep ma su dung useEffect
  // useEffect dung khi can hien thi du lieu ra giao dien
  useEffect(() => {
    loadData();
  }, []);

  /**
   * ham xoa thong 1 product theo id
   * @param {*} id id cua product can xoa
   * Author: SON TRAN
   */
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      fetch(`http://localhost:1997/products/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 200) {
            loadData();
          }
        })
        .catch((error) => console.log(error));
    }
  };

  // ham hien thi form them moi
  const handleShowForm = () => {
    setShowForm(true);
  };

  // ham dong form them
  const handleCloseForm = () => {
    setShowForm(false);
  };

  // ham hien thi form sua
  const handleShowFormEdit = (id) => {
    setShowFormEdit(true); //hien thi form edit
    setIdEdit(id); //lay ra id can edit
  };

  // ham dong form sua
  const handleCloseFormEdit = () => {
    setShowFormEdit(false);
  };

  const getImageLink = async (fileName) => {
    const storageRef = ref(storage, "/files/" + fileName);
    try {
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (e) {
      return "";
    }
  };

  return (
    <>
      {/* Form them moi san pham */}
      {showForm && (
        <FormAdd handleCloseForm={handleCloseForm} loadData={loadData} />
      )}
      {/* Form sua thong tin san pham */}
      {showFormEdit && (
        <FormEdit
          idEdit={idEdit}
          handleCloseFormEdit={handleCloseFormEdit}
          loadData={loadData}
        />
      )}
      <div className="w-full d-flex align-items-center justify-content-center flex-column mt-4">
        <div
          className="d-flex justify-content-between"
          style={{ width: "100%", gap: "20px" }}
        >
          <button
            onClick={handleShowForm}
            className="btn btn-primary mb-4 ml-2"
          >
            + Add Product
          </button>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search name..."
            style={{ width: 300 }}
          />
        </div>
        <table className="table table-striped table-hover table-bordered css">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">quantity</th>
              <th scope="col">Description</th>
              <th scope="col">Type</th>
              <th scope="col">Image</th>
              <th scope="col" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedProduct.map((pro, index) => (
              <tr key={pro.id}>
                <td>{pro.id}</td>
                <td>{pro.product_name}</td>
                <td>{formatMoney(pro.price)}</td>
                <td>{pro.quantity}</td>
                <td>{pro.description.substring(0, 20)}...</td>
                <td>
                  {
                    category.find((cate) => cate.id == pro.category_id)
                      .category_name
                  }
                </td>
                <td className="display: block">
                  <img
                    style={{ width: "100%", height: 80, objectFit: "cover" }}
                    src={pro.image}
                    alt="img"
                  />
                </td>
                <td onClick={() => handleShowFormEdit(pro.id)}>
                  <i className="fa-solid fa-pen-to-square btn btn-primary"></i>
                </td>
                <td onClick={() => handleDelete(pro.id)}>
                  <i className="fa-solid fa-trash btn btn-danger "></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* phan trang */}
      <div className="text-center mt-4 ">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={products.length}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
