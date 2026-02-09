import React from 'react'
import {
  DashboardOutlined,
  FileTextOutlined,
  TagsOutlined,
  CopyOutlined,
  TeamOutlined,
  AppstoreOutlined,
  KeyOutlined,
  InboxOutlined,
  PhoneOutlined,
  MessageOutlined,
  FileSearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export const getIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case "dashboard":
      return <DashboardOutlined />;
    case "post":
      return <FileTextOutlined />;
    case "tag":
      return <TagsOutlined />;
    case "pages":
      return <CopyOutlined />;
    case "iam":
      return <TeamOutlined />;
    case "category":
      return <AppstoreOutlined />;
    case "onboarding":
      return <KeyOutlined />;
    case "request":
      return <InboxOutlined />;
    case "contact us":
      return <PhoneOutlined />;
    case "comment":
      return <MessageOutlined />;
    case "logs":
      return <FileSearchOutlined />;
    case "logs configuration":
      return <SettingOutlined />;
    default:
      return null;
  }
};