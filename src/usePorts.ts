import { useState, useCallback } from "react";

import { Ports, ElmApp } from "react-elm-components";

function usePorts<T extends ElmApp<any, any>>(
  init?: (ports: Ports<T>) => void
): [Ports<T> | undefined, (ports: Ports<T>) => void] {
  const [ports, setPorts] = useState<Ports<T> | undefined>(undefined);

  const setupPorts = useCallback(
    ports => {
      setPorts(ports);
      init && init(ports);
    },
    [init]
  );

  return [ports, setupPorts];
}

export default usePorts;
