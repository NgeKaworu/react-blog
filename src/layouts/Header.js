import { Menu, Icon, Avatar } from "antd";
import Link from "umi/link";

function Header({ location }) {
  return (
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
            <Avatar shape="square">Furan</Avatar>
          </Link>
        }
        style={{ float: "right" }}
      >
        <Menu.Item key="plus">
          <Link to="/edit/">
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
      </Menu.SubMenu>
    </Menu>
  );
}

export default Header;
