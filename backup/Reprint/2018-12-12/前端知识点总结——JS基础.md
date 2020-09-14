---
title: '前端知识点总结——JS基础' 
date: 2018-12-12 2:30:10
hidden: true
slug: 860h8c0p7c5
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><strong>前端知识点总结——JS基础</strong></h1>
<h2 id="articleHeader1">1.javascript概述(了解)</h2>
<p>1.什么是javascript</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="javascript简称为js，是一种运行于js解释器/引擎中的脚本语言
js的运行环境：
1.独立安装的js解释器（node）
2.嵌入在浏览器内核中的js解释器" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code>javascript简称为<span class="hljs-keyword">js</span>，是一种运行于<span class="hljs-keyword">js</span>解释器/引擎中的脚本语言
<span class="hljs-keyword">js</span>的运行环境：
<span class="hljs-number">1</span>.独立安装的<span class="hljs-keyword">js</span>解释器（node）
<span class="hljs-number">2</span>.嵌入在浏览器内核中的<span class="hljs-keyword">js</span>解释器</code></pre>
<p>2.js的发展史</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.1992年Nombas公司为自己开发了一款脚本语言SciptEase
2.1995年Netscape(网景)开发了一款脚本语言LiveScrpt,后来更名javascript
3.1996年Microsoft在IE3.0版本中克隆javascript，JScript
4.1997年，javascript提交给ECMA(欧洲计算机制造商联合会)。定义ECMAScript,简称ES5，ES6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>1<span class="hljs-selector-class">.1992</span>年<span class="hljs-selector-tag">Nombas</span>公司为自己开发了一款脚本语言<span class="hljs-selector-tag">SciptEase</span>
2<span class="hljs-selector-class">.1995</span>年<span class="hljs-selector-tag">Netscape</span>(网景)开发了一款脚本语言<span class="hljs-selector-tag">LiveScrpt</span>,后来更名<span class="hljs-selector-tag">javascript</span>
3<span class="hljs-selector-class">.1996</span>年<span class="hljs-selector-tag">Microsoft</span>在<span class="hljs-selector-tag">IE3</span><span class="hljs-selector-class">.0</span>版本中克隆<span class="hljs-selector-tag">javascript</span>，<span class="hljs-selector-tag">JScript</span>
4<span class="hljs-selector-class">.1997</span>年，<span class="hljs-selector-tag">javascript</span>提交给<span class="hljs-selector-tag">ECMA</span>(欧洲计算机制造商联合会)。定义<span class="hljs-selector-tag">ECMAScript</span>,简称<span class="hljs-selector-tag">ES5</span>，<span class="hljs-selector-tag">ES6</span></code></pre>
<p>3.js组成部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.核心（ECMAScript）
2.DOM (Document object model)文档对象模型
3.BOM (Browser object model)浏览器对象模型" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span>.核心（ECMAScript）
<span class="hljs-number">2</span><span class="hljs-selector-class">.DOM</span> (Document <span class="hljs-selector-tag">object</span> model)文档对象模型
<span class="hljs-number">3</span><span class="hljs-selector-class">.BOM</span> (Browser <span class="hljs-selector-tag">object</span> model)浏览器对象模型</code></pre>
<p>4.js的特点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.语法类似于c,java
2.无需编译，由js解释器直接运行
3.弱类型语言
4.面向对象的
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>语法类似于c,java
<span class="hljs-number">2.</span>无需编译，由js解释器直接运行
<span class="hljs-number">3.</span>弱类型语言
<span class="hljs-number">4.</span>面向对象的
</code></pre>
<h2 id="articleHeader2">2.JavaScript的基础语法</h2>
<p>1.使用javascript</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.搭建运行环境
  1.独立安装的JS解释器-NodeJS
    1.在命令行界面：输入node
  console.log(&quot;你好，世界&quot;);
  在控制台打印输出
  说明：js是可以独立在js解释器中运行
2.使用浏览器内核中嵌的js解释器
  浏览器内核负责页面内容的渲染，由两部分组成：
     内容排版引擎-解析：HTML/CSS
     脚本解释引擎-解析：javascript
 1.直接在Console（控制台）中输入脚本并运行
 2.将js脚本嵌入在HTML页面中执行
   1.html元素的事件中执行js脚本
      事件-onclick-鼠标单击时要执行的操作
   2.在<script>中编写脚本并执行
      网页的任何位置处，嵌入一对<script>标记，并且将脚本编写在<script>标记中。
       3.使用外部脚本文件(.js为后缀)
     1.创建脚本文件（.js）并在文件中编写脚本
     2.在使用的网页中引用脚本文件
        <script src=&quot;脚本文件的url&quot;></script>
      
 3.js调试，F12查看错误，出错时不影响其它代码块，后续代码继续执行。
   <script>
    /*这个脚本错误*/
    document.writ(&quot;<h3>周芷若</h3>&quot;);
       </script>
      <script>
    /*继续执行*/
        console.log(&quot;金花婆婆&quot;);  
      </script>
    3.通过语法规范
  1.语句：可执行的最小单元
          必须以;结束
      严格区分大小
      所有的符号必须是英文
      2.注释:
    // :单行注释
    /**/:多行注释
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>1.搭建运行环境
  1.独立安装的JS解释器-NodeJS
    1.在命令行界面：输入node
  console.log("你好，世界");
  在控制台打印输出
  说明：js是可以独立在js解释器中运行
2.使用浏览器内核中嵌的js解释器
  浏览器内核负责页面内容的渲染，由两部分组成：
     内容排版引擎-解析：HTML/CSS
     脚本解释引擎-解析：javascript
 1.直接在Console（控制台）中输入脚本并运行
 2.将js脚本嵌入在HTML页面中执行
   1.html元素的事件中执行js脚本
      事件-onclick-鼠标单击时要执行的操作
   2.在<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">中编写脚本并执行
      网页的任何位置处，嵌入一对<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">标记，并且将脚本编写在<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">标记中。
       3.使用外部脚本文件(.js为后缀)
     1.创建脚本文件（.js）并在文件中编写脚本
     2.在使用的网页中引用脚本文件
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"脚本文件的url"</span>&gt;</span><span class="undefined"></span></span></span></span></span></span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
      
 3.js调试，F12查看错误，出错时不影响其它代码块，后续代码继续执行。
   <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">/*这个脚本错误*/</span>
    <span class="hljs-built_in">document</span>.writ(<span class="hljs-string">"&lt;h3&gt;周芷若&lt;/h3&gt;"</span>);
       </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">/*继续执行*/</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"金花婆婆"</span>);  
      </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    3.通过语法规范
  1.语句：可执行的最小单元
          必须以;结束
      严格区分大小
      所有的符号必须是英文
      2.注释:
    // :单行注释
    /**/:多行注释
</code></pre>
<h2 id="articleHeader3">3.变量和常量</h2>
<p>1.变量声明</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.声明变量
  var 变量名;
2.为变量赋值
  变量名=值;
3.声明变量是直接赋值
  var 变量名=值;
  ex：
  var uname=&quot;张无忌&quot;;
  var age=20;
 注意：
   1.允许在一条语句中声明多个变量，用逗号隔开变量名。
     var uname=&quot;韩梅梅&quot;,uage=20;
   2.如果声明变量，但未赋值，则值默认为undefined
   3.声明变量时可以不适用var,但不推荐
     uname=&quot;tom&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>声明变量
  var 变量名;
<span class="hljs-number">2.</span>为变量赋值
  变量名=值;
<span class="hljs-number">3.</span>声明变量是直接赋值
  var 变量名=值;
  ex：
  var uname=<span class="hljs-string">"张无忌"</span>;
  var age=<span class="hljs-number">20</span>;
 注意：
   <span class="hljs-number">1.</span>允许在一条语句中声明多个变量，用逗号隔开变量名。
     var uname=<span class="hljs-string">"韩梅梅"</span>,uage=<span class="hljs-number">20</span>;
   <span class="hljs-number">2.</span>如果声明变量，但未赋值，则值默认为undefined
   <span class="hljs-number">3.</span>声明变量时可以不适用var,但不推荐
     uname=<span class="hljs-string">"tom"</span>;</code></pre>
<p>2.变量名的规范</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.不允许以数字开头
2.不允许使用关键词和保留关键字
3.最好见名知意
  var uname; var uage;
4.允许包含字母，数字，下划线(_),$
  var $name=&quot;Tom&quot;;
5.尽量使用小驼峰命名法
  var userName;
  var uname;
  var _uname;//下划线
  var user_name;//下划线
  var UserName;//大驼峰命名法
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-number">1.</span>不允许以数字开头
<span class="hljs-number">2.</span>不允许使用关键词和保留关键字
<span class="hljs-number">3.</span>最好见名知意
  <span class="hljs-keyword">var</span> uname; <span class="hljs-keyword">var</span> uage;
<span class="hljs-number">4.</span>允许包含字母，数字，下划线(<span class="hljs-literal">_</span>),$
  <span class="hljs-keyword">var</span> $name=<span class="hljs-string">"Tom"</span>;
