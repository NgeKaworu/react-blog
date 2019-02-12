import { Menu, Icon, Avatar, Layout } from "antd";
import Link from "umi/link";
const { Header } = Layout;
function CustomHeader({ location, user }) {
  return (
    <Header style={{ background: "rgba(255,255,255,0)", padding: "0" }}>
      <div style={{ float: "left", display: "inline-block", width: "50px" }}>
        <img src={require("../assets/furan.png")} alt="logo" />
      </div>
      <Menu selectedKeys={[location.pathname]} mode="horizontal">
        <Menu.Item key="home">
          <Link to="/">
            <Icon type="home" />
            主页
          </Link>
        </Menu.Item>
        <Menu.Item key="/archive">
          <Link to="/archive">
            <Icon type="bars" />
            归档
          </Link>
        </Menu.Item>
        <Menu.SubMenu
          key="sub"
          title={
            <span>
              <Icon type="ellipsis" />
              <span>其他demos</span>
            </span>
          }
        >
          <Menu.Item key="vue">
            <a href="http://furan.xyz/vue">
              <Icon type="export" />
              Vue demos
            </a>
          </Menu.Item>
          <Menu.Item key="react">
            <a href="http://furan.xyz/react">
              <Icon type="export" />
              React demos
            </a>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="user"
          title={
            <Link to="user">
              <Avatar shape="square">{user.name ? user.name : "登录"}</Avatar>
            </Link>
          }
          style={{ float: "right" }}
        >
          <Menu.Item key="plus">
            <Link to="/article/">
              <Icon type="plus" />
              添加
            </Link>
          </Menu.Item>
          <Menu.Item key="setting">
            <Link to="/manage">
              <Icon type="setting" />
              管理
            </Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="login">
            {user.token ? (
              <Link to="/logout">
                <Icon type="logout" />
                退出
              </Link>
            ) : (
              <Link
                to={{
                  pathname: "/login",
                  state: { from: location.pathname }
                }}
              >
                <Icon type="login" />
                登录
              </Link>
            )}
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Header>
  );
}

export default CustomHeader;
