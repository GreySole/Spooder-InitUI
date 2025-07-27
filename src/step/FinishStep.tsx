import { useCallback, useEffect, useState } from "react";
import { InitStep, useInitStep } from "../context/InitStepContext";
import { Box, TypeFace } from "@greysole/spooder-component-library";
import { finishInit } from "../Request";

export default function FinishStep() {
  const { setCurrentStep, setNextAction, setPrevAction } = useInitStep();
  const gotoPrevStep = useCallback(() => {
    setCurrentStep(InitStep.HOSTING);
  }, [setCurrentStep]);
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    setNextAction(() => () => {});
    setPrevAction(() => () => gotoPrevStep());
    finishInit().then((data) => {
      if (data.status === "ok") {
        //{ status: 'ok', ipcConnected: ipcConnected }
        if (data.ipcConnected) {
          setStatusText(
            "Nice, you have the installer app! Your Spooder is restarting now. Refreshing page in 5 seconds..."
          );
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } else {
          setStatusText(
            "Looks like you're not using the installer app. Restart your Spooder manually and refresh this page to access the WebUI."
          );
        }
      }
    });
  }, [gotoPrevStep, setNextAction, setPrevAction]);

  return (
    <Box padding="medium">
      <TypeFace fontSize="large">{statusText}</TypeFace>
    </Box>
  );
}
