import React from "react";
import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";

export default function Page404() {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, something went wrong."
        extra={
          <NavLink to={"/"}>
            <Button type="primary">Back Home</Button>;
          </NavLink>
        }
      />
    </div>
  );
  {
  }
}
