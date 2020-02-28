import React from "react";
import ElmComponent from "react-elm-components";
import usePorts from "./usePorts";
// This import is typed in a way that allows me to use ports which do not exist
// in `SandboxApp.js`. When the component is mounted the React app will crash.
import { Elm } from "./elm/SandboxApp";

const Sandbox: React.FC = () => {
  // calling `setupPingPongPort` breaks the app!
  const [pingPongPort, setupPingPongPort] = usePorts<typeof Elm.SandboxApp>(
    pingPongPort => pingPongPort.ping.subscribe(() => null)
  );

  const pong = () => {
    if (pingPongPort) {
      pingPongPort.pong.send(null);
    }
  };

  return (
    <div>
      <h2>Sandbox app with no interop</h2>
      <ElmComponent
        src={Elm.SandboxApp}
        flags={null}
        ports={setupPingPongPort}
      />
    </div>
  );
};

export default Sandbox;
