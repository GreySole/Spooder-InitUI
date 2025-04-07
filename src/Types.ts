import { KeyedObject } from "@greysole/spooder-component-library";

export interface NetworkInterface {
    name: string;
    address: string;
  }

  export interface ConfigBotSection {
    owner_name: string;
    bot_name: string;
    help_command: string;
    introduction: string;
  }
  
  export interface ConfigNetworkSection {
    host: string;
    host_port: number;
    osc: OSCConfig;
    externalhandle: 'manual' | 'ngrok' | 'motherwolf' | 'disabled';
    ngrok: NgrokConfig;
    motherwolf: MotherwolfConfig;
    manual: ManualConfig;
  }
  
  interface OSCConfig {
    udp_servers: UdpServerObject;
    osc_udp_port: number;
    osc_tcp_port: number;
  }
  
  interface UdpServerObject {
    [key: string]: UdpClient;
  }
  
  interface UdpClient {
    name: string;
    ip: string;
    port: number;
  }
  
  interface NgrokConfig {
    authtoken: string;
    subdomain: string;
  }
  
  interface MotherwolfConfig {
    token: string;
    subdomain: string;
  }
  
  interface ManualConfig {
    http_url: string;
    tcp_url: string;
  }
  
  export interface ConfigFile {
    bot: ConfigBotSection;
    network: ConfigNetworkSection;
  }