---
title: '前端系列——React开发必不可少的eslint配置' 
date: 2018-12-15 2:30:11
hidden: true
slug: itiq8fkvor
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">项目需要安装的插件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;babel-eslint&quot;: &quot;^8.0.3&quot;,
&quot;eslint&quot;: &quot;^4.13.1&quot;,
&quot;eslint-plugin-react&quot;: &quot;^7.5.1&quot;," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"babel-eslint"</span>: <span class="hljs-string">"^8.0.3"</span>,
<span class="hljs-string">"eslint"</span>: <span class="hljs-string">"^4.13.1"</span>,
<span class="hljs-string">"eslint-plugin-react"</span>: <span class="hljs-string">"^7.5.1"</span>,</code></pre>
<h3 id="articleHeader1">配置详情</h3>
<p>下面的配置涵盖了开发者所需要的绝大部分信息，rules中的值0、1、2分别表示不开启检查、警告、错误。你可以看到下面有些是0，如果有需要开启检查，可以自己修改为1或者2。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    &quot;env&quot;: {
        &quot;browser&quot;: true,
        &quot;commonjs&quot;: true,
        &quot;es6&quot;: true
    },
    &quot;extends&quot;: &quot;eslint:recommended&quot;,
    &quot;globals&quot;: {
        &quot;$&quot;: true,
        &quot;process&quot;: true,
        &quot;__dirname&quot;: true
    },
    &quot;parser&quot;: &quot;babel-eslint&quot;,
    &quot;parserOptions&quot;: {
        &quot;ecmaFeatures&quot;: {
            &quot;experimentalObjectRestSpread&quot;: true,
            &quot;jsx&quot;: true
        },
        &quot;sourceType&quot;: &quot;module&quot;,
        &quot;ecmaVersion&quot;: 7
    },
    &quot;plugins&quot;: [
        &quot;react&quot;
    ],
    &quot;rules&quot;: {
        &quot;quotes&quot;: [2, &quot;single&quot;], //单引号
        &quot;no-console&quot;: 0, //不禁用console
        &quot;no-debugger&quot;: 2, //禁用debugger
        &quot;no-var&quot;: 0, //对var警告
        &quot;semi&quot;: 0, //不强制使用分号
        &quot;no-irregular-whitespace&quot;: 0, //不规则的空白不允许
        &quot;no-trailing-spaces&quot;: 1, //一行结束后面有空格就发出警告
        &quot;eol-last&quot;: 0, //文件以单一的换行符结束
        &quot;no-unused-vars&quot;: [2, {&quot;vars&quot;: &quot;all&quot;, &quot;args&quot;: &quot;after-used&quot;}], //不能有声明后未被使用的变量或参数
        &quot;no-underscore-dangle&quot;: 0, //标识符不能以_开头或结尾
        &quot;no-alert&quot;: 2, //禁止使用alert confirm prompt
        &quot;no-lone-blocks&quot;: 0, //禁止不必要的嵌套块
        &quot;no-class-assign&quot;: 2, //禁止给类赋值
        &quot;no-cond-assign&quot;: 2, //禁止在条件表达式中使用赋值语句
        &quot;no-const-assign&quot;: 2, //禁止修改const声明的变量
        &quot;no-delete-var&quot;: 2, //不能对var声明的变量使用delete操作符
        &quot;no-dupe-keys&quot;: 2, //在创建对象字面量时不允许键重复
        &quot;no-duplicate-case&quot;: 2, //switch中的case标签不能重复
        &quot;no-dupe-args&quot;: 2, //函数参数不能重复
        &quot;no-empty&quot;: 2, //块语句中的内容不能为空
        &quot;no-func-assign&quot;: 2, //禁止重复的函数声明
        &quot;no-invalid-this&quot;: 0, //禁止无效的this，只能用在构造器，类，对象字面量
        &quot;no-redeclare&quot;: 2, //禁止重复声明变量
        &quot;no-spaced-func&quot;: 2, //函数调用时 函数名与()之间不能有空格
        &quot;no-this-before-super&quot;: 0, //在调用super()之前不能使用this或super
        &quot;no-undef&quot;: 2, //不能有未定义的变量
        &quot;no-use-before-define&quot;: 2, //未定义前不能使用
        &quot;camelcase&quot;: 0, //强制驼峰法命名
        &quot;jsx-quotes&quot;: [2, &quot;prefer-double&quot;], //强制在JSX属性（jsx-quotes）中一致使用双引号
        &quot;react/display-name&quot;: 0, //防止在React组件定义中丢失displayName
        &quot;react/forbid-prop-types&quot;: [2, {&quot;forbid&quot;: [&quot;any&quot;]}], //禁止某些propTypes
        &quot;react/jsx-boolean-value&quot;: 2, //在JSX中强制布尔属性符号
        &quot;react/jsx-closing-bracket-location&quot;: 1, //在JSX中验证右括号位置
        &quot;react/jsx-curly-spacing&quot;: [2, {&quot;when&quot;: &quot;never&quot;, &quot;children&quot;: true}], //在JSX属性和表达式中加强或禁止大括号内的空格。
        &quot;react/jsx-indent-props&quot;: [2, 4], //验证JSX中的props缩进
        &quot;react/jsx-key&quot;: 2, //在数组或迭代器中验证JSX具有key属性
        &quot;react/jsx-max-props-per-line&quot;: [1, {&quot;maximum&quot;: 1}], // 限制JSX中单行上的props的最大数量
        &quot;react/jsx-no-bind&quot;: 0, //JSX中不允许使用箭头函数和bind
        &quot;react/jsx-no-duplicate-props&quot;: 2, //防止在JSX中重复的props
        &quot;react/jsx-no-literals&quot;: 0, //防止使用未包装的JSX字符串
        &quot;react/jsx-no-undef&quot;: 1, //在JSX中禁止未声明的变量
        &quot;react/jsx-pascal-case&quot;: 0, //为用户定义的JSX组件强制使用PascalCase
        &quot;react/jsx-sort-props&quot;: 2, //强化props按字母排序
        &quot;react/jsx-uses-react&quot;: 1, //防止反应被错误地标记为未使用
        &quot;react/jsx-uses-vars&quot;: 2, //防止在JSX中使用的变量被错误地标记为未使用
        &quot;react/no-danger&quot;: 0, //防止使用危险的JSX属性
        &quot;react/no-did-mount-set-state&quot;: 0, //防止在componentDidMount中使用setState
        &quot;react/no-did-update-set-state&quot;: 1, //防止在componentDidUpdate中使用setState
        &quot;react/no-direct-mutation-state&quot;: 2, //防止this.state的直接变异
        &quot;react/no-multi-comp&quot;: 2, //防止每个文件有多个组件定义
        &quot;react/no-set-state&quot;: 0, //防止使用setState
        &quot;react/no-unknown-property&quot;: 2, //防止使用未知的DOM属性
        &quot;react/prefer-es6-class&quot;: 2, //为React组件强制执行ES5或ES6类
        &quot;react/prop-types&quot;: 0, //防止在React组件定义中丢失props验证
        &quot;react/react-in-jsx-scope&quot;: 2, //使用JSX时防止丢失React
        &quot;react/self-closing-comp&quot;: 0, //防止没有children的组件的额外结束标签
        &quot;react/sort-comp&quot;: 2, //强制组件方法顺序
        &quot;no-extra-boolean-cast&quot;: 0, //禁止不必要的bool转换
        &quot;react/no-array-index-key&quot;: 0, //防止在数组中遍历中使用数组key做索引
        &quot;react/no-deprecated&quot;: 1, //不使用弃用的方法
        &quot;react/jsx-equals-spacing&quot;: 2, //在JSX属性中强制或禁止等号周围的空格
        &quot;no-unreachable&quot;: 1, //不能有无法执行的代码
        &quot;comma-dangle&quot;: 2, //对象字面量项尾不能有逗号
        &quot;no-mixed-spaces-and-tabs&quot;: 0, //禁止混用tab和空格
        &quot;prefer-arrow-callback&quot;: 0, //比较喜欢箭头回调
        &quot;arrow-parens&quot;: 0, //箭头函数用小括号括起来
        &quot;arrow-spacing&quot;: 0 //=>的前/后括号
    },
    &quot;settings&quot;: {
        &quot;import/ignore&quot;: [
            &quot;node_modules&quot;
        ]
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-keyword">module</span>.exports = {
    <span class="hljs-string">"env"</span>: {
        <span class="hljs-string">"browser"</span>: <span class="hljs-keyword">true</span>,
        <span class="hljs-string">"commonjs"</span>: <span class="hljs-keyword">true</span>,
        <span class="hljs-string">"es6"</span>: <span class="hljs-keyword">true</span>
    },
    <span class="hljs-string">"extends"</span>: <span class="hljs-string">"eslint:recommended"</span>,
    <span class="hljs-string">"globals"</span>: {
        <span class="hljs-string">"$"</span>: <span class="hljs-keyword">true</span>,
        <span class="hljs-string">"process"</span>: <span class="hljs-keyword">true</span>,
        <span class="hljs-string">"__dirname"</span>: <span class="hljs-keyword">true</span>
    },
    <span class="hljs-string">"parser"</span>: <span class="hljs-string">"babel-eslint"</span>,
    <span class="hljs-string">"parserOptions"</span>: {
        <span class="hljs-string">"ecmaFeatures"</span>: {
            <span class="hljs-string">"experimentalObjectRestSpread"</span>: <span class="hljs-keyword">true</span>,
            <span class="hljs-string">"jsx"</span>: <span class="hljs-keyword">true</span>
        },
        <span class="hljs-string">"sourceType"</span>: <span class="hljs-string">"module"</span>,
        <span class="hljs-string">"ecmaVersion"</span>: <span class="hljs-number">7</span>
    },
    <span class="hljs-string">"plugins"</span>: [
        <span class="hljs-string">"react"</span>
    ],
    <span class="hljs-string">"rules"</span>: {
        <span class="hljs-string">"quotes"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"single"</span>], <span class="hljs-regexp">//</span>单引号
        <span class="hljs-string">"no-console"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>不禁用console
        <span class="hljs-string">"no-debugger"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>禁用debugger
        <span class="hljs-string">"no-var"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>对var警告
        <span class="hljs-string">"semi"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>不强制使用分号
        <span class="hljs-string">"no-irregular-whitespace"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>不规则的空白不允许
        <span class="hljs-string">"no-trailing-spaces"</span>: <span class="hljs-number">1</span>, <span class="hljs-regexp">//</span>一行结束后面有空格就发出警告
        <span class="hljs-string">"eol-last"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>文件以单一的换行符结束
        <span class="hljs-string">"no-unused-vars"</span>: [<span class="hljs-number">2</span>, {<span class="hljs-string">"vars"</span>: <span class="hljs-string">"all"</span>, <span class="hljs-string">"args"</span>: <span class="hljs-string">"after-used"</span>}], <span class="hljs-regexp">//</span>不能有声明后未被使用的变量或参数
        <span class="hljs-string">"no-underscore-dangle"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>标识符不能以<span class="hljs-number">_</span>开头或结尾
        <span class="hljs-string">"no-alert"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>禁止使用alert confirm prompt
        <span class="hljs-string">"no-lone-blocks"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>禁止不必要的嵌套块
        <span class="hljs-string">"no-class-assign"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>禁止给类赋值
        <span class="hljs-string">"no-cond-assign"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>禁止在条件表达式中使用赋值语句
        <span class="hljs-string">"no-const-assign"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>禁止修改const声明的变量
        <span class="hljs-string">"no-delete-var"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>不能对var声明的变量使用delete操作符
        <span class="hljs-string">"no-dupe-keys"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>在创建对象字面量时不允许键重复
        <span class="hljs-string">"no-duplicate-case"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//switch</span>中的<span class="hljs-keyword">case</span>标签不能重复
        <span class="hljs-string">"no-dupe-args"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>函数参数不能重复
        <span class="hljs-string">"no-empty"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>块语句中的内容不能为空
        <span class="hljs-string">"no-func-assign"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>禁止重复的函数声明
        <span class="hljs-string">"no-invalid-this"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>禁止无效的this，只能用在构造器，类，对象字面量
        <span class="hljs-string">"no-redeclare"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>禁止重复声明变量
        <span class="hljs-string">"no-spaced-func"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>函数调用时 函数名与()之间不能有空格
        <span class="hljs-string">"no-this-before-super"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>在调用super()之前不能使用this或super
        <span class="hljs-string">"no-undef"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>不能有未定义的变量
        <span class="hljs-string">"no-use-before-define"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>未定义前不能使用
        <span class="hljs-string">"camelcase"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>强制驼峰法命名
        <span class="hljs-string">"jsx-quotes"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"prefer-double"</span>], <span class="hljs-regexp">//</span>强制在JSX属性（jsx-quotes）中一致使用双引号
        <span class="hljs-string">"react/display-name"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>防止在React组件定义中丢失displayName
        <span class="hljs-string">"react/forbid-prop-types"</span>: [<span class="hljs-number">2</span>, {<span class="hljs-string">"forbid"</span>: [<span class="hljs-string">"any"</span>]}], <span class="hljs-regexp">//</span>禁止某些propTypes
        <span class="hljs-string">"react/jsx-boolean-value"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>在JSX中强制布尔属性符号
        <span class="hljs-string">"react/jsx-closing-bracket-location"</span>: <span class="hljs-number">1</span>, <span class="hljs-regexp">//</span>在JSX中验证右括号位置
        <span class="hljs-string">"react/jsx-curly-spacing"</span>: [<span class="hljs-number">2</span>, {<span class="hljs-string">"when"</span>: <span class="hljs-string">"never"</span>, <span class="hljs-string">"children"</span>: <span class="hljs-keyword">true</span>}], <span class="hljs-regexp">//</span>在JSX属性和表达式中加强或禁止大括号内的空格。
        <span class="hljs-string">"react/jsx-indent-props"</span>: [<span class="hljs-number">2</span>, <span class="hljs-number">4</span>], <span class="hljs-regexp">//</span>验证JSX中的props缩进
        <span class="hljs-string">"react/jsx-key"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>在数组或迭代器中验证JSX具有key属性
        <span class="hljs-string">"react/jsx-max-props-per-line"</span>: [<span class="hljs-number">1</span>, {<span class="hljs-string">"maximum"</span>: <span class="hljs-number">1</span>}], <span class="hljs-regexp">//</span> 限制JSX中单行上的props的最大数量
        <span class="hljs-string">"react/jsx-no-bind"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>JSX中不允许使用箭头函数和bind
        <span class="hljs-string">"react/jsx-no-duplicate-props"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>防止在JSX中重复的props
        <span class="hljs-string">"react/jsx-no-literals"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>防止使用未包装的JSX字符串
        <span class="hljs-string">"react/jsx-no-undef"</span>: <span class="hljs-number">1</span>, <span class="hljs-regexp">//</span>在JSX中禁止未声明的变量
        <span class="hljs-string">"react/jsx-pascal-case"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>为用户定义的JSX组件强制使用PascalCase
        <span class="hljs-string">"react/jsx-sort-props"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>强化props按字母排序
        <span class="hljs-string">"react/jsx-uses-react"</span>: <span class="hljs-number">1</span>, <span class="hljs-regexp">//</span>防止反应被错误地标记为未使用
        <span class="hljs-string">"react/jsx-uses-vars"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>防止在JSX中使用的变量被错误地标记为未使用
        <span class="hljs-string">"react/no-danger"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>防止使用危险的JSX属性
        <span class="hljs-string">"react/no-did-mount-set-state"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>防止在componentDidMount中使用setState
        <span class="hljs-string">"react/no-did-update-set-state"</span>: <span class="hljs-number">1</span>, <span class="hljs-regexp">//</span>防止在componentDidUpdate中使用setState
        <span class="hljs-string">"react/no-direct-mutation-state"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>防止this.state的直接变异
        <span class="hljs-string">"react/no-multi-comp"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>防止每个文件有多个组件定义
        <span class="hljs-string">"react/no-set-state"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>防止使用setState
        <span class="hljs-string">"react/no-unknown-property"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>防止使用未知的DOM属性
        <span class="hljs-string">"react/prefer-es6-class"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>为React组件强制执行ES5或ES6类
        <span class="hljs-string">"react/prop-types"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>防止在React组件定义中丢失props验证
        <span class="hljs-string">"react/react-in-jsx-scope"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>使用JSX时防止丢失React
        <span class="hljs-string">"react/self-closing-comp"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>防止没有children的组件的额外结束标签
        <span class="hljs-string">"react/sort-comp"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>强制组件方法顺序
        <span class="hljs-string">"no-extra-boolean-cast"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>禁止不必要的bool转换
        <span class="hljs-string">"react/no-array-index-key"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>防止在数组中遍历中使用数组key做索引
        <span class="hljs-string">"react/no-deprecated"</span>: <span class="hljs-number">1</span>, <span class="hljs-regexp">//</span>不使用弃用的方法
        <span class="hljs-string">"react/jsx-equals-spacing"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>在JSX属性中强制或禁止等号周围的空格
        <span class="hljs-string">"no-unreachable"</span>: <span class="hljs-number">1</span>, <span class="hljs-regexp">//</span>不能有无法执行的代码
        <span class="hljs-string">"comma-dangle"</span>: <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span>对象字面量项尾不能有逗号
        <span class="hljs-string">"no-mixed-spaces-and-tabs"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>禁止混用tab和空格
        <span class="hljs-string">"prefer-arrow-callback"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>比较喜欢箭头回调
        <span class="hljs-string">"arrow-parens"</span>: <span class="hljs-number">0</span>, <span class="hljs-regexp">//</span>箭头函数用小括号括起来
        <span class="hljs-string">"arrow-spacing"</span>: <span class="hljs-number">0</span> /<span class="hljs-regexp">/=&gt;的前/</span>后括号
    },
    <span class="hljs-string">"settings"</span>: {
        <span class="hljs-string">"import/ignore"</span>: [
            <span class="hljs-string">"node_modules"</span>
        ]
    }
};</code></pre>
<p>哦，老天，你还希望看到更多的react检查器，那就去 eslint-plugin-react 的github文档去慢慢翻译吧。</p>
<h3 id="articleHeader2">某些文件关闭eslint检查</h3>
<p>你不总是希望所有的文件都开启eslint检查，那么，给单独的js文件关闭eslint的方式，只需要在该文件的最顶部加上一段注释。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*eslint-disable*/
function test() {
    return true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">/*eslint-disable*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
}</code></pre>
<h3 id="articleHeader3">给某一行js代码关闭eslint检查</h3>
<p>关闭整个js文件的行为有点暴力，别担心，你还可以只给其中某段代码关闭eslint。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// eslint-disable-next-line
alert('foo')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// eslint-disable-next-line</span>
<span class="hljs-function"><span class="hljs-title">alert</span><span class="hljs-params">(<span class="hljs-string">'foo'</span>)</span></span></code></pre>
<h3 id="articleHeader4">eslint配置文件类型</h3>
<p>eslint配置文件类型不只有js和json，其实包括下面这些：</p>
<ul>
<li>.eslintrc.js</li>
<li>.eslintrc.yaml</li>
<li>.eslintrc.yml</li>
<li>.eslintrc.json</li>
<li>.eslintrc</li>
<li>package.json</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端系列——React开发必不可少的eslint配置

## 原文链接
[https://segmentfault.com/a/1190000013062992](https://segmentfault.com/a/1190000013062992)

