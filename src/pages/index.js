import React from "react";
import { connect } from "dva";
import ArticleListPage from "./$page$";

function IndexPage() {
  return (
    <>
      <ArticleListPage />
    </>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
