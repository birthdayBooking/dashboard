import { Button, Space } from "antd";
import PartyUI from "./PartyTable";
import ModalAdd from "./Modal";
import { useEffect, useState } from "react";
import { Party } from "../../models/Party/Party";
import { getAll } from "../../services/apiPatry";

export const LayoutParty = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [parties, setParties] = useState<Party[]>();
  const [isloading, setIsloading] = useState<boolean>(false);

  async function getAllParty() {
    try {
      setIsloading(true);
      const result = await getAll();
      if (result?.length) {
        const partiesWithKey = result.map((party: Party) => ({
          ...party,
          key: party.id,
        }));
        setParties(partiesWithKey);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }
  useEffect(() => {
    getAllParty();
  }, []);

  console.log(parties);
  return (
    <div style={{ height: "10px", width: 1400, margin: "0 auto" }}>
      <Space
        style={{
          background: "#ffff",
          padding: 10,
          borderRadius: 5,
          width: "100%",
        }}
      >
        <Button type="primary" onClick={() => setOpen(!open)}>
          Add New Party
        </Button>
      </Space>
      <div style={{ marginTop: 10 }}>
        <PartyUI
          parties={parties}
          isloading={isloading}
          getAllParty={getAllParty}
        />
      </div>
      <ModalAdd open={open} setOpen={setOpen} getAllParty={getAllParty} />
    </div>
  );
};
