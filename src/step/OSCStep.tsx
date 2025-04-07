import { ConfigFormContext } from "../ConfigFormContext";
import OSCForm from "./oscStep/OSCForm";

export default function OSCStep() {
  return (
    <ConfigFormContext>
      <OSCForm />
    </ConfigFormContext>
  );
}
