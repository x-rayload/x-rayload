import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { CHROME } from "../../api/chrome";
import style from "./style.module.scss";

const TOKEN_STORAGE = {
  COOKIE_STORAGE: "Cookie",
  LOCAL_STORAGE: "Local Storage",
  SESSION_STORAGE: "Session Storage",
} as const;

type TokenStorage = (typeof TOKEN_STORAGE)[keyof typeof TOKEN_STORAGE];

type TokenData = { name: string; value: string };

type TokenMap = Record<TokenStorage, TokenData[]>;

export type TokenFromBrowserProps = Readonly<{
  onTokenSelect: (token: string) => void;
}>;

export default function TokenFromBrowser(props: TokenFromBrowserProps) {
  const { onTokenSelect } = props;

  const [tokens, setTokens] = useState<TokenMap>({
    [TOKEN_STORAGE.COOKIE_STORAGE]: [],
    [TOKEN_STORAGE.LOCAL_STORAGE]: [],
    [TOKEN_STORAGE.SESSION_STORAGE]: [],
  });

  const getTokenFromCookies = async () => {
    const tab = await CHROME.getCurrentTab();
    const tabUrl = tab.url;
    if (!tabUrl) return;

    const foundCookies = await CHROME.getCookies(tabUrl);
    const validTokens = foundCookies.filter(({ value }) => {
      try {
        jwtDecode(value);
        return true;
      } catch {
        return false;
      }
    });

    setTokens((prev) => ({
      ...prev,
      [TOKEN_STORAGE.COOKIE_STORAGE]: validTokens.map(({ name, value }) => ({
        name,
        value,
      })),
    }));
  };

  const getTokenFromLocalStorage = async () => {
    const localStorageItems = await CHROME.getLocalStorageItems();
    const validTokens: TokenData[] = [];
    Object.keys(localStorageItems).forEach((key) => {
      const value = localStorageItems[key];

      try {
        jwtDecode(value);
        validTokens.push({ name: key, value });
      } catch {
        return;
      }
    });

    setTokens((prev) => ({
      ...prev,
      [TOKEN_STORAGE.LOCAL_STORAGE]: validTokens,
    }));
  };

  const getTokensFromSessionStorage = async () => {
    const sessionStorageItems = await CHROME.getSessionStorageItems();
    const validTokens: TokenData[] = [];
    Object.keys(sessionStorageItems).forEach((key) => {
      const value = sessionStorageItems[key];

      try {
        jwtDecode(value);
        validTokens.push({ name: key, value });
      } catch {
        return;
      }
    });

    setTokens((prev) => ({
      ...prev,
      [TOKEN_STORAGE.SESSION_STORAGE]: validTokens,
    }));
  };

  useEffect(() => {
    getTokenFromCookies();
    getTokenFromLocalStorage();
    getTokensFromSessionStorage();
  }, []);

  const renderTokenList = (tokenStorage: TokenStorage) => {
    const foundTokens = tokens[tokenStorage];

    return (
      <section className={style.sectionContainer}>
        <header>
          <h2>{tokenStorage}</h2>
        </header>

        {!foundTokens?.length && (
          <p className={style.noToken}>
            No token found in the {tokenStorage.toLowerCase()}.
          </p>
        )}

        {!!foundTokens?.length && (
          <ul className={style.list}>
            {foundTokens.map(({ name, value }, index) => (
              <li className={style.listItem} key={`${value}-${index + 1}`}>
                <button
                  onClick={() => {
                    onTokenSelect(value);
                  }}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  };

  return (
    <section className={style.container}>
      {renderTokenList(TOKEN_STORAGE.COOKIE_STORAGE)}
      {renderTokenList(TOKEN_STORAGE.LOCAL_STORAGE)}
      {renderTokenList(TOKEN_STORAGE.SESSION_STORAGE)}
    </section>
  );
}
