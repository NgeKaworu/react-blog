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
  render() {
    const { children, location, loading, user } = this.props;
    return (
      <L style={{ background: "rgba(0,0,0,0)" }}>
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
