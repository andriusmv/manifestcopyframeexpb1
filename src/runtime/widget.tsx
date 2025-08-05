/** @jsx jsx */
import { React, jsx, useRef, useState } from "jimu-core";
import { LayoutEntry } from "jimu-layouts/layout-runtime";
import { Button } from "jimu-ui";
import html2canvas from "html2canvas";
import { IMLayoutJson } from "jimu-core";

interface Props {
  layouts: {
    [layoutId: string]: IMLayoutJson;
  };
}

export default function Widget(props: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageSrc, setImageSrc] = useState<string>("");

  const handleCopy = async () => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = await html2canvas(container, {
      useCORS: true,
      scale: 2,
    });

    const dataUrl = canvas.toDataURL();
    setImageSrc(dataUrl);
  };

  const layoutId = props.layouts?.main?.id;

  return (
    <div
      ref={containerRef}
      style={{ padding: "1rem", border: "2px dashed #aaa" }}
    >
      <Button onClick={handleCopy}>Copy Screenshot</Button>

      <div style={{ marginTop: "1rem" }}>
        {layoutId && <LayoutEntry layoutId={layoutId} />}
      </div>

      {imageSrc && (
        <img
          src={imageSrc}
          alt="Screenshot"
          style={{
            marginTop: "1rem",
            maxWidth: "100%",
            border: "1px solid red",
          }}
        />
      )}
    </div>
  );
}
