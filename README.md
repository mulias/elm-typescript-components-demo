# Elm, React, and TypeScript Interop Demo

This branch demonstrates two issues I ran into when using `elm-typescript-interop`
to generate type declarations for a React app that mounts multiple Elm modules
as separate apps:

1. Declaration files are generated for each Elm module individually, even when
   multiple modules have been compiled _together_ into one `.js` file.

2. Port types are shared between all Elm modules, even when modules are compiled
   _separately_ into different `.js` files.

### Setup

```
# install dependencies
yarn

# build a monolithic elm app, which most of the react app uses
# This app has a hand-written declaration file, which gets around issue #1
yarn elm make src/elm/*.elm --output=src/elm/ElmApps.js

# build the app which will break, due to incorrect types from issue #2
yarn elm make src/elm/SandboxApp.elm --output=src/elm/SandboxApp.js

# generate declaration files
yarn elm-typescript-interop
```

Running `yarn start` launches the react app, which compiles but crashes on
mount. This app contains four separate Elm applications:

- A `SandboxApp` where React mounts the Elm code as a component, but does no
  interop. The React component `Sandbox.tsx` is broken.
- A `FlagsApp` where React passes a flag to Elm on mount.
- A `PortsApp` which sets up bi-directional interop and passes messages back and
  forth between React and Elm.
- And finally a `FlagsAndPortsApp` where React both passes an initial flag and
  subscribes to outgoing Elm messages through a port.

The `FlagsApp`, `PortsApp`, and `FlagsAndPortsApp` elm modules have all been
compiled together into a single `ElmApps.js` file. Due to issue #1, I had to
create am `ElmApps/index.d.ts` to get the code to compile.

### Addressing Issue #1

A convenient feature of `elm make` is having the flexibility to generate a
compiled file for one or multiple modules that expose a `main`. Since
`elm-typescript-interop` can't anticipate how a user might compile their code,
it seems like the library needs to either:

- Take a stance that only single-entry compilation is supported for type
  generation. This would mean for this repo all four Elm modules all need to be
  compiled separately.
- Allow cli arguments similar to `elm make` in order to generate types that
  match the project's compilation method.

The first option isn't the worst, but has a few downsides. One clear downside is
less flexibility in asset sizes and grouping. A second and more cosmetic downside
is that each compiled elm module has its own `Elm` namespace, which requires
some awkward aliasing to resolve name conflicts, for example:

```
import React from "react";
import ElmComponent from "react-elm-components";
import { Elm as SandboxAppElm } from './elm/SandboxApp'
import { Elm as FlagsAppElm } from './elm/FlagsApp'

...

  <ElmComponent src={SandboxAppElm.SandboxApp} ... />
  <ElmComponent src={FlagsAppElm.FlagsApp} ... />

...

```

The second option has just one real downside, which is having to implement a
more robust output generator. In an ideal world I would want to run:

```
yarn elm-typescript-interop src/elm/*.elm --output=src/elm/ElmApps/index.d.ts
```

and get the output which I put together by hand.

### Addressing Issue #2

Generated types should prevent the user from calling ports in a way that makes
the application crash. This is not currently the case in this example repo,
since the declaration files for all four Elm modules contains these port types:

```
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
```

The `alert` port belongs to `FlagsAndPortsApp`, while the `ping` and `pong`
ports belong to `PortsApp`. The `SandboxApp` and `FlagsApp` don't define any
ports. When these modules are compiled separately, each one only has code for
the ports defined locally. Since the type declaration for `SandboxApp` includes
these ports, we can write code to use these ports which crashes at runtime. The
obvious solution here is to only include types for ports that are dependencies
of the module in question.

To add an extra layer of complexity, when multiple main modules are compiled
into one file, each module _does_ have access to every port at runtime. Should
this implementation detail be reflected in the types? Probably not, but maybe
there's a use case? Or, since we're talking about multi-module type declarations
which already requires cli arguments, maybe it makes sense to have a flag for
setting the permissiveness of port type scoping.
