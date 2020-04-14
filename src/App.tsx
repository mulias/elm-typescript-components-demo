import React from "react";
import ElmComponent from "react-elm-components";
import usePorts from "./usePorts";
import Sandbox from "./Sandbox";
import Flags from "./Flags";
import Ports from "./Ports";
import FlagsAndPorts from "./FlagsAndPorts";

const App: React.FC = () => {
  return (
    <div className="App">
      <Sandbox />
      <Flags />
      <Ports />
      <FlagsAndPorts />
    </div>
  );
};

export default App;
