import React from "react";
import { connect } from "dva";
import Login from "./components/Login";
function LoginPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "600px"
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,.1)",
          borderRadius: "5px",
          padding: "18px",
          minWidth: "480px",
          boxShadow: "1px 1px 1px rgba(0,0,0,.2)"
        }}
      >
        <Login />
      </div>
    </div>
  );
}

LoginPage.propTypes = {};

export default connect()(LoginPage);
