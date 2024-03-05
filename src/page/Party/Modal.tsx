import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import FormAdd from "./FormAdd";
import { getAllCategory } from "../../services/apiPatry";
import { Categories } from "../../models/Party/Categories";

const ModalAdd: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [formData, setFormData] = useState<object>({});
  const [category, setCategory] = useState<Categories[]>();

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
        const category = await getAllCategory();
        setCategory(category);
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
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      width={700}
      footer={true}
    >
      <FormAdd categoryParty={category} />
    </Modal>
  );
};

export default ModalAdd;
