import { Button } from "@greysole/spooder-component-library";
import { useInitStep, InitStep } from "../context/InitStepContext";

export default function WelcomeStep() {
  const { setCurrentStep } = useInitStep();
  return <Button label="Hi :)" onClick={() => setCurrentStep(InitStep.FORK)} />;
}
