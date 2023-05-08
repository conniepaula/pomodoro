import { TimerIcon, TableIcon } from "@radix-ui/react-icons";
import { HeaderContainer } from "./Header.styles";
import tomato from "../../assets/tomato.svg";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <HeaderContainer>
      <img src={tomato} alt="Purple tomato" />
      <nav>
        <NavLink to="/" title="Timer">
          <TimerIcon width={24} height={24} />
        </NavLink>
        <NavLink to="/history" title="Task completion history">
          <TableIcon width={24} height={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}

export default Header;
