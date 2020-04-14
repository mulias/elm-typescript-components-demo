import React from "react";
import ElmComponent from "react-elm-components";
import { Elm } from "./elm/FlagsApp.elm";

const Flags: React.FC = () => (
  <div>
    <h2>Flags to send a string value on mount</h2>
    <ElmComponent src={Elm.FlagsApp} flags="World" />
  </div>
);

export default Flags;
