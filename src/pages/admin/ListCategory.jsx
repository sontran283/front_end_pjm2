import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deletecategory,
  getcategory,
  updateCatagory,
} from "../../redux/slice/categorySlice";

export default function ListCategory() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.data);
  const isLoadingChange = useSelector(
    (state) => state.category.isLoadingChange
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  // phan trang
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const displayedCategories = categories.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const handleShowModalDelete = (id) => {
    setIdDelete(id);
    setIsModalOpenDelete(true);
  };
  const handleOkDelete = async () => {
    dispatch(deletecategory(idDelete));
    setIdDelete();
    setIsModalOpenDelete(false);
  };
  const handleCancelDelete = () => {
    setIdDelete();
    setIsModalOpenDelete(false);
  };

  useEffect(() => {
    dispatch(getcategory());
  }, [isLoadingChange]);

  // add + update
  const [formRef] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [categoryUpdate, setCatagoryUpdate] = useState({});

  const handleShowModal = (cate) => {
    setCatagoryUpdate(cate);
    formRef.setFieldsValue(cate);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setCatagoryUpdate();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    formRef.resetFields();
    setCatagoryUpdate();
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    if (categoryUpdate && categoryUpdate.id) {
      dispatch(
        updateCatagory({
          ...values,
          id: categoryUpdate.id,
        })
      );
      formRef.resetFields();
      handleCancel();
      return;
    }

    dispatch(addCategory(values));
    formRef.resetFields();
    handleCancel();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // =================

  return (
    <>
      <Modal
        title="Delete Category"
        open={isModalOpenDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure?</p>
      </Modal>

      <Modal
        title={categoryUpdate ? "Update Category" : "Add Category"}
        maskClosable={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<></>}
      >
        <Form
          name="basic"
          form={formRef}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Category Name"
            name="category_name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div className="w-full d-flex align-items-center justify-content-center flex-column mt-5">
        <div
          className="d-flex justify-content-between mb-3"
          style={{ width: "100%", gap: "20px" }}
        >
          <button
            onClick={() => handleShowModal()}
            className="btn btn-primary mb-4 ml-2"
          >
            + Add Category
          </button>
          {/* <input
            type="text"
            name=""
            id=""
            className="form-control w-50"
            placeholder="Search name..."
          /> */}
        </div>
        <table className="table table-striped table-hover table-bordered css">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Category</th>
              <th scope="col" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {displayedCategories.map((cate, index) => (
              <tr key={cate.id}>
                <td>{index + 1}</td>
                <td>{cate.category_name}</td>
                <td onClick={() => handleShowModal(cate)}>
                  <i className="fa-solid fa-pen-to-square btn btn-primary"></i>
                </td>
                <td onClick={() => handleShowModalDelete(cate.id)}>
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
          total={categories.length}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
