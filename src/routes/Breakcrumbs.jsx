import Link from "umi/link";
import { Breadcrumb } from "antd";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import React from "react";
import { Helmet } from "react-helmet";
// 更多配置请移步 https://github.com/icd2k3/react-router-breadcrumbs-hoc
const routes = [
  { path: "/", breadcrumb: "首页" },
  { path: "/login", breadcrumb: "登录" },
  { path: "/article/", breadcrumb: "文章" },
  {
    path: "/article/:id?",
    breadcrumb: ({ location }) => {
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

export default withBreadcrumbs(routes)(({ breadcrumbs }) => {
  console.log(breadcrumbs);
  return (
    <>
      <Breadcrumb>
        {breadcrumbs.map(breadcrumb => (
          <React.Fragment key={breadcrumb.key}>
            <Breadcrumb.Item>
              <Link
                replace
                to={
                  breadcrumb.props.children === "文章"
                    ? {
                        pathname: breadcrumb.props.location.pathname,
                        state: { mode: "view" }
                      }
                    : breadcrumb.props.match.url
                }
              >
                {breadcrumb}
              </Link>
              <Helmet>
                <title>{breadcrumb.props.children}</title>
              </Helmet>
            </Breadcrumb.Item>
            {breadcrumb.props.match.path === "/article/" &&
              (breadcrumb.props.location.pathname === "/article" ||
                breadcrumb.props.location.pathname === "/article/") && (
                <Breadcrumb.Item>
                  <Link to={breadcrumb.props.match.url}>新建</Link>{" "}
                  <Helmet>
                    <title>新建</title>
                  </Helmet>
                </Breadcrumb.Item>
              )}
          </React.Fragment>
        ))}
      </Breadcrumb>
    </>
  );
});
