// src/typings.d.ts или src/types/scss.d.ts
declare module '*.module.scss' {
  const classes: { 
    readonly [key: string]: string;
  };
  export = classes; // Важно: export = вместо export default
}