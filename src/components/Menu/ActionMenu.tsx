import { Dropdown, Button } from "antd";
import type { MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";

export interface ActionItem<T> {
  key: string;
  label: string;
  danger?: boolean;
  onClick: (record: T) => void;
}

interface ActionMenuProps<T> {
  record: T;
  actions: ActionItem<T>[];
}


export function ActionMenu<T>  ({
  record,
  actions,
}: ActionMenuProps<T>) {
    const menu: MenuProps = {
    items: actions.map((action) => ({
      key: action.key,
      label: action.label,
      danger: action.danger,
      onClick: () => action.onClick(record),
    })),
  };
  return (
    <Dropdown menu={menu} trigger={["click"]}>
      <Button type="text" icon={<MoreOutlined style={{ fontSize: 18 }} />} />
    </Dropdown>
  )
}
