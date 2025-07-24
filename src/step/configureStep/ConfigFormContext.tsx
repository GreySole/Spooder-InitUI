import { ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useInitContext } from "../../context/InitContextProvider";

interface ConfigFormContextProps {
  children: ReactNode;
}

export const ConfigFormContext = ({ children }: ConfigFormContextProps) => {
  const { config } = useInitContext();
  const methods = useForm({
    defaultValues: { ...config },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};
