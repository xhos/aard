import { Gdk } from 'astal/gtk4';

const svgData = `<svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 -960 960 960" width="34px" fill="#e8eaed">
  <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/>
</svg>`;

export const ArrowUpIcon = () => {
  return Gdk.Texture.new_from_bytes(new TextEncoder().encode(svgData));
};
