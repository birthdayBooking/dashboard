import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import { Categories } from "../../models/Party/Categories";
import { uploadSingle } from "../../services/upload";

const { TextArea } = Input;

// const normFile = async (e: any) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   console.log(e.file);
//   return e?.fileList;
// };

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const FormAdd: React.FC<{
  categoryParty: Categories[] | undefined;
}> = ({ categoryParty }) => {
  const { categories } = categoryParty;

  // function getUploadLinkUrl() => {

  // }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleUpload({ file }: { file: any }) {
    console.log(file);
    try {
      const data = await uploadSingle(file);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input party name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select party category!" }]}
        >
          <Select>
            {categories &&
              categories.length > 0 &&
              categories.map((category: Categories) => {
                // Explicitly specify the type of 'category' parameter
                return (
                  <Select.Option value={category.id} key={category.id}>
                    {category.name}
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item label="Max users" name="maxCustomers">
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item label="short description" name="shortDetail">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="detail description" name="mainDetail">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="perks" name="perks">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Upload"
          // valuePropName="fileList"
          // getValueFromEvent={normFile}
          status=""
          name="image"
        >
          <Upload multiple={false} customRequest={handleUpload} maxCount={1}>
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormAdd;
