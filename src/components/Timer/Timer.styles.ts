import styled from "styled-components";
import { rgba } from "polished";

export const TimerContainer = styled.section`
  display: flex;
  gap: 1rem;
  font-family: "Roboto Mono", monospace;
  font-size: 10rem;
  line-height: 9rem;
  color: ${({ theme }) => theme.text.main};
  span {
    padding: 1rem;
    background-color: ${({ theme }) => rgba(theme.primary.light, 0.1)};
    border-radius: 8px;
  }
`;

export const Colon = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  width: 3.5rem;
  overflow: hidden;
  color: ${({ theme }) => theme.primary.light};
`;