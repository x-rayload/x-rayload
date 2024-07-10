import { useRef } from "react";
import { TOKEN_HISTORY, TokenHistory } from "../../api";
import { ICONS } from "../Icon";
import PayloadDetail from "../PayloadDetail";
import style from "./style.module.scss";

export type TokenHistoryViewProps = Readonly<{
  tokenHistories: TokenHistory[];
  onHistoryChange: () => void;
}>;

export default function TokenHistoryView(props: TokenHistoryViewProps) {
  const { tokenHistories, onHistoryChange } = props;
  const listItemRefList = useRef<HTMLLIElement[]>([]);

  const toReadableDate = (datetime: number) => {
    const date = new Date(datetime);

    return Intl.DateTimeFormat(undefined, {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  return (
    <section className={style.container}>
      <header className={style.header}>
        <h2>Token History</h2>
      </header>

      {!Object.values(tokenHistories).length && (
        <div className={style.messageBox}>
          <p>No token history.</p>
        </div>
      )}

      <ul className={style.list}>
        {tokenHistories.map((tokenHistory, index) => (
          <li
            key={tokenHistory.date}
            className={style.listItem}
            ref={(ref) => {
              if (!ref) return;
              listItemRefList.current[index] = ref;
            }}
          >
            <header>
              <div>
                <input
                  className={style.memoInput}
                  placeholder="Memo"
                  value={tokenHistory.memo}
                  onChange={(event) => {
                    TOKEN_HISTORY.update(tokenHistory.id, {
                      memo: event.target.value,
                    });
                    onHistoryChange();
                  }}
                />

                <button
                  className={style.deleteButton}
                  onClick={() => {
                    const listItem = listItemRefList.current[index];
                    if (!listItem) return;
                    listItem.ontransitionend = () => {
                      TOKEN_HISTORY.delete(tokenHistory.id);
                      onHistoryChange();
                    };
                    listItem.classList.add(style.shrink);
                  }}
                >
                  {ICONS.DELETE({ width: 14 })}
                </button>
              </div>

              <span className={style.date}>
                {ICONS.TIME({ width: 14, fill: "white" })}
                <span>{toReadableDate(tokenHistory.date)}</span>
              </span>
            </header>
            <PayloadDetail headless token={tokenHistory.value} />
          </li>
        ))}
      </ul>
    </section>
  );
}
