---
title: Abstract Syntax Tree AST - Behind the Scenes Hero
tags: [JavaScript]
slug: '9rfliipfkip'
keywords: [JavaScript]
date: 2019-01-03 17:33:33
---

# Abstract Syntax Tree AST
In computer science, an abstract syntax tree, or syntax tree for short, is an abstract representation of the syntactic structure of source code.

Here I'll introduce a website https://astexplorer.net, which allows you to clearly see how a piece of js, css, and other languages are converted into syntax trees.

In our browsers, our js code is also parsed into abstract syntax trees and then further analyzed and operated on.

Syntax trees are used in various places in front-end, code syntax checking, code style checking, code formatting, code highlighting, code error prompts, code auto-completion, such as:

- eslint
- JSHint
- babel
- webpack
- rollup
- UglifyJS2

And so on... Can't count them all.

## Example
What a piece of code looks like after being parsed into a syntax tree
Currently the industry has standards for abstract syntax trees,
Interested friends can check this URL: [SpiderMonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Node_objects)

```js
let str ='我是字符串';
```

to AST

```json
{
  "type": "Program",
  "start": 0,
  "end": 17,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 17,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 4,
          "end": 16,
          "id": {
            "type": "Identifier",
            "start": 4,
            "end": 7,
            "name": "str"
          },
          "init": {
            "type": "Literal",
            "start": 9,
            "end": 16,
            "value": "我是字符串",
            "raw": "'我是字符串'"
          }
        }
      ],
      "kind": "let"
    }
  ],
  "sourceType": "module"
}
```

# Node.js Tools for Parsing Abstract Syntax Trees

## Common js Parsing Tools
- esprima
- traceur
- acorn
- shift

## Example Using esprima

```bash
# node environment
> var esprima = require('esprima');
> var program = 'const answer = 42';

> esprima.tokenize(program);
[ { type: 'Keyword', value: 'const' },
  { type: 'Identifier', value: 'answer' },
  { type: 'Punctuator', value: '=' },
  { type: 'Numeric', value: '42' } ]
  
> esprima.parseScript(program);
{ type: 'Program',
  body:
   [ { type: 'VariableDeclaration',
       declarations: [Object],
       kind: 'const' } ],
  sourceType: 'script' }
```

