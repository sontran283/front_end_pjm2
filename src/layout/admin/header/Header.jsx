import React from 'react'
import "./header.css"
import { BellOutlined, KeyOutlined, LogoutOutlined, MenuOutlined, MessageOutlined, RadiusSettingOutlined, UserAddOutlined, WindowsOutlined } from '@ant-design/icons'
import { Button, Dropdown, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate()
    // sau khi danh nhap bang gg thanh cong, lay thong tin user da dang nhap
    const userLogin = JSON.parse(localStorage.getItem('userLocal'))

    // 
    const handleLogout = () => {
        // xoa du kieu tren local
        localStorage.removeItem('userLocal')
        // chuyen huong ve trang chu
        navigate("/")
    }

    // ham xu li dang xuat
    const handleConfirmLogout = () => {
        Modal.confirm({
            title: "Confirm!",
            content: "Are you sure you want to log out?",
            onOk() {
                handleLogout()
            },
            cancelText: "Cancel",
            okText: "Log out",
        });
    }

    const items = [
        {
            key: '1',
            label: (
                <Link to={"/admin/adminprofile"}>
                    <UserAddOutlined className=' mr-2' />
                    Profile
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to={"/admin/adminpass"}>
                    <KeyOutlined className=' mr-2' />
                    Change Password
                </Link >
            ),
        },
        {
            key: '3',
            label: (
                <a onClick={handleConfirmLogout}>
                    <LogoutOutlined className=' mr-2' />
                    Log Out
                </a>
            ),
        },
    ];

    return (
        <>
            <div className=''>
                <div className='header-admin shadow- d-flex justify-content-between align-items-center p-3'>
                    <div>
                        <WindowsOutlined style={{ fontSize: 20 }} />
                    </div>
                    <div>
                        {/* <Search
                            placeholder="search text"
                            style={{ width: 400 }}
                        /> */}
                    </div>
                    <div className='d-flex gap-3 '>
                        <BellOutlined style={{ fontSize: 20 }} />
                        <MessageOutlined style={{ fontSize: 20 }} />
                        {
                            // Sau khi lay du lieu tu local tu ben tren, sau do xuong day,  
                            // dang nhap vao thi 2 file dang ki va dang nhap se an di.
                            userLogin != null
                                ?
                                (
                                    <>
                                        <li className="nav-item justify-center flex items-center">
                                            <Dropdown
                                                menu={{
                                                    items,
                                                }}
                                                placement="bottomLeft"
                                                arrow
                                            >
                                                <Button className="border-none shadow-none text-white hover:text-white">
                                                    <div className="flex items-center gap-2">
                                                        <img className="rounded-full"
                                                            src={userLogin.avatar}
                                                            height={26}
                                                            width={26}
                                                            alt="avatar"
                                                        />
                                                        <div className='nameColor'>{userLogin.user_name}</div>
                                                    </div>
                                                </Button>
                                            </Dropdown>
                                        </li>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to={"/login"}>
                                                Login
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to={"/register"}>
                                                Register
                                            </NavLink>
                                        </li>
                                    </>
                                )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
