import React, { useState } from "react";
import {
  Box,
  Stack,
  Slider,
  BoolSwitch,
  useTheme,
  Border,
  ButtonRow,
  Columns,
  Button,
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

  const [tab, setTab] = useState("theme");

  console.log("Theme Variables:", themeVariables);

  return (
    <Box width="100%" flexFlow="column" padding="small" alignItems="center">
      <Columns spacing="none" marginBottom="small">
        <Button
          className="plugin-button start"
          label="Theme"
          onClick={() => setTab("theme")}
          color={
            tab === "theme" ? themeColors.darkColorAnalogousCCW : undefined
          }
        />
        <Button
          className="plugin-button end"
          label="Spooder"
          onClick={() => setTab("spooder")}
          color={
            tab === "spooder" ? themeColors.darkColorAnalogousCCW : undefined
          }
        />
      </Columns>
      {tab === "theme" ? (
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
        </Stack>
      ) : (
        <Box width="inherit" height="60dvh" padding="medium">
          <EditCustomSpooder />
        </Box>
      )}
    </Box>
  );
}
