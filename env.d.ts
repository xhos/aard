declare const SRC: string;
declare const DEBUG: boolean;

export {};
declare global {
  var CONFIG: {
    wallpaper: string | null;
    transparency: boolean;
  };
}

declare module 'inline:*' {
  const content: string;
  export default content;
}

declare module '*.scss' {
  const content: string;
  export default content;
}

declare module '*.blp' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const content: string;
  export default content;
}
