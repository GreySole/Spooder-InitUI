import { useForm, FormProvider } from "react-hook-form";
import React, { ReactNode } from "react";
import { KeyedObject } from "@greysole/spooder-component-library";

interface EditCustomSpooderForm {
  data: KeyedObject;
  children: ReactNode;
}

export default function EditCustomSpooderFormProvider(
  props: EditCustomSpooderForm
) {
  const { data, children } = props;

  const customSpooderForm = useForm({
    defaultValues: data,
  });

  return <FormProvider {...customSpooderForm}>{children}</FormProvider>;
}