<span class="hljs-number">5.</span>尽量使用小驼峰命名法
  <span class="hljs-keyword">var</span> userName;
  <span class="hljs-keyword">var</span> uname;
  <span class="hljs-keyword">var</span> _uname;<span class="hljs-comment">//下划线</span>
  <span class="hljs-keyword">var</span> user_name;<span class="hljs-comment">//下划线</span>
  <span class="hljs-keyword">var</span> UserName;<span class="hljs-comment">//大驼峰命名法</span>
</code></pre>
<h2 id="articleHeader4">4.变量的使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.声明变量未赋值，值默认为undefined
2.使用未声明过的变量 报错
3.赋值操作
  变量名出现在=的左边，一律是赋值操作
    var uname=&quot;林妹妹&quot;;
4.取值操作
  变量只要没出现在=的左边，一律是取值操作
    var uage=30;
console.log(uage);
var num1=uage;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">1.</span>声明变量未赋值，值默认为<span class="hljs-literal">undefined</span>
<span class="hljs-number">2.</span>使用未声明过的变量 报错
<span class="hljs-number">3.</span>赋值操作
  变量名出现在=的左边，一律是赋值操作
    <span class="hljs-keyword">var</span> uname=<span class="hljs-string">"林妹妹"</span>;
<span class="hljs-number">4.</span>取值操作
  变量只要没出现在=的左边，一律是取值操作
    <span class="hljs-keyword">var</span> uage=<span class="hljs-number">30</span>;
<span class="hljs-built_in">console</span>.log(uage);
<span class="hljs-keyword">var</span> num1=uage;

</code></pre>
<h2 id="articleHeader5">5.常量</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.什么是常量
  在程序中，一经声明就不允许被修改的数据就是常量。
2.语法
  const 常量名=值;
  常量名在程序中，通常采用大写形式。
  const PI=3.1415926;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>什么是常量
  在程序中，一经声明就不允许被修改的数据就是常量。
<span class="hljs-number">2.</span>语法
  const 常量名=值;
  常量名在程序中，通常采用大写形式。
  const <span class="hljs-literal">PI</span>=<span class="hljs-number">3.1415926</span>;

</code></pre>
<h2 id="articleHeader6">5.1数据类型</h2>
<p>1.数据类型的作用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="规定了数据在内存中所占的空间
10.1 64位 8个字节
bit:位
8bit=1byte字节
1024byte=1KB 
1024KB=1MB
1024MB=1G 
1024G=1T" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs makefile"><code>规定了数据在内存中所占的空间
10.1 64位 8个字节
bit:位
8bit=1byte字节
1024byte=1KB 
1024KB=1MB
1024MB=1G 
1024G=1T</code></pre>
<p>2.数据类型详解</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.数据类型分两大类
  原始类型（基本类型）
  引用类型
  1.原始类型
    1.Number 类型
  数字类型
  作用：可以表示32位的整数，也可以表示64位的浮点数（小数）
  整数：
     1.十进制
       10 
     2.八进制
       由0-7八个数字组成，逢八进一
       八进制中以0开始
       var num=010;
     3.十六进制
       由0-9和A-f组成，逢十六进一
          A:10
      B:11
      C:12
      D:13
      E:14
      F:15
       十六进制中以0X开始
      浮点数：又称小数
    小数点计数法：12.58  
    指数计数法：3.4e3（3.4*10的3次方）
2.String类型
  字符串类型
  作用：表示一系列的文本字符数据，如：姓名，性别，住址...
  字符串中的每个字符，都是由Unicode码的字符，标点和数字组成。
  Unicode码:每个字符在计算机中都有一个唯一的编码表示该字符，
  该码就是unicode码（他是十六进制）
     1.查找一个字符的unicode码：
     &quot;李&quot;.charCodeAt();
     //10进制输出

     &quot;李&quot;.charCodeAt().toString(2);
     //二进制输出

     &quot;李&quot;.charCodeAt().toString(16);
     //十六进制

       李的unicode码是：674e
     2.如何将674e转换为汉字？
        用\u
       ex:
        var str=&quot;\u674e&quot;;
    console.log(str);//结果是“李”

    汉字的Unicode码的范围：
    \u4e00~\u9fa5
     3.特殊字符需要转义字符
       \n: 换行
       \t: 制表符（缩进）
       \&quot;: &quot;
       \': '
       \\: \
3.Boolean类型
  布尔类型
  作用：在程序中表示真或假的结果
  取值：
     true或false
  var isBig=true;
  var isRun=false;
  在参与到数学运算时，true可以当成1做运算，false可以当做0做运算。
  var res=25+true; //结果为26
    4.Undefined类型
  作用：表示使用的数据不存在
  Undefined类型只有一个值,即undefined当声明的变量未赋值（未初始化）时，
  该变量的默认值就是undefined.
5.Null类型
  null用于表示不存在的对象。
      Null类型只有一个值，即null,如果函数或方法要返回的是对象，
      找不到该对象，返回的就是null。

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">1.</span>数据类型分两大类
  原始类型（基本类型）
  引用类型
  <span class="hljs-number">1.</span>原始类型
    <span class="hljs-number">1.</span><span class="hljs-built_in">Number</span> 类型
  数字类型
  作用：可以表示<span class="hljs-number">32</span>位的整数，也可以表示<span class="hljs-number">64</span>位的浮点数（小数）
  整数：
     <span class="hljs-number">1.</span>十进制
       <span class="hljs-number">10</span> 
     <span class="hljs-number">2.</span>八进制
       由<span class="hljs-number">0</span><span class="hljs-number">-7</span>八个数字组成，逢八进一
       八进制中以<span class="hljs-number">0</span>开始
       <span class="hljs-keyword">var</span> num=<span class="hljs-number">010</span>;
     <span class="hljs-number">3.</span>十六进制
       由<span class="hljs-number">0</span><span class="hljs-number">-9</span>和A-f组成，逢十六进一
          A:<span class="hljs-number">10</span>
      B:<span class="hljs-number">11</span>
      C:<span class="hljs-number">12</span>
      D:<span class="hljs-number">13</span>
      E:<span class="hljs-number">14</span>
      F:<span class="hljs-number">15</span>
       十六进制中以<span class="hljs-number">0</span>X开始
      浮点数：又称小数
    小数点计数法：<span class="hljs-number">12.58</span>  
    指数计数法：<span class="hljs-number">3.4e3</span>（<span class="hljs-number">3.4</span>*<span class="hljs-number">10</span>的<span class="hljs-number">3</span>次方）
<span class="hljs-number">2.</span><span class="hljs-built_in">String</span>类型
  字符串类型
  作用：表示一系列的文本字符数据，如：姓名，性别，住址...
  字符串中的每个字符，都是由Unicode码的字符，标点和数字组成。
  Unicode码:每个字符在计算机中都有一个唯一的编码表示该字符，
  该码就是unicode码（他是十六进制）
     <span class="hljs-number">1.</span>查找一个字符的unicode码：
     <span class="hljs-string">"李"</span>.charCodeAt();
     <span class="hljs-comment">//10进制输出</span>

     <span class="hljs-string">"李"</span>.charCodeAt().toString(<span class="hljs-number">2</span>);
     <span class="hljs-comment">//二进制输出</span>

     <span class="hljs-string">"李"</span>.charCodeAt().toString(<span class="hljs-number">16</span>);
     <span class="hljs-comment">//十六进制</span>

       李的unicode码是：<span class="hljs-number">674</span>e
     <span class="hljs-number">2.</span>如何将<span class="hljs-number">674</span>e转换为汉字？
        用\u
       ex:
        <span class="hljs-keyword">var</span> str=<span class="hljs-string">"\u674e"</span>;
    <span class="hljs-built_in">console</span>.log(str);<span class="hljs-comment">//结果是“李”</span>

    汉字的Unicode码的范围：
    \u4e00~\u9fa5
     <span class="hljs-number">3.</span>特殊字符需要转义字符
       \n: 换行
       \t: 制表符（缩进）
       \<span class="hljs-string">": "</span>
       \<span class="hljs-string">': '</span>
       \\: \
<span class="hljs-number">3.</span><span class="hljs-built_in">Boolean</span>类型
  布尔类型
  作用：在程序中表示真或假的结果
  取值：
     <span class="hljs-literal">true</span>或<span class="hljs-literal">false</span>
  <span class="hljs-keyword">var</span> isBig=<span class="hljs-literal">true</span>;
  <span class="hljs-keyword">var</span> isRun=<span class="hljs-literal">false</span>;
  在参与到数学运算时，<span class="hljs-literal">true</span>可以当成<span class="hljs-number">1</span>做运算，<span class="hljs-literal">false</span>可以当做<span class="hljs-number">0</span>做运算。
  <span class="hljs-keyword">var</span> res=<span class="hljs-number">25</span>+<span class="hljs-literal">true</span>; <span class="hljs-comment">//结果为26</span>
    <span class="hljs-number">4.</span>Undefined类型
  作用：表示使用的数据不存在
  Undefined类型只有一个值,即<span class="hljs-literal">undefined</span>当声明的变量未赋值（未初始化）时，
  该变量的默认值就是<span class="hljs-literal">undefined</span>.
