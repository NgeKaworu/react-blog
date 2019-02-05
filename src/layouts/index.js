import React from "react";
import Header from "./Header";
import { Layout as L, Spin } from "antd";
import withRouter from "umi/withRouter";
import { connect } from "dva";

const { Content } = L;

@connect(state => ({
  loading: state.loading.global,
  user: state.user
}))
@withRouter
class Layout extends React.Component {
  constructor(props) {
    super(props);
    const uid = localStorage.getItem("uid");
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (uid && token && name) {
      props.dispatch({
        type: "user/save",
        payload: {
          uid,
          token,
          name
        }
      });
    }
  }
  render() {
    const { children, location, loading, user } = this.props;
    return (
      <div>
        <Header location={location} user={user} />
        <Spin spinning={loading}>
          <Content>{children}</Content>
        </Spin>
      </div>
    );
  }
}

export default Layout;
