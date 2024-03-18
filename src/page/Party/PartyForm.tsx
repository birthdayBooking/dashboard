import { useState } from "react";
import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { Category } from "../../models/Party/Categories";
import { Party } from "../../models/Party/Party";
import { UploadImage } from "../../components/UploadImage";
import Perks, { PerkType } from "./Perks";
import { v4 as uuidv4 } from "uuid";
import { addParty } from "../../services/apiPatry";

interface CategoryProps {
  categoryParty: Category[];
  setOpen: (isOpen: boolean) => void;
}

interface imageList {
  url: string;
  uid: string;
}

// interface responsePerk {
//   statusVode
// }

const PartyForm: React.FC<CategoryProps> = ({ categoryParty, setOpen }) => {
  const { TextArea } = Input;
  const [imagesUrl, setImagesUrl] = useState<imageList[]>([]);
  const [list, setList] = useState<PerkType[]>([{ id: uuidv4(), perk: "" }]);
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: Party) => {
    const listPerk = list.map((perk) => perk.perk);
    const imagesList = imagesUrl.map((item) => item.url);
    const party = {
      ...values,
      images: imagesList,
      perks: listPerk,
      hostId: "65eeb233764667697007436a",
    };
    try {
      setLoading(true);
      const result = await addParty(party);
      console.log(result);
      if (result.statusCode === 201) {
        setLoading(false);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
      >
        <Row justify="center">
          <Col span={12}>
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
              rules={[
                { required: true, message: "Please select party category!" },
              ]}
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
              <TextArea rows={4} maxLength={100} style={{ height: "60px" }} />
            </Form.Item>
            <Form.Item label="detail description" name="mainDetail">
              <TextArea rows={4} maxLength={300} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="perks" name="perks">
              {/* <TextArea rows={4} /> */}
              <Perks listPerk={list} setListPerk={setList} />
            </Form.Item>
            <Form.Item label="Price" name="price">
              <InputNumber min={100000} style={{ width: 180 }} />
            </Form.Item>
            <Form.Item label="Images" valuePropName="fileList">
              <UploadImage setImagesUrl={setImagesUrl} imagesUrl={imagesUrl} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PartyForm;
