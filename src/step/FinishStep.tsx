import { useCallback, useEffect } from "react";
import { InitStep, useInitStep } from "../InitStepContext";
import { Box } from "@greysole/spooder-component-library";

export default function FinishStep() {
  const { setCurrentStep, setNextAction, setPrevAction } = useInitStep();
  const gotoPrevStep = useCallback(() => {
    setCurrentStep(InitStep.HOSTING);
  }, [setCurrentStep]);

  useEffect(() => {
    setNextAction(() => () => {});
    setPrevAction(() => () => gotoPrevStep());
  }, [gotoPrevStep, setNextAction, setPrevAction]);

  return <Box>{null}</Box>;
}