<span class="hljs-number">5.</span>Null类型
  <span class="hljs-literal">null</span>用于表示不存在的对象。
      Null类型只有一个值，即<span class="hljs-literal">null</span>,如果函数或方法要返回的是对象，
      找不到该对象，返回的就是<span class="hljs-literal">null</span>。

</code></pre>
<h2 id="articleHeader7">5.2数据类型的转换</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.隐式（自动）转换
  不同类型的数据在计算过程中自动进行转换
  1.数字+字符串：数字转换为字符串
    var num=15;
var str=&quot;Hello&quot;;
var res=num+str; //结果：15Hello
  2.数字+布尔：将布尔转换为数字true=1,false=0
    var num1=10;
var isSun=true;
var res1=num1+isSun;//结果：11
  3.字符串+布尔：将布尔转换为字符串
    var str1=&quot;Hello&quot;;
var isSun1=true;
var res2=str1+isSun1;//结果：Hellotrue
  4.布尔+布尔：将布尔转换为数字
    true=1,false=0;
    var isSun2=true;
var isSun3=flase;
var res=isSun2+isSun3;//结果1
2.强制转换 -转换函数
  1.toString()
    将任意类型的数据转换为字符串
语法：
  var num=变量.toString();
  ex:
  var num=15;
  var str=num.toString();
  console.log(typeof(str));
  2.parseInt()
    将任意类型的数据转换为整数
如果转换不成功，结果为NaN(Not a Number)
语法：var result=parseInt(数据);
  3.parseFloat()
    将任意类型的数据转换为小数
如果转换不成功，结果为NaN
语法：var result=parseFloat(数据);
  4.Number()
    将任意类型数据转为Number类型
注意：如果包含非法字符，则返回NaN
语法：var result=Number(数据);

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">1.</span>隐式（自动）转换
  不同类型的数据在计算过程中自动进行转换
  <span class="hljs-number">1.</span>数字+字符串：数字转换为字符串
    <span class="hljs-keyword">var</span> num=<span class="hljs-number">15</span>;
<span class="hljs-keyword">var</span> str=<span class="hljs-string">"Hello"</span>;
<span class="hljs-keyword">var</span> res=num+str; <span class="hljs-comment">//结果：15Hello</span>
  <span class="hljs-number">2.</span>数字+布尔：将布尔转换为数字<span class="hljs-literal">true</span>=<span class="hljs-number">1</span>,<span class="hljs-literal">false</span>=<span class="hljs-number">0</span>
    <span class="hljs-keyword">var</span> num1=<span class="hljs-number">10</span>;
<span class="hljs-keyword">var</span> isSun=<span class="hljs-literal">true</span>;
<span class="hljs-keyword">var</span> res1=num1+isSun;<span class="hljs-comment">//结果：11</span>
  <span class="hljs-number">3.</span>字符串+布尔：将布尔转换为字符串
    <span class="hljs-keyword">var</span> str1=<span class="hljs-string">"Hello"</span>;
<span class="hljs-keyword">var</span> isSun1=<span class="hljs-literal">true</span>;
<span class="hljs-keyword">var</span> res2=str1+isSun1;<span class="hljs-comment">//结果：Hellotrue</span>
  <span class="hljs-number">4.</span>布尔+布尔：将布尔转换为数字
    <span class="hljs-literal">true</span>=<span class="hljs-number">1</span>,<span class="hljs-literal">false</span>=<span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> isSun2=<span class="hljs-literal">true</span>;
<span class="hljs-keyword">var</span> isSun3=flase;
<span class="hljs-keyword">var</span> res=isSun2+isSun3;<span class="hljs-comment">//结果1</span>
<span class="hljs-number">2.</span>强制转换 -转换函数
  <span class="hljs-number">1.</span>toString()
    将任意类型的数据转换为字符串
语法：
  <span class="hljs-keyword">var</span> num=变量.toString();
  ex:
  <span class="hljs-keyword">var</span> num=<span class="hljs-number">15</span>;
  <span class="hljs-keyword">var</span> str=num.toString();
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>(str));
  <span class="hljs-number">2.</span><span class="hljs-built_in">parseInt</span>()
    将任意类型的数据转换为整数
如果转换不成功，结果为<span class="hljs-literal">NaN</span>(Not a <span class="hljs-built_in">Number</span>)
语法：<span class="hljs-keyword">var</span> result=<span class="hljs-built_in">parseInt</span>(数据);
  <span class="hljs-number">3.</span><span class="hljs-built_in">parseFloat</span>()
    将任意类型的数据转换为小数
如果转换不成功，结果为<span class="hljs-literal">NaN</span>
语法：<span class="hljs-keyword">var</span> result=<span class="hljs-built_in">parseFloat</span>(数据);
  <span class="hljs-number">4.</span><span class="hljs-built_in">Number</span>()
    将任意类型数据转为<span class="hljs-built_in">Number</span>类型
注意：如果包含非法字符，则返回<span class="hljs-literal">NaN</span>
语法：<span class="hljs-keyword">var</span> result=<span class="hljs-built_in">Number</span>(数据);

</code></pre>
<h2 id="articleHeader8">6.运行符和表达式</h2>
<p>1.什么是表达式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="由运算符连接操作数所组成的式子就是表达式。
ex：
  15+20
  var x=y=40
任何一个表达式都会有结果。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>由运算符连接操作数所组成的式子就是表达式。
ex：
  <span class="hljs-number">15</span>+<span class="hljs-number">20</span>
  var x=y=<span class="hljs-number">40</span>
任何一个表达式都会有结果。</code></pre>
<p>2.运算符</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.算术运算符
  +，-，*，/，%，++，--

  5%2=1;
  ++:自增运算，只做+1操作
  ++在前：先自增，再运算；
  ++在后：先运算，再自增；
  ex:
    var num=5;
console.log(num++);//打印5，变为6
console.log(++num);//变为7，打印7

ex:
    var num=5;
             5   (6)6   6(7)    (8)8
    var res=num+ ++num +num++ + ++num +num++ +num;  
  8(9)   9
结果：42
2.关系运算符（比较）
  >,<,>=,<=,==,===(全等),!=,!==(不全等)
  关系运算的结果：boolean类型（true,false）
  问题：
    1. 5 > &quot;10&quot; 结果：false
   关系运算符两端，只要有一个是number的话，另外一个会隐式转换为number类型，再进行比较。
2.&quot;5&quot;>&quot;1 0&quot; 结果：true
  &quot;5&quot;.charCodeAt(); //53
  &quot;1&quot;.charCodeAt(); //49
  &quot;张三丰&quot; > &quot;张无忌&quot; 结果：false
    19977  >   26080
3.&quot;3a&quot; > 10 结果：false
  Number(&quot;3a&quot;)--->NaN
  注意：
    NaN与任何一个数据做比较运算时，结果都是false.
    console.log(&quot;3a&quot;>10); false
    console.log(&quot;3a&quot;==10); false
    console.log(&quot;3a&quot;<10); false
    isNaN()函数：
       语法：isNaN(数据);
       作用：判断指定数据是否为非数字，如果不是数字，返回值为true,是数字的话返回的值为false
       console.log(isNaN(&quot;3&quot;)); //false
       console.log(isNaN(&quot;3a&quot;)); //ture 

       console.log(&quot;3a&quot;!=10);//true
3.逻辑运算符
  !,&amp;&amp;,||

  !:取反
  &amp;&amp;：并且，关联的两个条件都为true,整个表达式的结果为true
  ||:或者，关联的两个条件，只要有一个条件为true,整个表达式的结果就为true

  短路逻辑：
     短路逻辑&amp;&amp;：
     当第一个条件为false时，整体表达式的结果就为false,不需要判断第二个条件
     如果第一个条件为true,会继续判断或执行第二个条件
 短路逻辑||：
     当第一个条件为true时，就不再执行后续表达式，整体结果为true。
     当第一个条件为false时，继续执行第二个条件或操作。

4.位运算符
  <<,>>,&amp;,|,^

  右移是把数变小，左移是把数变大
  &amp;：按位与，判断奇偶性
     任意数字与1做按位与，结果为1，则为奇数，结果为0，则为偶数。
     var num=323;
 var result=num &amp; 1
 console.log(result); //结果为1
  |：按位或，对小数取整
     将任意小数与0做按位或，结果则取整数部分。

  ^：按位异或，用于交换两个数字
      二进制位数，逐位比较，不同则为1，相同则为0
   a=a^b;
   b=b^a;
   a=a^b;
5.赋值运算符和扩展赋值运算符
  1.赋值运算 =
    var uname=&quot;TOM&quot;;
  2.扩展赋值运算符
    +=,-=,*=,/=,%=,^=...
a=a+1 a+=1;a++;++a
a=a^b
a^=b
6.条件（三目）运算符
  单目（一目）运算符，只需要一个操作数或表达式
  ex: a++,b--,!isRun
  双目（二元）运算符，需要两个操作数或表达式
   +，-，*，/，%，>,<,>=,<=,==,!=,===,!==,&amp;&amp;,||,&amp;,|,^
  三目（三元）运算符，需要三个操作数或表达式
     条件表达式？表达式1:表达式2;
        先判断条件表达式的值，
    如果条件为true,则执行表达式1的操作
    如果条件为false,则执行表达式2的操作
  ex:成绩大于60及格，否则，输出不及格
 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">1.</span>算术运算符
  +，-，*，/，%，++，--

  <span class="hljs-number">5</span>%<span class="hljs-number">2</span>=<span class="hljs-number">1</span>;
  ++:自增运算，只做+<span class="hljs-number">1</span>操作
  ++在前：先自增，再运算；
  ++在后：先运算，再自增；
  ex:
    <span class="hljs-keyword">var</span> num=<span class="hljs-number">5</span>;
