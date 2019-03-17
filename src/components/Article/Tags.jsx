import React, { Fragment } from "react";
import { Tag, Input, Tooltip, Icon } from "antd";

class EditableTagGroup extends React.Component {
  state = {
    tags: [
      "UnremovableUnremovableUnremovableUnremovableUnremovable",
      "Tag 2",
      "Tag 3"
    ],
    inputVisible: false,
    inputValue: ""
  };

  static getDerivedStateFromProps(nP, pS) {
    if (nP.tags !== pS.tags) {
      return {
        tags: nP.tags
      };
    }
    return null;
  }

  handleClose = removedTag => {
    const { onChange } = this.props;
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    onChange({ tags });
  };

  showInput = (index, value) => {
    this.setState({ inputVisible: index, inputValue: value }, () =>
      this.input.focus()
    );
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = (e, index) => {
    console.log(index);
    const { onChange } = this.props;

    const { inputValue, tags } = this.state;

    let newTags = [...tags];
    if (inputValue && tags.indexOf(inputValue) === -1) {
      if (index !== undefined) {
        newTags[index] = inputValue;
      } else {
        newTags = [...tags, inputValue];
      }
    }
    this.setState(
      {
        inputVisible: false,
        inputValue: ""
      },
      () => onChange({ tags: newTags })
    );
  };

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    // console.log(this);
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 10;
          const tagElem =
            inputVisible === index ? (
              <Input
                ref={ref => (this.input = ref)}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={e => this.handleInputConfirm(e, index)}
                onPressEnter={e => this.handleInputConfirm(e, index)}
                key={tag}
              />
            ) : (
              <Tag
                key={tag}
                closable
                onDoubleClick={() => this.showInput(index, tag)}
                afterClose={() => this.handleClose(tag)}
              >
                {isLongTag ? `${tag.slice(0, 10)}...` : tag}
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
        {inputVisible === -1 ? (
          <Input
            ref={ref => (this.input = ref)}
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
            onClick={() => this.showInput(-1)}
            style={{ background: "#fff", borderStyle: "dashed" }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}

export default EditableTagGroup;
