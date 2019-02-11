import { connect } from "dva";
import React from "react";
import Editor from "../../../components/Editor";
import ViewerContainer from "../../../components/ViewerContainer";
import immutable from "immutable";
import { Row, Col, Skeleton } from "antd";
import styles from "../../index.less";
import router from "umi/router";
import request from "../../../utils/request";
import getIn from "../../../utils/getIn";

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
    this.state = {
      ...init,
      fileListCache: init.fileList,
      windowScrollTop: 0
    };
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
    // 保存editor的初始offsetTop
    if (prevState.editorOffsetTop === undefined && this.editor) {
      const editorOffsetTop = this.editor.getBoundingClientRect().top;
      this.setState({
        editorOffsetTop
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.scrollTimer);
    window.removeEventListener("scroll", this.handleWindowScroll);
  }

  handleSubmit = values => {
    const { title, content, upload } = values;
    const fileList =
      upload && upload.filter(file => !file.status || file.status === "done");
    const { article_id } = this.state;
    if (article_id) {
      this.props.dispatch({
        type: "article/update",
        payload: { id: article_id, values: { title, content, fileList } }
      });
      this.setState({
        mode: "view"
      });

      window.removeEventListener("scroll", this.handleWindowScroll);
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
    this.props
      .dispatch({
        type: "article/remove",
        payload: this.state.article_id
      })
      .then(() =>
        this.props.dispatch({
          type: "article/reload",
          payload: this.state.article_id
        })
      );
  };

  handleFileRemove = e => {
    async function removefile() {
      await request(`/api/files/v1/${e.uid}`, {
        method: "DELETE"
      });
    }
    const { fileListCache } = this.state;
    const newList =
      fileListCache && fileListCache.filter(file => file.uid !== e.uid);
    this.setState({
      fileListCache: newList
    });
    removefile();
  };

  handleWindowScroll = e => {
    // 记录上次执行的时间
    // 定时器
    // 默认间隔为 250ms
    const threshold = 75;
    // 返回的函数，每过 threshold 毫秒就执行一次 fn 函数
    let now = +new Date();
    // 如果距离上次执行 fn 函数的时间小于 threshold，那么就放弃
    // 执行 fn，并重新计时
    if (this.last && now < this.last + threshold) {
      clearTimeout(this.scrollTimer);
      // 保证在当前时间区间结束后，再执行一次 fn
      this.scrollTimer = setTimeout(() => {
        this.last = now;
        this._setWindowScrollToState(e);
      }, threshold);
      // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      this.last = now;
    this._setWindowScrollToState(e);
    }
  };

  _setWindowScrollToState = e => {
    const windowScrollTop = getIn(e, [
      "target",
      "documentElement",
      "scrollTop"
    ]);
    windowScrollTop && this.setState({ windowScrollTop });
  };

  render = () => {
    const {
      mode,
      content,
      title,
      owner,
      article_id,
      windowScrollTop,
      editorOffsetTop
    } = this.state;
    const { user, loading, token } = this.props;
    const setFixed = windowScrollTop > editorOffsetTop;

    mode === "edit" &&
      window.addEventListener("scroll", this.handleWindowScroll);
    return (
      <Skeleton loading={loading} avatar active>
        <Row gutter={24}>
          {mode === "edit" && (
            <Col span={12}>
              <div
                ref={ref => (this.editor = ref)}
                className={styles.wrap}
                style={{
                  width: setFixed ? "33%" : "100%",
                  minWidth: "288px",
                  height: "100%",
                  maxHeight: "1250px",
                  position: setFixed ? "fixed" : "relative",
                  overflowY: "auto",
                  top: 0
                }}
              >
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
              style={{
                overflowY: "auto"
              }}
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
