import { FieldValues, useFormContext } from "react-hook-form";
import { Button, KeyedObject } from "@greysole/spooder-component-library";

interface StepSaveButtonProps {
  saveFunction: (values: FieldValues) => Promise<KeyedObject>;
  onSave: () => void;
}

export default function StepSaveButton(props: StepSaveButtonProps) {
  const { saveFunction, onSave } = props;
  const { getValues } = useFormContext();
  const onClick = () => {
    const values = getValues();
    console.log("Saved values:", values);
    saveFunction(values)
      .then((data) => {
        console.log("Config saved successfully", data);
        onSave(); // Call the onSave function passed from props
      })
      .catch((error) => {
        console.error("Error saving config:", error);
      });
  };

  return <Button label="Next" onClick={onClick} />;
}
