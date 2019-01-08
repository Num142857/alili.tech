---
title: Visual Studio Code 下的 jsconfig.json
tags: [Visual Studio Code]
slug: ltucv5fyj9
keywords: Visual Studio Code
date: 2019-01-08 19:33:33
---
今天聊的是 Visual Studio Code 的小技巧.

# jsconfig.json 是什么?
如果你的项目中有一个 `jsconfig.json`文件的话,这个文件的配置可以对你的文件所在目录下的所有js代码做出个性化支持.

# 例子

## exclude 属性
当vscode扫描项目代码的时候,如果遇到了node_module的话是会变得很慢的.

如果想要编辑器的性能有一个提升的话,我们应该排除这个文件夹.

```json
{
    "exclude": [
        "node_modules"
    ]
}
```

## include 属性
当然还有相对的`include`属性
```json
{
    "include": [
        "src/**/*"
    ]
}
```


## webpack aliases 的支持

如果我们在我们的webpack里面配置的路径的别名,心细的小朋友就发现了.
我们的vscode不能根据别名路径导入的包跳转文件了.所以我们还需要`jsconfig.json`的支持.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@component": ["./src/component"]
    }
  }
}
```

> `jsconfig.json`的配置是`tsconfig.json`的子集, 以后有机会的话聊一聊`tsconfig.json`.

今天就到这里~












