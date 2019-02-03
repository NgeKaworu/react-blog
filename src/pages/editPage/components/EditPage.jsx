import { connect } from "dva";
import withRouter from "umi/withRouter";
import React from "react";

import Editor from "../../../components/Editor";
import Viewer from "../../../components/Viewer";
@connect()
@withRouter
class EditPage extends React.Component {
  state = {
    title: "balba",
    content: "$$e=mc^2$$\nabc\nbbc",
    fileList: [
      {
        uid: "-1",
        name: "xxx.png",
        status: "done",
        url:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        thumbUrl:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      },
      {
        uid: "-2",
        name: "yyy.png",
        status: "done",
        url:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        thumbUrl:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      }
    ]
  };

  componentWillMount() {
    console.log(this.props);
  }

  handleSubmit = value => {
    console.log(value);
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
    console.log(this.props);
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
export default EditPage;