<span class="hljs-built_in">console</span>.log(num++);<span class="hljs-comment">//打印5，变为6</span>
<span class="hljs-built_in">console</span>.log(++num);<span class="hljs-comment">//变为7，打印7</span>

ex:
    <span class="hljs-keyword">var</span> num=<span class="hljs-number">5</span>;
             <span class="hljs-number">5</span>   (<span class="hljs-number">6</span>)<span class="hljs-number">6</span>   <span class="hljs-number">6</span>(<span class="hljs-number">7</span>)    (<span class="hljs-number">8</span>)<span class="hljs-number">8</span>
    <span class="hljs-keyword">var</span> res=num+ ++num +num++ + ++num +num++ +num;  
  <span class="hljs-number">8</span>(<span class="hljs-number">9</span>)   <span class="hljs-number">9</span>
结果：<span class="hljs-number">42</span>
<span class="hljs-number">2.</span>关系运算符（比较）
  &gt;,&lt;,&gt;=,&lt;=,==,===(全等),!=,!==(不全等)
  关系运算的结果：boolean类型（<span class="hljs-literal">true</span>,<span class="hljs-literal">false</span>）
  问题：
    <span class="hljs-number">1.</span> <span class="hljs-number">5</span> &gt; <span class="hljs-string">"10"</span> 结果：<span class="hljs-literal">false</span>
   关系运算符两端，只要有一个是number的话，另外一个会隐式转换为number类型，再进行比较。
<span class="hljs-number">2.</span><span class="hljs-string">"5"</span>&gt;<span class="hljs-string">"1 0"</span> 结果：<span class="hljs-literal">true</span>
  <span class="hljs-string">"5"</span>.charCodeAt(); <span class="hljs-comment">//53</span>
  <span class="hljs-string">"1"</span>.charCodeAt(); <span class="hljs-comment">//49</span>
  <span class="hljs-string">"张三丰"</span> &gt; <span class="hljs-string">"张无忌"</span> 结果：<span class="hljs-literal">false</span>
    <span class="hljs-number">19977</span>  &gt;   <span class="hljs-number">26080</span>
<span class="hljs-number">3.</span><span class="hljs-string">"3a"</span> &gt; <span class="hljs-number">10</span> 结果：<span class="hljs-literal">false</span>
  <span class="hljs-built_in">Number</span>(<span class="hljs-string">"3a"</span>)---&gt;<span class="hljs-literal">NaN</span>
  注意：
    <span class="hljs-literal">NaN</span>与任何一个数据做比较运算时，结果都是<span class="hljs-literal">false</span>.
    console.log(<span class="hljs-string">"3a"</span>&gt;<span class="hljs-number">10</span>); <span class="hljs-literal">false</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"3a"</span>==<span class="hljs-number">10</span>); <span class="hljs-literal">false</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"3a"</span>&lt;<span class="hljs-number">10</span>); <span class="hljs-literal">false</span>
    <span class="hljs-built_in">isNaN</span>()函数：
       语法：<span class="hljs-built_in">isNaN</span>(数据);
       作用：判断指定数据是否为非数字，如果不是数字，返回值为<span class="hljs-literal">true</span>,是数字的话返回的值为<span class="hljs-literal">false</span>
       <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">isNaN</span>(<span class="hljs-string">"3"</span>)); <span class="hljs-comment">//false</span>
       <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">isNaN</span>(<span class="hljs-string">"3a"</span>)); <span class="hljs-comment">//ture </span>

       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"3a"</span>!=<span class="hljs-number">10</span>);<span class="hljs-comment">//true</span>
<span class="hljs-number">3.</span>逻辑运算符
  !,&amp;&amp;,||

  !:取反
  &amp;&amp;：并且，关联的两个条件都为<span class="hljs-literal">true</span>,整个表达式的结果为<span class="hljs-literal">true</span>
  ||:或者，关联的两个条件，只要有一个条件为<span class="hljs-literal">true</span>,整个表达式的结果就为<span class="hljs-literal">true</span>

  短路逻辑：
     短路逻辑&amp;&amp;：
     当第一个条件为<span class="hljs-literal">false</span>时，整体表达式的结果就为<span class="hljs-literal">false</span>,不需要判断第二个条件
     如果第一个条件为<span class="hljs-literal">true</span>,会继续判断或执行第二个条件
 短路逻辑||：
     当第一个条件为<span class="hljs-literal">true</span>时，就不再执行后续表达式，整体结果为<span class="hljs-literal">true</span>。
     当第一个条件为<span class="hljs-literal">false</span>时，继续执行第二个条件或操作。

<span class="hljs-number">4.</span>位运算符
  &lt;&lt;,&gt;&gt;,&amp;,|,^

  右移是把数变小，左移是把数变大
  &amp;：按位与，判断奇偶性
     任意数字与<span class="hljs-number">1</span>做按位与，结果为<span class="hljs-number">1</span>，则为奇数，结果为<span class="hljs-number">0</span>，则为偶数。
     <span class="hljs-keyword">var</span> num=<span class="hljs-number">323</span>;
 <span class="hljs-keyword">var</span> result=num &amp; <span class="hljs-number">1</span>
 <span class="hljs-built_in">console</span>.log(result); <span class="hljs-comment">//结果为1</span>
  |：按位或，对小数取整
     将任意小数与<span class="hljs-number">0</span>做按位或，结果则取整数部分。

  ^：按位异或，用于交换两个数字
      二进制位数，逐位比较，不同则为<span class="hljs-number">1</span>，相同则为<span class="hljs-number">0</span>
   a=a^b;
   b=b^a;
   a=a^b;
<span class="hljs-number">5.</span>赋值运算符和扩展赋值运算符
  <span class="hljs-number">1.</span>赋值运算 =
    <span class="hljs-keyword">var</span> uname=<span class="hljs-string">"TOM"</span>;
  <span class="hljs-number">2.</span>扩展赋值运算符
    +=,-=,*=,/=,%=,^=...
a=a+<span class="hljs-number">1</span> a+=<span class="hljs-number">1</span>;a++;++a
a=a^b
a^=b
<span class="hljs-number">6.</span>条件（三目）运算符
  单目（一目）运算符，只需要一个操作数或表达式
  ex: a++,b--,!isRun
  双目（二元）运算符，需要两个操作数或表达式
   +，-，*，/，%，&gt;,&lt;,&gt;=,&lt;=,==,!=,===,!==,&amp;&amp;,||,&amp;,|,^
  三目（三元）运算符，需要三个操作数或表达式
     条件表达式？表达式<span class="hljs-number">1</span>:表达式<span class="hljs-number">2</span>;
        先判断条件表达式的值，
    如果条件为<span class="hljs-literal">true</span>,则执行表达式<span class="hljs-number">1</span>的操作
    如果条件为<span class="hljs-literal">false</span>,则执行表达式<span class="hljs-number">2</span>的操作
  ex:成绩大于<span class="hljs-number">60</span>及格，否则，输出不及格
 
</code></pre>
<h2 id="articleHeader9">7.函数-function</h2>
<p>1.什么是函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="函数，function,也称为方法（method）
函数是一段预定义好，并可以被反复执行的代码块。
   预定义：提前定义好，并非马上执行。
   代码块：可以包含多条可执行的语句
   反复执行：允许被多次调用
函数-功能
   parseInt();
   parseFloat();
   Number();
   console.log();
   alert();
   document.write();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>函数，<span class="hljs-function"><span class="hljs-keyword">function</span>,也称为方法（<span class="hljs-title">method</span>）
函数是一段预定义好，并可以被反复执行的代码块。
   预定义：提前定义好，并非马上执行。
   代码块：可以包含多条可执行的语句
   反复执行：允许被多次调用
函数-功能
   <span class="hljs-title">parseInt</span>(<span class="hljs-params"></span>);
   <span class="hljs-title">parseFloat</span>(<span class="hljs-params"></span>);
   <span class="hljs-title">Number</span>(<span class="hljs-params"></span>);
   <span class="hljs-title">console</span>.<span class="hljs-title">log</span>(<span class="hljs-params"></span>);
   <span class="hljs-title">alert</span>(<span class="hljs-params"></span>);
   <span class="hljs-title">document</span>.<span class="hljs-title">write</span>(<span class="hljs-params"></span>);</span></code></pre>
<p>2.定义和使用函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.普通函数的声明和调用（无参数无返回值）
  1.声明
    function 函数名(){
   //函数体
     若干可执行的语句
  
}
  2.调用函数
    在任意javascript合法的位置处通过 函数名(); 对函数进行调用。
 

