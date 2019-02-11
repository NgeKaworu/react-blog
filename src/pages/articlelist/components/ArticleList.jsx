import React from "react";
import { connect } from "dva";
import ViewerContainer from "../../../components/ViewerContainer";
import styles from "../../index.less";
import router from "umi/router";

@connect(state => ({ page: state.page, user: state.user.uid }))
class ArticleList extends React.Component {
  handleEditClick = (e, article_id) => {
    router.push({
      pathname: `/article/${article_id}`,
      state: { mode: "edit" }
    });
  };

  handleRemoveClick = (e, article_id) => {
    this.props
      .dispatch({
        type: "article/remove",
        payload: article_id
      })
      .then(() =>
        this.props.dispatch({
          type: "page/reload",
          payload: article_id
        })
      );
  };

  handleDetailClick = (e, article_id) => {
    router.push({
      pathname: `/article/${article_id}`,
      state: { mode: "view" }
    });
  };

  render() {
    const { user } = this.props;
    const { list } = this.props.page;
    return (
      <>
        {list.map(i => (
          <div className={styles.wrap} key={i._id}>
            <ViewerContainer
              title={i.title}
              text={i.content}
              detail
              remove={i.owner === user}
              edit={i.owner === user}
              onDetailClick={e => this.handleDetailClick(e, i._id)}
              onEditClick={e => this.handleEditClick(e, i._id)}
              onRemoveClick={e => this.handleRemoveClick(e, i._id)}
            />
          </div>
        ))}
      </>
    );
  }
}

export default ArticleList;
