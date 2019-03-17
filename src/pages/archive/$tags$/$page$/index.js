import React from "react";
import { Tag, Tooltip, Badge } from "antd";

import { connect } from "dva";
import { router } from "umi";

import { ArticleList } from "../../../../components/Article";

import styles from "./index.less";

export default connect(({ archive: { tags } }) => ({ tags }))(({ tags }) => {
  return (
    <>
      <div className={styles["wrap"]}>
        {tags &&
          tags.map(tag => {
            const isLongTag = tag._id.length > 10;
            const tagElem = (
              <Tag
                key={tag._id}
                onClick={e => router.push(`/archive/${tag._id}`)}
              >
                {isLongTag ? `${tag._id.slice(0, 10)}...` : tag._id}
                <Badge count={tag.sum} style={{ backgroundColor: "#52c41a" }} />
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag._id} key={tag._id}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
      </div>
      <ArticleList />
    </>
  );
});
