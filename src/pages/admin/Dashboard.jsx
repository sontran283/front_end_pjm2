import React from 'react'
import "./dashboard.css"
import { CheckCircleOutlined } from '@ant-design/icons'

export default function Dashboard() {
    return (
        <>
            <main>
                <div className="row">
                    <div className="col s6">
                        <div style={{ padding: 35 }} align="center" className="card">
                            <div className="row">
                                <div className="left card-title">
                                    <b>User Management</b>
                                </div>
                            </div>
                            <div className="row">
                                <a href="#!">
                                    <div
                                        style={{ padding: 30 }}
                                        className="grey lighten-3 col s5 waves-effect"
                                    >
                                        <i className="indigo-text text-lighten-1 large material-icons">
                                            person
                                        </i>
                                        <span className="indigo-text text-lighten-1">

                                            <h5>Seller</h5>
                                        </span>
                                    </div>
                                </a>
                                <div className="col s1">&nbsp;</div>
                                <div className="col s1">&nbsp;</div>
                                <a href="#!">
                                    <div
                                        style={{ padding: 30 }}
                                        className="grey lighten-3 col s5 waves-effect"
                                    >
                                        <i className="indigo-text text-lighten-1 large material-icons">
                                            people
                                        </i>
                                        <span className="indigo-text text-lighten-1">
                                            <h5>Customer</h5>
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col s6">
                        <div style={{ padding: 35 }} align="center" className="card">
                            <div className="row">
                                <div className="left card-title">
                                    <b>Product Management</b>
                                </div>
                            </div>
                            <div className="row">
                                <a href="#!">
                                    <div
                                        style={{ padding: 30 }}
                                        className="grey lighten-3 col s5 waves-effect"
                                    >
                                        <i className="indigo-text text-lighten-1 large material-icons">
                                            store
                                        </i>
                                        <span className="indigo-text text-lighten-1">
                                            <h5>Product</h5>
                                        </span>
                                    </div>
                                </a>
                                <div className="col s1">&nbsp;</div>
                                <div className="col s1">&nbsp;</div>
                                <a href="#!">
                                    <div
                                        style={{ padding: 30 }}
                                        className="grey lighten-3 col s5 waves-effect"
                                    >
                                        <i className="indigo-text text-lighten-1 large material-icons">
                                            assignment
                                        </i>
                                        <span className="indigo-text text-lighten-1">
                                            <h5>Orders</h5>
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        <div style={{ padding: 35 }} align="center" className="card">
                            <div className="row">
                                <div className="left card-title">
                                    <b>Order Management</b>
                                </div>
                            </div>
                            <div className="row">
                                <a href="#!">
                                    <div
                                        style={{ padding: 30 }}
                                        className="grey lighten-3 col s5 waves-effect"
                                    >
                                        <i className="indigo-text text-lighten-1 large material-icons">
                                            local_offer
                                        </i>
                                        <span className="indigo-text text-lighten-1">
                                            <h5>Brand</h5>
                                        </span>
                                    </div>
                                </a>
                                <div className="col s1">&nbsp;</div>
                                <div className="col s1">&nbsp;</div>
                                <a href="#!">
                                    <div
                                        style={{ padding: 30 }}
                                        className="grey lighten-3 col s5 waves-effect"
                                    >
                                        <i className="indigo-text text-lighten-1 large material-icons">
                                            loyalty
                                        </i>
                                        <span className="indigo-text text-lighten-1">
                                            <h5>Sub Brand</h5>
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col s6">
                        <div style={{ padding: 35 }} align="center" className="card">
                            <div className="row">
                                <div className="left card-title">
                                    <b>Category Management</b>
                                </div>
                            </div>
                            <div className="row">
                                <a href="#!">
                                    <div
                                        style={{ padding: 30 }}
                                        className="grey lighten-3 col s5 waves-effect"
                                    >
                                        <i className="indigo-text text-lighten-1 large material-icons">
                                            view_list
                                        </i>
                                        <span className="indigo-text text-lighten-1">
                                            <h5>Category</h5>
                                        </span>
                                    </div>
                                </a>
                                <div className="col s1">&nbsp;</div>
                                <div className="col s1">&nbsp;</div>
                                <a href="#!">
                                    <div
                                        style={{ padding: 30 }}
                                        className="grey lighten-3 col s5 waves-effect"
                                    >
                                        <i className="indigo-text text-lighten-1 large material-icons">
                                            view_list
                                        </i>
                                        <span className="truncate indigo-text text-lighten-1">
                                            <h5>Sub Category</h5>
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </>

    )
}
