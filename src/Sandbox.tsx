import React from "react";
import ElmComponent from "react-elm-components";
import { Elm } from "./elm/SandboxApp.elm";

const Sandbox: React.FC = () => (
  <div>
    <h2>Sandbox app with no interop</h2>
    <ElmComponent src={Elm.SandboxApp} flags={null} />
  </div>
);

export default Sandbox;
