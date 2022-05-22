export namespace Theme {
  export enum Mode {
    dark = "dark",
    light = "light",
  }

  export interface State {
    mode: keyof typeof Mode;
  }
}
