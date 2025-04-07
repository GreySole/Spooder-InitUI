import {
  Stack,
  TypeFace,
  FormSelectDropdown,
  Box,
} from "@greysole/spooder-component-library";
import HostingHandle from "./HostingHandle";
import { InitStep, useInitStep } from "../../InitStepContext";
import { useCallback, useEffect } from "react";
import { saveConfig } from "../../Request";
import { useFormContext } from "react-hook-form";

export default function HostingForm() {
  const { setNextAction, setPrevAction, setCurrentStep } = useInitStep();
  const { getValues } = useFormContext();

  const saveAndContinue = useCallback(() => {
    saveConfig(getValues())
      .then(() => {
        setCurrentStep(InitStep.FINISH);
      })
      .catch((error) => {
        console.error("Error saving config:", error);
      });
  }, [getValues, setCurrentStep]);

  const gotoPrevStep = useCallback(() => {
    setCurrentStep(InitStep.OSC);
  }, [setCurrentStep]);

  useEffect(() => {
    setNextAction(() => () => saveAndContinue());
    setPrevAction(() => () => gotoPrevStep());
  }, [gotoPrevStep, saveAndContinue, setNextAction, setPrevAction]);

  return (
    <Stack spacing="small" align="center">
      <TypeFace>
        Public Hosting is not required for Spooder to run, but it enables these
        features:
      </TypeFace>
      <ul>
        <li>
          <TypeFace>
            ModUI: Moderator GUI to lock chat commands and plugins as well as
            access plugin utility pages.
          </TypeFace>
        </li>
        <li>
          <TypeFace>Sharing: Share overlays along with plugins.</TypeFace>
        </li>
        <li>
          <TypeFace>
            PublicUI: Viewer GUI with an embed to your stream and access to
            public pages from plugins.
          </TypeFace>
        </li>
      </ul>
      <FormSelectDropdown
        label="Hosting Method"
        formKey="network.externalhandle"
        options={[
          {
            label: "Disabled",
            value: "disabled",
          },

          {
            label: "Ngrok",
            value: "ngrok",
          },
          {
            label: "Motherwolf (BETA)",
            value: "motherwolf",
          },
          {
            label: "Manual",
            value: "manual",
          },
        ]}
      />
      <Box padding="medium">
        <HostingHandle />
      </Box>
    </Stack>
  );
}
