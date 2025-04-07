import { Button } from "@greysole/spooder-component-library";
import { useInitStep, InitStep } from "../InitStepContext";

export default function RestoreFinishedStep() {
  const { setCurrentStep } = useInitStep();

  return (
    <Button label="Continue" onClick={() => setCurrentStep(InitStep.THEME)} />
  );
}
