import { Box, useTheme } from "@greysole/spooder-component-library";
import { InitStep, useInitStep } from "./context/InitStepContext";
import { saveThemes } from "./Request";
import ThemeStep from "./step/ThemeStep";
import { useCallback, useEffect } from "react";

export const ThemeForm = () => {
  const { themeVariables, customSpooder } = useTheme();
  const { setCurrentStep, setNextAction, setPrevAction } = useInitStep();

  const onClick = useCallback(async () => {
    const newThemes = {
      webui: {
        ...themeVariables,
      },
      spooderpet: [...customSpooder],
    };

    await saveThemes(newThemes);
    setCurrentStep(InitStep.CONFIG);
  }, [customSpooder, setCurrentStep, themeVariables]);

  const gotoNextStep = useCallback(() => {
    setCurrentStep(InitStep.CONFIG);
  }, [setCurrentStep]);

  useEffect(() => {
    setNextAction(() => () => onClick());
    setPrevAction(() => () => gotoNextStep());
  }, [setNextAction, setPrevAction, gotoNextStep, onClick]);

  return <ThemeStep />;
};
