import styled from "styled-components";
import { rgba } from "polished";

export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const BaseButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.text.light};
  transition: all 0.2s ease-in-out;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const StartButtonContainer = styled(BaseButtonContainer)`
  background-color: ${({ theme }) => theme.secondary.main};
  border: 2px solid ${({ theme }) => rgba(theme.secondary.light, 0.3)};
  &:not(:disabled):hover {
    background-color: ${({ theme }) => rgba(theme.secondary.light, 0.8)};
    border: 2px solid ${({ theme }) => rgba(theme.secondary.dark, 0.5)};
  }
`;

export const StopButtonContainer = styled(BaseButtonContainer)`
  background-color: ${({ theme }) => theme.primary.main};
  border: 2px solid ${({ theme }) => rgba(theme.primary.light, 0.3)};
  &:not(:disabled):hover {
    background-color: ${({ theme }) => rgba(theme.primary.light, 0.8)};
    border: 2px solid ${({ theme }) => rgba(theme.primary.dark, 0.5)};
  }
`;
