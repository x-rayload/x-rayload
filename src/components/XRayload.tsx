import { useContext, useState } from "react";
import CarouselViewer from "./CarouselViewer";
import { ICONS } from "./Icon";
import PayloadViewer from "./PayloadViewer";
import style from "./style.module.scss";
import Tabs, { Tab } from "./Tabs";
import TokenFromBrowser from "./TokenFromBrowser";
import TokenHistory from "./TokenHistoryView";
import { TokenContext } from "../context/TokenContextProvider";
import { TOKEN_HISTORY } from "../api";

const TAB_ICON_SIZE = 16;

const tabs = [
  { id: 1, name: ICONS.SEARCH({ width: TAB_ICON_SIZE }) },
  { id: 2, name: ICONS.BROWSER({ width: TAB_ICON_SIZE }) },
  { id: 3, name: ICONS.HISTORY({ width: TAB_ICON_SIZE }) },
];

const LATEST_TAB_ID_KEY = "latest-tab-id";
const getLatestTabId = () => {
  const latestTabId = localStorage.getItem(LATEST_TAB_ID_KEY);
  return latestTabId ? Number(latestTabId) : 1;
};

const updateLatestTabId = (tabId: number) => {
  localStorage.setItem(LATEST_TAB_ID_KEY, String(tabId));
};

function XRayload() {
  const [tab, setTab] = useState<Tab>(
    tabs.find(({ id }) => id === getLatestTabId()) ?? tabs[0]
  );

  const { token, setToken, tokenHistories, setTokenHistories } =
    useContext(TokenContext);

  const handleHistoryChange = () => {
    setTokenHistories(TOKEN_HISTORY.getAll());
  };

  return (
    <main className={style.main}>
      <header className={style.header}>
        <h1 className={style.title}>X-Rayload</h1>
      </header>

      <Tabs
        tabs={tabs}
        activeTab={tab}
        onTabChange={(tab) => {
          setTab(tab);
          updateLatestTabId(tab.id);
        }}
      />

      <CarouselViewer
        contentIndex={tabs.findIndex(({ id }) => tab.id === id)}
        views={[
          <PayloadViewer
            key="payload-viewer"
            token={token}
            onTokenChange={setToken}
            onHistoryChange={handleHistoryChange}
          />,
          <TokenFromBrowser
            key="token-from-browser"
            onTokenSelect={(value) => {
              setToken(value);
              setTab(tabs[0]);
            }}
          />,
          <TokenHistory
            key="token-history"
            tokenHistories={tokenHistories}
            onHistoryChange={handleHistoryChange}
          />,
        ]}
      />
    </main>
  );
}

export default XRayload;
