import React from "react";
import { connect } from "dva";
import ArticleList from "./articles";
function IndexPage() {
  return (
    <>
      <ArticleList />
    </>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
