import React from "react";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Col, Input, Row } from "antd";
import { v4 as uuidv4 } from "uuid";

const style = {
  cursor: "pointer",
};

export interface PerkType {
  id: string;
  perk: string;
}

interface PerkProps {
  setListPerk: (list: PerkType[]) => void;
  listPerk: PerkType[];
}

const Perks: React.FC<PerkProps> = ({ setListPerk, listPerk }) => {
  function addPerk() {
    setListPerk((listPerk) => [...listPerk, { id: uuidv4(), perk: "" }]);
  }

  function deletePerk(id: string) {
    const leftItem = listPerk.filter((item) => item.id !== id);
    setListPerk(leftItem);
  }

  function handleOnChange(data: string, id: string) {
    const item = listPerk.find((item) => item.id === id);
    if (item) {
      item.perk = data;
    }
  }

  return (
    <>
      {listPerk.map((item) => {
        return (
          <Row
            gutter={16}
            justify="center"
            align="middle"
            key={item.id}
            style={{ marginTop: 10 }}
          >
            <Col span={16}>
              <Input
                placeholder="Add perk"
                onChange={(e) => handleOnChange(e.target.value, item.id)}
                required={true}
              />
            </Col>
            <Col span={8}>
              <div style={{ display: "flex", gap: 15 }}>
                <MinusCircleOutlined
                  style={style}
                  onClick={() => deletePerk(item.id)}
                />
                <PlusCircleOutlined style={style} onClick={addPerk} />
              </div>
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default Perks;
