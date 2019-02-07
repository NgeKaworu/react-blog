import Viewer from "./Viewer";
import React from "react";
import { Button, Icon } from "antd";

class ViewerContainer extends React.Component {
  handleDeleteClick = e => {
    console.log(e);
  };

  handleEditClick = e => {
    console.log(e);
  };

  handleDetailClick = e => {
    console.log(e);
  };

  render() {
    const { title, text } = this.props;

    console.log(this.props);

    return (
      <>
        <Button.Group style={{ float: "right" }}>
          <Button size="small" onClick={this.handleEditClick}>
            <Icon type="edit" style={{ color: "black" }} />
          </Button>
          <Button size="small" onClick={this.handleDeleteClick}>
            <Icon type="delete" style={{ color: "red" }} />
          </Button>
        </Button.Group>
        <Viewer title={title} text={text} />
        <Button type="dashed" size="small" onClick={this.handleDetailClick}>
          阅读全文
        </Button>
      </>
    );
  }
}

export default ViewerContainer;
