import { useInitContext } from "./context/InitContextProvider";
import { InitStep, useInitStep } from "./context/InitStepContext";

export default function InitStepText() {
  const { currentStep } = useInitStep();
  const { config, isFirstTime } = useInitContext();

  switch (currentStep) {
    case InitStep.WELCOME:
      return <span>Hi, I'm your Spooder!</span>;
    case InitStep.FORK:
      return (
        <span>
          {isFirstTime
            ? "Who am I? 🤔"
            : `What's up, ${config.bot.owner_name}?`}
        </span>
      );
    case InitStep.RESTORE:
      return <span>Drop or Browse a Settings Backup File.</span>;
    case InitStep.RESTORE_FINISHED:
      return (
        <span>
          Restore complete! I am {config.bot.bot_name} and you are{" "}
          {config.bot.owner_name}! Let's review the settings and make sure
          everything's alright.
        </span>
      );
    case InitStep.THEME:
      return <span>Customize me!</span>;
    case InitStep.CONFIG:
      return (
        <span>
          Here's the base config. In most cases, the default values are fine. If
          you have connection problems, you'll want to check your firewall
          settings.
        </span>
      );
    case InitStep.OSC:
      return (
        <span>These are OSC servers you can send commands to in Events.</span>
      );
    case InitStep.HOSTING:
      return <span>Host your Spooder on the Internet!</span>;
    case InitStep.FINISH:
      return <span>You're all set!</span>;
    default:
      return null;
  }
}
