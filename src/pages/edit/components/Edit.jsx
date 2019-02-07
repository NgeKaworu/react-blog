import { connect } from "dva";
import React from "react";
import Editor from "../../../components/Editor";
import Viewer from "../../../components/Viewer";
import immutable from "immutable";

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

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the current height of the list so we can adjust scroll later.
    if (!immutable.is(this.props.edit, prevProps.edit)) {
      return { ...this.props.edit.toJS() };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    if (snapshot !== null) {
      this.setState({ ...snapshot });
    }
  }

  handleSubmit = values => {
    const { title, content, upload: fileList } = values;
    const { article_id } = this.state;
    if (article_id) {
      this.props.dispatch({
        type: "edit/update",
        payload: { id: article_id, values: { title, content, fileList } }
      });
    } else {
      this.props.dispatch({
        type: "edit/create",
        payload: { title, content, fileList }
      });
    }
  };

  handleChange = values => {
    this.setState({ ...values });
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
        <Viewer text={this.state.content} title='预览'/>
      </>
    );
  };
}
export default Edit;
