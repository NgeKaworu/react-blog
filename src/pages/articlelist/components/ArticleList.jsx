import React from "react";
import { connect } from "dva";
import ViewerContainer from "../../../components/ViewerContainer";
import styles from "./ArticleList.less";
import router from "umi/router";

@connect(state => ({ page: state.page, user: state.user.uid }))
class ArticleList extends React.Component {
  handleDetailClick = (e, article_id) => {
    console.log(article_id);
    router.push(`/article/${article_id}`);
  };

  handleDetailClick = (e, article_id) => {
    console.log(article_id);
    router.push({
      pathname: `/article/${article_id}`,
      state: '2333'
    });
  };
  render() {
    console.log(this.props);
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
            />
          </div>
        ))}
      </>
    );
  }
}

export default ArticleList;
