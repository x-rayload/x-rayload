import { ReactNode } from "react";
import style from "./style.module.scss";

export type Tab = {
  id: number;
  name: ReactNode;
};

export type TabsProps = Readonly<{
  tabs: Tab[];
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}>;

export default function Tabs(props: TabsProps) {
  const { tabs, activeTab, onTabChange } = props;

  return (
    <div className={style.container}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={activeTab.id === tab.id ? style.activeTab : style.tab}
          onClick={() => {
            if (activeTab.id === tab.id) return;
            onTabChange(tab);
          }}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}
