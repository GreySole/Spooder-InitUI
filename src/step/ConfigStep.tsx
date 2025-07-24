import { Box } from "@greysole/spooder-component-library";
import { ConfigFormContext } from "./configureStep/ConfigFormContext";
import ConfigureStepForm from "./configureStep/ConfigureStepForm";

export default function ConfigStep() {
  return (
    <ConfigFormContext>
      <Box flexFlow="column">
        <ConfigureStepForm />
      </Box>
    </ConfigFormContext>
  );
}
