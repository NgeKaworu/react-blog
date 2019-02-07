import React from "react";
import { connect } from "dva";
import ArticlePage from "./$page$";
function IndexPage() {
  return (
    <>
      <ArticlePage />
    </>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
