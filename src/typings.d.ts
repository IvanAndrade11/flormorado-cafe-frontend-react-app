declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.json';
declare module '*.gif';
declare module '*.ico';
declare module '*.webp';
