import React, { useState } from "react";
import ElmComponent from "react-elm-components";
import usePorts from "./usePorts";
import { Elm } from "./elm/ElmApps";

const Ports: React.FC = () => {
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

  return (
    <div>
      <h2>Ports to share state</h2>
      <ElmComponent src={Elm.PortsApp} flags={null} ports={setupPingPongPort} />
      <div>
        {"js: "}
        <button disabled={!canPong} onClick={pong}>
          Pong!
        </button>
      </div>
    </div>
  );
};

export default Ports;
