# Elm, React, and TypeScript Interop Demo

This repo demonstrates the current state of integrating Elm applications into a
React project that uses typescript.

### Setup

`yarn`
`yarn elm make src/elm/*.elm`

### Demo Contents

Running `yarn start` launches the react app, which contains four separate Elm
applications:

- A `SandboxApp` where React mounts the Elm code as a component, but does no interop.
- A `FlagsApp` where React passes a flag to Elm on mount.
- A `PortsApp` which sets up bi-directional interop and passes messages back and
  forth between React and Elm.
- And finally a `FlagsAndPortsApp` where React both passes an initial flag and
  subscribes to outgoing Elm messages through a port.

The ultimate goal is to improve the tooling around Elm, React, and Typescript so
that after installing the required libraries using elm components in this way
just works. We aren't quite at that point yet, since for this example we:

- Add `rect-elm-components.d.ts` type declarations.
- Create a `usePorts` hook for easy port setup.
- Manually compile the elm code before the typescript code.
- Collect the output of `elm-typescript-interop` and create a declaration file
  for the compiled elm code with multiple entry points.

### Todo

- Contact the `react-elm-components` maintainers about adding `rect-elm-components.d.ts`
  to the repo, or instead adding it to `DefinitelyTyped`.
- Similarly, get `usePorts` added to `react-elm-components`, or publish as a
  separate package.
- Contact the `elm-typescript-interop` maintainers about issues generating types
  for multiple elm applications.
- Figure out how to integrate the elm compiler as a webpack loader. I seem to
  remember trying this with `elm-webpack-loader`, but the way `*.elm` files were
  imported didn't work with `react-elm-components`, or something. This may be
  fixed, or may be fixable through configuration. Short of that, determine what
  needs to change to make these two libraries compatable.
- After the webpack loader is set up, make `elm-typescript-interop` also run
  when watched elm files change.
