import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-konva";

const KonvaImage = ({ src, ...data }) => {
  const [image, setImage] = useState(new window.Image());
  const imageRef = useRef();

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src = src;
    setImage(img);
  }, []);

  useEffect(() => {
    if (image) {
      imageRef.current.cache();
      imageRef.current.getLayer().batchDraw();
    }
  }, [image]);

  return (
    <Image
      blurRadius={10}
      draggable
      x={200}
      y={200}
      height={200}
      width={200}
      image={image}
      ref={imageRef}
      {...data}
    />
  );
};

export default KonvaImage;
