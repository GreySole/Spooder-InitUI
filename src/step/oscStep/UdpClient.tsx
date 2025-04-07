import {
  Border,
  Button,
  Columns,
  TypeFace,
} from "@greysole/spooder-component-library";
import { useFormContext } from "react-hook-form";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface UdpClientProps {
  keyName: string;
}

export default function UdpClient(props: UdpClientProps) {
  const { keyName } = props;
  const { watch, unregister } = useFormContext();
  const udpClient = watch(`network.osc.udp_servers.${keyName}`);

  const deleteUdpClient = () => {
    unregister(`network.osc.udp_servers.${keyName}`);
  };
  return (
    <Border borderBottom>
      <Columns spacing="medium" padding="xsmall">
        <Button icon={faTrash} iconSize="medium" onClick={deleteUdpClient} />
        <TypeFace>{udpClient.name}</TypeFace>
        <TypeFace>{udpClient.ip}</TypeFace>
        <TypeFace>{udpClient.port}</TypeFace>
      </Columns>
    </Border>
  );
}
