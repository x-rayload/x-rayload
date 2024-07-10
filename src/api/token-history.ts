const TOKEN_HISTORY_STORAGE_KEY = "x-rayload-token-history";
const MAXIMUM_TOKEN_HISTORY_SIZE = 10;

export type TokenHistory = {
  id: number;
  value: string;
  date: number;
  memo?: string;
};

export const TOKEN_HISTORY = {
  getAll: () => {
    const tokenHistories = JSON.parse(
      localStorage.getItem(TOKEN_HISTORY_STORAGE_KEY) ?? "[]"
    ) as TokenHistory[];

    if (!Array.isArray(tokenHistories)) {
      localStorage.removeItem(TOKEN_HISTORY_STORAGE_KEY);
      return [];
    }

    return tokenHistories.sort((a, b) => b.date - a.date);
  },

  get: (id: number) => {
    return TOKEN_HISTORY.getAll().find(
      (tokenHistory) => tokenHistory.id === id
    );
  },

  isExists: (value: string) => {
    return TOKEN_HISTORY.getAll().some(
      (tokenHistory) => tokenHistory.value === value
    );
  },

  update: (id: number, patch: Partial<Omit<TokenHistory, "id">>) => {
    const tokenHistories = TOKEN_HISTORY.getAll();

    const tempTokenHistories = tokenHistories.map((tokenHistory) => {
      if (tokenHistory.id === id) {
        return {
          ...tokenHistory,
          ...patch,
        };
      } else {
        return tokenHistory;
      }
    });

    localStorage.setItem(
      TOKEN_HISTORY_STORAGE_KEY,
      JSON.stringify(tempTokenHistories)
    );
  },

  delete: (id: number) => {
    const tokenHistories = TOKEN_HISTORY.getAll();
    const tempTokenHistories = tokenHistories.filter(
      (tokenHistory) => tokenHistory.id !== id
    );

    localStorage.setItem(
      TOKEN_HISTORY_STORAGE_KEY,
      JSON.stringify(tempTokenHistories)
    );
  },

  insert: (record: Omit<TokenHistory, "id">) => {
    const tokenHistories = TOKEN_HISTORY.getAll();

    const isMaximumSizeReached =
      tokenHistories.length >= MAXIMUM_TOKEN_HISTORY_SIZE;
    if (isMaximumSizeReached) {
      throw new Error("Maximum token history size reached.");
    }

    const isAlreadyExists = TOKEN_HISTORY.isExists(record.value);
    if (isAlreadyExists) {
      throw new Error("Token already exists in history.");
    }

    const tempTokenHistories = [
      ...tokenHistories,
      { ...record, id: Date.now() },
    ];

    localStorage.setItem(
      TOKEN_HISTORY_STORAGE_KEY,
      JSON.stringify(tempTokenHistories)
    );
  },
};
