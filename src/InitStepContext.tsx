import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useInitContext } from "./InitContextProvider";

export enum InitStep {
  WELCOME = 0,
  FORK = 1,
  RESTORE = 2,
  RESTORE_FINISHED = 3,
  THEME = 4,
  CONFIG = 5,
  OSC = 6,
  HOSTING = 7,
  FINISH = 8,
}
// Define the shape of the context
interface InitStepContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextAction: () => void;
  setNextAction: (action: () => void) => void;
  prevAction: () => void;
  setPrevAction: (action: () => void) => void;
}

// Create the context with a default value
const InitStepContext = createContext<InitStepContextType | undefined>(
  undefined
);

// Create a provider component
interface InitStepProviderProps {
  children: ReactNode;
}

export const InitStepProvider: React.FC<InitStepProviderProps> = ({
  children,
}) => {
  const { isFirstTime } = useInitContext();
  const [currentStep, setCurrentStep] = useState<number>(
    isFirstTime ? InitStep.WELCOME : InitStep.FORK
  );
  const [nextAction, setNextAction] = useState<() => void>(() => () => {});
  const [prevAction, setPrevAction] = useState<() => void>(() => () => {});

  useEffect(() => {
    if (isFirstTime) {
      setCurrentStep(InitStep.WELCOME);
    } else {
      setCurrentStep(InitStep.FORK);
    }
  }, [isFirstTime]);

  return (
    <InitStepContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        nextAction,
        setNextAction,
        prevAction,
        setPrevAction,
      }}
    >
      {children}
    </InitStepContext.Provider>
  );
};

// Custom hook to use the context
export const useInitStep = (): InitStepContextType => {
  const context = useContext(InitStepContext);
  if (!context) {
    throw new Error("useInitStep must be used within an InitStepProvider");
  }
  return context;
};
