import React from "react";
import { Form, Icon, Input, Button } from "antd";
import { connect } from "dva";
import Redirect from "umi/redirect";
import withRouter from "umi/withRouter";
import styles from "./Login.less";
import getIn from "../../../utils/getIn";

@connect(state => ({
  user: state.user
}))
@Form.create({ name: "normal_login" })
@withRouter
class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: "user/login",
          payload: {
            values
          }
        });
      }
    });
  };

  render() {
    if (this.props.user.token) {
      const from = getIn(this, ["props", "location", "state", "from"]) || "/";
      return <Redirect to={from} />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                type: "email",
                message: "请输入正确邮箱!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="邮箱"
              allowClear
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("pwd", {
            rules: [{ required: true, message: "请输入密码!" }]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="密码"
              allowClear
              className={styles.suffix}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ float: "right" }}>
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Login;
