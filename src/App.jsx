import { useState, useRef } from "react";
import "./App.css";
import { Layer, Line, Stage, Transformer } from "react-konva";
import KonvaImage from "./components/KonvaImage";
import { CIRCLE_OBJ, DATA, RECT_OBJ } from "./constant";

function App() {
  const [Shapes, setShapes] = useState(DATA);
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [eraser, setEraser] = useState(false);

  const TransformerRef = useRef();
  const StageRef = useRef();

  const onImageChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setShapes((p) => [
        ...p,
        {
          id: Math.random().toFixed(5),
          src: e.target.result,
        },
      ]);
    };
    fileReader.readAsDataURL(selectedFile);
  };

  const handleMouseDown = (e) => {
    if (!isDrawing) {
      setIsDrawing(true);
    }
    const stage = e.target;
    const point = stage.getPointerPosition?.();
    if (point) {
      setLines([...lines, [point.x, point.y]]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const stage = e.target;
    const point = stage.getPointerPosition?.();
    if (point) {
      const lastLine = lines[lines.length - 1];
      setLines([...lines, lastLine.concat([point.x, point.y])]);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <>
      <button
        onClick={() =>
          setShapes((p) => [
            ...p,
            { id: Math.random().toFixed(5), ...RECT_OBJ },
          ])
        }
      >
        Add Rect
      </button>
      <button
        onClick={() =>
          setShapes((p) => [
            ...p,
            { id: Math.random().toFixed(5), ...CIRCLE_OBJ },
          ])
        }
      >
        Add Circle
      </button>
      <button style={{ position: "relative" }}>
        <input
          type="file"
          placeholder="Add Image"
          style={{ opacity: 0, position: "absolute", inset: 0 }}
          onChange={(e) => onImageChange(e)}
        />
        Add Image
      </button>
      <button onClick={() => setEraser(!eraser)}>
        Eraser: {eraser ? "ON" : "OFF"}
      </button>
      <Stage
        onClick={(e) =>
          e.target === StageRef.current && TransformerRef.current.nodes([])
        }
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ background: "white" }}
        ref={StageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {Shapes.map(({ shape: Shape, ...data }) => {
            if (!Shape)
              return (
                <KonvaImage
                  key={data.id}
                  src={data.src}
                  onMouseDown={(e) => {
                    TransformerRef.current.nodes([e.currentTarget]);
                  }}
                />
              );
            return (
              <Shape
                key={data.id}
                draggable
                {...data}
                onMouseDown={(e) => {
                  TransformerRef.current.nodes([e.currentTarget]);
                }}
              />
            );
          })}
          {lines.map((line, i) => {
            return (
              <Line
                key={i}
                points={line}
                stroke={eraser ? "white" : "black"}
                strokeWidth={eraser ? 4 : 2}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation={
                  eraser ? "destination-out" : "source-over"
                }
              />
            );
          })}
          <Transformer
            ref={TransformerRef}
            onPointerClick={() => setIsDrawing(false)}
          />
        </Layer>
      </Stage>
    </>
  );
}

export default App;