2.带参函数的声明和调用
  1.声明
    function 函数名(参数列表){
   //函数体
}
参数列表：可以声明0或多个参数，多个参数间用逗号隔开
声明函数时，声明的参数，称之为“形参”
 2.调用
   函数名(参数值列表);
   注意：调用函数时，传递的参数数值，称之为“实参”。
         尽量按照声明函数的格式进行调用
3.带返回值函数声明和调用
  1.声明
    function 函数名(参数){
   //函数体
   return 值;
   //return关键字，程序碰到return关键词，就立马跳出并且把值带出去
}
注意：最多只能返回一个值
  2.调用
    允许使用一个变量接收函数的返回值
    var result=函数名(实参);

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">1.</span>普通函数的声明和调用（无参数无返回值）
  <span class="hljs-number">1.</span>声明
    <span class="hljs-function"><span class="hljs-keyword">function</span> 函数名(<span class="hljs-params"></span>)</span>{
   <span class="hljs-comment">//函数体</span>
     若干可执行的语句
  
}
  <span class="hljs-number">2.</span>调用函数
    在任意javascript合法的位置处通过 函数名(); 对函数进行调用。
 

<span class="hljs-number">2.</span>带参函数的声明和调用
  <span class="hljs-number">1.</span>声明
    <span class="hljs-function"><span class="hljs-keyword">function</span> 函数名(<span class="hljs-params">参数列表</span>)</span>{
   <span class="hljs-comment">//函数体</span>
}
参数列表：可以声明<span class="hljs-number">0</span>或多个参数，多个参数间用逗号隔开
声明函数时，声明的参数，称之为“形参”
 <span class="hljs-number">2.</span>调用
   函数名(参数值列表);
   注意：调用函数时，传递的参数数值，称之为“实参”。
         尽量按照声明函数的格式进行调用
<span class="hljs-number">3.</span>带返回值函数声明和调用
  <span class="hljs-number">1.</span>声明
    <span class="hljs-function"><span class="hljs-keyword">function</span> 函数名(<span class="hljs-params">参数</span>)</span>{
   <span class="hljs-comment">//函数体</span>
   <span class="hljs-keyword">return</span> 值;
   <span class="hljs-comment">//return关键字，程序碰到return关键词，就立马跳出并且把值带出去</span>
}
注意：最多只能返回一个值
  <span class="hljs-number">2.</span>调用
    允许使用一个变量接收函数的返回值
    <span class="hljs-keyword">var</span> result=函数名(实参);

</code></pre>
<h2 id="articleHeader10">8.作用域</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.什么是作用域
  作用域表示的是变量或函数的可访问范围。
  JS中的作用域分两种：
     1.函数作用域
   只在函数范围内有效
 2.全局作用域
   代码的任何位置都有效" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>什么是作用域
  作用域表示的是变量或函数的可访问范围。
  JS中的作用域分两种：
     <span class="hljs-number">1.</span>函数作用域
   只在函数范围内有效
 <span class="hljs-number">2.</span>全局作用域
   代码的任何位置都有效</code></pre>
<p>2.函数作用域中变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 又称为局部变量，只在声明的函数中有效
 ex：
   function test(){
     var num=10;
   }
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> 又称为局部变量，只在声明的函数中有效
 ex：
   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span><span class="hljs-params">()</span></span>{
     <span class="hljs-keyword">var</span> num=<span class="hljs-number">10</span>;
   }
   </code></pre>
<p>3.全局作用域中的变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 又称为全局变量，一经声明，任何位置都能用
 1.不在function中声明的变量，为全局变量
 2.声明变量不使用var，无论任何位置声明，都是全局变量（不推荐）

 注意：
   全局变量和局部变量冲突时，优先使用局部变量。
 3.变量的声明提前
   1.什么是声明提前
     在JS程序正式执行之前，function声明的函数，
     会将所有var声明的变量，都预读（声明）到所在作用域的顶部，但赋值还是保留在原位。
  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code> 又称为全局变量，一经声明，任何位置都能用
 <span class="hljs-number">1.</span>不在<span class="hljs-function"><span class="hljs-keyword">function</span></span>中声明的变量，为全局变量
 <span class="hljs-number">2.</span>声明变量不使用var，无论任何位置声明，都是全局变量（不推荐）

 注意：
   全局变量和局部变量冲突时，优先使用局部变量。
 <span class="hljs-number">3.</span>变量的声明提前
   <span class="hljs-number">1.</span>什么是声明提前
     在JS程序正式执行之前，<span class="hljs-function"><span class="hljs-keyword">function</span></span>声明的函数，
     会将所有var声明的变量，都预读（声明）到所在作用域的顶部，但赋值还是保留在原位。
  
</code></pre>
<h2 id="articleHeader11">9.按值传递</h2>
<p>1.什么是按值传递</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="原始（基本）类型的数据（number,string,bool）,在做参数传递时，
都是按照“值传递”的方式进行传参的。
值传递：真正传递参数时，实际上传递的是值的副本（复制出来一个值），
而不是原始值。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>原始（基本）类型的数据（<span class="hljs-built_in">number</span>,<span class="hljs-built_in">string</span>,bool）,在做参数传递时，
都是按照“值传递”的方式进行传参的。
值传递：真正传递参数时，实际上传递的是值的副本（复制出来一个值），
而不是原始值。</code></pre>
<p>2.函数的作用域</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.分为两种
  1.局部函数
    在某个function中声明的函数。
  2.全局函数
    在最外层(<script>中)定义的函数就是全局函数，全局函数一经定义，
    任何位置处都能调用。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>分为两种
  <span class="hljs-number">1.</span>局部函数
    在某个function中声明的函数。
  <span class="hljs-number">2.</span>全局函数
    在最外层(&lt;script&gt;中)定义的函数就是全局函数，全局函数一经定义，
    任何位置处都能调用。
</code></pre>
<h2 id="articleHeader12">10.ECMAScript提供一组全局函数</h2>
<p>1.parseInt()<br>  2.parseFloat()<br>  3.isNaN()<br>  4.encodeURI()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="URL:uniform resource locator路径
URI:uniform resource Identifier
作用：对统一资源标识符进行编码，并返回编码后的字符串
所谓的进行编码，就是将地址中的多字节文字编成单字节的文字
（英文数字：单字节，汉字2-3字节不等）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">URL:</span>uniform resource locator路径
<span class="hljs-symbol">URI:</span>uniform resource Identifier
作用：对统一资源标识符进行编码，并返回编码后的字符串
所谓的进行编码，就是将地址中的多字节文字编成单字节的文字
（英文数字：单字节，汉字<span class="hljs-number">2</span><span class="hljs-number">-3</span>字节不等）</code></pre>
<p>5.decodeURI()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：对已经编码的URI进行解码，并返回解码后的字符串。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">作用：对已经编码的URI进行解码，并返回解码后的字符串。</code></pre>
<p>6.encodeURIComponent()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在encodeURI的基础上，允许对特殊符号进行编码。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">在<span class="hljs-built_in">encodeURI</span>的基础上，允许对特殊符号进行编码。</code></pre>
<p>7.decodeURIComponent()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="解码特殊符号" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">解码特殊符号</code></pre>
<p>8.eval()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：执行以字符串表示的js代码
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>作用：执行以字符串表示的<span class="hljs-keyword">js代码
</span></code></pre>
<h2 id="articleHeader13">11.递归调用</h2>
<p>递归：在一个函数的内部再一次调用自己<br>  问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1*2*3*4*5
 
 5*4*3*2*1
 求5!(5*4*3*2*1) 4!(4*3*2*1) 3!(3*2*1)
       2!(2*1) 1!(1*1)

   5!=5*4!
   4!=4*3!
   3!=3*2!
   2!=2*1!
   1!=1
   通过一个函数，求数字n的阶乘
   10！=10*(10-1)！
   效率：
     在本次调用还未结束时，就开始下次的调用，本次调用就会被挂起，
     直到所有的调用都完成之后，才会依次返回，调用的次数越多，效率越低。
  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code> <span class="hljs-number">1</span>*<span class="hljs-number">2</span>*<span class="hljs-number">3</span>*<span class="hljs-number">4</span>*<span class="hljs-number">5</span>
 
 <span class="hljs-number">5</span>*<span class="hljs-number">4</span>*<span class="hljs-number">3</span>*<span class="hljs-number">2</span>*<span class="hljs-number">1</span>
 求<span class="hljs-number">5</span>!(<span class="hljs-number">5</span>*<span class="hljs-number">4</span>*<span class="hljs-number">3</span>*<span class="hljs-number">2</span>*<span class="hljs-number">1</span>) <span class="hljs-number">4</span>!(<span class="hljs-number">4</span>*<span class="hljs-number">3</span>*<span class="hljs-number">2</span>*<span class="hljs-number">1</span>) <span class="hljs-number">3</span>!(<span class="hljs-number">3</span>*<span class="hljs-number">2</span>*<span class="hljs-number">1</span>)
       <span class="hljs-number">2</span>!(<span class="hljs-number">2</span>*<span class="hljs-number">1</span>) <span class="hljs-number">1</span>!(<span class="hljs-number">1</span>*<span class="hljs-number">1</span>)

   <span class="hljs-number">5</span>!=<span class="hljs-number">5</span>*<span class="hljs-number">4</span>!
   <span class="hljs-number">4</span>!=<span class="hljs-number">4</span>*<span class="hljs-number">3</span>!
   <span class="hljs-number">3</span>!=<span class="hljs-number">3</span>*<span class="hljs-number">2</span>!
   <span class="hljs-number">2</span>!=<span class="hljs-number">2</span>*<span class="hljs-number">1</span>!
   <span class="hljs-number">1</span>!=<span class="hljs-number">1</span>
   通过一个函数，求数字n的阶乘
   <span class="hljs-number">10</span>！=<span class="hljs-number">10</span>*(<span class="hljs-number">10</span><span class="hljs-number">-1</span>)！
   效率：
     在本次调用还未结束时，就开始下次的调用，本次调用就会被挂起，
     直到所有的调用都完成之后，才会依次返回，调用的次数越多，效率越低。
  
