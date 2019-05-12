---
title: '一分钟教你学会配置eslint，还在为风格单双引号，对象末位逗号要不要，引用各种报错而烦恼？(建议收藏！详细中文注释)' 
date: 2018-12-06 2:30:09
hidden: true
slug: dxmi6zc20hu
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">最全的eslint配置大全，我已经加了详细中文注释，只需要找到自己想要的配置就可以了，强烈建议收藏！</h3>
<blockquote>用法非常简单，找到<strong>.eslintrc.js</strong>下的<strong>rules</strong>添加对象即可,比如我要把规则原本<strong><em>单引号</em></strong>要变为<strong><em>双引号</em></strong>，那加上"quotes": [1, "double"]</blockquote>
<ul><li>如果违反了规则情况下，这里的数字：0表示不不处理，1表示警告，2表示错误并退出</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
&quot;rules&quot; : {
  // 定义对象的set存取器属性时，强制定义get
  &quot;accessor-pairs&quot;: 2,
  // 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
  &quot;array-bracket-spacing&quot;: [2, &quot;never&quot;],
  // 在块级作用域外访问块内定义的变量是否报错提示
  &quot;block-scoped-var&quot;: 0,
  // if while function 后面的{必须与if在同一行，java风格。
  &quot;brace-style&quot;: [2, &quot;1tbs&quot;, { &quot;allowSingleLine&quot;: true }],
  // 双峰驼命名格式
  &quot;camelcase&quot;: 2,
  // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
  // always-multiline：多行模式必须带逗号，单行模式不能带逗号
  &quot;comma-dangle&quot;: [2, &quot;never&quot;],
  // 控制逗号前后的空格
  &quot;comma-spacing&quot;: [2, { &quot;before&quot;: false, &quot;after&quot;: true }],
  // 控制逗号在行尾出现还是在行首出现
  // http://eslint.org/docs/rules/comma-style
  &quot;comma-style&quot;: [2, &quot;last&quot;],
  // 圈复杂度
  &quot;complexity&quot;: [2,9],
  // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
  &quot;computed-property-spacing&quot;: [2,&quot;never&quot;],
  // 强制方法必须返回值，TypeScript强类型，不配置
  &quot;consistent-return&quot;: 0,
  // 用于指统一在回调函数中指向this的变量名，箭头函数中的this已经可以指向外层调用者，应该没卵用了
  // e.g [0,&quot;that&quot;] 指定只能 var that = this. that不能指向其他任何值，this也不能赋值给that以外的其他值
  &quot;consistent-this&quot;: 0,
  // 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示
  &quot;constructor-super&quot;: 0,
  // if else while for do后面的代码块是否需要{ }包围，参数：
  //    multi  只有块中有多行语句时才需要{ }包围
  //    multi-line  只有块中有多行语句时才需要{ }包围, 但是块中的执行语句只有一行时，
  //                   块中的语句只能跟和if语句在同一行。if (foo) foo++; else doSomething();
  //    multi-or-nest 只有块中有多行语句时才需要{ }包围, 如果块中的执行语句只有一行，执行语句可以零另起一行也可以跟在if语句后面
  //    [2, &quot;multi&quot;, &quot;consistent&quot;] 保持前后语句的{ }一致
  //    default: [2, &quot;all&quot;] 全都需要{ }包围
  &quot;curly&quot;: [2, &quot;all&quot;],
  // switch语句强制default分支，也可添加 // no default 注释取消此次警告
  &quot;default-case&quot;: 2,
  // 强制object.key 中 . 的位置，参数:
  //      property，'.'号应与属性在同一行
  //      object, '.' 号应与对象名在同一行
  &quot;dot-location&quot;: [2, &quot;property&quot;],
  // 强制使用.号取属性
  //    参数： allowKeywords：true 使用保留字做属性名时，只能使用.方式取属性
  //                          false 使用保留字做属性名时, 只能使用[]方式取属性 e.g [2, {&quot;allowKeywords&quot;: false}]
  //           allowPattern:  当属性名匹配提供的正则表达式时，允许使用[]方式取值,否则只能用.号取值 e.g [2, {&quot;allowPattern&quot;: &quot;^[a-z]+(_[a-z]+)+$&quot;}]
  &quot;dot-notation&quot;: [2, {&quot;allowKeywords&quot;: true}],
  // 文件末尾强制换行
  &quot;eol-last&quot;: 2,
  // 使用 === 替代 ==
  &quot;eqeqeq&quot;: [2, &quot;allow-null&quot;],
  // 方法表达式是否需要命名
  &quot;func-names&quot;: 0,
  // 方法定义风格，参数：
  //    declaration: 强制使用方法声明的方式，function f(){} e.g [2, &quot;declaration&quot;]
  //    expression：强制使用方法表达式的方式，var f = function() {}  e.g [2, &quot;expression&quot;]
  //    allowArrowFunctions: declaration风格中允许箭头函数。 e.g [2, &quot;declaration&quot;, { &quot;allowArrowFunctions&quot;: true }]
  &quot;func-style&quot;: 0,
  &quot;no-alert&quot;: 0,//禁止使用alert confirm prompt
  &quot;no-array-constructor&quot;: 2,//禁止使用数组构造器
  &quot;no-bitwise&quot;: 0,//禁止使用按位运算符
  &quot;no-caller&quot;: 1,//禁止使用arguments.caller或arguments.callee
  &quot;no-catch-shadow&quot;: 2,//禁止catch子句参数与外部作用域变量同名
  &quot;no-class-assign&quot;: 2,//禁止给类赋值
  &quot;no-cond-assign&quot;: 2,//禁止在条件表达式中使用赋值语句
  &quot;no-console&quot;: 2,//禁止使用console
  &quot;no-const-assign&quot;: 2,//禁止修改const声明的变量
  &quot;no-constant-condition&quot;: 2,//禁止在条件中使用常量表达式 if(true) if(1)
  &quot;no-continue&quot;: 0,//禁止使用continue
  &quot;no-control-regex&quot;: 2,//禁止在正则表达式中使用控制字符
  &quot;no-debugger&quot;: 2,//禁止使用debugger
  &quot;no-delete-var&quot;: 2,//不能对var声明的变量使用delete操作符
  &quot;no-div-regex&quot;: 1,//不能使用看起来像除法的正则表达式/=foo/
  &quot;no-dupe-keys&quot;: 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
  &quot;no-dupe-args&quot;: 2,//函数参数不能重复
  &quot;no-duplicate-case&quot;: 2,//switch中的case标签不能重复
  &quot;no-else-return&quot;: 2,//如果if语句里面有return,后面不能跟else语句
  &quot;no-empty&quot;: 2,//块语句中的内容不能为空
  &quot;no-empty-character-class&quot;: 2,//正则表达式中的[]内容不能为空
  &quot;no-empty-label&quot;: 2,//禁止使用空label
  &quot;no-eq-null&quot;: 2,//禁止对null使用==或!=运算符
  &quot;no-eval&quot;: 1,//禁止使用eval
  &quot;no-ex-assign&quot;: 2,//禁止给catch语句中的异常参数赋值
  &quot;no-extend-native&quot;: 2,//禁止扩展native对象
  &quot;no-extra-bind&quot;: 2,//禁止不必要的函数绑定
  &quot;no-extra-boolean-cast&quot;: 2,//禁止不必要的bool转换
  &quot;no-extra-parens&quot;: 2,//禁止非必要的括号
  &quot;no-extra-semi&quot;: 2,//禁止多余的冒号
  &quot;no-fallthrough&quot;: 1,//禁止switch穿透
  &quot;no-floating-decimal&quot;: 2,//禁止省略浮点数中的0 .5 3.
  &quot;no-func-assign&quot;: 2,//禁止重复的函数声明
  &quot;no-implicit-coercion&quot;: 1,//禁止隐式转换
  &quot;no-implied-eval&quot;: 2,//禁止使用隐式eval
  &quot;no-inline-comments&quot;: 0,//禁止行内备注
  &quot;no-inner-declarations&quot;: [2, &quot;functions&quot;],//禁止在块语句中使用声明（变量或函数）
  &quot;no-invalid-regexp&quot;: 2,//禁止无效的正则表达式
  &quot;no-invalid-this&quot;: 2,//禁止无效的this，只能用在构造器，类，对象字面量
  &quot;no-irregular-whitespace&quot;: 2,//不能有不规则的空格
  &quot;no-iterator&quot;: 2,//禁止使用__iterator__ 属性
  &quot;no-label-var&quot;: 2,//label名不能与var声明的变量名相同
  &quot;no-labels&quot;: 2,//禁止标签声明
  &quot;no-lone-blocks&quot;: 2,//禁止不必要的嵌套块
  &quot;no-lonely-if&quot;: 2,//禁止else语句内只有if语句
  &quot;no-loop-func&quot;: 1,//禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
  &quot;no-mixed-requires&quot;: [0, false],//声明时不能混用声明类型
  &quot;no-mixed-spaces-and-tabs&quot;: [2, false],//禁止混用tab和空格
  &quot;linebreak-style&quot;: [0, &quot;windows&quot;],//换行风格
  &quot;no-multi-spaces&quot;: 1,//不能用多余的空格
  &quot;no-multi-str&quot;: 2,//字符串不能用\换行
  &quot;no-multiple-empty-lines&quot;: [1, {&quot;max&quot;: 2}],//空行最多不能超过2行
  &quot;no-native-reassign&quot;: 2,//不能重写native对象
  &quot;no-negated-in-lhs&quot;: 2,//in 操作符的左边不能有!
  &quot;no-nested-ternary&quot;: 0,//禁止使用嵌套的三目运算
  &quot;no-new&quot;: 1,//禁止在使用new构造一个实例后不赋值
  &quot;no-new-func&quot;: 1,//禁止使用new Function
  &quot;no-new-object&quot;: 2,//禁止使用new Object()
  &quot;no-new-require&quot;: 2,//禁止使用new require
  &quot;no-new-wrappers&quot;: 2,//禁止使用new创建包装实例，new String new Boolean new Number
  &quot;no-obj-calls&quot;: 2,//不能调用内置的全局对象，比如Math() JSON()
  &quot;no-octal&quot;: 2,//禁止使用八进制数字
  &quot;no-octal-escape&quot;: 2,//禁止使用八进制转义序列
  &quot;no-param-reassign&quot;: 2,//禁止给参数重新赋值
  &quot;no-path-concat&quot;: 0,//node中不能使用__dirname或__filename做路径拼接
  &quot;no-plusplus&quot;: 0,//禁止使用++，--
  &quot;no-process-env&quot;: 0,//禁止使用process.env
  &quot;no-process-exit&quot;: 0,//禁止使用process.exit()
  &quot;no-proto&quot;: 2,//禁止使用__proto__属性
  &quot;no-redeclare&quot;: 2,//禁止重复声明变量
  &quot;no-regex-spaces&quot;: 2,//禁止在正则表达式字面量中使用多个空格 /foo bar/
  &quot;no-restricted-modules&quot;: 0,//如果禁用了指定模块，使用就会报错
  &quot;no-return-assign&quot;: 1,//return 语句中不能有赋值表达式
  &quot;no-script-url&quot;: 0,//禁止使用javascript:void(0)
  &quot;no-self-compare&quot;: 2,//不能比较自身
  &quot;no-sequences&quot;: 0,//禁止使用逗号运算符
  &quot;no-shadow&quot;: 2,//外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
  &quot;no-shadow-restricted-names&quot;: 2,//严格模式中规定的限制标识符不能作为声明时的变量名使用
  &quot;no-spaced-func&quot;: 2,//函数调用时 函数名与()之间不能有空格
  &quot;no-sparse-arrays&quot;: 2,//禁止稀疏数组， [1,,2]
  &quot;no-sync&quot;: 0,//nodejs 禁止同步方法
  &quot;no-ternary&quot;: 0,//禁止使用三目运算符
  &quot;no-trailing-spaces&quot;: 1,//一行结束后面不要有空格
  &quot;no-this-before-super&quot;: 0,//在调用super()之前不能使用this或super
  &quot;no-throw-literal&quot;: 2,//禁止抛出字面量错误 throw &quot;error&quot;;
  &quot;no-undef&quot;: 1,//不能有未定义的变量
  &quot;no-undef-init&quot;: 2,//变量初始化时不能直接给它赋值为undefined
  &quot;no-undefined&quot;: 2,//不能使用undefined
  &quot;no-unexpected-multiline&quot;: 2,//避免多行表达式
  &quot;no-underscore-dangle&quot;: 1,//标识符不能以_开头或结尾
  &quot;no-unneeded-ternary&quot;: 2,//禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
  &quot;no-unreachable&quot;: 2,//不能有无法执行的代码
  &quot;no-unused-expressions&quot;: 2,//禁止无用的表达式
  &quot;no-unused-vars&quot;: [2, {&quot;vars&quot;: &quot;all&quot;, &quot;args&quot;: &quot;after-used&quot;}],//不能有声明后未被使用的变量或参数
  &quot;no-use-before-define&quot;: 2,//未定义前不能使用
  &quot;no-useless-call&quot;: 2,//禁止不必要的call和apply
  &quot;no-void&quot;: 2,//禁用void操作符
  &quot;no-var&quot;: 0,//禁用var，用let和const代替
  &quot;no-warning-comments&quot;: [1, { &quot;terms&quot;: [&quot;todo&quot;, &quot;fixme&quot;, &quot;xxx&quot;], &quot;location&quot;: &quot;start&quot; }],//不能有警告备注
  &quot;no-with&quot;: 2,//禁用with
  &quot;array-bracket-spacing&quot;: [2, &quot;never&quot;],//是否允许非空数组里面有多余的空格
  &quot;arrow-parens&quot;: 0,//箭头函数用小括号括起来
  &quot;arrow-spacing&quot;: 0,//=>的前/后括号
  &quot;accessor-pairs&quot;: 0,//在对象中使用getter/setter
  &quot;block-scoped-var&quot;: 0,//块语句中使用var
  &quot;brace-style&quot;: [1, &quot;1tbs&quot;],//大括号风格
  &quot;callback-return&quot;: 1,//避免多次调用回调什么的
  &quot;camelcase&quot;: 2,//强制驼峰法命名
  &quot;comma-dangle&quot;: [2, &quot;never&quot;],//对象字面量项尾不能有逗号
  &quot;comma-spacing&quot;: 0,//逗号前后的空格
  &quot;comma-style&quot;: [2, &quot;last&quot;],//逗号风格，换行时在行首还是行尾
  &quot;complexity&quot;: [0, 11],//循环复杂度
  &quot;computed-property-spacing&quot;: [0, &quot;never&quot;],//是否允许计算后的键名什么的
  &quot;consistent-return&quot;: 0,//return 后面是否允许省略
  &quot;consistent-this&quot;: [2, &quot;that&quot;],//this别名
  &quot;constructor-super&quot;: 0,//非派生类不能调用super，派生类必须调用super
  &quot;curly&quot;: [2, &quot;all&quot;],//必须使用 if(){} 中的{}
  &quot;default-case&quot;: 2,//switch语句最后必须有default
  &quot;dot-location&quot;: 0,//对象访问符的位置，换行的时候在行首还是行尾
  &quot;dot-notation&quot;: [0, { &quot;allowKeywords&quot;: true }],//避免不必要的方括号
  &quot;eol-last&quot;: 0,//文件以单一的换行符结束
  &quot;eqeqeq&quot;: 2,//必须使用全等
  &quot;func-names&quot;: 0,//函数表达式必须有名字
  &quot;func-style&quot;: [0, &quot;declaration&quot;],//函数风格，规定只能使用函数声明/函数表达式
  &quot;generator-star-spacing&quot;: 0,//生成器函数*的前后空格
  &quot;guard-for-in&quot;: 0,//for in循环要用if语句过滤
  &quot;handle-callback-err&quot;: 0,//nodejs 处理错误
  &quot;id-length&quot;: 0,//变量名长度
  &quot;indent&quot;: [2, 4],//缩进风格
  &quot;init-declarations&quot;: 0,//声明时必须赋初值
  &quot;key-spacing&quot;: [0, { &quot;beforeColon&quot;: false, &quot;afterColon&quot;: true }],//对象字面量中冒号的前后空格
  &quot;lines-around-comment&quot;: 0,//行前/行后备注
  &quot;max-depth&quot;: [0, 4],//嵌套块深度
  &quot;max-len&quot;: [0, 80, 4],//字符串最大长度
  &quot;max-nested-callbacks&quot;: [0, 2],//回调嵌套深度
  &quot;max-params&quot;: [0, 3],//函数最多只能有3个参数
  &quot;max-statements&quot;: [0, 10],//函数内最多有几个声明
  &quot;new-cap&quot;: 2,//函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
  &quot;new-parens&quot;: 2,//new时必须加小括号
  &quot;newline-after-var&quot;: 2,//变量声明后是否需要空一行
  &quot;object-curly-spacing&quot;: [0, &quot;never&quot;],//大括号内是否允许不必要的空格
  &quot;object-shorthand&quot;: 0,//强制对象字面量缩写语法
  &quot;one-var&quot;: 1,//连续声明
  &quot;operator-assignment&quot;: [0, &quot;always&quot;],//赋值运算符 += -=什么的
  &quot;operator-linebreak&quot;: [2, &quot;after&quot;],//换行时运算符在行尾还是行首
  &quot;padded-blocks&quot;: 0,//块语句内行首行尾是否要空行
  &quot;prefer-const&quot;: 0,//首选const
  &quot;prefer-spread&quot;: 0,//首选展开运算
  &quot;prefer-reflect&quot;: 0,//首选Reflect的方法
  &quot;quotes&quot;: [1, &quot;single&quot;],//引号类型 `` &quot;&quot; ''
  &quot;quote-props&quot;:[2, &quot;always&quot;],//对象字面量中的属性名是否强制双引号
  &quot;radix&quot;: 2,//parseInt必须指定第二个参数
  &quot;id-match&quot;: 0,//命名检测
  &quot;require-yield&quot;: 0,//生成器函数必须有yield
  &quot;semi&quot;: [2, &quot;always&quot;],//语句强制分号结尾
  &quot;semi-spacing&quot;: [0, {&quot;before&quot;: false, &quot;after&quot;: true}],//分号前后空格
  &quot;sort-vars&quot;: 0,//变量声明时排序
  &quot;space-after-keywords&quot;: [0, &quot;always&quot;],//关键字后面是否要空一格
  &quot;space-before-blocks&quot;: [0, &quot;always&quot;],//不以新行开始的块{前面要不要有空格
  &quot;space-before-function-paren&quot;: [0, &quot;always&quot;],//函数定义时括号前面要不要有空格
  &quot;space-in-parens&quot;: [0, &quot;never&quot;],//小括号里面要不要有空格
  &quot;space-infix-ops&quot;: 0,//中缀操作符周围要不要有空格
  &quot;space-return-throw-case&quot;: 2,//return throw case后面要不要加空格
  &quot;space-unary-ops&quot;: [0, { &quot;words&quot;: true, &quot;nonwords&quot;: false }],//一元运算符的前/后要不要加空格
  &quot;spaced-comment&quot;: 0,//注释风格不要有空格什么的
  &quot;strict&quot;: 2,//使用严格模式
  &quot;use-isnan&quot;: 2,//禁止比较时使用NaN，只能用isNaN()
  &quot;valid-jsdoc&quot;: 0,//jsdoc规则
  &quot;valid-typeof&quot;: 2,//必须使用合法的typeof的值
  &quot;vars-on-top&quot;: 2,//var必须放在作用域顶部
  &quot;wrap-iife&quot;: [2, &quot;inside&quot;],//立即执行函数表达式的小括号风格
  &quot;wrap-regex&quot;: 0,//正则表达式字面量用小括号包起来
  &quot;yoda&quot;: [2, &quot;never&quot;]//禁止尤达条件
  }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>{
<span class="hljs-string">"rules"</span> : {
  <span class="hljs-comment">// 定义对象的set存取器属性时，强制定义get</span>
  <span class="hljs-string">"accessor-pairs"</span>: <span class="hljs-number">2</span>,
  <span class="hljs-comment">// 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格</span>
  <span class="hljs-string">"array-bracket-spacing"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"never"</span>],
  <span class="hljs-comment">// 在块级作用域外访问块内定义的变量是否报错提示</span>
  <span class="hljs-string">"block-scoped-var"</span>: <span class="hljs-number">0</span>,
  <span class="hljs-comment">// if while function 后面的{必须与if在同一行，java风格。</span>
  <span class="hljs-string">"brace-style"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"1tbs"</span>, { <span class="hljs-string">"allowSingleLine"</span>: <span class="hljs-literal">true</span> }],
  <span class="hljs-comment">// 双峰驼命名格式</span>
  <span class="hljs-string">"camelcase"</span>: <span class="hljs-number">2</span>,
  <span class="hljs-comment">// 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，</span>
  <span class="hljs-comment">// always-multiline：多行模式必须带逗号，单行模式不能带逗号</span>
  <span class="hljs-string">"comma-dangle"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"never"</span>],
  <span class="hljs-comment">// 控制逗号前后的空格</span>
  <span class="hljs-string">"comma-spacing"</span>: [<span class="hljs-number">2</span>, { <span class="hljs-string">"before"</span>: <span class="hljs-literal">false</span>, <span class="hljs-string">"after"</span>: <span class="hljs-literal">true</span> }],
  <span class="hljs-comment">// 控制逗号在行尾出现还是在行首出现</span>
  <span class="hljs-comment">// http://eslint.org/docs/rules/comma-style</span>
  <span class="hljs-string">"comma-style"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"last"</span>],
  <span class="hljs-comment">// 圈复杂度</span>
  <span class="hljs-string">"complexity"</span>: [<span class="hljs-number">2</span>,<span class="hljs-number">9</span>],
  <span class="hljs-comment">// 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always</span>
  <span class="hljs-string">"computed-property-spacing"</span>: [<span class="hljs-number">2</span>,<span class="hljs-string">"never"</span>],
  <span class="hljs-comment">// 强制方法必须返回值，TypeScript强类型，不配置</span>
  <span class="hljs-string">"consistent-return"</span>: <span class="hljs-number">0</span>,
  <span class="hljs-comment">// 用于指统一在回调函数中指向this的变量名，箭头函数中的this已经可以指向外层调用者，应该没卵用了</span>
  <span class="hljs-comment">// e.g [0,"that"] 指定只能 var that = this. that不能指向其他任何值，this也不能赋值给that以外的其他值</span>
  <span class="hljs-string">"consistent-this"</span>: <span class="hljs-number">0</span>,
  <span class="hljs-comment">// 强制在子类构造函数中用super()调用父类构造函数，TypeScrip的编译器也会提示</span>
  <span class="hljs-string">"constructor-super"</span>: <span class="hljs-number">0</span>,
  <span class="hljs-comment">// if else while for do后面的代码块是否需要{ }包围，参数：</span>
  <span class="hljs-comment">//    multi  只有块中有多行语句时才需要{ }包围</span>
  <span class="hljs-comment">//    multi-line  只有块中有多行语句时才需要{ }包围, 但是块中的执行语句只有一行时，</span>
  <span class="hljs-comment">//                   块中的语句只能跟和if语句在同一行。if (foo) foo++; else doSomething();</span>
  <span class="hljs-comment">//    multi-or-nest 只有块中有多行语句时才需要{ }包围, 如果块中的执行语句只有一行，执行语句可以零另起一行也可以跟在if语句后面</span>
  <span class="hljs-comment">//    [2, "multi", "consistent"] 保持前后语句的{ }一致</span>
  <span class="hljs-comment">//    default: [2, "all"] 全都需要{ }包围</span>
  <span class="hljs-string">"curly"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"all"</span>],
  <span class="hljs-comment">// switch语句强制default分支，也可添加 // no default 注释取消此次警告</span>
  <span class="hljs-string">"default-case"</span>: <span class="hljs-number">2</span>,
  <span class="hljs-comment">// 强制object.key 中 . 的位置，参数:</span>
  <span class="hljs-comment">//      property，'.'号应与属性在同一行</span>
  <span class="hljs-comment">//      object, '.' 号应与对象名在同一行</span>
  <span class="hljs-string">"dot-location"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"property"</span>],
  <span class="hljs-comment">// 强制使用.号取属性</span>
  <span class="hljs-comment">//    参数： allowKeywords：true 使用保留字做属性名时，只能使用.方式取属性</span>
  <span class="hljs-comment">//                          false 使用保留字做属性名时, 只能使用[]方式取属性 e.g [2, {"allowKeywords": false}]</span>
  <span class="hljs-comment">//           allowPattern:  当属性名匹配提供的正则表达式时，允许使用[]方式取值,否则只能用.号取值 e.g [2, {"allowPattern": "^[a-z]+(_[a-z]+)+$"}]</span>
  <span class="hljs-string">"dot-notation"</span>: [<span class="hljs-number">2</span>, {<span class="hljs-string">"allowKeywords"</span>: <span class="hljs-literal">true</span>}],
  <span class="hljs-comment">// 文件末尾强制换行</span>
  <span class="hljs-string">"eol-last"</span>: <span class="hljs-number">2</span>,
  <span class="hljs-comment">// 使用 === 替代 ==</span>
  <span class="hljs-string">"eqeqeq"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"allow-null"</span>],
  <span class="hljs-comment">// 方法表达式是否需要命名</span>
  <span class="hljs-string">"func-names"</span>: <span class="hljs-number">0</span>,
  <span class="hljs-comment">// 方法定义风格，参数：</span>
  <span class="hljs-comment">//    declaration: 强制使用方法声明的方式，function f(){} e.g [2, "declaration"]</span>
  <span class="hljs-comment">//    expression：强制使用方法表达式的方式，var f = function() {}  e.g [2, "expression"]</span>
  <span class="hljs-comment">//    allowArrowFunctions: declaration风格中允许箭头函数。 e.g [2, "declaration", { "allowArrowFunctions": true }]</span>
  <span class="hljs-string">"func-style"</span>: <span class="hljs-number">0</span>,
  <span class="hljs-string">"no-alert"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//禁止使用alert confirm prompt</span>
  <span class="hljs-string">"no-array-constructor"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止使用数组构造器</span>
  <span class="hljs-string">"no-bitwise"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//禁止使用按位运算符</span>
  <span class="hljs-string">"no-caller"</span>: <span class="hljs-number">1</span>,<span class="hljs-comment">//禁止使用arguments.caller或arguments.callee</span>
  <span class="hljs-string">"no-catch-shadow"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止catch子句参数与外部作用域变量同名</span>
  <span class="hljs-string">"no-class-assign"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止给类赋值</span>
  <span class="hljs-string">"no-cond-assign"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止在条件表达式中使用赋值语句</span>
  <span class="hljs-string">"no-console"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止使用console</span>
  <span class="hljs-string">"no-const-assign"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止修改const声明的变量</span>
  <span class="hljs-string">"no-constant-condition"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止在条件中使用常量表达式 if(true) if(1)</span>
  <span class="hljs-string">"no-continue"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//禁止使用continue</span>
  <span class="hljs-string">"no-control-regex"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止在正则表达式中使用控制字符</span>
  <span class="hljs-string">"no-debugger"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止使用debugger</span>
  <span class="hljs-string">"no-delete-var"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//不能对var声明的变量使用delete操作符</span>
  <span class="hljs-string">"no-div-regex"</span>: <span class="hljs-number">1</span>,<span class="hljs-comment">//不能使用看起来像除法的正则表达式/=foo/</span>
  <span class="hljs-string">"no-dupe-keys"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//在创建对象字面量时不允许键重复 {a:1,a:1}</span>
  <span class="hljs-string">"no-dupe-args"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//函数参数不能重复</span>
  <span class="hljs-string">"no-duplicate-case"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//switch中的case标签不能重复</span>
  <span class="hljs-string">"no-else-return"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//如果if语句里面有return,后面不能跟else语句</span>
  <span class="hljs-string">"no-empty"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//块语句中的内容不能为空</span>
  <span class="hljs-string">"no-empty-character-class"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//正则表达式中的[]内容不能为空</span>
  <span class="hljs-string">"no-empty-label"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止使用空label</span>
  <span class="hljs-string">"no-eq-null"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止对null使用==或!=运算符</span>
  <span class="hljs-string">"no-eval"</span>: <span class="hljs-number">1</span>,<span class="hljs-comment">//禁止使用eval</span>
  <span class="hljs-string">"no-ex-assign"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止给catch语句中的异常参数赋值</span>
  <span class="hljs-string">"no-extend-native"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止扩展native对象</span>
  <span class="hljs-string">"no-extra-bind"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止不必要的函数绑定</span>
  <span class="hljs-string">"no-extra-boolean-cast"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止不必要的bool转换</span>
  <span class="hljs-string">"no-extra-parens"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止非必要的括号</span>
  <span class="hljs-string">"no-extra-semi"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止多余的冒号</span>
  <span class="hljs-string">"no-fallthrough"</span>: <span class="hljs-number">1</span>,<span class="hljs-comment">//禁止switch穿透</span>
  <span class="hljs-string">"no-floating-decimal"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止省略浮点数中的0 .5 3.</span>
  <span class="hljs-string">"no-func-assign"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止重复的函数声明</span>
  <span class="hljs-string">"no-implicit-coercion"</span>: <span class="hljs-number">1</span>,<span class="hljs-comment">//禁止隐式转换</span>
  <span class="hljs-string">"no-implied-eval"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止使用隐式eval</span>
  <span class="hljs-string">"no-inline-comments"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//禁止行内备注</span>
  <span class="hljs-string">"no-inner-declarations"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"functions"</span>],<span class="hljs-comment">//禁止在块语句中使用声明（变量或函数）</span>
  <span class="hljs-string">"no-invalid-regexp"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止无效的正则表达式</span>
  <span class="hljs-string">"no-invalid-this"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止无效的this，只能用在构造器，类，对象字面量</span>
  <span class="hljs-string">"no-irregular-whitespace"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//不能有不规则的空格</span>
  <span class="hljs-string">"no-iterator"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止使用__iterator__ 属性</span>
  <span class="hljs-string">"no-label-var"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//label名不能与var声明的变量名相同</span>
  <span class="hljs-string">"no-labels"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止标签声明</span>
  <span class="hljs-string">"no-lone-blocks"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止不必要的嵌套块</span>
  <span class="hljs-string">"no-lonely-if"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止else语句内只有if语句</span>
  <span class="hljs-string">"no-loop-func"</span>: <span class="hljs-number">1</span>,<span class="hljs-comment">//禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）</span>
  <span class="hljs-string">"no-mixed-requires"</span>: [<span class="hljs-number">0</span>, <span class="hljs-literal">false</span>],<span class="hljs-comment">//声明时不能混用声明类型</span>
  <span class="hljs-string">"no-mixed-spaces-and-tabs"</span>: [<span class="hljs-number">2</span>, <span class="hljs-literal">false</span>],<span class="hljs-comment">//禁止混用tab和空格</span>
  <span class="hljs-string">"linebreak-style"</span>: [<span class="hljs-number">0</span>, <span class="hljs-string">"windows"</span>],<span class="hljs-comment">//换行风格</span>
  <span class="hljs-string">"no-multi-spaces"</span>: <span class="hljs-number">1</span>,<span class="hljs-comment">//不能用多余的空格</span>
  <span class="hljs-string">"no-multi-str"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//字符串不能用\换行</span>
  <span class="hljs-string">"no-multiple-empty-lines"</span>: [<span class="hljs-number">1</span>, {<span class="hljs-string">"max"</span>: <span class="hljs-number">2</span>}],<span class="hljs-comment">//空行最多不能超过2行</span>
  <span class="hljs-string">"no-native-reassign"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//不能重写native对象</span>
  <span class="hljs-string">"no-negated-in-lhs"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//in 操作符的左边不能有!</span>
  <span class="hljs-string">"no-nested-ternary"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//禁止使用嵌套的三目运算</span>
  <span class="hljs-string">"no-new"</span>: <span class="hljs-number">1</span>,<span class="hljs-comment">//禁止在使用new构造一个实例后不赋值</span>
  <span class="hljs-string">"no-new-func"</span>: <span class="hljs-number">1</span>,<span class="hljs-comment">//禁止使用new Function</span>
  <span class="hljs-string">"no-new-object"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止使用new Object()</span>
  <span class="hljs-string">"no-new-require"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止使用new require</span>
  <span class="hljs-string">"no-new-wrappers"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止使用new创建包装实例，new String new Boolean new Number</span>
  <span class="hljs-string">"no-obj-calls"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//不能调用内置的全局对象，比如Math() JSON()</span>
  <span class="hljs-string">"no-octal"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止使用八进制数字</span>
  <span class="hljs-string">"no-octal-escape"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止使用八进制转义序列</span>
  <span class="hljs-string">"no-param-reassign"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止给参数重新赋值</span>
  <span class="hljs-string">"no-path-concat"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//node中不能使用__dirname或__filename做路径拼接</span>
  <span class="hljs-string">"no-plusplus"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//禁止使用++，--</span>
  <span class="hljs-string">"no-process-env"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//禁止使用process.env</span>
  <span class="hljs-string">"no-process-exit"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//禁止使用process.exit()</span>
  <span class="hljs-string">"no-proto"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止使用__proto__属性</span>
  <span class="hljs-string">"no-redeclare"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止重复声明变量</span>
  <span class="hljs-string">"no-regex-spaces"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止在正则表达式字面量中使用多个空格 /foo bar/</span>
  <span class="hljs-string">"no-restricted-modules"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//如果禁用了指定模块，使用就会报错</span>
  <span class="hljs-string">"no-return-assign"</span>: <span class="hljs-number">1</span>,<span class="hljs-comment">//return 语句中不能有赋值表达式</span>
  <span class="hljs-string">"no-script-url"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//禁止使用javascript:void(0)</span>
  <span class="hljs-string">"no-self-compare"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//不能比较自身</span>
  <span class="hljs-string">"no-sequences"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//禁止使用逗号运算符</span>
  <span class="hljs-string">"no-shadow"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//外部作用域中的变量不能与它所包含的作用域中的变量或参数同名</span>
  <span class="hljs-string">"no-shadow-restricted-names"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//严格模式中规定的限制标识符不能作为声明时的变量名使用</span>
  <span class="hljs-string">"no-spaced-func"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//函数调用时 函数名与()之间不能有空格</span>
  <span class="hljs-string">"no-sparse-arrays"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止稀疏数组， [1,,2]</span>
  <span class="hljs-string">"no-sync"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//nodejs 禁止同步方法</span>
  <span class="hljs-string">"no-ternary"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//禁止使用三目运算符</span>
  <span class="hljs-string">"no-trailing-spaces"</span>: <span class="hljs-number">1</span>,<span class="hljs-comment">//一行结束后面不要有空格</span>
  <span class="hljs-string">"no-this-before-super"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//在调用super()之前不能使用this或super</span>
  <span class="hljs-string">"no-throw-literal"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止抛出字面量错误 throw "error";</span>
  <span class="hljs-string">"no-undef"</span>: <span class="hljs-number">1</span>,<span class="hljs-comment">//不能有未定义的变量</span>
  <span class="hljs-string">"no-undef-init"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//变量初始化时不能直接给它赋值为undefined</span>
  <span class="hljs-string">"no-undefined"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//不能使用undefined</span>
  <span class="hljs-string">"no-unexpected-multiline"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//避免多行表达式</span>
  <span class="hljs-string">"no-underscore-dangle"</span>: <span class="hljs-number">1</span>,<span class="hljs-comment">//标识符不能以_开头或结尾</span>
  <span class="hljs-string">"no-unneeded-ternary"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止不必要的嵌套 var isYes = answer === 1 ? true : false;</span>
  <span class="hljs-string">"no-unreachable"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//不能有无法执行的代码</span>
  <span class="hljs-string">"no-unused-expressions"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止无用的表达式</span>
  <span class="hljs-string">"no-unused-vars"</span>: [<span class="hljs-number">2</span>, {<span class="hljs-string">"vars"</span>: <span class="hljs-string">"all"</span>, <span class="hljs-string">"args"</span>: <span class="hljs-string">"after-used"</span>}],<span class="hljs-comment">//不能有声明后未被使用的变量或参数</span>
  <span class="hljs-string">"no-use-before-define"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//未定义前不能使用</span>
  <span class="hljs-string">"no-useless-call"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止不必要的call和apply</span>
  <span class="hljs-string">"no-void"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁用void操作符</span>
  <span class="hljs-string">"no-var"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//禁用var，用let和const代替</span>
  <span class="hljs-string">"no-warning-comments"</span>: [<span class="hljs-number">1</span>, { <span class="hljs-string">"terms"</span>: [<span class="hljs-string">"todo"</span>, <span class="hljs-string">"fixme"</span>, <span class="hljs-string">"xxx"</span>], <span class="hljs-string">"location"</span>: <span class="hljs-string">"start"</span> }],<span class="hljs-comment">//不能有警告备注</span>
  <span class="hljs-string">"no-with"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁用with</span>
  <span class="hljs-string">"array-bracket-spacing"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"never"</span>],<span class="hljs-comment">//是否允许非空数组里面有多余的空格</span>
  <span class="hljs-string">"arrow-parens"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//箭头函数用小括号括起来</span>
  <span class="hljs-string">"arrow-spacing"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//=&gt;的前/后括号</span>
  <span class="hljs-string">"accessor-pairs"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//在对象中使用getter/setter</span>
  <span class="hljs-string">"block-scoped-var"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//块语句中使用var</span>
  <span class="hljs-string">"brace-style"</span>: [<span class="hljs-number">1</span>, <span class="hljs-string">"1tbs"</span>],<span class="hljs-comment">//大括号风格</span>
  <span class="hljs-string">"callback-return"</span>: <span class="hljs-number">1</span>,<span class="hljs-comment">//避免多次调用回调什么的</span>
  <span class="hljs-string">"camelcase"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//强制驼峰法命名</span>
  <span class="hljs-string">"comma-dangle"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"never"</span>],<span class="hljs-comment">//对象字面量项尾不能有逗号</span>
  <span class="hljs-string">"comma-spacing"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//逗号前后的空格</span>
  <span class="hljs-string">"comma-style"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"last"</span>],<span class="hljs-comment">//逗号风格，换行时在行首还是行尾</span>
  <span class="hljs-string">"complexity"</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">11</span>],<span class="hljs-comment">//循环复杂度</span>
  <span class="hljs-string">"computed-property-spacing"</span>: [<span class="hljs-number">0</span>, <span class="hljs-string">"never"</span>],<span class="hljs-comment">//是否允许计算后的键名什么的</span>
  <span class="hljs-string">"consistent-return"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//return 后面是否允许省略</span>
  <span class="hljs-string">"consistent-this"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"that"</span>],<span class="hljs-comment">//this别名</span>
  <span class="hljs-string">"constructor-super"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//非派生类不能调用super，派生类必须调用super</span>
  <span class="hljs-string">"curly"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"all"</span>],<span class="hljs-comment">//必须使用 if(){} 中的{}</span>
  <span class="hljs-string">"default-case"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//switch语句最后必须有default</span>
  <span class="hljs-string">"dot-location"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//对象访问符的位置，换行的时候在行首还是行尾</span>
  <span class="hljs-string">"dot-notation"</span>: [<span class="hljs-number">0</span>, { <span class="hljs-string">"allowKeywords"</span>: <span class="hljs-literal">true</span> }],<span class="hljs-comment">//避免不必要的方括号</span>
  <span class="hljs-string">"eol-last"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//文件以单一的换行符结束</span>
  <span class="hljs-string">"eqeqeq"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//必须使用全等</span>
  <span class="hljs-string">"func-names"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//函数表达式必须有名字</span>
  <span class="hljs-string">"func-style"</span>: [<span class="hljs-number">0</span>, <span class="hljs-string">"declaration"</span>],<span class="hljs-comment">//函数风格，规定只能使用函数声明/函数表达式</span>
  <span class="hljs-string">"generator-star-spacing"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//生成器函数*的前后空格</span>
  <span class="hljs-string">"guard-for-in"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//for in循环要用if语句过滤</span>
  <span class="hljs-string">"handle-callback-err"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//nodejs 处理错误</span>
  <span class="hljs-string">"id-length"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//变量名长度</span>
  <span class="hljs-string">"indent"</span>: [<span class="hljs-number">2</span>, <span class="hljs-number">4</span>],<span class="hljs-comment">//缩进风格</span>
  <span class="hljs-string">"init-declarations"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//声明时必须赋初值</span>
  <span class="hljs-string">"key-spacing"</span>: [<span class="hljs-number">0</span>, { <span class="hljs-string">"beforeColon"</span>: <span class="hljs-literal">false</span>, <span class="hljs-string">"afterColon"</span>: <span class="hljs-literal">true</span> }],<span class="hljs-comment">//对象字面量中冒号的前后空格</span>
  <span class="hljs-string">"lines-around-comment"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//行前/行后备注</span>
  <span class="hljs-string">"max-depth"</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">4</span>],<span class="hljs-comment">//嵌套块深度</span>
  <span class="hljs-string">"max-len"</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">80</span>, <span class="hljs-number">4</span>],<span class="hljs-comment">//字符串最大长度</span>
  <span class="hljs-string">"max-nested-callbacks"</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">2</span>],<span class="hljs-comment">//回调嵌套深度</span>
  <span class="hljs-string">"max-params"</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">3</span>],<span class="hljs-comment">//函数最多只能有3个参数</span>
  <span class="hljs-string">"max-statements"</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">10</span>],<span class="hljs-comment">//函数内最多有几个声明</span>
  <span class="hljs-string">"new-cap"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用</span>
  <span class="hljs-string">"new-parens"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//new时必须加小括号</span>
  <span class="hljs-string">"newline-after-var"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//变量声明后是否需要空一行</span>
  <span class="hljs-string">"object-curly-spacing"</span>: [<span class="hljs-number">0</span>, <span class="hljs-string">"never"</span>],<span class="hljs-comment">//大括号内是否允许不必要的空格</span>
  <span class="hljs-string">"object-shorthand"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//强制对象字面量缩写语法</span>
  <span class="hljs-string">"one-var"</span>: <span class="hljs-number">1</span>,<span class="hljs-comment">//连续声明</span>
  <span class="hljs-string">"operator-assignment"</span>: [<span class="hljs-number">0</span>, <span class="hljs-string">"always"</span>],<span class="hljs-comment">//赋值运算符 += -=什么的</span>
  <span class="hljs-string">"operator-linebreak"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"after"</span>],<span class="hljs-comment">//换行时运算符在行尾还是行首</span>
  <span class="hljs-string">"padded-blocks"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//块语句内行首行尾是否要空行</span>
  <span class="hljs-string">"prefer-const"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//首选const</span>
  <span class="hljs-string">"prefer-spread"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//首选展开运算</span>
  <span class="hljs-string">"prefer-reflect"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//首选Reflect的方法</span>
  <span class="hljs-string">"quotes"</span>: [<span class="hljs-number">1</span>, <span class="hljs-string">"single"</span>],<span class="hljs-comment">//引号类型 `` "" ''</span>
  <span class="hljs-string">"quote-props"</span>:[<span class="hljs-number">2</span>, <span class="hljs-string">"always"</span>],<span class="hljs-comment">//对象字面量中的属性名是否强制双引号</span>
  <span class="hljs-string">"radix"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//parseInt必须指定第二个参数</span>
  <span class="hljs-string">"id-match"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//命名检测</span>
  <span class="hljs-string">"require-yield"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//生成器函数必须有yield</span>
  <span class="hljs-string">"semi"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"always"</span>],<span class="hljs-comment">//语句强制分号结尾</span>
  <span class="hljs-string">"semi-spacing"</span>: [<span class="hljs-number">0</span>, {<span class="hljs-string">"before"</span>: <span class="hljs-literal">false</span>, <span class="hljs-string">"after"</span>: <span class="hljs-literal">true</span>}],<span class="hljs-comment">//分号前后空格</span>
  <span class="hljs-string">"sort-vars"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//变量声明时排序</span>
  <span class="hljs-string">"space-after-keywords"</span>: [<span class="hljs-number">0</span>, <span class="hljs-string">"always"</span>],<span class="hljs-comment">//关键字后面是否要空一格</span>
  <span class="hljs-string">"space-before-blocks"</span>: [<span class="hljs-number">0</span>, <span class="hljs-string">"always"</span>],<span class="hljs-comment">//不以新行开始的块{前面要不要有空格</span>
  <span class="hljs-string">"space-before-function-paren"</span>: [<span class="hljs-number">0</span>, <span class="hljs-string">"always"</span>],<span class="hljs-comment">//函数定义时括号前面要不要有空格</span>
  <span class="hljs-string">"space-in-parens"</span>: [<span class="hljs-number">0</span>, <span class="hljs-string">"never"</span>],<span class="hljs-comment">//小括号里面要不要有空格</span>
  <span class="hljs-string">"space-infix-ops"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//中缀操作符周围要不要有空格</span>
  <span class="hljs-string">"space-return-throw-case"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//return throw case后面要不要加空格</span>
  <span class="hljs-string">"space-unary-ops"</span>: [<span class="hljs-number">0</span>, { <span class="hljs-string">"words"</span>: <span class="hljs-literal">true</span>, <span class="hljs-string">"nonwords"</span>: <span class="hljs-literal">false</span> }],<span class="hljs-comment">//一元运算符的前/后要不要加空格</span>
  <span class="hljs-string">"spaced-comment"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//注释风格不要有空格什么的</span>
  <span class="hljs-string">"strict"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//使用严格模式</span>
  <span class="hljs-string">"use-isnan"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//禁止比较时使用NaN，只能用isNaN()</span>
  <span class="hljs-string">"valid-jsdoc"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//jsdoc规则</span>
  <span class="hljs-string">"valid-typeof"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//必须使用合法的typeof的值</span>
  <span class="hljs-string">"vars-on-top"</span>: <span class="hljs-number">2</span>,<span class="hljs-comment">//var必须放在作用域顶部</span>
  <span class="hljs-string">"wrap-iife"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"inside"</span>],<span class="hljs-comment">//立即执行函数表达式的小括号风格</span>
  <span class="hljs-string">"wrap-regex"</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//正则表达式字面量用小括号包起来</span>
  <span class="hljs-string">"yoda"</span>: [<span class="hljs-number">2</span>, <span class="hljs-string">"never"</span>]<span class="hljs-comment">//禁止尤达条件</span>
  }
}

</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一分钟教你学会配置eslint，还在为风格单双引号，对象末位逗号要不要，引用各种报错而烦恼？(建议收藏！详细中文注释)

## 原文链接
[https://segmentfault.com/a/1190000014230857](https://segmentfault.com/a/1190000014230857)

