import React from "react";
import { connect } from "dva";
import { Button } from "antd";
import Viewer from "../../../components/Viewer";
import styles from "./ArticleList.less";

@connect(state => state.page)
class ArticleList extends React.Component {
  render() {
    console.log(this.props);
    const { list } = this.props;

    return (
      <>
        {list.map(i => (
          <div class={styles.wrap} key={i._id}>
            <Viewer title={i.title} text={i.content} />
            <Button type="dashed" size="small" ghost>
              阅读全文
            </Button>
          </div>
        ))}
      </>
    );
  }
}

export default ArticleList;
