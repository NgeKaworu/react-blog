import Viewer from "./Viewer";
import React from "react";
import { Button, Icon, Tag, Tooltip } from "antd";

class ViewerContainer extends React.Component {
  handleRemoveClick = e => {
    const { onRemoveClick } = this.props;
    onRemoveClick && onRemoveClick(e);
  };

  handleEditClick = e => {
    const { onEditClick } = this.props;
    onEditClick && onEditClick(e);
  };

  handleDetailClick = e => {
    const { onDetailClick } = this.props;
    onDetailClick && onDetailClick(e);
  };

  handleTagClick = e => {
    const { onTagClick } = this.props;
    onTagClick && onTagClick(e);
  };

  render() {
    const { title, text, remove, edit, detail, tags } = this.props;
    return (
      <>
        <Button.Group style={{ float: "right" }}>
          {edit && (
            <Button size="small" onClick={this.handleEditClick}>
              <Icon type="edit" style={{ color: "black" }} />
            </Button>
          )}
          {remove && (
            <Button size="small" onClick={this.handleRemoveClick}>
              <Icon type="delete" style={{ color: "red" }} />
            </Button>
          )}
        </Button.Group>
        {title && (
          <h2
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {title}
          </h2>
        )}
        {tags &&
          tags.map(tag => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag key={tag} onClick={this.handleTagClick}>
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
        <Viewer text={text} />
        {detail && (
          <Button type="dashed" size="small" onClick={this.handleDetailClick}>
            阅读全文
          </Button>
        )}
      </>
    );
  }
}

export default ViewerContainer;
