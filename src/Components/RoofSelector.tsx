import { useState, useRef } from "react";
import { Stage, Layer, Line, Image } from "react-konva";
import useImage from "../hooks/useImage";

const RoofSelector = () => {
  const [points, setPoints] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(true);
  const [image] = useImage("../roof-house.webp");
  const stageRef = useRef<any>(null);

  const handleClick = (e: { target: { getStage: () => any } }) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const pointerPosition = stage?.getPointerPosition();

    if (pointerPosition) {
      const { x, y } = pointerPosition;
      if (points.length >= 6) {
        const startX = points[0];
        const startY = points[1];
        const distance = Math.sqrt((startX - x) ** 2 + (startY - y) ** 2);
        if (distance < 10) {
          setPoints([...points, startX, startY]);
          setIsDrawing(false);
          return;
        }
      }
      setPoints([...points, x, y]);
    }
  };

  const handleExport = () => {
    if (stageRef.current) {
      const dataURL = stageRef.current.toDataURL();
      const link = document.createElement("a");
      link.download = "roof-selection.png";
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="roof-selector-container">
      <Stage
        width={window.innerWidth - 150}
        height={window.innerHeight - 100}
        onClick={handleClick}
        ref={stageRef}
        className="canvas-stage"
      >
        <Layer>
          {image && <Image image={image} />}
          <Line
            points={points}
            stroke="red"
            strokeWidth={2}
            closed={!isDrawing}
            lineCap="round"
            lineJoin="round"
          />
        </Layer>
      </Stage>
      <button onClick={handleExport} className="export-button">
        Export as Image
      </button>
    </div>
  );
};

export default RoofSelector;
