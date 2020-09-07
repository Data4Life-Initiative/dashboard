import React from "react";
import { Form, Input, Button, Row, Col } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const IssueCertificateForm = (props) => {
  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  const {fields} = this.props;

  return (
    <Form name="dynamic_form_item" {...layout} onFinish={onFinish}>

      {
        fields.map(field => <Form.Item
          label={field}
          key={field}
          rules={[
            {
              required: true,
              message: "Please input this field",
            },
          ]}
          validateTrigger={['onChange', 'onBlur']}
        >
            <Input placeholder="passenger name" style={{ width: '60%' }} />
        </Form.Item> )
      }
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={aries.load}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default IssueCertificateForm;