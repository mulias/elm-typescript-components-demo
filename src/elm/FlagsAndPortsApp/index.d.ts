// WARNING: Do not manually modify this file. It was generated using:
// https://github.com/dillonkearns/elm-typescript-interop
// Type definitions for Elm ports

export namespace Elm {
  namespace FlagsAndPortsApp {
    export interface App {
      ports: {
        alert: {
          subscribe(callback: (data: string) => void): void
        }
        ping: {
          subscribe(callback: (data: null) => void): void
        }
        pong: {
          send(data: null): void
        }
      };
    }
    export function init(options: {
      node?: HTMLElement | null;
      flags: { startNum: number };
    }): Elm.FlagsAndPortsApp.App;
  }
}