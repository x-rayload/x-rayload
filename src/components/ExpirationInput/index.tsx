import style from "./style.module.scss";
import { useEffect, useRef } from "react";

const readableTime = (time: number) => {
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 1000 / 60) % 60;
  const hours = Math.floor(time / 1000 / 60 / 60) % 24;
  const days = Math.floor(time / 1000 / 60 / 60 / 24);

  return [
    days && `${days}d`,
    hours && `${hours}h`,
    minutes && `${minutes}m`,
    seconds && `${seconds}s`,
  ]
    .filter(Boolean)
    .join(" ");
};

export type ExpirationInputProps = Readonly<{
  exp: Date;
}>;

export default function ExpirationInput(props: ExpirationInputProps) {
  const { exp } = props;
  const leftTimeDisplayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leftTimeDisplay = leftTimeDisplayRef.current;
    if (!leftTimeDisplay) return;

    const updateLeftTime = () => {
      const now = new Date();
      const timeLeft = exp.getTime() - now.getTime();

      if (timeLeft <= 0) {
        leftTimeDisplay.classList.add(style.expired);
        leftTimeDisplay.textContent = "Expired";
      } else {
        leftTimeDisplay.classList.remove(style.expired);
        leftTimeDisplay.textContent = readableTime(timeLeft);
      }
    };

    updateLeftTime();

    const intervalId = setInterval(updateLeftTime, 1000);
    return () => clearInterval(intervalId);
  }, [exp]);

  return (
    <div className={style.container}>
      <input readOnly value={exp.toLocaleString()} />
      <div ref={leftTimeDisplayRef} />
    </div>
  );
}
