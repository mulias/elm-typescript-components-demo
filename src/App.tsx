import React, { useState, useCallback } from "react";
import ElmComponent from "react-elm-components";
import usePorts from "./usePorts";
import { Elm } from "./elm/ElmApps";

const App: React.FC = () => {
  // Wait for a ping from PortsApp before being allowed to pong back
  const [canPong, setCanPong] = useState(false);

  const [pingPongPort, setupPingPongPort] = usePorts<typeof Elm.PortsApp>(
    pingPongPort => pingPongPort.ping.subscribe(() => setCanPong(true))
  );

  const pong = () => {
    if (pingPongPort) {
      pingPongPort.pong.send(null);
      setCanPong(false);
    }
  };

  const [_alertPort, setupAlertPort] = usePorts<typeof Elm.FlagsAndPortsApp>(
    alertPort => alertPort.alert.subscribe(message => alert(message))
  );

  return (
    <div className="App">
      <h2>Sandbox app with no interop</h2>
      <ElmComponent src={Elm.SandboxApp} flags={null} />

      <h2>Flags to send a string value on mount</h2>
      <ElmComponent src={Elm.FlagsApp} flags={"World"} />

      <h2>Ports to share state</h2>
      <ElmComponent src={Elm.PortsApp} flags={null} ports={setupPingPongPort} />
      <div>
        {"js: "}
        <button disabled={!canPong} onClick={pong}>
          Pong!
        </button>
      </div>

      <h2>Flags & Ports to send an initial object and use side effects</h2>
      <ElmComponent
        src={Elm.FlagsAndPortsApp}
        flags={{ startNum: 9000 }}
        ports={setupAlertPort}
      />
    </div>
  );
};

export default App;
