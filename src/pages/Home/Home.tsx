import { PlayIcon } from "@radix-ui/react-icons";
import {
  ButtonContainer,
  Colon,
  DurationInput,
  FormContainer,
  HomeContainer,
  TaskInput,
  TimerContainer,
} from "./Home.styles";

function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">I'll work on</label>
          <TaskInput
            id="task"
            placeholder="Give your task a title"
            list="task-suggestions"
          />
          <datalist id="task-suggestions">
            <option value="Check Akiflow" />
            <option value="Pick Jira tasks for the day" />
          </datalist>
          <label htmlFor="duration">for</label>
          <DurationInput
            id="duration"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />
          <span>minutes.</span>
        </FormContainer>
        <TimerContainer>
          <span>0</span>
          <span>0</span>
          <Colon>:</Colon>
          <span>0</span>
          <span>0</span>
        </TimerContainer>
        <ButtonContainer disabled>
          <PlayIcon /> Start Task
        </ButtonContainer>
      </form>
    </HomeContainer>
  );
}

export default Home;
