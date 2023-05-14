import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./styles/themes/dark";
import { GlobalStyles } from "./styles/global";
import Router from "./Router";
import TaskContextProvider from "./context/TaskContext";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <TaskContextProvider>
          <Router />
        </TaskContextProvider>
        <GlobalStyles />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
