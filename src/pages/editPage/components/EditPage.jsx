import { connect } from "dva";
import React from "react";

import Editor from "../../../components/Editor";
import Viewer from "../../../components/Viewer";

@connect()
class EditPage extends React.Component {
  state = {
    title: "balba",
    content: "$$e=mc^2$$\nabc\nbbc"
  };

  handleSubmit = value => {
    console.log(value);
  };

  handleChange = value => {
    this.setState({ ...value });
  };

  render = () => {
    return (
      <>
        <Editor
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          {...this.state}
        />
        <Viewer text={this.state.content} />
      </>
    );
  };
}
export default EditPage;
