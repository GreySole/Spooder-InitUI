import {
  Stack,
  FormNumberInput,
  Border,
} from "@greysole/spooder-component-library";
import UdpClientList from "./UdpClientList";
import { InitStep, useInitStep } from "../../InitStepContext";
import { useCallback, useEffect } from "react";
import { saveConfig } from "../../Request";
import { useFormContext } from "react-hook-form";

export default function OSCForm() {
  const { setCurrentStep, setNextAction, setPrevAction } = useInitStep();
  const { getValues } = useFormContext();

  const saveAndContinue = useCallback(() => {
    saveConfig(getValues())
      .then(() => {
        setCurrentStep(InitStep.HOSTING);
      })
      .catch((error) => {
        console.error("Error saving config:", error);
      });
  }, [getValues, setCurrentStep]);

  const gotoPrevStep = useCallback(() => {
    setCurrentStep(InitStep.CONFIG);
  }, [setCurrentStep]);

  useEffect(() => {
    setNextAction(() => () => saveAndContinue());
    setPrevAction(() => () => gotoPrevStep());
  }, [gotoPrevStep, saveAndContinue, setNextAction, setPrevAction]);

  return (
    <Stack spacing="medium" padding="medium">
      <FormNumberInput
        label="OSC UDP Port"
        formKey="network.osc.osc_udp_port"
      />
      <FormNumberInput
        label="OSC TCP Port"
        formKey="network.osc.osc_tcp_port"
      />
      <Border>
        <UdpClientList />
      </Border>
    </Stack>
  );
}
