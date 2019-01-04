---
title: 聊聊Abstract syntax tree 抽象语法树
tags: [Javascript]
slug: '9rfliipfkip'
keywords: [Javascript]
date: 2019-01-03 17:33:33
---

# 抽象语法树 AST
在计算机科学中，抽象语法树，或简称语法树，是源代码语法结构的一种抽象表示.

这里介绍一个网站 https://astexplorer.net ,可以让你清晰的看到一段js,css以及其他语言被转换成语法树的对比.

在我们的浏览器中,会对我们的js代码解析成抽象语法书然后再进一步的分析以及下一步的操作.

语法树就前端而言,被利用在各种地方,代码语法的检查，代码风格的检查，代码的格式化，代码的高亮，代码错误提示，代码自动补全,比如:

- eslint
- JSHint
- babel
- webpack
- rollup
- UglifyJS2

等等等等... 根本数不过来.


## 举个例子
一段代码被解析成语法树后的样子
目前业界对抽象语法树是有规范的,
感兴趣的朋友可以查看这个网址: [SpiderMonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API#Node_objects)

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


# 使用Nodejs解析代码为抽象语法树

## 常用js解析工具
- esprima
- traceur
- acorn
- shift

## 使用esprima举个例子

```bash
# node环境
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

