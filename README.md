# Elm, React, and TypeScript Interop Demo

This repo demonstrates the current state of integrating Elm applications into a
React project that uses typescript. On this branch I'm using `elm-tigershark`,
my WIP replacement for `elm-typescript-interop`.

### Setup

```
yarn
yarn elm make src/elm/*.elm --output='src/elm/ElmApp.js'
```

### Demo Contents

Running `yarn start` launches the react app, which contains four separate Elm
applications:

- A `SandboxApp` where React mounts the Elm code as a component, but does no interop.
- A `FlagsApp` where React passes a flag to Elm on mount.
- A `PortsApp` which sets up bi-directional interop and passes messages back and
  forth between React and Elm.
- And finally a `FlagsAndPortsApp` where React both passes an initial flag and
  subscribes to outgoing Elm messages through a port.

The type declarations used for these Elm programs are located in `src/elm.d.ts`
and are re-generated when Elm files are changed, via the `elm-tigershark`
webpack plugin. The type declarations can be generated from the command line by
running `yarn tigershark src/elm/*.elm --output=src/elm.d.ts --tsModule='*.elm'`.

As noted in the `master` branch, to use these Elm programs in a react context
we're using the `react-elm-components`, the locally defined
`react-elm-components.d.ts`, and a custom `usePorts` hook.
