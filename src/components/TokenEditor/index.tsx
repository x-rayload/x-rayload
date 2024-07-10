import style from "./style.module.scss";

type TokenEditorProps = Readonly<{
  token?: string;
  onTokenChange: (token: string) => void;
}>;

export default function TokenEditor(props: TokenEditorProps) {
  const { token, onTokenChange } = props;

  return (
    <div className={style.wrapper}>
      <textarea
        className={style.textarea}
        value={token ?? ""}
        onChange={(event) => {
          onTokenChange(event.target.value);
        }}
      />
      {!token && (
        <div className={style.placeholderMask}>
          <p>Put your token here!</p>
        </div>
      )}
    </div>
  );
}
