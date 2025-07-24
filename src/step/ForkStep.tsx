import { Box, Button } from "@greysole/spooder-component-library";
import { useInitStep, InitStep } from "../context/InitStepContext";
import { useInitContext } from "../context/InitContextProvider";

export default function ForkStep() {
  const { isFirstTime } = useInitContext();
  const { currentStep, setCurrentStep } = useInitStep();

  return (
    <Box flexFlow="row wrap">
      <Box padding="small">
        <Button
          label="Restore from Backup"
          onClick={() => setCurrentStep(InitStep.RESTORE)}
        />
      </Box>

      <Box padding="small">
        <Button
          label={isFirstTime ? "Start from Scratch" : "Review this Config"}
          onClick={() => setCurrentStep(InitStep.THEME)}
        />
      </Box>
    </Box>
  );
}
