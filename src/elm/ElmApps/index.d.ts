export namespace Elm {
  namespace SandboxApp {
    export interface App {
      ports: {};
    }
    export function init(options: {
      node?: HTMLElement | null;
      flags: null;
    }): Elm.SandboxApp.App;
  }
  namespace FlagsApp {
    export interface App {
      ports: {};
    }
    export function init(options: {
      node?: HTMLElement | null;
      flags: string;
    }): Elm.FlagsApp.App;
  }
  namespace PortsApp {
    export interface App {
      ports: {
        ping: {
          subscribe(callback: (data: null) => void): void;
        };
        pong: {
          send(data: null): void;
        };
      };
    }
    export function init(options: {
      node?: HTMLElement | null;
      flags: null;
    }): Elm.PortsApp.App;
  }
  namespace FlagsAndPortsApp {
    export interface App {
      ports: {
        alert: {
          subscribe(callback: (data: string) => void): void;
        };
      };
    }
    export function init(options: {
      node?: HTMLElement | null;
      flags: { startNum: number };
    }): Elm.FlagsAndPortsApp.App;
  }
}
