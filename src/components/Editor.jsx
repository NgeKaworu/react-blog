import React from "react";
import { Input, Form, Button } from "antd";
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

  render = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          label="标题"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator("title", {
            rules: [{ required: true, message: "请输入标题" }]
          })(<Input placeholder="请输入标题" />)}
        </Form.Item>
        <Form.Item
          label="内容"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator("content", {
            rules: [{ required: true, message: "内容不能为空" }]
          })(
            <TextArea
              autosize={{ minRows: 8 }}
              placeholder="内容支持markdown"
              onChange={this.handleSelectChange}
            />
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };
}
export default Editor;
