# gpc-remove-comments

![Downloads](https://img.shields.io/npm/dw/gpc-remove-comments?style=flat-square) ![Version@npm](https://img.shields.io/npm/v/gpc-remove-comments?label=version%40npm&style=flat-square) ![Version@git](https://img.shields.io/github/package-json/v/gherking/gpc-remove-comments/master?label=version%40git&style=flat-square) ![CI](https://img.shields.io/github/workflow/status/gherking/gpc-remove-comments/CI/master?label=ci&style=flat-square) ![Docs](https://img.shields.io/github/workflow/status/gherking/gpc-remove-comments/Docs/master?label=docs&style=flat-square)

This precompiler removes all or particular type of semantic comments from the feature file.

## Usage

```javascript
'use strict';
const compiler = require('gherking');
const { default: RemoveComments, CommentType } = require('gpc-remove-comments');

let ast = await compiler.load('./features/src/login.feature');
ast = compiler.process(
    ast,
    new RemoveComments({
        keep: CommentType.STEP | CommentType.PRECEDING
    })
);
await compiler.save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```

```typescript
'use strict';
import {load, process, save} from "gherking";
import RemoveComments, { CommentType } from "gpc-remove-comments";

let ast = await load("./features/src/login.feature");
ast = process(
    ast,
    new RemoveComments({
        keep: CommentType.STEP | CommentType.PRECEDING
    })
);
await save('./features/dist/login.feature', ast, {
    lineBreak: '\r\n'
});
```

### Configuration

By default, the precompiler removes all comments. But to keep certain [type of comments](https://github.com/gherking/gherkin-ast#comments), the `keep` configuration options
and the [CommentType](src/types.ts) flags can be used.

- To keep all comments, pass the `CommentType.ALL` in `keep`
- To keep non of the comments, pass the `CommentType.NONE` in `keep` (this is the default)
- To keep any or more types, pass the value using the **binary OR**: `CommentType.STEP | CommentType.TAG`

## Other

This package uses [debug](https://www.npmjs.com/package/debug) for logging, use `gpc:remove-comments` :

```shell
DEBUG=gpc:remove-comments* gherking ...
```

For detailed documentation see the [TypeDocs documentation](https://gherking.github.io/gpc-remove-comments/).