import '@emotion/react'; // it's important to use ThemeProvider

declare module '@emotion/react' {
  export interface Theme {
    color: {
      red: string;
    };
    fonts: {
      body16Regular: string;
      body16Bold: string;
      body14Regular: string;
      body14Bold: string;
    };
  }
}
