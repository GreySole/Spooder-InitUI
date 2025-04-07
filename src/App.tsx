import { Box } from "@greysole/spooder-component-library";
import Background from "./Background";
import { InitStepProvider } from "./InitStepContext";
import InitSteps from "./InitSteps";

export default function App() {
  return (
    <Box>
      <InitStepProvider>
        <Box className="container">
          <InitSteps />
        </Box>
      </InitStepProvider>
      <Background />
    </Box>
  );
}
