import React from "react";
import { connect } from "dva";
import Edit from "./edit/$article_id$";
function IndexPage() {
  return (
    <>
      <Edit />
    </>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
