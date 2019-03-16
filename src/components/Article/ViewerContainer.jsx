import Viewer from "./Viewer";
import React from "react";
import { Button, Icon } from "antd";

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

  render() {
    const { title, text, remove, edit, detail } = this.props;
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
        <Viewer title={title} text={text} />
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
