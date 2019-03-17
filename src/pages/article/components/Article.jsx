import { connect } from "dva";
import React from "react";

import { Editor, ViewerContainer } from "../../../components/Article";

import immutable from "immutable";
import { Row, Col, Skeleton } from "antd";

import styles from "../../../pages/index.less";

import router from "umi/router";

import request from "../../../utils/request";
import getIn from "../../../utils/getIn";
import { Helmet } from "react-helmet";

@connect(state => ({
  article: state.article,
  user: state.user.uid,
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
    window.removeEventListener("scroll", this.handleWindowScroll);
  }

  handleSubmit = values => {
    const { title, content, upload } = values;
    const { tags } = this.state;
    const fileList =
      upload && upload.filter(file => !file.status || file.status === "done");
    const { article_id } = this.state;
    if (article_id) {
      this.props.dispatch({
        type: "article/update",
        payload: { id: article_id, values: { title, content, fileList, tags } }
      });
      this.setState({
        mode: "view"
      });

      window.removeEventListener("scroll", this.handleWindowScroll);
    } else {
      this.props.dispatch({
        type: "article/create",
        payload: { title, content, fileList, tags }
      });
    }
  };

  handleChange = values => {
    this.setState({ ...values });
  };

  handleTagsChange = ({ tags }) => {
    this.setState({
      tags
    });
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

  handleTagClick = e => {
    router.push(`/archive/${e.currentTarget.innerText}`);
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
    e.preventDefault();
    e.stopPropagation();
    this._setWindowScrollToState(e);
  };

  handleFormScroll = e => {
    e.preventDefault();
    e.stopPropagation();
    this._setWindowScrollWithRadio(e);
  };

  _setWindowScrollToState = e => {
    const windowScrollTop = getIn(e, [
      "target",
      "documentElement",
      "scrollTop"
    ]);
    this.setState({ windowScrollTop });
  };

  _setWindowScrollWithRadio = e => {
    const { currentTarget: f_ct } = e;
    const { scrollHeight: f_sh, clientHeight: f_ch, scrollTop: f_st } = f_ct;
    const maxFormScroll = f_sh - f_ch;
    const ratio = f_st / maxFormScroll;
    const { scrollHeight: b_sh, clientHeight: b_ch } = document.body;
    const maxWindowScroll = b_sh - b_ch;
    const scrollWithRatio = ~~(ratio * maxWindowScroll);
    window.scrollTo({
      top: scrollWithRatio
      // 平滑过渡, 效果不太好
      // behavior: "smooth"
    });
  };

  render = () => {
    const {
      mode,
      content,
      title,
      owner,
      article_id,
      windowScrollTop,
      editorOffsetTop,
      tags
    } = this.state;

    const { user, loading } = this.props;
    const setFixed = windowScrollTop > editorOffsetTop;
    mode === "edit" &&
      window.addEventListener("scroll", this.handleWindowScroll);
    return (
      <Skeleton loading={loading} avatar active>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Row gutter={24} style={{ minHeight: "1250px" }}>
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
                <div style={{ marginRight: setFixed && "-9px" }}>
                  <Editor
                    onChange={this.handleChange}
                    onTagsChange={this.handleTagsChange}
                    onSubmit={this.handleSubmit}
                    onUpload={this.handleUpload}
                    onFileRemove={this.handleFileRemove}
                    onFormScroll={this.handleFormScroll}
                    {...this.state}
                  />
                </div>
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
                tags={tags}
                text={content}
                title={title || "新建"}
                className={styles.wrap}
                remove={owner === user && article_id}
                edit={owner === user && mode !== "edit"}
                onEditClick={this.handleEditClick}
                onRemoveClick={this.handleRemoveClick}
                onTagClick={this.handleTagClick}
              />
            </div>
          </Col>
        </Row>
      </Skeleton>
    );
  };
}
export default Article;
