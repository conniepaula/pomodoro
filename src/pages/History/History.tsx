import { HistoryContainer, HistoryList, Status } from "./History.styles";

type Task = {
  taskName: string;
  duration: string;
  startTime: string;
  status: "Complete" | "Pending" | "Cancelled";
};

const tasks: Array<Task> = [
  {
    taskName: "Code review",
    duration: "30 minutes",
    startTime: "1 day ago",
    status: "Complete",
  },
  {
    taskName: "Bug fixing",
    duration: "60 minutes",
    startTime: "1 day ago",
    status: "Pending",
  },
  {
    taskName: "Team meeting",
    duration: "45 minutes",
    startTime: "3 hours ago",
    status: "Complete",
  },
  {
    taskName: "Unit testing",
    duration: "20 minutes",
    startTime: "1 day ago",
    status: "Complete",
  },
  {
    taskName: "Documentation",
    duration: "45 minutes",
    startTime: "2 days ago",
    status: "Cancelled",
  },
  {
    taskName: "Feature development",
    duration: "120 minutes",
    startTime: "1 day ago",
    status: "Pending",
  },
  {
    taskName: "Research",
    duration: "30 minutes",
    startTime: "3 days ago",
    status: "Complete",
  },
  {
    taskName: "Code refactoring",
    duration: "60 minutes",
    startTime: "2 days ago",
    status: "Complete",
  },
];

function History() {
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
            {tasks.map((task) => (
              <tr key={task.taskName}>
                <td>{task.taskName}</td>
                <td>{task.duration}</td>
                <td>{task.startTime}</td>
                <Status status={task.status}>{task.status}</Status>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}

export default History;
