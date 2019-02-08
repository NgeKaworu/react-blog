import { connect } from "dva";
import React from "react";
import Editor from "../../../components/Editor";
import ViewerContainer from "../../../components/ViewerContainer";
import immutable from "immutable";
import { Row, Col } from "antd";
import styles from "../../index.less";
@connect(state => ({
  article: state.article
}))
class Article extends React.Component {
  state = {
    title: "",
    content: "",
    url: "",
    article_id: "",
    fileList: [],
    mode: "view"
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the current height of the list so we can adjust scroll later.
    if (!immutable.is(this.props.article, prevProps.article)) {
      return { ...this.props.article.toJS() };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    if (snapshot !== null) {
      this.setState({ ...this.state, ...snapshot });
    }
  }

  componentDidMount() {
    this.setState({ ...this.props.article.toJS() });
  }

  handleSubmit = values => {
    const { title, content, upload: fileList } = values;
    const { article_id } = this.state;
    if (article_id) {
      this.props.dispatch({
        type: "article/update",
        payload: { id: article_id, values: { title, content, fileList } }
      });
    } else {
      this.props.dispatch({
        type: "article/create",
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
      <Row style={{ minWidth: "980px" }} gutter={24}>
        <Col span={11} offset={1}>
          <div className={styles.wrap}>
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              onUpload={this.hanldeUpload}
              {...this.state}
            />
          </div>
        </Col>
        <Col span={11}>
          <div
            className={styles.wrap}
            style={{ maxHeight: "1109px", overflowY: "auto" }}
          >
            <ViewerContainer
              text={this.state.content}
              title={this.state.title || "预览"}
              className={styles.wrap}
            />
          </div>
        </Col>
      </Row>
    );
  };
}
export default Article;
