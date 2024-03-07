import { useState } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { Category } from "../../models/Party/Categories";
import { Party } from "../../models/Party/Party";
import { UploadImage } from "../../components/UploadImage";

interface categoryProps {
  categoryParty: Category[];
}

interface imageList {
  url: string;
  uid: string;
}

const PartyForm = ({ categoryParty }: categoryProps) => {
  const { TextArea } = Input;
  const [imagesUrl, setImagesUrl] = useState<imageList[]>([]);

  const onFinish = (values: Party) => {
    console.log("Success:", { ...values, images: imagesUrl });
  };

  console.log(imagesUrl)
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
            {categoryParty &&
              categoryParty.length > 0 &&
              categoryParty.map((category: Category) => {
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
        <Form.Item label="Address" name="address">
          <Input />
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
        <Form.Item label="Upload" valuePropName="fileList">
          <UploadImage setImagesUrl={setImagesUrl} imagesUrl={imagesUrl} />
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

export default PartyForm;
