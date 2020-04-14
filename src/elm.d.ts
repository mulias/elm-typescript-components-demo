// WARNING: Do not manually modify this file. It was generated using:
// https://github.com/mulias/elm-tigershark
// Type definitions for using Elm programs in TypeScript

declare module "*.elm" {
  export namespace Elm {
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
    namespace SandboxApp {
      export interface App {
        ports: {};
      }
      export function init(options: {
        node?: HTMLElement | null;
        flags: null;
      }): Elm.SandboxApp.App;
    }
  }
}
