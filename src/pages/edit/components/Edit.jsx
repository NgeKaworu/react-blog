import { connect } from "dva";
import React from "react";
import Editor from "../../../components/Editor";
import Viewer from "../../../components/Viewer";

@connect(state => ({
  edit: state.edit
}))
class Edit extends React.Component {
  state = {
    title: "",
    content: "",
    url: "",
    article_id: "",
    fileList: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.title === "" ||
      prevState.content === "" ||
      prevState.fileList.length === 0
    ) {
      return nextProps.edit;
    }
    return null;
  }

  handleSubmit = value => {
    const { title, content, upload: fileList } = value;
    this.props.dispatch({
      type: "edit/create",
      payload: { title, content, fileList }
    });
  };

  handleChange = value => {
    this.setState({ ...value });
    console.log(value);
  };

  hanldeUpload = e => {
    console.log("Upload event:", e);
    const bala = e.fileList[e.fileList.length - 1];
    bala.url = "https://www.baidu.com";
    this.setState({ fileList: e.fileList });
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render = () => {
    return (
      <>
        <Editor
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onUpload={this.hanldeUpload}
          {...this.state}
        />
        <Viewer text={this.state.content} />
      </>
    );
  };
}
export default Edit;
