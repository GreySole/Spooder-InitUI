import { Button } from "@spooder/webui-component-library";
import { useInitStep, InitStep } from "../context/InitStepContext";

export default function RestoreFinishedStep() {
  const { setCurrentStep } = useInitStep();

  return (
    <Button label="Continue" onClick={() => setCurrentStep(InitStep.THEME)} />
  );
}
