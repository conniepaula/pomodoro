import { Outlet } from "react-router-dom";
import Header from "../Header/ Header";
import { LayoutContainer } from "./Layout.styles";

function Layout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
}

export default Layout;
