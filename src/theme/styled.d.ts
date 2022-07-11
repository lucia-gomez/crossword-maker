import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bg: string;
      text: string;
      gridBorder: string;
      squareBorder: string;
      squareSelected: string;
      squareBlocked: string;
    };

    squareSize: number;
  }
}
