/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Upload } from "antd";
import { useState } from "react";
import { RcFile, UploadFile } from "antd/es/upload";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { uploadSingle } from "../services/upload";
import { PlusOutlined } from "@ant-design/icons";

interface imageList {
  url: string;
  uid: string;
}

interface UploadImageProps {
  imagesUrl: any;
  setImagesUrl: (_imageUrl: any) => void;
}

export const UploadImage = ({ imagesUrl, setImagesUrl }: UploadImageProps) => {
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const getBase64 = (file: RcFile): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const hanldeUploadImageToCloud = async (options: UploadRequestOption) => {
    const { file, onSuccess } = options;
    const res = await uploadSingle(file as RcFile);
    if (res && res.resized) {
      const result = res.resized.map((image: { url: string }) => {
        return { url: image.url, uid: (file as RcFile).uid };
      });
      setImagesUrl((prev: imageList[]) => [...prev, ...result]);
      onSuccess?.("ok");
    }
  };

  const hanldeRemoveFile = (file: UploadFile) => {
    const data = imagesUrl.reduce((acc: imageList[], curValue: imageList) => {
      return curValue.uid !== file.uid ? [...acc, curValue] : acc;
    }, []);
    setImagesUrl(data);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <>
      <Upload
        listType="picture-card"
        multiple
        customRequest={hanldeUploadImageToCloud}
        onPreview={handlePreview}
        onRemove={(file) => hanldeRemoveFile(file)}
      >
        {uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};
