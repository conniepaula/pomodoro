import { rgba } from "polished";
import styled from "styled-components";

export const HistoryContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 3.5rem;

  h1 {
    font-size: 2rem;
    color: ${({ theme }) => theme.text.main};
  }
`;

export const HistoryList = styled.ul`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${({ theme }) => rgba(theme.text.dark, 0.4)};
      padding: 1rem;
      text-align: left;
      color: ${({ theme }) => theme.text.main};
      font-size: 1.25rem;
      line-height: 1.6rem;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${({ theme }) => rgba(theme.text.dark, 0.2)};
      border-top: 2px solid ${({ theme }) => theme.background};
      padding: 1rem;
      font-size: 1rem;
      line-height: 1.6rem;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`;

enum StatusColor {
  "Complete" = "green",
  "Pending" = "yellow",
  "Cancelled" = "red",
}

type StatusProps = { status: keyof typeof StatusColor };

export const Status = styled.td<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: inherit;

  &::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background-color: ${({ status, theme }) => theme[StatusColor[status]]};
  }
`;
