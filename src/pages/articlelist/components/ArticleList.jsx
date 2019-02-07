import React from "react";
import { connect } from "dva";
import ViewerContainer from "../../../components/ViewerContainer";
import styles from "./ArticleList.less";

@connect(state => state.page)
class ArticleList extends React.Component {
  render() {
    console.log(this.props);
    const { list } = this.props;

    return (
      <>
        {list.map(i => (
          <div className={styles.wrap} key={i._id}>
            <ViewerContainer title={i.title} text={i.content} />
          </div>
        ))}
      </>
    );
  }
}

export default ArticleList;
