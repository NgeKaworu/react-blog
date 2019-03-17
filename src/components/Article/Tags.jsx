import React, { Fragment } from "react";
import { Tag, Input, Tooltip, Icon, Badge } from "antd";

class EditableTagGroup extends React.Component {
  state = {
    tags: ["Unremovable", "Tag 2", "Tag 3"],
    inputVisible: false,
    inputValue: ""
  };

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: ""
    });
  };

  saveInputRef = input => (this.input = input);

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Fragment key={tag}>
              {inputVisible ? (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              ) : (
                <Tag
                  closable
                  onDoubleClick={this.showInput}
                  afterClose={() => this.handleClose(tag)}
                  onClick={(...arg) => console.log(arg)}
                >
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  <Badge
                    count={25}
                    style={{
                      verticalAlign: "bottom",
                      marginleft: "6px"
                    }}
                  />
                </Tag>
              )}
            </Fragment>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onDoubleClick={this.showInput}
            style={{ background: "#fff", borderStyle: "dashed" }}
          >
            <Icon type="plus" /> New Tag
            <Badge count={25} />
          </Tag>
        )}
      </div>
    );
  }
}

export default EditableTagGroup;
