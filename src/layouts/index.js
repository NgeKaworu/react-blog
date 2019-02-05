import React from "react";
import Header from "./Header";
import { Layout as L, Spin } from "antd";
import withRouter from "umi/withRouter";
import { connect } from "dva";

const { Content } = L;
function Layout({ children, location, loading, user }) {
  return (
    <div>
      <Header location={location} user={user} />
      <Spin spinning={loading}>
        <Content>{children}</Content>
      </Spin>
    </div>
  );
}

export default connect(state => ({
  loading: state.loading.global,
  user: state.user
}))(withRouter(Layout));
