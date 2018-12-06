---
title: 使用husky提升Code Review的效率
tags: [Code Review]
slug: i9t0x2tvleo
date: 2018-12-04 00:00:00
---

在code review的时候,代码风格是其中审查的指标之一.在审查代码风格其实是有一定工作量的.

为了减少代码审查的工作量,我们何不把代码风格在提交代码之前就规范掉?

这样我们就可以在代码审查中节约出很多时间,来做更多的其他更有意义的事情.

# git hooks
在git中提供了hook,就是在触发`代码提交`,`push`等一系列操作的时候,提供了触发其他程序的钩子.

如何操作,本文不多赘述.

有兴趣的同学可以查看文档: https://git-scm.com/docs/githooks

# husky

如果看过githooks的文档,是不是觉得会有一点繁琐?

这里介绍一个工具 `husky` 可以解决你的问题.

### 安装

``` bash
npm install husky --save-dev
```

然后修改 package.json，增加配置：

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "eslint ."
    }
  },
}
```
如果你只是局部安装了 `eslint`,请使用以下配置

```json
{
    "lint-staged": {
    "src/**/*.js": [
      "node_modules/.bin/eslint"
    ]
  },
}
```


最后尝试 Git 提交，你就会很快收到反馈：

```bash
git commit -m "this is a commit"
```

这样,我们就可以在代码提交之前验证一下我们的代码lint是否通过.

对于一些以前从来没有用过eslint的项目来说.突然引入这种工具.

你可能面临的是把所有文件都按照eslint都格式化一遍.那不是疯了吗?


# lint-staged
这里再安利一个工具,可以实现 eslint只检查本次提交的文件.
这样我们就可以做到渐进式的改善我们的代码质量.

### 安装

```bash
npm install lint-staged --save-dev
```
### 修改 package.json 配置：

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.js": "eslint"
  }
}
```

## 在lint-staged执行前执行更多的自定义命令

这一点让我非常的喜欢,为我们提供了更多的自由度.

### 修改 package.json 配置：
```json
{
  "scripts": {
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "src/**/*.js": ["eslint --fix", "git add"]
  }
}
```

完美,一切都看起来是那么的美好~