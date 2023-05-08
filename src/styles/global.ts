import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:focus {
    outline-color: transparent;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary.main};
}

body {
    font-family: 'Roboto', sans-serif;
    color: ${({ theme }) => theme.text.main};
    background: ${({ theme }) => theme.background};
}

body, input, button, textarea {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
}
`;
