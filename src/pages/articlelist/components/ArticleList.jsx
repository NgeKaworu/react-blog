import React from "react";
import { connect } from "dva";
import { Button, Icon } from "antd";
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
          <div className={styles.wrap} key={i._id}>
            <Button.Group className={styles.btnGroup}>
              <Button size="small" ghost>
                <Icon type="edit" style={{ color: "black" }} />
              </Button>
              <Button size="small" ghost>
                <Icon type="delete" style={{ color: "red" }} />
              </Button>
            </Button.Group>
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
