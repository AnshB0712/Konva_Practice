import { Circle, Rect } from "react-konva";

export const RECT_OBJ = {
  x: 0,
  y: 0,
  width: 50,
  height: 50,
  stroke: "black",
  shape: Rect,
};
export const CIRCLE_OBJ = {
  x: 0,
  y: 0,
  width: 50,
  height: 50,
  stroke: "black",
  shape: Circle,
};

export const DATA = [
  {
    id: Math.random().toFixed(5),
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    stroke: "black",
    shape: Rect,
  },
  {
    id: Math.random().toFixed(5),
    x: 150,
    y: 150,
    width: 50,
    height: 50,
    stroke: "black",
    shape: Circle,
  },
];
