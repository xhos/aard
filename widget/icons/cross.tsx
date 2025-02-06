import { Gdk } from 'astal/gtk4';

const svgData = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;

export const CrossIcon = () => {
  return Gdk.Texture.new_from_bytes(new TextEncoder().encode(svgData));
};
