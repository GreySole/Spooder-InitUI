import { Box, useTheme } from "@greysole/spooder-component-library";

export default function Background() {
  const { themeVariables } = useTheme();
  const hue = Math.floor((themeVariables.hue - 0.5) * 360) % 360;
  const saturation = themeVariables.saturation;
  return (
    <Box className="background" width="100vw" height="100vh">
      <video
        autoPlay
        loop
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: `hue-rotate(${hue}deg) saturate(${saturation})`,
        }}
      >
        <source src="/assets/web.webm" type="video/webm" />
      </video>
    </Box>
  );
}
