import PayloadDetail from "../PayloadDetail";
import TokenEditor from "../TokenEditor";
import style from "./style.module.scss";

export type PayloadViewerProps = Readonly<{
  token?: string;
  onTokenChange: (token: string) => void;
  onHistoryChange: () => void;
}>;

export default function PayloadViewer(props: PayloadViewerProps) {
  const { token, onTokenChange, onHistoryChange } = props;

  return (
    <section className={style.container}>
      <TokenEditor token={token} onTokenChange={onTokenChange} />
      <PayloadDetail token={token} onHistoryChange={onHistoryChange} />
    </section>
  );
}
