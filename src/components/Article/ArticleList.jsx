import React from "react";
import { connect } from "dva";
import ViewerContainer from "./ViewerContainer";
import styles from "../../pages/index.less";
import router from "umi/router";

@connect(({ articleList, user: { uid } }) => ({ articleList, uid }))
class ArchiveList extends React.Component {
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
          type: "articleList/reload",
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

  handleTagClick = (e, article_id) => {
    router.push(`/archive/${e.currentTarget.innerText}`)
  };

  render() {
    const { uid, articleList } = this.props;
    const { list } = articleList;
    return (
      <>
        {list.map(i => (
          <div className={styles["wrap"]} key={i._id}>
            <ViewerContainer
              title={i.title}
              text={i.content}
              tags={i.tags}
              detail
              remove={i.owner === uid}
              edit={i.owner === uid}
              onDetailClick={e => this.handleDetailClick(e, i._id)}
              onEditClick={e => this.handleEditClick(e, i._id)}
              onRemoveClick={e => this.handleRemoveClick(e, i._id)}
              onTagClick={e => this.handleTagClick(e, i._id)}
            />
          </div>
        ))}
      </>
    );
  }
}

export default ArchiveList;
