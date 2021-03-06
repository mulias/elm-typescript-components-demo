# Elm, React, and TypeScript Interop Demo

This repo demonstrates the current state of integrating Elm applications into a
React project that uses typescript.

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

Running `yarn elm-typescript-interop` generates TypeScript declaration files for
each Elm module. Unfortunately the structure of these declarations assumes that
the elm modules are compiled separately, which is not the case here. As a result
we need to both re-generate the declarations when our Elm code changes, and then
copy those changes into the main `src/elm/ElmApps/index.d.ts` file.

### Goals

The ultimate goal is to improve the tooling around Elm, React, and Typescript so
that the three tools interop seamlessly. That means eliminating these tasks,
which are currently done by hand:

- Write the `rect-elm-components.d.ts` type declarations.
- Create a `usePorts` hook for easy port setup.
- Compile the elm code before the typescript code.
- Collect the output of `elm-typescript-interop` and create a declaration file
  for the compiled multi-module elm code.
- Fix inconsistencies in how `elm-typescript-interop` generates types for ports.

### Todo

- [x] Contact the `react-elm-components` maintainers about adding `rect-elm-components.d.ts`
      to the repo, or instead adding it to `DefinitelyTyped`. Update: [PR open](https://github.com/cultureamp/react-elm-components/pull/30),
      review pending. Update Update: No response, probably best to make a new package.
- [ ] Add `react-elm-components` type definitions to `DefinitelyTyped`.
- [ ] Publish `usePorts` as an npm package.
- [x] Contact the `elm-typescript-interop` maintainers about issues generating types
      for multiple elm applications. Update: [Issue open](https://github.com/dillonkearns/elm-typescript-interop/issues/28),
      response pending. This may be a dead project, so I've [started work on an alternative](https://github.com/mulias/elm-tigershark).
      Update Update:
- [ ] Publish `elm-tigershark` 1.0.0
- [x] Figure out how to integrate the elm compiler as a webpack loader. I seem to
      remember trying this with `elm-webpack-loader`, but the way `*.elm` files were
      imported didn't work with `react-elm-components`, or something. This may be
      fixed, or may be fixable through configuration. Short of that, determine what
      needs to change to make these two libraries compatible. Update:
      `elm-webpack-loader` is currently working with the exploratory ts-interop
      library, so that seems like the path forward.
- [x] After the webpack loader is set up, make `elm-typescript-interop` also run
      when watched elm files change. Update: this feature is implemented for
      `elm-tigershark`.
