import { connect } from "dva";
import React from "react";
import Editor from "../../../components/Editor";
import ViewerContainer from "../../../components/ViewerContainer";
import immutable from "immutable";
import { Row, Col, Skeleton } from "antd";
import styles from "../../index.less";
import router from "umi/router";
import request from "../../../utils/request";

@connect(state => ({
  article: state.article,
  user: state.user.uid,
  token: state.user.token,
  loading: state.loading.models.article
}))
class Article extends React.Component {
  constructor(props) {
    super(props);
    const init = { ...this.props.article.toJS() };
    this.state = { ...init, fileListCache: init.fileList };
  }

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

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleSubmit = values => {
    const { title, content, upload } = values;
    const fileList = upload.filter(
      file => !file.status || file.status === "done"
    );
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

  handleUpload = e => {
    this.setState({ fileList: e.fileList });

    const { status } = e.file;
    if (status === "done") {
      const { response, name } = e.file;
      const { url, f_id } = response;
      this.setState({
        fileListCache: [
          ...this.state.fileListCache,
          { url: `/api/${url}`, uid: f_id, name }
        ]
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(
        () =>
          this.setState({
            fileList: this.state.fileListCache
          }),
        500
      );
    }
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

  handleFileRemove = e => {
    async function removefile() {
      await request(`/api/files/v1/${e.uid}`, {
        method: "DELETE"
      });
    }
    const newList = this.state.fileListCache.filter(file => file.uid !== e.uid);
    this.setState({
      fileListCache: newList
    });
    removefile();
  };

  render = () => {
    const { mode, content, title, owner, article_id } = this.state;
    const { user, loading, token } = this.props;

    return (
      <Skeleton loading={loading} avatar active>
        <Row gutter={24}>
          {mode === "edit" && (
            <Col span={12}>
              <div className={styles.wrap}>
                <Editor
                  token={token}
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  onUpload={this.handleUpload}
                  onFileRemove={this.handleFileRemove}
                  {...this.state}
                />
              </div>
            </Col>
          )}
          <Col span={mode === "edit" ? 12 : 24}>
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
      </Skeleton>
    );
  };
}
export default Article;
