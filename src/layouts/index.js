import React from "react";
import CustomHeader from "./CustomHeader";
import { Layout as L, Spin, Col, Row } from "antd";
import withRouter from "umi/withRouter";
import { connect } from "dva";
import Breadcrumbs from "../routes/Breakcrumbs";

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
      <L>
        <CustomHeader location={location} user={user} />
        <Content
          style={{
            padding: "24px 0 24px 0",
            minWidth: "900px"
          }}
        >
          <Row type="flex" justify="center">
            <Col span={16}>
              <Spin spinning={loading}>
                <Breadcrumbs />
                {children}
              </Spin>
            </Col>
          </Row>
        </Content>
      </L>
    );
  }
}

export default Layout;
