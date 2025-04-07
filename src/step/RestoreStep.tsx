import { Box, Button, FileDropZone } from "@greysole/spooder-component-library";
import { prepareRestoreSettings } from "../Request";
import { useState } from "react";
import RestoreSettingsSelection from "./restoreStep/RestoreSettingsSelection";
import { InitStep, useInitStep } from "../InitStepContext";

export default function RestoreStep() {
  const [backupName, setBackupName] = useState<string>("");
  const [backupSelections, setBackupSelections] = useState<string[]>([]);
  const { setCurrentStep } = useInitStep();
  const handleFile = (file: File) => {
    // Handle the file here
    console.log("File dropped:", file);
    prepareRestoreSettings(file).then((data) => {
      console.log("RESTORE SETTINGS", data);
      if (data.status === "ok") {
        setBackupName(file.name);
        setBackupSelections(data.data);
      }
    });
  };
  return (
    <Box flexFlow="column" width="100%" height="100%" padding="small">
      {backupSelections.length === 0 ? (
        <FileDropZone width="100%" height="25dvh" handleFile={handleFile} />
      ) : (
        <Box height="60dvh" overflow="auto" padding="small">
          <RestoreSettingsSelection
            backupName={backupName}
            selections={backupSelections}
          />
        </Box>
      )}
      <Box
        width="100%"
        flexFlow="row"
        justifyContent="flex-end"
        marginTop="medium"
      >
        <Button label="Back" onClick={() => setCurrentStep(InitStep.FORK)} />
      </Box>
    </Box>
  );
}
