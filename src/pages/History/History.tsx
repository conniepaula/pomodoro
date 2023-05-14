import { useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import enGB from "date-fns/locale/en-GB";

import { TaskContext } from "../../context/TaskContext";
import { HistoryContainer, HistoryList, Status } from "./History.styles";

function History() {
  const { taskCycles } = useContext(TaskContext);
  return (
    <HistoryContainer>
      <h1>Task History</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {taskCycles.map((task) => {
              const status = task.endDate
                ? "Complete"
                : task.stopDate
                ? "Cancelled"
                : "Pending";
              return (
                <tr key={task.id}>
                  <td>{task.task}</td>
                  <td>{task.duration}</td>
                  <td>
                    {formatDistanceToNow(new Date(task.startDate), {
                      addSuffix: true,
                      locale: enGB,
                    })}
                  </td>
                  {<Status status={status}>{status}</Status>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}

export default History;
