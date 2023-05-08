import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${({ theme }) => theme.text.main};
      border-bottom: 3px solid transparent;
      transition: color, border-bottom 0.2s ease-in-out;
      &:hover {
        border-bottom: 3px solid ${({ theme }) => theme.secondary.main};
      }
      &.active {
        color: ${({ theme }) => theme.secondary.light};
      }
    }
  }
`;
