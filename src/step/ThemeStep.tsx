import React from "react";
import {
  Box,
  Stack,
  Slider,
  BoolSwitch,
  useTheme,
  Border,
  EditCustomSpooder,
} from "@greysole/spooder-component-library";
import EditCustomSpooderFormProvider from "../customSpooderInput/EditCustomSpooderFormProvider";

export default function ThemeStep() {
  const {
    themeColors,
    themeVariables,
    setThemeHue,
    setThemeMode,
    setThemeSaturation,
    customSpooder,
  } = useTheme();

  return (
    <Box width="100%" padding="small" justifyContent="center">
      <Stack align="center" width="100%" spacing="xlarge" padding="medium">
        <Slider
          orientation={"horizontal"}
          gradient={
            "#FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000"
          }
          value={themeVariables.hue}
          step={0.01}
          onChange={(value) => {
            setThemeHue(value);
          }}
        />
        <Slider
          orientation={"horizontal"}
          gradient={`#FFFFFF, ${themeColors.baseColor}`}
          value={themeVariables.saturation}
          step={0.01}
          onChange={(value) => {
            setThemeSaturation(value);
          }}
        />
        <BoolSwitch
          label="Dark Theme"
          value={themeVariables.isDarkTheme}
          onChange={() => {
            setThemeMode(!themeVariables.isDarkTheme);
          }}
        />
        <EditCustomSpooderFormProvider data={customSpooder}>
          <Box width="100%" height="40dvh" padding="none">
            <Border>
              <Box width="100%" height="100%" padding="medium" overflow="auto">
                <EditCustomSpooder formKey="" />
              </Box>
            </Border>
          </Box>
        </EditCustomSpooderFormProvider>
      </Stack>
    </Box>
  );
}
