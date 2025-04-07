import {
  Stack,
  FormTextInput,
  TypeFace,
  FormSelectDropdown,
  FormNumberInput,
} from "@greysole/spooder-component-library";
import { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useInitContext } from "../../InitContextProvider";
import { InitStep, useInitStep } from "../../InitStepContext";
import { saveConfig } from "../../Request";

export default function ConfigureStepForm() {
  const { nets } = useInitContext();
  const { setCurrentStep, setNextAction, setPrevAction } = useInitStep();
  const { getValues, setValue } = useFormContext();

  const saveAndContinue = useCallback(() => {
    saveConfig(getValues())
      .then(() => {
        setCurrentStep(InitStep.OSC);
      })
      .catch((error) => {
        console.error("Error saving config:", error);
      });
  }, [getValues, setCurrentStep]);

  const gotoPrevStep = useCallback(() => {
    setCurrentStep(InitStep.THEME);
  }, [setCurrentStep]);

  useEffect(() => {
    const hostIP = getValues("network.host");
    if (hostIP === "") {
      nets.forEach((net) => {
        if (net.address.startsWith("192.168")) {
          setValue("network.host", net.address);
        }
      });
    }
  }, [nets, getValues, setValue]);

  useEffect(() => {
    setNextAction(() => () => saveAndContinue());
    setPrevAction(() => () => gotoPrevStep());
  }, [gotoPrevStep, saveAndContinue, setNextAction, setPrevAction]);

  const netOptions = nets.map((net) => ({
    label: `${net.name}: ${net.address}`,
    value: net.address,
  }));
  return (
    <Stack spacing="medium">
      <FormTextInput label="Owner Name" formKey="bot.owner_name" />
      <FormTextInput label="Bot Name" formKey="bot.bot_name" />
      <TypeFace wordBreak="break-all">
        The WebUI is accessible to any address available to the Spooder device.
        The Host Address is doesn't affect accessibilty, but it's used for
        building links for overlays and utilities.
      </TypeFace>
      <FormSelectDropdown
        label="Host Address"
        formKey="network.host"
        options={netOptions}
      />
      <TypeFace>
        The port, however, does affect which port the WebUI will run on.
      </TypeFace>
      <FormNumberInput label="Host Port" formKey="network.host_port" />
    </Stack>
  );
}
