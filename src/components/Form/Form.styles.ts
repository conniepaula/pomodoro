import styled from "styled-components";
import { rgba } from "polished";

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