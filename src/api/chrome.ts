export const CHROME = {
  getCurrentTab: async () => {
    if (!chrome.tabs?.query) {
      throw new Error("Chrome is not available");
    }

    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    return tab;
  },

  getCookies: async (url: string) => {
    if (!chrome.cookies?.getAll) {
      throw new Error("Chrome is not available");
    }

    return new Promise<chrome.cookies.Cookie[]>((resolve) => {
      chrome.cookies.getAll({ url }, resolve);
    });
  },

  getLocalStorageItems: async () => {
    if (!chrome.scripting?.executeScript) {
      throw new Error("Chrome is not available");
    }

    const currentTab = await CHROME.getCurrentTab();
    if (!currentTab.id) return {};

    const result = await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      func: () => {
        return JSON.stringify(localStorage);
      },
    });

    return result[0]?.result ? JSON.parse(result[0].result) : {};
  },

  getSessionStorageItems: async () => {
    if (!chrome.scripting?.executeScript) {
      throw new Error("Chrome is not available");
    }

    const currentTab = await CHROME.getCurrentTab();
    if (!currentTab.id) return {};

    const result = await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      func: () => {
        return JSON.stringify(sessionStorage);
      },
    });

    return result[0]?.result ? JSON.parse(result[0].result) : {};
  },
};
