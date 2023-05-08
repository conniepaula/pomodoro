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

export const FormContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.text.light};
`;

const BaseInput = styled.input`
  background-color: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme.primary.light};
  font-weight: 700;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${({ theme }) => theme.text.main};

  &:focus {
    box-shadow: none;
    outline: transparent;
  }
  &::placeholder {
    color: ${({ theme }) => rgba(theme.text.main, 0.8)};
  }
`;

export const TaskInput = styled(BaseInput)`
  /* flex: 1; */
  text-align: center;
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const DurationInput = styled(BaseInput)`
  width: 4rem;
`;

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

export const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.secondary.main};
  color: ${({ theme }) => theme.text.light};
  border: 2px solid ${({ theme }) => rgba(theme.secondary.light, 0.3)};
  transition: all 0.2s ease-in-out;
  &:not(:disabled):hover {
    background-color: ${({ theme }) => rgba(theme.secondary.light, 0.8)};
    border: 2px solid ${({ theme }) => rgba(theme.secondary.dark, 0.5)};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