</code></pre>
<h2 id="articleHeader14">12.分支结构</h2>
<p>1.if结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(条件){
   语句块；
}
注意：
  条件尽量是boolean的，如果不是boolean,以下情况会当做false处理
   if(0){...}
   if(0.0){...}
   if(&quot;&quot;){...}
   if(undefined){...}
   if(null){...}
   if(NaN){...}
注意：if后的{}可以省略，但是不推荐，只控制if后的第一句话。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">if</span>(条件){
   语句块；
}
注意：
  条件尽量是boolean的，如果不是boolean,以下情况会当做<span class="hljs-literal">false</span>处理
   <span class="hljs-keyword">if</span>(<span class="hljs-number">0</span>)<span class="hljs-meta">{...}</span>
   <span class="hljs-keyword">if</span>(<span class="hljs-number">0</span>.<span class="hljs-number">0</span>)<span class="hljs-meta">{...}</span>
   <span class="hljs-keyword">if</span>(<span class="hljs-string">""</span>)<span class="hljs-meta">{...}</span>
   <span class="hljs-keyword">if</span>(undefined)<span class="hljs-meta">{...}</span>
   <span class="hljs-keyword">if</span>(null)<span class="hljs-meta">{...}</span>
   <span class="hljs-keyword">if</span>(<span class="hljs-type">NaN</span>)<span class="hljs-meta">{...}</span>
注意：<span class="hljs-keyword">if</span>后的{}可以省略，但是不推荐，只控制<span class="hljs-keyword">if</span>后的第一句话。
</code></pre>
<p>2.if...else...结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法：
  if(条件){
     语句块
  }else{
     语句块
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>语法：
  <span class="hljs-keyword">if</span>(条件){
     语句块
  }<span class="hljs-keyword">else</span>{
     语句块
  }</code></pre>
<p>3.if....else if...else...</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法：
  if(条件1){
    语句块1
  }else if(条件2){
     语句块2
  }else if(条件3){
     语句块3
  }else{
     语句块n
  }

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>语法：
  <span class="hljs-keyword">if</span>(条件<span class="hljs-number">1</span>){
    语句块<span class="hljs-number">1</span>
  }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(条件<span class="hljs-number">2</span>){
     语句块<span class="hljs-number">2</span>
  }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(条件<span class="hljs-number">3</span>){
     语句块<span class="hljs-number">3</span>
  }<span class="hljs-keyword">else</span>{
     语句块n
  }

</code></pre>
<p>4.switch...case</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.作用：（使用场合）
  等值判断
2.语法
  1.switch(值/表达式){
     case 值1：
    语句块1；
    break;//结束switch结构，可选的
 case 值2：
    语句块2；
    break;
    ...
 default:
   语句块n；
   break;
   }
  2.特殊用法
    执行相同操作时：
   switch(值/表达式){
       case 值1：
       case 值2：
       case 值3：
          语句块；
   }

  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-number">1.</span>作用：（使用场合）
  等值判断
<span class="hljs-number">2.</span>语法
  <span class="hljs-number">1.</span><span class="hljs-keyword">switch</span>(值/表达式){
     <span class="hljs-keyword">case</span> 值<span class="hljs-number">1</span>：
    语句块<span class="hljs-number">1</span>；
    <span class="hljs-keyword">break</span>;<span class="hljs-comment">//结束switch结构，可选的</span>
 <span class="hljs-keyword">case</span> 值<span class="hljs-number">2</span>：
    语句块<span class="hljs-number">2</span>；
    <span class="hljs-keyword">break</span>;
    ...
 <span class="hljs-keyword">default</span>:
   语句块n；
   <span class="hljs-keyword">break</span>;
   }
  <span class="hljs-number">2.</span>特殊用法
    执行相同操作时：
   <span class="hljs-keyword">switch</span>(值/表达式){
       <span class="hljs-keyword">case</span> 值<span class="hljs-number">1</span>：
       <span class="hljs-keyword">case</span> 值<span class="hljs-number">2</span>：
       <span class="hljs-keyword">case</span> 值<span class="hljs-number">3</span>：
          语句块；
   }

  
</code></pre>
<h2 id="articleHeader15">12.循环结构</h2>
<p>1.特点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.循环条件：循环的开始和结束
2.循环操作：要执行的相同或相似的语句" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>循环条件：循环的开始和结束
<span class="hljs-number">2.</span>循环操作：要执行的相同或相似的语句</code></pre>
<p>2.循环-while</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法：
   while(条件){
      //循环体-循环操作
      
  //更新循环条件
   }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>语法：
   <span class="hljs-keyword">while</span><span class="hljs-comment">(条件)</span>{
      <span class="hljs-comment">//循环体-循环操作</span>
      
  <span class="hljs-comment">//更新循环条件</span>
   }
</code></pre>
<p>3.循环的流程控制</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.break
  作用：终止整个循环的运行
2.continue
  作用：终止本次循环的运行，继续执行下一次循环
 ex:
   循环从弹出框中录入信息，并且打印，直到输入exit为止。
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-number">1</span>.<span class="hljs-keyword">break</span>
  作用：终止整个循环的运行
<span class="hljs-number">2</span>.<span class="hljs-keyword">continue</span>
  作用：终止本次循环的运行，继续执行下一次循环
 ex:
   循环从弹出框中录入信息，并且打印，直到输入<span class="hljs-keyword">exit</span>为止。
   </code></pre>
<p>4.循环-do...while</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.语法
  do{
     //循环体
  }while(条件);

 执行流程：
     1.先执行循环体
 2.再判断循环条件
   如果条件为真，则继续执行循环体
   如果条件为假，则跳出循环操作

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code><span class="hljs-number">1.</span>语法
  <span class="hljs-keyword">do</span>{
     <span class="hljs-comment">//循环体</span>
  }<span class="hljs-keyword">while</span><span class="hljs-comment">(条件)</span>;

 执行流程：
     <span class="hljs-number">1.</span>先执行循环体
 <span class="hljs-number">2.</span>再判断循环条件
   如果条件为真，则继续执行循环体
   如果条件为假，则跳出循环操作

</code></pre>
<p>5.循环-for</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法：
  for(表达式1;表达式2;表达式3){
     //循环操作
  }
  表达式1：循环条件的声明
  表达式2：循环条件的判断
  表达式3：更新循环变量
  执行流程：
     1.先执行表达式1
 2.判断表达式2的结果(boolean类型)
 3.如果2条件为真，则执行循环体，否则退出
 4.执行完循环体后，再执行表达式3
 5.判断表达式2的结果
  ex: for(var i=1;i<=10;i++){
      console.log(i);
   }

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>语法：
  <span class="hljs-keyword">for</span>(表达式1;表达式2;表达式3){
     <span class="hljs-comment">//循环操作</span>
  }
  表达式1：循环条件的声明
  表达式2：循环条件的判断
  表达式3：更新循环变量
  执行流程：
     1.先执行表达式1
 2.判断表达式2的结果(boolean类型)
 3.如果2条件为真，则执行循环体，否则退出
 4.执行完循环体后，再执行表达式3
 5.判断表达式2的结果
  <span class="hljs-keyword">ex</span>: <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=1;i&lt;=10;i++){
      console.<span class="hljs-built_in">log</span>(i);
   }

</code></pre>
<h2 id="articleHeader16">13.for的特殊用法</h2>
<p>1.for(表达式1;表达式2;表达式3;){}</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.省略表达式
  三个表达式可以任意省略，分号不能省
  但一定在循环的内部或外部将表达式补充完整
2.表达式1和表达式3 允许写多个表达式，用逗号隔开表达式
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>省略表达式
  三个表达式可以任意省略，分号不能省
  但一定在循环的内部或外部将表达式补充完整
<span class="hljs-number">2.</span>表达式<span class="hljs-number">1</span>和表达式<span class="hljs-number">3</span> 允许写多个表达式，用逗号隔开表达式
</code></pre>
<h2 id="articleHeader17">14.循环嵌套</h2>
<p>1.循环嵌套</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在一个循环的内部，又出现一个循环
  for(var i=1;i<100;i++){ //外层循环
     for(var j=1;j<=10;j++){
    //内层循环
 }
  }
 外层循环走一次，内层循环走一轮
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>在一个循环的内部，又出现一个循环
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">1</span>;i&lt;<span class="hljs-number">100</span>;i++){ <span class="hljs-comment">//外层循环</span>
     <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j=<span class="hljs-number">1</span>;j&lt;=<span class="hljs-number">10</span>;j++){
    <span class="hljs-comment">//内层循环</span>
 }
  }
 外层循环走一次，内层循环走一轮
