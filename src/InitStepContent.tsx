import { useInitStep, InitStep } from "./InitStepContext";
import RestoreStep from "./step/RestoreStep";
import ConfigStep from "./step/ConfigStep";
import OSCStep from "./step/OSCStep";
import { ThemeForm } from "./ThemeForm";
import HostingStep from "./step/HostingStep";
import WelcomeStep from "./step/WelcomeStep";
import ForkStep from "./step/ForkStep";
import RestoreFinishedStep from "./step/RestoreFinishedStep";
import FinishStep from "./step/FinishStep";

export default function InitStepContent() {
  const { currentStep } = useInitStep();

  switch (currentStep) {
    case InitStep.WELCOME:
      return <WelcomeStep />;
    case InitStep.FORK:
      return <ForkStep />;
    case InitStep.RESTORE:
      return <RestoreStep />;
    case InitStep.RESTORE_FINISHED:
      return <RestoreFinishedStep />;
    case InitStep.THEME:
      return <ThemeForm />;
    case InitStep.CONFIG:
      return <ConfigStep />;
    case InitStep.OSC:
      return <OSCStep />;
    case InitStep.HOSTING:
      return <HostingStep />;
    case InitStep.FINISH:
      return <FinishStep />;
    default:
      return null;
  }
}
