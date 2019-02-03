import React from "react";
import { connect } from "dva";
import EditPage from "./editPage/$article_id$";
function IndexPage() {
  return (
    <>
      <EditPage />
    </>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