</code></pre>
<h2 id="articleHeader18">15.数组</h2>
<p>1.什么是数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在一个变量中保存多个数据。
数组是按照线型顺序来排列的-线型结构
数组中：除了第一个元素外，每个元素都有一个直接的&quot;前驱元素&quot;。
数组中：除了最后一个元素外，每个元素都有一个会直接的&quot;后继元素&quot;。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>在一个变量中保存多个数据。
数组是按照线型顺序来排列的-线型结构
数组中：除了第一个元素外，每个元素都有一个直接的<span class="hljs-string">"前驱元素"</span>。
数组中：除了最后一个元素外，每个元素都有一个会直接的<span class="hljs-string">"后继元素"</span>。</code></pre>
<p>2.声明数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.语法
  1.var 数组名=[];
    var names=[];
  2.var 数组名=[元素1,元素2,元素3...];
    var names=[&quot;孙悟空&quot;,&quot;猪八戒&quot;,&quot;沙和尚&quot;];
  3.var 数组名=new Array();
    var names=new Array();
  4.var 数组名=new Array(元素1，元素2...);
    var names=new Array(&quot;林黛玉&quot;,&quot;贾宝玉&quot;,&quot;王熙凤&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-number">1.</span>语法
  <span class="hljs-number">1.</span><span class="hljs-keyword">var</span> 数组名=[];
    <span class="hljs-keyword">var</span> names=[];
  <span class="hljs-number">2.</span><span class="hljs-keyword">var</span> 数组名=[元素<span class="hljs-number">1</span>,元素<span class="hljs-number">2</span>,元素<span class="hljs-number">3.</span>..];
    <span class="hljs-keyword">var</span> names=[<span class="hljs-string">"孙悟空"</span>,<span class="hljs-string">"猪八戒"</span>,<span class="hljs-string">"沙和尚"</span>];
  <span class="hljs-number">3.</span><span class="hljs-keyword">var</span> 数组名=<span class="hljs-keyword">new</span> <span class="hljs-type">Array</span>();
    <span class="hljs-keyword">var</span> names=<span class="hljs-keyword">new</span> <span class="hljs-type">Array</span>();
  <span class="hljs-number">4.</span><span class="hljs-keyword">var</span> 数组名=<span class="hljs-keyword">new</span> <span class="hljs-type">Array</span>(元素<span class="hljs-number">1</span>，元素<span class="hljs-number">2.</span>..);
    <span class="hljs-keyword">var</span> names=<span class="hljs-keyword">new</span> <span class="hljs-type">Array</span>(<span class="hljs-string">"林黛玉"</span>,<span class="hljs-string">"贾宝玉"</span>,<span class="hljs-string">"王熙凤"</span>);
</code></pre>
<p>3.数组的使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.取值和赋值操作
  取值：
   数组名[下标]
   var newArr=[&quot;tom&quot;,&quot;lilei&quot;];
   newArr[0]
  赋值：
    数组名[下标]=值；
     newArr[2]=&quot;韩梅梅&quot;;
2.获取数组的长度
  数组长度：数组中元素的个数
  属性：length
  语法：数组名.length
3.配合循环，遍历数组中的每个元素
  for(var i=0;i<names.length;i++){
      i:表示数组中每个元素的下标
      names[i]:每个元素
  }
  
  length表示数组中即将要插入的元素的下标
  var names=[&quot;tom&quot;,&quot;lili&quot;,&quot;lucy&quot;];
      names[names.length]=&quot;lilei&quot;;
 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-number">1.</span>取值和赋值操作
  取值：
   数组名[下标]
   <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>=[<span class="hljs-string">"tom"</span>,<span class="hljs-string">"lilei"</span>];
   <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>[<span class="hljs-number">0</span>]
  赋值：
    数组名[下标]=值；
     <span class="hljs-keyword">new</span><span class="hljs-type">Arr</span>[<span class="hljs-number">2</span>]=<span class="hljs-string">"韩梅梅"</span>;
<span class="hljs-number">2.</span>获取数组的长度
  数组长度：数组中元素的个数
  属性：length
  语法：数组名.length
<span class="hljs-number">3.</span>配合循环，遍历数组中的每个元素
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;names.length;i++){
      i:<span class="hljs-type"></span>表示数组中每个元素的下标
      names[i]:<span class="hljs-type"></span>每个元素
  }
  
  length表示数组中即将要插入的元素的下标
  <span class="hljs-keyword">var</span> names=[<span class="hljs-string">"tom"</span>,<span class="hljs-string">"lili"</span>,<span class="hljs-string">"lucy"</span>];
      names[names.length]=<span class="hljs-string">"lilei"</span>;
 
</code></pre>
<h2 id="articleHeader19">16.关联数组</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.关联数组
  以字符串作为元素的下标的数组，就是关联数组。
  以数字作为下标的数组，就是索引数组。
$array=[&quot;name&quot;=>&quot;tom&quot;]
2.js中的关联数组
  var array=[];
  array[&quot;字符串下标&quot;]=值;
  注意：
    1.关联数组中，字符串下标的内容是不记录到length中的
2.只能通过 字符串 做下标取值
3.for...in
  遍历出任意数组中的字符串下标 以及 索引下标
  语法：for(var 变量 in 数组名){
       //变量：字符串下标 或 索引下标
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-number">1</span>.关联数组
  以字符串作为元素的下标的数组，就是关联数组。
  以数字作为下标的数组，就是索引数组。
$<span class="hljs-built_in">array</span>=[<span class="hljs-string">"name"</span>=&gt;<span class="hljs-string">"tom"</span>]
<span class="hljs-number">2.</span>js中的关联数组
  <span class="hljs-built_in">var</span> <span class="hljs-built_in">array</span>=[];
  <span class="hljs-built_in">array</span>[<span class="hljs-string">"字符串下标"</span>]=值;
  注意：
    <span class="hljs-number">1</span>.关联数组中，字符串下标的内容是不记录到<span class="hljs-built_in">length</span>中的
<span class="hljs-number">2</span>.只能通过 字符串 做下标取值
<span class="hljs-number">3.</span><span class="hljs-keyword">for</span>...<span class="hljs-keyword">in</span>
  遍历出任意数组中的字符串下标 以及 索引下标
  语法：<span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> 变量 <span class="hljs-keyword">in</span> 数组名){
       //变量：字符串下标 或 索引下标
  }
</code></pre>
<h2 id="articleHeader20">17.冒泡排序</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.什么是冒泡
  排序算法之一，将一组数据进行排序，小的数字往前排，大的数字往后排。
  两两比较，小的靠前。
  var arr=[9,23,6,78,45]; 5个数  比4轮
  第一轮：比较了4次
  第二轮：比较了3次
  第三轮：比较了2次
  第四轮：比较了1次
  1.n个数字，则比较n-1轮
    for(var i=1;i<arr.length;i++)
  2.轮数增加，比较的次数较少
    for(var j=0;j<arr.length-i;j++)
          第一轮  5     -1=4次
      第二轮  5     -2=3次
              第三轮  5     -3=2次
      第四轮  5     -4=1次
      两两比较 小的靠前
      if(arr[j]>arr[j+1])

         arr[j]^=arr[j+1];
         arr[j+1]^=arr[j];
         arr[j]^=arr[j+1]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>什么是冒泡
  排序算法之一，将一组数据进行排序，小的数字往前排，大的数字往后排。
  两两比较，小的靠前。
  var arr=[<span class="hljs-number">9</span>,<span class="hljs-number">23</span>,<span class="hljs-number">6</span>,<span class="hljs-number">78</span>,<span class="hljs-number">45</span>]; <span class="hljs-number">5</span>个数  比<span class="hljs-number">4</span>轮
  第一轮：比较了<span class="hljs-number">4</span>次
  第二轮：比较了<span class="hljs-number">3</span>次
  第三轮：比较了<span class="hljs-number">2</span>次
  第四轮：比较了<span class="hljs-number">1</span>次
  <span class="hljs-number">1.</span>n个数字，则比较n<span class="hljs-number">-1</span>轮
    for(var i=<span class="hljs-number">1</span>;i&lt;arr.length;i++)
  <span class="hljs-number">2.</span>轮数增加，比较的次数较少
    for(var j=<span class="hljs-number">0</span>;j&lt;arr.length-i;j++)
          第一轮  <span class="hljs-number">5</span>     <span class="hljs-number">-1</span>=<span class="hljs-number">4</span>次
      第二轮  <span class="hljs-number">5</span>     <span class="hljs-number">-2</span>=<span class="hljs-number">3</span>次
              第三轮  <span class="hljs-number">5</span>     <span class="hljs-number">-3</span>=<span class="hljs-number">2</span>次
      第四轮  <span class="hljs-number">5</span>     <span class="hljs-number">-4</span>=<span class="hljs-number">1</span>次
      两两比较 小的靠前
      if(arr[j]&gt;arr[j+<span class="hljs-number">1</span>])

         arr[j]^=arr[j+<span class="hljs-number">1</span>];
         arr[j+<span class="hljs-number">1</span>]^=arr[j];
         arr[j]^=arr[j+<span class="hljs-number">1</span>]
