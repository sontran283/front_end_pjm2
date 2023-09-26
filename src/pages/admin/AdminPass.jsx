import React from 'react'

export default function AdminPass() {
    return (
        <>
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
                                className="submitButton pure-button pure-button-primary"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
