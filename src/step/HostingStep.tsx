import { ConfigFormContext } from "./configureStep/ConfigFormContext";
import HostingForm from "./hostingStep/HostingForm";

export default function HostingStep() {
  return (
    <ConfigFormContext>
      <HostingForm />
    </ConfigFormContext>
  );
}