</code></pre>
<h2 id="articleHeader21">18.数组的常用方法</h2>
<p>1.toString();</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：将数组转换为字符串，并返回转换后的结果。
语法： var str=数组对象.toString();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>作用：将数组转换为字符串，并返回转换后的结果。
语法： var <span class="hljs-built_in">str</span>=数组对象.<span class="hljs-built_in">toString</span>();</code></pre>
<p>2.join()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：将数组的元素通过指定的字符连接到一起，并返回连接后字符串
语法：var str=数组对象.join(&quot;字符&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>作用：将数组的元素通过指定的字符连接到一起，并返回连接后字符串
语法：<span class="hljs-keyword">var</span> str=数组对象.<span class="hljs-keyword">join</span>(<span class="hljs-string">"字符"</span>);</code></pre>
<p>3.concat()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：拼接两个或更多的数组，并返回拼接后的结果
语法：var res=数组对象.concat(数组1,数组2,...);

 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code>作用：拼接两个或更多的数组，并返回拼接后的结果
语法：<span class="hljs-built_in">var</span> res=数组对象.<span class="hljs-built_in">concat</span>(数组<span class="hljs-number">1</span>,数组<span class="hljs-number">2</span>,...);

 
</code></pre>
<h2 id="articleHeader22">19.数组的函数</h2>
<p>1.slice()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：截取子数组，从指定的数组中，截取几个连续的元素组成一个新的数组
语法：var arr=数组名.slice(start,[end]);
      start:从哪个下标位置处开始截取，取值为正，从前向后算； 
      取值为负，从后向前算          0      1      2
   var arr=[&quot;中国&quot;,&quot;美国&quot;,&quot;俄罗斯&quot;];
             -3      -2    -1 
      end:指定结束位置处的下标（不包含自己），该参数可以省略，
      如果省略的话，就是从strat开始一直截取到尾。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>作用：截取子数组，从指定的数组中，截取几个连续的元素组成一个新的数组
语法：var arr=数组名.slice(<span class="hljs-keyword">start</span>,[<span class="hljs-keyword">end</span>]);
      <span class="hljs-keyword">start</span>:从哪个下标位置处开始截取，取值为正，从前向后算； 
      取值为负，从后向前算          <span class="hljs-number">0</span>      <span class="hljs-number">1</span>      <span class="hljs-number">2</span>
   <span class="hljs-keyword">var</span> arr=[<span class="hljs-string">"中国"</span>,<span class="hljs-string">"美国"</span>,<span class="hljs-string">"俄罗斯"</span>];
             -3      -2    -1 
      <span class="hljs-keyword">end</span>:指定结束位置处的下标（不包含自己），该参数可以省略，
      如果省略的话，就是从strat开始一直截取到尾。</code></pre>
<p>2.splice()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：允许从指定数组中，删除一部分元素，同时再添加一部分元素
语法：arr.splice(start,count,e1,e2...);
      start:指定添加或删除元素的起始下标
  count:指定要删除元素的个数，取值为0表示不删除
  e1:要增加的新元素，可以多个
  返回值：返回一个由删除元素所组成的数组" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>作用：允许从指定数组中，删除一部分元素，同时再添加一部分元素
语法：arr.splice(<span class="hljs-keyword">start</span>,<span class="hljs-keyword">count</span>,e1,e2...);
      <span class="hljs-keyword">start</span>:指定添加或删除元素的起始下标
  <span class="hljs-keyword">count</span>:指定要删除元素的个数，取值为<span class="hljs-number">0</span>表示不删除
  e1:要增加的新元素，可以多个
  返回值：返回一个由删除元素所组成的数组</code></pre>
<p>3.reverse()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：将一个数组反转
语法：数组名.reverse();
注意：该函数会改变当前数组的内容" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>作用：将一个数组反转
语法：数组名.reverse()<span class="hljs-comment">;</span>
注意：该函数会改变当前数组的内容</code></pre>
<p>4.sort()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="作用：排序，默认情况下按照数组元素们的Unicode码进行升序排序。
语法：数组名.sort();
特殊：
   允许自定义排序函数，从而实现对数字的升序或降序的排序
   ex:
     var arr=[12,6,4,115,78];
 //排序函数（升序）
 function sortAsc(a,b){
    return a-b;
 }
 arr.sort(sortAsc);
  原理：
    1.指定排序行数sortAsc，定义两个参数a和b，表示数组中相邻的两个数字
2.将排序函数指定给数组sort()函数，数组会自动传递数据到sortAsc()中，
  如果sortAsc()的返回值>0，则交互两个数字的位置，否则不变。
  使用函数完成升序排序：
     arr.sort(
       function(a,b){  //匿名函数
         return a-b;
       }
    )

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>作用：排序，默认情况下按照数组元素们的Unicode码进行升序排序。
语法：数组名.sort();
特殊：
   允许自定义排序函数，从而实现对数字的升序或降序的排序
   ex:
     <span class="hljs-keyword">var</span> arr=[<span class="hljs-number">12</span>,<span class="hljs-number">6</span>,<span class="hljs-number">4</span>,<span class="hljs-number">115</span>,<span class="hljs-number">78</span>];
 <span class="hljs-comment">//排序函数（升序）</span>
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sortAsc</span><span class="hljs-params">(a,b)</span></span>{
    <span class="hljs-keyword">return</span> a-b;
 }
 arr.sort(sortAsc);
  原理：
    <span class="hljs-number">1.</span>指定排序行数sortAsc，定义两个参数a和b，表示数组中相邻的两个数字
<span class="hljs-number">2.</span>将排序函数指定给数组sort()函数，数组会自动传递数据到sortAsc()中，
  如果sortAsc()的返回值&gt;<span class="hljs-number">0</span>，则交互两个数字的位置，否则不变。
  使用函数完成升序排序：
     arr.sort(
       <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a,b)</span></span>{  <span class="hljs-comment">//匿名函数</span>
         <span class="hljs-keyword">return</span> a-b;
       }
    )

</code></pre>
<h2 id="articleHeader23">20.进出栈操作</h2>
<p>JS是按照标准的“栈式操作”来访问数组<br>  所有的“栈式操作”的特点就是“后进先出”<br>  1.push()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="入栈，在栈顶添加指定的元素，并返回新数组的长度
 var arr=[10,20,30];
 //向栈顶增加新的数据40
 var len=arr.push(40); //4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>入栈，在栈顶添加指定的元素，并返回新数组的长度
 var arr=[<span class="hljs-number">10</span>,<span class="hljs-number">20</span>,<span class="hljs-number">30</span>];
 <span class="hljs-comment">//向栈顶增加新的数据40</span>
 var len=arr.push(<span class="hljs-number">40</span>); <span class="hljs-comment">//4</span></code></pre>
<p>2.pop()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="出栈，删除(删除栈顶数据)并返回删除元素
注意：改变原来数组" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>出栈，删除<span class="hljs-comment">(删除栈顶数据)</span>并返回删除元素
注意：改变原来数组</code></pre>
<p>3.shift()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="删除数组头部（第一个）的元素并返回删除元素
语法：数组名.shift();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>删除数组头部（第一个）的元素并返回删除元素
语法：数组名.shift()<span class="hljs-comment">;</span></code></pre>
<p>4.unshift()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在数组的头部（第一个）元素的位置处，增加元素,返回的是数组的长度。
语法：数组名.unshift(增加的数据);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>在数组的头部（第一个）元素的位置处，增加元素,返回的是数组的长度。
语法：数组名<span class="hljs-selector-class">.unshift</span>(增加的数据);</code></pre>
<p>3.二维数组<br>  1.什么是二维数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在一个数组中的元素又是一个数组，也可以称为：数组的数组。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">在一个数组中的元素又是一个数组，也可以称为：数组的数组。</code></pre>
<p>2.二维数组的使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var names=[
    [&quot;孙悟空&quot;,&quot;猪八戒&quot;,&quot;沙和尚&quot;],
[&quot;大乔&quot;,&quot;小乔&quot;,&quot;曹操&quot;],
[&quot;林黛玉&quot;,&quot;贾宝玉&quot;,&quot;薛宝钗&quot;]
];
 //打印输出“小乔”
   console.log(names[1][1]);
       



  

  

 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>var names=[
    [<span class="hljs-string">"孙悟空"</span>,<span class="hljs-string">"猪八戒"</span>,<span class="hljs-string">"沙和尚"</span>],
[<span class="hljs-string">"大乔"</span>,<span class="hljs-string">"小乔"</span>,<span class="hljs-string">"曹操"</span>],
[<span class="hljs-string">"林黛玉"</span>,<span class="hljs-string">"贾宝玉"</span>,<span class="hljs-string">"薛宝钗"</span>]
];
 //打印输出“小乔”
   console.log(names[<span class="hljs-number">1</span>][<span class="hljs-number">1</span>]);
       



  

  

 </code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端知识点总结——JS基础

## 原文链接
[https://segmentfault.com/a/1190000013400739](https://segmentfault.com/a/1190000013400739)

