import React from "react";
import { Input, Form, Button, Upload, Icon } from "antd";
import getIn from "../utils/getIn";
import styles from "./Editor.less";
const { TextArea } = Input;

@Form.create({
  onValuesChange(props, changedValues, allValues) {
    props.onChange && props.onChange(changedValues);
  },
  mapPropsToFields(props) {
    return {
      title: Form.createFormField({
        value: props.title || ""
      }),
      content: Form.createFormField({
        value: props.content || ""
      }),
      upload: Form.createFormField({
        value: props.fileList || ""
      })
    };
  }
})
class Editor extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };

  handleInsert = e => {
    const node = getIn(this.textarea, ["textAreaRef"]);
    const myValue = `\n![${e.name}](${e.url})`;
    if (document.selection) {
      //IE support
      node.focus();
      let sel = document.selection.createRange();
      sel.text = myValue;
      sel.select();
    } else if (node.selectionStart || node.selectionStart === 0) {
      //MOZILLA/NETSCAPE support
      const startPos = node.selectionStart;
      const endPos = node.selectionEnd;
      const beforeValue = node.value.substring(0, startPos);
      const afterValue = node.value.substring(endPos, node.value.length);

      node.value = beforeValue + myValue + afterValue;

      node.selectionStart = startPos + myValue.length;
      node.selectionEnd = startPos + myValue.length;
      node.focus();
    } else {
      node.value += myValue;
      node.focus();
    }
    this.props.onChange({
      content: node.value
    });
  };

  render = () => {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="标题" {...formItemLayout}>
          {getFieldDecorator("title", {
            rules: [{ required: true, message: "请输入标题" }]
          })(<Input placeholder="请输入标题" />)}
        </Form.Item>
        <Form.Item label="内容" {...formItemLayout}>
          {getFieldDecorator("content", {
            rules: [{ required: true, message: "内容不能为空" }],
            getValueFromEvent: this.handleSelectChange
          })(
            <TextArea
              autosize={{ minRows: 28, maxRows: 28 }}
              placeholder="内容支持markdown"
              ref={textarea => (this.textarea = textarea)}
            />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="上传图片">
          {getFieldDecorator("upload", {
            getValueFromEvent: this.props.onUpload
          })(
            <Upload
              name="file"
              // action="/api/files/v1/upload"
              action="/upload.do"
              listType="picture"
              fileList={this.props.fileList}
              onPreview={this.handleInsert}
              className={styles.upload}
              multiple
            >
              <Button>
                <Icon type="upload" /> 选择图片
              </Button>
            </Upload>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 20, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  };
}
export default Editor;
