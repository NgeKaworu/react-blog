import Link from "umi/link";
import { Breadcrumb } from "antd";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";

// 更多配置请移步 https://github.com/icd2k3/react-router-breadcrumbs-hoc
const routes = [
  { path: "/", breadcrumb: "首页" },
  { path: "/article/", breadcrumb: "文章" },
  {
    path: "/article/:id?",
    breadcrumb: ({ location }) => {
      console.log(location);
      const mode =
        (location && location.state && location.state.mode) || "view";
      const map = {
        view: "预览",
        edit: "编辑"
      };
      return map[mode];
    }
  }
];

export default withBreadcrumbs(routes)(({ breadcrumbs }) => (
  <Breadcrumb>
    {breadcrumbs.map(breadcrumb => (
      <>
        <Breadcrumb.Item key={breadcrumb.key}>
          <Link to={breadcrumb.props.match.url}>{breadcrumb}</Link>
        </Breadcrumb.Item>
        {breadcrumb.props.match.path === "/article/" &&
          (breadcrumb.props.location.pathname === "/article" ||
            breadcrumb.props.location.pathname === "/article/") && (
            <Breadcrumb.Item>
              <Link to={breadcrumb.props.match.url}>新建</Link>{" "}
            </Breadcrumb.Item>
          )}
      </>
    ))}
  </Breadcrumb>
));
