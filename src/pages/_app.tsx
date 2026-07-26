import type { AppProps } from "next/app";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { theme } from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <StyleSheetManager shouldForwardProp={(prop) => !prop.startsWith("$")}>
        <GlobalStyle />
        <Component {...pageProps} />
      </StyleSheetManager>
    </ThemeProvider>
  );
}
