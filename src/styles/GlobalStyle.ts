import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg: ${({ theme }) => theme.background};
    --bg-alt: ${({ theme }) => theme.backgroundAlt};
    --surface: ${({ theme }) => theme.surface};
    --text: ${({ theme }) => theme.text};
    --text-secondary: ${({ theme }) => theme.textSecondary};
    --text-muted: ${({ theme }) => theme.textMuted};
    --border: ${({ theme }) => theme.border};
    --accent: ${({ theme }) => theme.accent};
    --accent-hover: ${({ theme }) => theme.accentHover};
    --accent-muted: ${({ theme }) => theme.accentMuted};
    --on-accent: ${({ theme }) => theme.onAccent};
    --shadow: ${({ theme }) => theme.shadow};
    --grid: ${({ theme }) => theme.grid};
    --radius: ${({ theme }) => theme.radius};
    --font-display: ${({ theme }) => theme.fontDisplay};
    --font-body: ${({ theme }) => theme.fontBody};
    --font-mono: ${({ theme }) => theme.fontMono};
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    font-family: var(--font-body);
    background-color: var(--bg);
    color: var(--text);
    line-height: 1.5;
    font-size: 15px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.03em;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: var(--font-body);
  }

  input, textarea, select {
    font-family: var(--font-body);
    font-size: 16px;
  }

  ::selection {
    background: var(--accent);
    color: var(--on-accent);
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 4px;

    &:hover {
      background: var(--text-muted);
    }
  }

  *:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;
