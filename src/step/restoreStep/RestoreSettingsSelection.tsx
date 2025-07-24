import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  BoolSwitch,
  Border,
  Box,
  Button,
  MouseArea,
  Stack,
  TypeFace,
  useTheme,
} from "@greysole/spooder-component-library";
import { restoreSettings } from "../../Request";
import { InitStep, useInitStep } from "../../context/InitStepContext";
import { useInitContext } from "../../context/InitContextProvider";

interface RestoreSettingsSelectionProps {
  backupName: string;
  selections: string[];
}

export default function RestoreSettingsSelection({
  backupName,
  selections,
}: RestoreSettingsSelectionProps) {
  const { control, handleSubmit, setValue } = useForm();
  const [selectAll, setSelectAll] = useState<boolean>(true);
  const { refetch } = useInitContext();
  const { setCurrentStep } = useInitStep();

  const onSubmit = (data: any) => {
    restoreSettings(backupName, data).then(async (response) => {
      await refetch();
      setCurrentStep(InitStep.RESTORE_FINISHED);
    });
  };

  const handleSelectAll = (value: boolean) => {
    selections.forEach((selection) => {
      setValue(selection, value);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack width="100%" height="100%" spacing="medium">
        <TypeFace fontSize="large">
          Select which files to restore from the backup file.
        </TypeFace>

        <Box padding="small">
          <BoolSwitch
            label="Select All"
            value={selectAll}
            onChange={(value) => {
              setSelectAll(value);
              handleSelectAll(value);
            }}
          />
        </Box>

        <Box width="100%" overflow="auto">
          <Stack width="100%" spacing="small">
            {selections.map((selection) => (
              <Controller
                key={selection}
                name={selection}
                control={control}
                defaultValue={true}
                render={({ field }) => (
                  <Border borderBottom>
                    <MouseArea
                      onClick={() => {
                        field.onChange(!field.value); // Toggle the value on click
                      }}
                    >
                      <Box padding="small">
                        <BoolSwitch
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                          }}
                        />
                        <Stack spacing="small" marginLeft="medium">
                          <TypeFace fontSize="medium" userSelect="none">
                            {selection}
                          </TypeFace>
                        </Stack>
                      </Box>
                    </MouseArea>
                  </Border>
                )}
              />
            ))}
          </Stack>
        </Box>
        <Button label="Restore Files" onClick={() => handleSubmit(onSubmit)} />
      </Stack>
    </form>
  );
}
