import { Upload, Avatar, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { Spin } from "antd";

const AvatarEdit = ({ url }) => {
  const [imageUrl, setImageUrl] = useState(url);
  const [isUploading, setIsUploading] = useState(false);
  const handleUpload = async (info) => {
    if (info.file && info.file.status === "done" && !isUploading) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("avatar", info.file.originFileObj);
      try {
        const response = await api.patch("auth/users/me", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response) {
          api.get("/auth/users/me").then((res) => {
            setImageUrl(res.data.avatar);
            message.success("Update Profile Image Successfully");
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="relative group">
      {!isUploading && (
        <>
          <Upload showUploadList={false} onChange={handleUpload}>
            <Avatar
              size={100}
              src={imageUrl}
              isUploading={true}
              icon={<UserOutlined />}
              className="bg-blue-500 text-black text-2xl flex justify-center items-center rounded-full hover:opacity-40 transition-opacity duration-300"
            />
          </Upload>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black font-bold text-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300">
            Edit Profile
          </div>
        </>
      )}

      <Spin className="my-3" spinning={isUploading} size="large" />
    </div>
  );
};

export default AvatarEdit;
