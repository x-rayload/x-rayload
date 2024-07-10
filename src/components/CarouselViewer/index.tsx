import { useEffect, useRef } from "react";
import style from "./style.module.scss";
export type CarouselViewerProps = Readonly<{
  contentIndex: number;
  views: React.ReactNode[];
}>;

export default function CarouselViewer(props: CarouselViewerProps) {
  const { contentIndex, views } = props;
  const viewRefList = useRef<HTMLDivElement[]>([]);
  const isInitialRender = useRef(true);

  useEffect(() => {
    const view = viewRefList.current[contentIndex];
    if (!view) return;

    const behavior = isInitialRender.current ? "auto" : "smooth";
    view.scrollIntoView({ behavior });
    isInitialRender.current = false;
  }, [contentIndex, views]);

  return (
    <div className={style.container}>
      {views.map((view, index) => (
        <div
          key={`view-${index + 1}`}
          className={style.viewWrapper}
          ref={(ref) => {
            viewRefList.current[index] = ref!;
          }}
        >
          {view}
        </div>
      ))}
    </div>
  );
}
