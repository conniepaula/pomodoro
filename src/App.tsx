import { ThemeProvider } from "styled-components";
import { darkTheme } from "./styles/themes/dark";
import { GlobalStyles } from "./styles/global";
import Button from "./components/Button";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="danger" />
      <Button variant="success" />
      <Button />
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
