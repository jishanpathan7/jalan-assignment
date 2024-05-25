// src/hooks/useImage.ts
import { useState, useEffect } from 'react';

const useImage = (url: string): [HTMLImageElement | undefined] => {
  const [image, setImage] = useState<HTMLImageElement>();

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => setImage(img);
  }, [url]);

  return [image];
};

export default useImage;
