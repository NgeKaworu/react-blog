import { connect } from "dva";
import React from "react";
import Editor from "../../../components/Editor";
import ViewerContainer from "../../../components/ViewerContainer";
import immutable from "immutable";
import { Row, Col } from "antd";
import styles from "../../index.less";
import router from "umi/router";
@connect(state => ({
  article: state.article,
  user: state.user.uid
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

  componentWillUnmount() {
    this.setState({
      mode: "view"
    });
  }

  handleSubmit = values => {
    const { title, content, upload: fileList } = values;
    const { article_id } = this.state;
    if (article_id) {
      this.props.dispatch({
        type: "article/update",
        payload: { id: article_id, values: { title, content, fileList } }
      });

      this.setState({
        mode: "view"
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

  handleEditClick = e => {
    router.replace({
      pathname: `/article/${this.state.article_id}`,
      state: { mode: "edit" }
    });
  };

  handleRemoveClick = e => {
    this.props.dispatch({
      type: "article/remove",
      payload: this.state.article_id
    });
  };

  render = () => {
    const { mode, content, title, owner, article_id } = this.state;
    const { user } = this.props;
    return (
      <Row style={{ minWidth: "980px" }} gutter={24}>
        {mode === "edit" && (
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
        )}
        <Col span={mode === "edit" ? 11 : 12} offset={mode === "edit" ? 0 : 6}>
          <div
            className={styles.wrap}
            style={{ maxHeight: "1109px", overflowY: "auto" }}
          >
            <ViewerContainer
              text={content}
              title={title || "新建"}
              className={styles.wrap}
              remove={owner === user && article_id}
              edit={owner === user && mode !== "edit"}
              onEditClick={this.handleEditClick}
              onRemoveClick={this.handleRemoveClick}
            />
          </div>
        </Col>
      </Row>
    );
  };
}
export default Article;
