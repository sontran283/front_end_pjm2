import React from 'react'
import "./changePassword.css"
import Navbar from '../../layout/user/navbar/Navbar'
import Footer from '../../layout/user/footer/Footer'
import Back_To_Top from '../../base/backtop/Back_To_Top'

export default function ChangePassword() {
    return (
        <>
            <Navbar />
            <div className="mainDiv">
                <div className="cardStyle">
                    <form action="" method="post" name="signupForm" id="signupForm">
                        <img src="" id="signupLogo" />
                        <h2 className="formTitle">Login to your account</h2>
                        <div className="inputDiv">
                            <label className="inputLabel" htmlFor="password">
                                New Password
                            </label>
                            <input type="password" id="password" name="password" required="" />
                        </div>
                        <div className="inputDiv">
                            <label className="inputLabel" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input type="password" id="confirmPassword" name="confirmPassword" />
                        </div>
                        <div className="buttonWrapper">
                            <button
                                type="submit"
                                id="submitButton"
                                onclick="validateSignupForm()"
                                className="submitButton pure-button pure-button-primary"
                            >
                               Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
            <Back_To_Top />
        </>
    )
}
