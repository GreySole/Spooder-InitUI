import React from "react";
import {
  Box,
  Stack,
  Slider,
  BoolSwitch,
  useTheme,
  Border,
} from "@greysole/spooder-component-library";
import EditCustomSpooder from "../customSpooderInput/EditCustomSpooder";

export default function ThemeStep() {
  const {
    themeColors,
    themeVariables,
    setThemeHue,
    setThemeMode,
    setThemeSaturation,
  } = useTheme();

  console.log("Theme Variables:", themeVariables);

  return (
    <Box width="100%" padding="small" justifyContent="center">
      <Stack align="center" width="100%" spacing="large" padding="medium">
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
        <Box width="100%" height="50dvh" padding="none">
          <Border>
            <Box width="100%" height="100%" padding="medium">
              <EditCustomSpooder />
            </Box>
          </Border>
        </Box>
      </Stack>
    </Box>
  );
}
