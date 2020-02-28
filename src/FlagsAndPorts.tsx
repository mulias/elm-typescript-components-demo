import React from "react";
import ElmComponent from "react-elm-components";
import usePorts from "./usePorts";
import { Elm } from "./elm/ElmApps";

const FlagsAndPorts: React.FC = () => {
  const [_alertPort, setupAlertPort] = usePorts<typeof Elm.FlagsAndPortsApp>(
    alertPort => alertPort.alert.subscribe(message => alert(message))
  );

  return (
    <div>
      <h2>Flags & Ports to send an initial object and use side effects</h2>
      <ElmComponent
        src={Elm.FlagsAndPortsApp}
        flags={{ startNum: 9000 }}
        ports={setupAlertPort}
      />
    </div>
  );
};

export default FlagsAndPorts;
