import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import FormAdd from "./PartyForm";
import { getAllCategory } from "../../services/apiPatry";
import { Category } from "../../models/Party/Categories";

const ModalAdd: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const [category, setCategory] = useState<Category[]>();

  const handleOk = () => {
    console.log("test");
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  useEffect(() => {
    async function getAllPartyCategory() {
      try {
        const response = await getAllCategory();
        setCategory(response.categories);
      } catch (error) {
        console.log(error);
      }
    }
    getAllPartyCategory();
  }, []);

  return (
    <Modal
      title="Add new party"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
      footer={true}
    >
      <FormAdd categoryParty={category ?? []}  setOpen={setOpen}/>
    </Modal>
  );
};

export default ModalAdd;
