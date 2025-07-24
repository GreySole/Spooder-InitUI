import {
  Box,
  CustomSpooder,
  hexToRGBArray,
  Pagination,
  TypeFace,
  useTheme,
} from "@greysole/spooder-component-library";
import { InitStep, useInitStep } from "./context/InitStepContext";
import InitStepText from "./InitStepText";
import InitStepContent from "./InitStepContent";

export default function InitSteps() {
  const { currentStep, nextAction, prevAction } = useInitStep();
  const { themeColors } = useTheme();

  if (!themeColors.backgroundColorFar) {
    return null;
  }

  return (
    <Box
      className="content"
      flexFlow="column"
      alignItems="center"
      justifyContent="space-evenly"
      padding="medium"
      maxWidth="1200px"
      maxHeight="100%"
      backgroundColor={`rgba(${hexToRGBArray(
        themeColors.backgroundColorFar
      )}, 0.85)`}
    >
      <Box height="100%" flexFlow="column">
        <Box
          width="100%"
          alignItems="center"
          justifyContent="center"
          marginBottom="small"
        >
          <CustomSpooder fontSize="3rem" />
        </Box>
        <TypeFace fontSize="large" textAlign="center">
          <InitStepText />
        </TypeFace>
      </Box>
      <Box
        flexFlow="column"
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
        paddingTop="medium"
      >
        <InitStepContent />
      </Box>

      <Box width="100%" paddingLeft="medium" paddingRight="medium">
        {currentStep > InitStep.RESTORE_FINISHED ? (
          <Pagination
            pageTitles={["Theme", "Config", "OSC", "Hosting", "Finish"]}
            currentPage={currentStep - InitStep.THEME}
            handleNext={nextAction}
            handlePrevious={prevAction}
          />
        ) : null}
      </Box>
    </Box>
  );
}
