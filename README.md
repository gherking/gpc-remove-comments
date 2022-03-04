> **IMPORTANT** This version of the package is only a placeholder. Please use **v1.0.0** as soon as it is released!

# gpc-remove-comments

![Downloads](https://img.shields.io/npm/dw/gpc-remove-comments?style=flat-square) ![Version@npm](https://img.shields.io/npm/v/gpc-remove-comments?label=version%40npm&style=flat-square) ![Version@git](https://img.shields.io/github/package-json/v/gherking/gpc-remove-comments/master?label=version%40git&style=flat-square) ![CI](https://img.shields.io/github/workflow/status/gherking/gpc-remove-comments/CI/master?label=ci&style=flat-square) ![Docs](https://img.shields.io/github/workflow/status/gherking/gpc-remove-comments/Docs/master?label=docs&style=flat-square)

This repository is a template to create precompilers for GherKing.

## Usage

```javascript
'use strict';
const compiler = require('gherking');
const RemoveComments = require('gpc-remove-comments');

let ast = await compiler.load('./features/src/login.feature');
ast = compiler.process(
    ast,
    new RemoveComments({
        // config
    })
);
await compiler.save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```

```typescript
'use strict';
import {load, process, save} from "gherking";
import RemoveComments = require("gpc-remove-comments");

let ast = await load("./features/src/login.feature");
ast = process(
    ast,
    new RemoveComments({
        // config
    })
);
await save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```
## Other

This package uses [debug](https://www.npmjs.com/package/debug) for logging, use `gpc:remove-comments` :

```shell
DEBUG=gpc:remove-comments* gherking ...
```

For detailed documentation see the [TypeDocs documentation](https://gherking.github.io/gpc-remove-comments/).