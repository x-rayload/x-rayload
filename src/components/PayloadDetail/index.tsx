import { jwtDecode, JwtPayload } from "jwt-decode";
import { useMemo, useRef } from "react";
import ExpirationInput from "../ExpirationInput";
import style from "./style.module.scss";
import { TOKEN_HISTORY } from "../../api";

export type DecodedPayload = JwtPayload & { [key: string]: unknown };

type PayloadDetailProps = Readonly<{
  token?: string;
  headless?: boolean;
  onHistoryChange?: () => void;
}>;

export default function PayloadDetail(props: PayloadDetailProps) {
  const { token, headless = false, onHistoryChange } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isTokenValid = useMemo(() => {
    try {
      if (!token) return false;
      jwtDecode(token);
      return true;
    } catch {
      return false;
    }
  }, [token]);

  const audienceToString = (aud: string | string[]) => {
    if (typeof aud === "string") return aud;
    return aud.join(", ");
  };

  const renderMessage = (token?: string) => {
    containerRef.current?.classList.remove(style.validContainer);
    containerRef.current?.classList.remove(style.invalidContainer);

    if (!token) {
      containerRef.current?.classList.remove(style.validContainer);

      return (
        <div className={style.messageBox} ref={contentRef}>
          <p>No token provided.</p>
        </div>
      );
    }

    containerRef.current?.classList.add(style.invalidContainer);

    return (
      <div className={style.error} ref={contentRef}>
        <p>Invalid token</p>
      </div>
    );
  };

  const renderPayloadForm = (token: string) => {
    const isSavedToken = TOKEN_HISTORY.isExists(token);
    const payload = jwtDecode(token);
    const { iss, sub, aud, exp, nbf, iat, jti } = payload;

    if (containerRef.current) {
      containerRef.current.classList.remove(style.invalidContainer);
      containerRef.current.classList.add(style.validContainer);
    }

    return (
      <div ref={contentRef}>
        {!headless && (
          <header className={style.header}>
            <h2>Decoded Payload</h2>
          </header>
        )}
        <div className={style.formWrapper}>
          <form className={style.form}>
            <fieldset>
              {iss && (
                <label>
                  <span>Issuer</span>
                  <input readOnly value={iss} />
                </label>
              )}

              {sub && (
                <label>
                  <span>Subject</span>
                  <input readOnly value={sub} />
                </label>
              )}

              {aud && (
                <label>
                  <span>Audience</span>
                  <input readOnly value={audienceToString(aud)} />
                </label>
              )}

              {exp && (
                <label>
                  <span>Expiration</span>
                  <ExpirationInput exp={new Date(exp * 1000)} />
                </label>
              )}

              {nbf && (
                <label>
                  <span>Not Before</span>
                  <input
                    readOnly
                    value={new Date(nbf * 1000).toLocaleString()}
                  />
                </label>
              )}

              {iat && (
                <label>
                  <span>Issued At</span>
                  <input
                    readOnly
                    value={new Date(iat * 1000).toLocaleString()}
                  />
                </label>
              )}

              {jti && (
                <label>
                  <span>JWT ID</span>
                  <input readOnly value={jti} />
                </label>
              )}
            </fieldset>
          </form>
        </div>
        {!headless && token && (
          <div className={style.saveButtonContainer}>
            <button
              className={style.saveButton}
              disabled={isSavedToken}
              onClick={() => {
                if (!token) return;
                TOKEN_HISTORY.insert({ value: token, date: Date.now() });
                onHistoryChange?.();
              }}
            >
              {isSavedToken ? "Saved" : "Save"}
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (token && isTokenValid) {
      return renderPayloadForm(token);
    } else {
      return renderMessage(token);
    }
  };

  return (
    <div
      className={headless ? style.headlessContainer : style.container}
      ref={containerRef}
    >
      {renderContent()}
    </div>
  );
}
