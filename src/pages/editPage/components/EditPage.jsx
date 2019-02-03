import { connect } from "dva";
import React from "react";

import Editor from "../../../components/Editor";
import Viewer from "../../../components/Viewer";

@connect()
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

  handleSubmit = value => {
    console.log(value);
  };

  handleChange = value => {
    this.setState({ ...value });
    // console.log(console.log);
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
export default EditPage;
