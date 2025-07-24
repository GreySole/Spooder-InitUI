import { ConfigFormContext } from "./configureStep/ConfigFormContext";
import OSCForm from "./oscStep/OSCForm";

export default function OSCStep() {
  return (
    <ConfigFormContext>
      <OSCForm />
    </ConfigFormContext>
  );
}
