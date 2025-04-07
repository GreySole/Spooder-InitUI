import {
  Border,
  Box,
  Button,
  NumberInput,
  Stack,
  TextInput,
  TypeFace,
} from "@greysole/spooder-component-library";
import UdpClient from "./UdpClient";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function UdpClientList() {
  const { setValue, watch } = useFormContext();
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [port, setPort] = useState(9000);

  const createUdpClient = () => {
    const keyName = name
      .replace(/\s+/g, "_")
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, "");

    setValue(`network.osc.udp_servers.${keyName}`, { name, ip, port });
  };
  const udpClients = watch("network.osc.udp_servers");

  return (
    <Box flexFlow="column" padding="small">
      <TypeFace fontSize="large">UDP Servers</TypeFace>
      <Border>
        <Box height="15dvh" overflow="auto">
          <Stack spacing="medium" padding="medium">
            {Object.keys(udpClients).map((key) => (
              <UdpClient keyName={key} />
            ))}
          </Stack>
        </Box>
      </Border>
      <Stack spacing="small" marginTop="small">
        <TypeFace fontSize="medium">Add UDP Server</TypeFace>
        <TextInput
          value={name}
          label="Name"
          onInput={(value) => setName(value)}
        />
        <TextInput value={ip} label="IP" onInput={(value) => setIp(value)} />
        <NumberInput
          label="Port"
          value={port}
          onInput={(value) => setPort(value)}
        />
        <Box width="100%" justifyContent="flex-end">
          <Button label="Add" onClick={() => createUdpClient()} />
        </Box>
      </Stack>
    </Box>
  );
}
