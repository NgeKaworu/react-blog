import React from "react";
import { connect } from "dva";
import Login from "./components/Login";
import styles from "../../pages/index.less";
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
          minWidth: "480px"
        }}
        className={styles.wrap}
      >
        <Login />
      </div>
    </div>
  );
}

LoginPage.propTypes = {};

export default connect()(LoginPage);
