---
title: '前端知识点总结——HTML' 
date: 2018-12-12 2:30:10
hidden: true
slug: 8u7czoc9l6b
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><strong>前端知识点总结——HTML</strong></h1>
<p>HTML：HTML4.01 指的就是网页技术<br>HTML5：HTML4.01的升级版本</p>
<h2 id="articleHeader1">1.web的基础知识</h2>
<p>web与Internet<br>  1.Internet:全球性的计算机互联网络，因特网，互联网，交互网<br>  2.提供服务</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="访问网站：www（world wide web）服务
Email:电子邮件服务
BBS：电子公告板，俗称论坛
FTP：文件的上传下载
telenet:远程登录" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code>访问网站：www（world wide web）服务
<span class="hljs-symbol">Email:</span>电子邮件服务
BBS：电子公告板，俗称论坛
FTP：文件的上传下载
<span class="hljs-symbol">telenet:</span>远程登录</code></pre>
<p>3.Internet上的应用程序</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.C/S程序
  C：Client客户端
  S：Server服务器端
  代表：QQ，微信，网络游戏
2.B/S程序
  B：Browser 浏览器
  S：server 服务器
  代表：网站" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-number">1.</span>C/S程序
  C：<span class="hljs-built_in">Client</span>客户端
  S：<span class="hljs-built_in">Server</span>服务器端
  代表：QQ，微信，网络游戏
<span class="hljs-number">2.</span>B/S程序
  B：Browser 浏览器
  S：server 服务器
  代表：网站</code></pre>
<p>4.web</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="web:运行在Internet之上的一种B/S结构的应用程序，俗称网站。
w3c:(万维网联盟)
w3c:制定web技术规范
web的工作原理：
   基于浏览器和服务器还有通信协议来实现信息的传输和展示。
   1.通信协议
     HTTP/HTTPS
 规范了数据是如何传递和打包
   2.服务器
     1.功能
   1.存储web信息，并提供程序运行环境
   2.接收用户请求并给出响应
   3.具备一定的安全功能
 2.服务器产品
   1.TOMCAT 
   2.APACHE
   3.IIS
 3.服务器技术
   1.php
   2.java
   3..NET
   3.浏览器
     功能：
      1.代理用户（UA:user agent）提交请求
  2.以图形化的方式显示网页
  3.作为HTML和JS的解释器
 浏览器产品：
  1.IE
  2.chrome
  3.firefox 
  4.opera
  5.safari
 浏览器技术：
  1.HTML
  2.CSS
  3.Javascript
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>web:运行在Internet之上的一种B/S结构的应用程序，俗称网站。
w3c:(万维网联盟)
w3c:制定web技术规范
web的工作原理：
   基于浏览器和服务器还有通信协议来实现信息的传输和展示。
   <span class="hljs-number">1</span>.通信协议
     HTTP/HTTPS
 规范了数据是如何传递和打包
   <span class="hljs-number">2</span>.服务器
     <span class="hljs-number">1</span>.功能
   <span class="hljs-number">1</span>.存储web信息，并提供程序运行环境
   <span class="hljs-number">2</span>.接收用户请求并给出响应
   <span class="hljs-number">3</span>.具备一定的安全功能
 <span class="hljs-number">2</span>.服务器产品
   <span class="hljs-number">1</span><span class="hljs-selector-class">.TOMCAT</span> 
   <span class="hljs-number">2</span><span class="hljs-selector-class">.APACHE</span>
   <span class="hljs-number">3</span><span class="hljs-selector-class">.IIS</span>
 <span class="hljs-number">3</span>.服务器技术
   <span class="hljs-number">1</span><span class="hljs-selector-class">.php</span>
   <span class="hljs-number">2</span><span class="hljs-selector-class">.java</span>
   <span class="hljs-number">3</span>.<span class="hljs-selector-class">.NET</span>
   <span class="hljs-number">3</span>.浏览器
     功能：
      <span class="hljs-number">1</span>.代理用户（UA:user agent）提交请求
  <span class="hljs-number">2</span>.以图形化的方式显示网页
  <span class="hljs-number">3</span>.作为HTML和JS的解释器
 浏览器产品：
  <span class="hljs-number">1</span><span class="hljs-selector-class">.IE</span>
  <span class="hljs-number">2</span><span class="hljs-selector-class">.chrome</span>
  <span class="hljs-number">3</span><span class="hljs-selector-class">.firefox</span> 
  <span class="hljs-number">4</span><span class="hljs-selector-class">.opera</span>
  <span class="hljs-number">5</span><span class="hljs-selector-class">.safari</span>
 浏览器技术：
  <span class="hljs-number">1</span><span class="hljs-selector-class">.HTML</span>
  <span class="hljs-number">2</span><span class="hljs-selector-class">.CSS</span>
  <span class="hljs-number">3</span><span class="hljs-selector-class">.Javascript</span>
</code></pre>
<h2 id="articleHeader2">2.HTML快速入门</h2>
<p>1.什么是HTML？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTML：Hyper Text Markup Language
      超文本标记语言
ex:
  普通文本 a：英文首字符
  超级文本 a：超链接

  普通文本 b：英文第二个字符
  超级文本 b：加粗
  language:语言，有自己的语法结构
特点：
  1.以.html或.htm为后缀
  2.由浏览器解析执行
  3.可以嵌套脚本语言（javascript）
  4.用带有尖括号的标记来标识
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">HTML</span>：Hyper Text <span class="hljs-keyword">Markup </span>Language
      超文本标记语言
<span class="hljs-symbol">ex</span>:
  普通文本 a：英文首字符
  超级文本 a：超链接

  普通文本 <span class="hljs-keyword">b：英文第二个字符
</span>  超级文本 <span class="hljs-keyword">b：加粗
</span><span class="hljs-symbol">  language:</span>语言，有自己的语法结构
特点：
  <span class="hljs-number">1</span>.以.html或.htm为后缀
  <span class="hljs-number">2</span>.由浏览器解析执行
  <span class="hljs-number">3</span>.可以嵌套脚本语言（javascript）
  <span class="hljs-number">4</span>.用带有尖括号的标记来标识
</code></pre>
<p>2.HTML的基础语法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.标记
  标记又称为&quot;元素&quot;，或&quot;标签&quot;，在网页中，主要表示一些功能。
  标记在使用时，必须用<>括起来
  标记分类：
    1.封闭类型
  又称为双标记
  语法：
    <标记>内容</标记>
     ex：<a>百度</a>
     <b>加粗</b>
      注意：必须有开始就有结束。
2.非封闭类型
  又称为单标记
  语法：<标记>或<标记/>
      ex:<img>或<img/>
         <br>或<br/>

       
2.标记嵌套
  1.什么是嵌套？
    在一对标记中出现另外一对（个）标记，从而形成功能的层叠。
  2.语法
    <标记>
   <标记>
      <标记/>
   </标记>
</标记>
ex：
<a>
   <b>这是演示文本</b>
</a>
ex：
 <a><b>这是演示文本</b></a> 正确，不推荐
ex:
 <a><b>dfdsfsdfs</a></b> 错误
注意：
  1.换行缩进，如果是双标记必须成对出现
3.元素（标记）属性
  作用：修饰元素
  语法：
   1.必须声明在开始标记中
     <标记 属性名></标记>
   2.属性名与值之间用&quot;=&quot;连接
     <标记 属性名=值></标记>
   3.元素允许有多个属性，每个属性之间用空格隔开
     <标记 属性名1=值1 属性名2=值2 ...></标记>
 ex:
 p标记的align属性的值为center,title属性的值为&quot;这是段落&quot;
     <p align=center title=&quot;这是段落&quot;></p>
    标准属性(通有属性)：
  id:定义元素的唯一标识（名称）
  title:定义鼠标悬停在元素上时所提示的文本
  style:css中,定义行内样式
  class:css中,引用类选择器

   4.注释
     语法：<!--注释内容-->
 注意：
   1.注释本身不能嵌套
   2.不能嵌套在标记中
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>1.标记
  标记又称为"元素"，或"标签"，在网页中，主要表示一些功能。
  标记在使用时，必须用<span class="hljs-tag">&lt;&gt;</span>括起来
  标记分类：
    1.封闭类型
  又称为双标记
  语法：
    <span class="hljs-tag">&lt;<span class="hljs-name">标记</span>&gt;</span>内容<span class="hljs-tag">&lt;/<span class="hljs-name">标记</span>&gt;</span>
     ex：<span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>百度<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>加粗<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>
      注意：必须有开始就有结束。
2.非封闭类型
  又称为单标记
  语法：<span class="hljs-tag">&lt;<span class="hljs-name">标记</span>&gt;</span>或<span class="hljs-tag">&lt;<span class="hljs-name">标记</span>/&gt;</span>
      ex:<span class="hljs-tag">&lt;<span class="hljs-name">img</span>&gt;</span>或<span class="hljs-tag">&lt;<span class="hljs-name">img</span>/&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>或<span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>

       
2.标记嵌套
  1.什么是嵌套？
    在一对标记中出现另外一对（个）标记，从而形成功能的层叠。
  2.语法
    <span class="hljs-tag">&lt;<span class="hljs-name">标记</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">标记</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">标记</span>/&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">标记</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">标记</span>&gt;</span>
ex：
<span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>这是演示文本<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
ex：
 <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>这是演示文本<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span> 正确，不推荐
ex:
 <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>dfdsfsdfs<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span> 错误
注意：
  1.换行缩进，如果是双标记必须成对出现
3.元素（标记）属性
  作用：修饰元素
  语法：
   1.必须声明在开始标记中
     <span class="hljs-tag">&lt;<span class="hljs-name">标记</span> 属性名&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">标记</span>&gt;</span>
   2.属性名与值之间用"="连接
     <span class="hljs-tag">&lt;<span class="hljs-name">标记</span> 属性名=<span class="hljs-string">值</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">标记</span>&gt;</span>
   3.元素允许有多个属性，每个属性之间用空格隔开
     <span class="hljs-tag">&lt;<span class="hljs-name">标记</span> 属性名<span class="hljs-attr">1</span>=<span class="hljs-string">值1</span> 属性名<span class="hljs-attr">2</span>=<span class="hljs-string">值2</span> <span class="hljs-attr">...</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">标记</span>&gt;</span>
 ex:
 p标记的align属性的值为center,title属性的值为"这是段落"
     <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">align</span>=<span class="hljs-string">center</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"这是段落"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    标准属性(通有属性)：
  id:定义元素的唯一标识（名称）
  title:定义鼠标悬停在元素上时所提示的文本
  style:css中,定义行内样式
  class:css中,引用类选择器

   4.注释
     语法：<span class="hljs-comment">&lt;!--注释内容--&gt;</span>
 注意：
   1.注释本身不能嵌套
   2.不能嵌套在标记中
</code></pre>
<h2 id="articleHeader3">3.HTML文档结构</h2>
<p>1.HTML文档结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.文档类型声明
  作用：告诉浏览器HTML的版本类型
  语法：<!doctype html>
  在网页的最顶端编写
2.HTML页面
  在文档类型声明的下面写上一对根标记
  <html></html>
  在根标记中包含两部分：
     文件头：<head></head>
         定义网页的全局信息
 文件主体：<body></body>
         定义网页中显示的内容
 
2.搭建网页结构
  1.文档类型的声明
  2.HTML页面结构
    在主体内容（body）位置处显示“我的第一个网页”

3.head元素
  head是其它头元素的容器
  1.<meta> 定义基本信息:编码格式，关键词，描述内容等
    <meta charset=&quot;utf-8&quot;>
<meta name=&quot;keywords&quot; content=&quot;关键词&quot;>
<meta name=&quot;description&quot; content=&quot;描述内容&quot;>

  2.<title></title> 定义网页的标题
  3.<style></style> 定义内部样式
  4.<script></script>定义或引用javascript文件
  5.<link>          引入外部样式
4.body元素
  显示网页的主要内容
  1.特殊字符
    &amp;nbsp; 表示空格
&amp;lt;   表示一个<
&amp;gt;   表示一个>
&amp;copy; 版权
    &amp;yen;  ￥
  2.文本标记
    1.文本样式
  <b></b>:加粗
  <i></i>:斜体
  <u></u>:下划线
  <s></s>:删除线
  <sup></sup>:上标
  <sub></sub>:下标

2.标题元素
  语法：在网页中以醒目的方式来显示文字
  语法：
    <hn>内容</hn> n:1-6
    <h1>内容</h1> 一级标题
      ...
    <h6>内容</h6> 六级标题
      特点：
    1.字体大小可变
    2.加粗
    3.上下文之间有垂直空白间距
   属性：align
   作用：标记内容的水平对齐方式
   取值：left/center/right
3.段落元素
  作用：以突出的形式表示一段文本
  语法：<p></p>
  属性：align
  取值：left/center/right
4.换行元素
  语法：<br>或<br/>
5.分隔线元素
  语法:<hr>或<hr/>
  属性：
    1.size 表示水平线的尺寸（高度），取值为px或%的数字
    2.width 宽度，取值为px或%的数字
    3.align 水平对齐方式 left/center/right
    4.color 水平线的颜色，取值为合法颜色值

    6.预格式化
  作用：保留html代码中的回车和空格
  语法：<pre>内容</pre>
7.分区元素
  1.块分区元素
    作用：用于页面中元素的布局
    语法：<div></div>
  2.行分区元素
    作用：处理同一行文本中的不同样式
    语法：<span></span>
8.行内元素和块级元素
  1.块级元素
    在网页页中独占一行的元素就是块级元素
    常见的块级元素：
       1.标题元素 h1-h6
       2.段落元素 p
       3.div
       4.结构标记(header...)
  2.行内元素
    多个元素位于同一行显示，从左往右排列
    常见的行内:
       span,b,i,u,s,sup,sub,a,img
  3.行内块
    显示方式如同行内元素，但具备块级元素的特征
  4.table ...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>1.文档类型声明
  作用：告诉浏览器HTML的版本类型
  语法：<span class="hljs-meta">&lt;!doctype html&gt;</span>
  在网页的最顶端编写
2.HTML页面
  在文档类型声明的下面写上一对根标记
  <span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
  在根标记中包含两部分：
     文件头：<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
         定义网页的全局信息
 文件主体：<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
         定义网页中显示的内容
 
2.搭建网页结构
  1.文档类型的声明
  2.HTML页面结构
    在主体内容（body）位置处显示“我的第一个网页”

3.head元素
  head是其它头元素的容器
  1.<span class="hljs-tag">&lt;<span class="hljs-name">meta</span>&gt;</span> 定义基本信息:编码格式，关键词，描述内容等
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"keywords"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"关键词"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"description"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"描述内容"</span>&gt;</span>

  2.<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span> 定义网页的标题
  3.<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span> 定义内部样式
  4.<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>定义或引用javascript文件
  5.<span class="hljs-tag">&lt;<span class="hljs-name">link</span>&gt;</span>          引入外部样式
4.body元素
  显示网页的主要内容
  1.特殊字符
    &amp;nbsp; 表示空格
&amp;lt;   表示一个<span class="hljs-tag">&lt;
&amp;<span class="hljs-attr">gt</span>;   表示一个&gt;</span>
&amp;copy; 版权
    &amp;yen;  ￥
  2.文本标记
    1.文本样式
  <span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>:加粗
  <span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>:斜体
  <span class="hljs-tag">&lt;<span class="hljs-name">u</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">u</span>&gt;</span>:下划线
  <span class="hljs-tag">&lt;<span class="hljs-name">s</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">s</span>&gt;</span>:删除线
  <span class="hljs-tag">&lt;<span class="hljs-name">sup</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">sup</span>&gt;</span>:上标
  <span class="hljs-tag">&lt;<span class="hljs-name">sub</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">sub</span>&gt;</span>:下标

2.标题元素
  语法：在网页中以醒目的方式来显示文字
  语法：
    <span class="hljs-tag">&lt;<span class="hljs-name">hn</span>&gt;</span>内容<span class="hljs-tag">&lt;/<span class="hljs-name">hn</span>&gt;</span> n:1-6
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>内容<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span> 一级标题
      ...
    <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>内容<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span> 六级标题
      特点：
    1.字体大小可变
    2.加粗
    3.上下文之间有垂直空白间距
   属性：align
   作用：标记内容的水平对齐方式
   取值：left/center/right
3.段落元素
  作用：以突出的形式表示一段文本
  语法：<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  属性：align
  取值：left/center/right
4.换行元素
  语法：<span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>或<span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
5.分隔线元素
  语法:<span class="hljs-tag">&lt;<span class="hljs-name">hr</span>&gt;</span>或<span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>
  属性：
    1.size 表示水平线的尺寸（高度），取值为px或%的数字
    2.width 宽度，取值为px或%的数字
    3.align 水平对齐方式 left/center/right
    4.color 水平线的颜色，取值为合法颜色值

    6.预格式化
  作用：保留html代码中的回车和空格
  语法：<span class="hljs-tag">&lt;<span class="hljs-name">pre</span>&gt;</span>内容<span class="hljs-tag">&lt;/<span class="hljs-name">pre</span>&gt;</span>
7.分区元素
  1.块分区元素
    作用：用于页面中元素的布局
    语法：<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  2.行分区元素
    作用：处理同一行文本中的不同样式
    语法：<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
8.行内元素和块级元素
  1.块级元素
    在网页页中独占一行的元素就是块级元素
    常见的块级元素：
       1.标题元素 h1-h6
       2.段落元素 p
       3.div
       4.结构标记(header...)
  2.行内元素
    多个元素位于同一行显示，从左往右排列
    常见的行内:
       span,b,i,u,s,sup,sub,a,img
  3.行内块
    显示方式如同行内元素，但具备块级元素的特征
  4.table ...
</code></pre>
<h2 id="articleHeader4">4.图像和链接</h2>
<p>1.URL</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.目录结构
  文件目录：文件夹嵌套结构
2.URL
  URL:Uniform Resource Locator统一资源定位器，俗称路径。
  作用：用于表示网络中任意一个资源的位置。
3.路径的表现形式
  1.绝对路径
    绝对路径就是完整路径，一定可以找到你想找的资源。
1.网络资源
      通信协议+服务器主机+文件目录结构+文件名称
  ex:http://www.jd.com/index/logo.png
2.本地资源
  从最高盘符处开始查找
  C:\xampp\htdocs\1801-02\01-HTML\Day02\day.txt
  2.相对路径
     1.什么是相对路径
   从当前文件所在的位置处开始查找资源文件所经过的路径，就是相对路径。
       1.同级目录
     直接引用 
     ex:Koala.jpg
   2.子级目录
     先进入，再引用 
     ex:img/Koala2.jpg
   3.父级目录
     先返回，再引用
     ex:../Koala1.jpg
  3.根相对路径
    从服务器所在的根目录位置处开始查找
表现：/
/codeboy/img/logo.png
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span>.目录结构
  文件目录：文件夹嵌套结构
<span class="hljs-number">2</span><span class="hljs-selector-class">.URL</span>
  URL:Uniform Resource Locator统一资源定位器，俗称路径。
  作用：用于表示网络中任意一个资源的位置。
<span class="hljs-number">3</span>.路径的表现形式
  <span class="hljs-number">1</span>.绝对路径
    绝对路径就是完整路径，一定可以找到你想找的资源。
<span class="hljs-number">1</span>.网络资源
      通信协议+服务器主机+文件目录结构+文件名称
  ex:http:<span class="hljs-comment">//www.jd.com/index/logo.png</span>
<span class="hljs-number">2</span>.本地资源
  从最高盘符处开始查找
  C:\xampp\htdocs\<span class="hljs-number">1801</span>-<span class="hljs-number">02</span>\<span class="hljs-number">01</span>-HTML\Day02\day<span class="hljs-selector-class">.txt</span>
  <span class="hljs-number">2</span>.相对路径
     <span class="hljs-number">1</span>.什么是相对路径
   从当前文件所在的位置处开始查找资源文件所经过的路径，就是相对路径。
       <span class="hljs-number">1</span>.同级目录
     直接引用 
     ex:Koala<span class="hljs-selector-class">.jpg</span>
   <span class="hljs-number">2</span>.子级目录
     先进入，再引用 
     ex:img/Koala2<span class="hljs-selector-class">.jpg</span>
   <span class="hljs-number">3</span>.父级目录
     先返回，再引用
     ex:../Koala1<span class="hljs-selector-class">.jpg</span>
  <span class="hljs-number">3</span>.根相对路径
    从服务器所在的根目录位置处开始查找
表现：/
/codeboy/img/logo<span class="hljs-selector-class">.png</span>
</code></pre>
<h2 id="articleHeader5">5.图像</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.图像格式
  1.jpg 压缩比率较大
  2.png 背景透明
  3.gif 动图
2.图像标记
  标记：<img>或<img/>
  属性：
     1.src 源，要显示的图像的url
 2.width 宽度，取值以px或%为单位的数字
 3.height 高度，取值以px或%为单位的数字
 4.alt 图片出错时显示的提示文本
 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>图像格式
  <span class="hljs-number">1.</span>jpg 压缩比率较大
  <span class="hljs-number">2.</span>png 背景透明
  <span class="hljs-number">3.</span>gif 动图
<span class="hljs-number">2.</span>图像标记
  标记：&lt;img&gt;或&lt;img/&gt;
  属性：
     <span class="hljs-number">1.</span>src 源，要显示的图像的url
 <span class="hljs-number">2.</span>width 宽度，取值以px或%为单位的数字
 <span class="hljs-number">3.</span>height 高度，取值以px或%为单位的数字
 <span class="hljs-number">4.</span>alt 图片出错时显示的提示文本
 
</code></pre>
<h2 id="articleHeader6">6.链接</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.语法
  <a>内容</a>
2.属性
  1.href 链接的url
  2.target 目标，指定打开网页的方式
    取值：
   _blank 在新的标签页中打开
   _self 默认值，在当前页面中打开新的网页

 2.给一张图片设置超级链接，打开Tmooc网站（www.tmooc.cn）
3.其它表现形式
  1.资源下载
    让链接的URL，链接到rar/zip文件即可
    href=&quot;*.zip/*.rar&quot;
  2.电子邮件链接
    href=&quot;mailto:合法的邮箱地址&quot;
  3.返回页面的顶部
    href=&quot;#&quot;
  4.链接到javascript
    href=&quot;javascript:js脚本&quot;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>语法
  &lt;a&gt;内容&lt;/a&gt;
<span class="hljs-number">2.</span>属性
  <span class="hljs-number">1.</span>href 链接的url
  <span class="hljs-number">2.</span>target 目标，指定打开网页的方式
    取值：
   _blank 在新的标签页中打开
   _self 默认值，在当前页面中打开新的网页

 <span class="hljs-number">2.</span>给一张图片设置超级链接，打开Tmooc网站（www.tmooc.cn）
<span class="hljs-number">3.</span>其它表现形式
  <span class="hljs-number">1.</span>资源下载
    让链接的URL，链接到rar/zip文件即可
    href=<span class="hljs-string">"*.zip/*.rar"</span>
  <span class="hljs-number">2.</span>电子邮件链接
    href=<span class="hljs-string">"mailto:合法的邮箱地址"</span>
  <span class="hljs-number">3.</span>返回页面的顶部
    href=<span class="hljs-string">"#"</span>
  <span class="hljs-number">4.</span>链接到javascript
    href=<span class="hljs-string">"javascript:js脚本"</span>

</code></pre>
<h2 id="articleHeader7">7.锚点</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  1.什么是锚点？
    就是网页中的一个记号，可以通过超级连接调整到记号的位置处。
  2.使用锚点
    1.定义锚点
  1.使用a标记的name属性定义锚点
    <a name=&quot;锚点名称&quot;></a>
  2.使用任意标记的id属性定义锚点
    <ANY id=&quot;锚点名称&quot;></ANY>

2.链接到锚点
  <a href=&quot;#锚点名称&quot;></a>
  <a href=&quot;url#锚点名称&quot;></a>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  1.什么是锚点？
    就是网页中的一个记号，可以通过超级连接调整到记号的位置处。
  2.使用锚点
    1.定义锚点
  1.使用a标记的name属性定义锚点
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"锚点名称"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  2.使用任意标记的id属性定义锚点
    <span class="hljs-tag">&lt;<span class="hljs-name">ANY</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"锚点名称"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ANY</span>&gt;</span>

2.链接到锚点
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#锚点名称"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"url#锚点名称"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
</code></pre>
<h2 id="articleHeader8">8.表格</h2>
<p>1.表格的语法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.表格
  <table></table>
2.行
  <tr></tr> --->table row
3.单元格/列
  <td></td> --->table data
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>1.表格
  <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
2.行
  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span> ---&gt;table row
3.单元格/列
  <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span> ---&gt;table data
 </code></pre>
<p>2.表格的属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.table属性
  width:宽度
  height:高度
  border:设置表格边框
  align:设置表格的水平对齐方式 
        取值：left/center/right
  cellpadding:设置单元格的内边距（内容与td之间的间距）
  cellspacing:设置单元格的外边距（td边框外的距离）
  bgcolor:背景颜色

 
2.tr属性
  align 设置当前行的水平对齐方式
        取值：left/center/right
  valign 设置当前行的垂直对齐方式
        取值：top/middle/bottom
  bgcolor 设置当前行的背景颜色
 
3.td属性
  width:宽度
  height:高度
  align:水平对齐
  valign:垂直对齐
  bgcolor:列的背景颜色
  colspan:跨列
  rowspan:跨行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-number">1.</span>table属性
<span class="hljs-symbol">  width:</span>宽度
<span class="hljs-symbol">  height:</span>高度
<span class="hljs-symbol">  border:</span>设置表格边框
<span class="hljs-symbol">  align:</span>设置表格的水平对齐方式 
        取值：left<span class="hljs-meta-keyword">/center/</span>right
<span class="hljs-symbol">  cellpadding:</span>设置单元格的内边距（内容与td之间的间距）
<span class="hljs-symbol">  cellspacing:</span>设置单元格的外边距（td边框外的距离）
<span class="hljs-symbol">  bgcolor:</span>背景颜色

 
<span class="hljs-number">2.</span>tr属性
  align 设置当前行的水平对齐方式
        取值：left<span class="hljs-meta-keyword">/center/</span>right
  valign 设置当前行的垂直对齐方式
        取值：top<span class="hljs-meta-keyword">/middle/</span>bottom
  bgcolor 设置当前行的背景颜色
 
<span class="hljs-number">3.</span>td属性
<span class="hljs-symbol">  width:</span>宽度
<span class="hljs-symbol">  height:</span>高度
<span class="hljs-symbol">  align:</span>水平对齐
<span class="hljs-symbol">  valign:</span>垂直对齐
<span class="hljs-symbol">  bgcolor:</span>列的背景颜色
<span class="hljs-symbol">  colspan:</span>跨列
<span class="hljs-symbol">  rowspan:</span>跨行</code></pre>
<p>3.可选标记</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.表格标题
  标记：<caption></caption>
        如果设置表格标题，则必须位于<table>下的第一个子元素位置处
2.行/列标题
  标记：<th></th>
  所有的td都可以用<th>取代" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>1.表格标题
  标记：<span class="hljs-tag">&lt;<span class="hljs-name">caption</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">caption</span>&gt;</span>
        如果设置表格标题，则必须位于<span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>下的第一个子元素位置处
2.行/列标题
  标记：<span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
  所有的td都可以用<span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>取代</code></pre>
<p>4.表格复杂应用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="可以将连续的几个行，划分到一组中，进行统一管理。
1.行分组
  1.表头行
    <thead></thead>
表格中最上面的一行进行分组的话，可以放在表头行中
  2.表主体行
    <tbody></tbody>
允许将若干行放在tbody中进行统一管理
  3.表尾行
    <tfoot></tfoot>
表格中最后一行进行分组的话，可以放在表尾行中
2.不规则表格
  1.跨行
    rowspan
从指定单元格的位置处开始，纵向向下合并几个单元格（包含自己），被合并的单元格要删除。
  2.跨列
    colspan
从指定单元格的位置处开始，横向向右合并几个单元格（包含自己），被合并的单元格要删除。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>可以将连续的几个行，划分到一组中，进行统一管理。
<span class="hljs-number">1.</span>行分组
  <span class="hljs-number">1.</span>表头行
    &lt;thead&gt;&lt;/thead&gt;
表格中最上面的一行进行分组的话，可以放在表头行中
  <span class="hljs-number">2.</span>表主体行
    &lt;tbody&gt;&lt;/tbody&gt;
允许将若干行放在tbody中进行统一管理
  <span class="hljs-number">3.</span>表尾行
    &lt;tfoot&gt;&lt;/tfoot&gt;
表格中最后一行进行分组的话，可以放在表尾行中
<span class="hljs-number">2.</span>不规则表格
  <span class="hljs-number">1.</span>跨行
    rowspan
从指定单元格的位置处开始，纵向向下合并几个单元格（包含自己），被合并的单元格要删除。
  <span class="hljs-number">2.</span>跨列
    colspan
从指定单元格的位置处开始，横向向右合并几个单元格（包含自己），被合并的单元格要删除。
</code></pre>
<h2 id="articleHeader9">9.列表</h2>
<p>1.列表的作用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="按照从上到下(从左往右)的方式来显示所有的数据，并且可以在数据前增加显示的标识。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code style="word-break: break-word; white-space: initial;">按照从上到下<span class="hljs-comment">(从左往右)</span>的方式来显示所有的数据，并且可以在数据前增加显示的标识。</code></pre>
<p>2.列表的组成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="列表都是由&quot;列表类型&quot;和&quot;列表项&quot;来组成
1.列表类型
  有序列表：<ol></ol> order list
  无序列表：<ul></ul> unorder list
2.列表项
  用于表示列表中的数据(嵌套在列表中)
  <li></li> list item
3.有序列表
  1.type 作用：指定列表的排序类型
         取值：
        1 默认值，以数字排序
    a 小写字母 
    A 大写字母
    i 小写罗马数字
    I 大写罗马数字
  2.start 作用：指定起始编号是从第 几 开始
          取值：数字" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>列表都是由<span class="hljs-string">"列表类型"</span>和<span class="hljs-string">"列表项"</span>来组成
<span class="hljs-number">1.</span>列表类型
  有序列表：&lt;ol&gt;&lt;/ol&gt; order <span class="hljs-type">list</span>
  无序列表：&lt;ul&gt;&lt;/ul&gt; unorder <span class="hljs-type">list</span>
<span class="hljs-number">2.</span>列表项
  用于表示列表中的数据(嵌套在列表中)
  &lt;li&gt;&lt;/li&gt; <span class="hljs-type">list</span> item
<span class="hljs-number">3.</span>有序列表
  <span class="hljs-number">1.</span>type 作用：指定列表的排序类型
         取值：
        <span class="hljs-number">1</span> 默认值，以数字排序
    a 小写字母 
    A 大写字母
    i 小写罗马数字
    I 大写罗马数字
  <span class="hljs-number">2.</span>start 作用：指定起始编号是从第 几 开始
          取值：数字</code></pre>
<p>4.无序列表</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 1.type 作用：指定列表的标识类型
        取值：
        disc:实心圆
    circle:空心圆
    square:实心方块
    none:不显示标识" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code> <span class="hljs-number">1.</span>type 作用：指定列表的标识类型
        取值：
<span class="hljs-symbol">        disc:</span>实心圆
<span class="hljs-symbol">    circle:</span>空心圆
<span class="hljs-symbol">    square:</span>实心方块
<span class="hljs-symbol">    none:</span>不显示标识</code></pre>
<p>5.列表嵌套</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 在一个列表中又出现另一个列表
 被嵌套的列表只能出现在li中
 ex:
   <ol>
     <li>
   这是有序列表内容
   <ul>
     <li>内容</li>
   </ul>
 </li>
   </ol>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code> 在一个列表中又出现另一个列表
 被嵌套的列表只能出现在li中
<span class="hljs-symbol"> ex:</span>
   <span class="hljs-params">&lt;ol&gt;</span>
     <span class="hljs-params">&lt;li&gt;</span>
   这是有序列表内容
   <span class="hljs-params">&lt;ul&gt;</span>
     <span class="hljs-params">&lt;li&gt;</span>内容<span class="hljs-params">&lt;/li&gt;</span>
   <span class="hljs-params">&lt;/ul&gt;</span>
 <span class="hljs-params">&lt;/li&gt;</span>
   <span class="hljs-params">&lt;/ol&gt;</span>
</code></pre>
<h2 id="articleHeader10">10.定义列表</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.什么是定义列表
  定义列表常用于给出一类事物或对名词的解释说明等。
2.语法
  1.<dl></dl> 表示一个定义列表
  2.<dt></dt> 表示定义列表中要解释说明的名词
  3.<dd></dd> 表示定义列表中对名词解释的内容
  ex:
    <dl>
   <dt>名词</dt>
   <dd>解释具体内容</dd>
</dl>
  使用场合：图文混排时使用
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-number">1.</span>什么是定义列表
  定义列表常用于给出一类事物或对名词的解释说明等。
<span class="hljs-number">2.</span>语法
  <span class="hljs-number">1.</span><span class="hljs-params">&lt;dl&gt;</span><span class="hljs-params">&lt;/dl&gt;</span> 表示一个定义列表
  <span class="hljs-number">2.</span><span class="hljs-params">&lt;dt&gt;</span><span class="hljs-params">&lt;/dt&gt;</span> 表示定义列表中要解释说明的名词
  <span class="hljs-number">3.</span><span class="hljs-params">&lt;dd&gt;</span><span class="hljs-params">&lt;/dd&gt;</span> 表示定义列表中对名词解释的内容
<span class="hljs-symbol">  ex:</span>
    <span class="hljs-params">&lt;dl&gt;</span>
   <span class="hljs-params">&lt;dt&gt;</span>名词<span class="hljs-params">&lt;/dt&gt;</span>
   <span class="hljs-params">&lt;dd&gt;</span>解释具体内容<span class="hljs-params">&lt;/dd&gt;</span>
<span class="hljs-params">&lt;/dl&gt;</span>
  使用场合：图文混排时使用
</code></pre>
<h2 id="articleHeader11">11.结构标记</h2>
<p>1.结构的作用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="用于描述整个网页的结构（取代div做布局）
提升标记的语义性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>用于描述整个网页的结构（取代<span class="hljs-keyword">div</span>做布局）
提升标记的语义性</code></pre>
<p>2.常用的结构标记</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.<header></header>
  作用：定义网页或某区域的头部
2.<nav></nav> 
  作用：定义网页的导航链接
3.<section></section>
  作用：主体内容
4.<aside></aside>
  作用：定义页面中的侧边栏信息，靠近边缘。
5.<footer></footer>
  作用：定义网页偏底部信息，比如：网站的备案号，解释说明，版权。
6.<article></article>
  作用：定义与文字描述相关的内容，比如：论坛帖子，微博条目，用户评论等
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>1.<span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
  作用：定义网页或某区域的头部
2.<span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span> 
  作用：定义网页的导航链接
3.<span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
  作用：主体内容
4.<span class="hljs-tag">&lt;<span class="hljs-name">aside</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
  作用：定义页面中的侧边栏信息，靠近边缘。
5.<span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
  作用：定义网页偏底部信息，比如：网站的备案号，解释说明，版权。
6.<span class="hljs-tag">&lt;<span class="hljs-name">article</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
  作用：定义与文字描述相关的内容，比如：论坛帖子，微博条目，用户评论等
</code></pre>
<h2 id="articleHeader12">12.表单（重点&amp;难点）</h2>
<p>1.表单的作用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.提供可以与用户交互的可视化界面
2.收集用户信息并提交给服务器" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>提供可以与用户交互的可视化界面
<span class="hljs-number">2.</span>收集用户信息并提交给服务器</code></pre>
<p>2.表单的组成部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.前端部分 
  表单控件，与用户交互的可视化控件
2.服务器端部分
  对提交的数据的处理,***.php" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>前端部分 
  表单控件，与用户交互的可视化控件
<span class="hljs-number">2.</span>服务器端部分
  对提交的数据的处理,***.php</code></pre>
<p>3.表单标记</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form></form>
属性：
  1.action 
    作用：定义表单提交时发生的动作，通常定义的是服务器上处理程序的url地址，
ex:action=&quot;login.php&quot;
  2.method
    作用：指定表单数据的提交方式
取值：
    1.get(默认值)
      1.明文提交，待提交的数据会显示在地址栏中
      2.安全性较低
      3.提交数据有大小限制，限制为2KB
      4.向服务器要数据时，使用get方式
    2.post
      1.隐式提交，提交的数据不会显示
      2.安全性较高
      3.提交数据大小无限制
      4.要传递数据给服务器时，使用post方式
    3.delete
    4.put
  3.enctype  
    作用：指定表单数据的编码方式，允许将什么样的数据提交给服务器
1.application/x-www-form-urlencoded
  默认值，允许将任意字符提交给服务器（文件无法提交）
2.multipart/form-data
  允许将文件提交给服务器
3.text/plain
  只能将普通字符提交给服务器" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;form&gt;&lt;/form&gt;
属性：
  <span class="hljs-number">1</span><span class="hljs-selector-class">.action</span> 
    作用：定义表单提交时发生的动作，通常定义的是服务器上处理程序的url地址，
ex:action=<span class="hljs-string">"login.php"</span>
  <span class="hljs-number">2</span><span class="hljs-selector-class">.method</span>
    作用：指定表单数据的提交方式
取值：
    <span class="hljs-number">1</span>.get(默认值)
      <span class="hljs-number">1</span>.明文提交，待提交的数据会显示在地址栏中
      <span class="hljs-number">2</span>.安全性较低
      <span class="hljs-number">3</span>.提交数据有大小限制，限制为<span class="hljs-number">2</span>KB
      <span class="hljs-number">4</span>.向服务器要数据时，使用get方式
    <span class="hljs-number">2</span><span class="hljs-selector-class">.post</span>
      <span class="hljs-number">1</span>.隐式提交，提交的数据不会显示
      <span class="hljs-number">2</span>.安全性较高
      <span class="hljs-number">3</span>.提交数据大小无限制
      <span class="hljs-number">4</span>.要传递数据给服务器时，使用post方式
    <span class="hljs-number">3</span><span class="hljs-selector-class">.delete</span>
    <span class="hljs-number">4</span><span class="hljs-selector-class">.put</span>
  <span class="hljs-number">3</span><span class="hljs-selector-class">.enctype</span>  
    作用：指定表单数据的编码方式，允许将什么样的数据提交给服务器
<span class="hljs-number">1</span>.application/x-www-form-urlencoded
  默认值，允许将任意字符提交给服务器（文件无法提交）
<span class="hljs-number">2</span>.multipart/form-data
  允许将文件提交给服务器
<span class="hljs-number">3</span>.text/plain
  只能将普通字符提交给服务器</code></pre>
<p>4.表单控件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="能够与用户进行交互的可视化元素
1.分类：
  1.input元素
  2.textarea多行文本域元素
  3.select和option 选项框元素
  4.其它元素
2.input元素
  1.作用：在页面中提供各种各样的输入控件，如：文本框，密码框，单选按钮，复选框等。
  2.语法
    标记：<input>或<input/>
属性：
   1.type 指定创建输入控件的类型
   2.name 为控件定义名称，提交给服务器端使用（必须）
   3.value 控件的值，提交给服务器端使用
       4.disabled 禁用控件，不能操作并不能提交给服务器使用
     该属性无值，只要出现在标记中，就是禁用。
  3.input元素详解
    1.文本框和密码框
  文本框：<input type=&quot;text&quot;>
  密码框：<input type=&quot;password&quot;>
  属性：
    1.maxlength 指定限制输入的字符数
    2.readonly 只读，只能看，不能改，但允许提交。
    3.placeholder 占位符，即默认显示在控件上的文本。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>能够与用户进行交互的可视化元素
<span class="hljs-number">1</span>.分类：
  <span class="hljs-number">1</span>.input元素
  <span class="hljs-number">2</span>.textarea多行文本域元素
  <span class="hljs-number">3</span>.select和option 选项框元素
  <span class="hljs-number">4</span>.其它元素
<span class="hljs-number">2</span>.input元素
  <span class="hljs-number">1</span>.作用：在页面中提供各种各样的输入控件，如：文本框，密码框，单选按钮，复选框等。
  <span class="hljs-number">2</span>.语法
    标记：&lt;input&gt;或&lt;input/&gt;
属性：
   <span class="hljs-number">1</span><span class="hljs-selector-class">.type</span> 指定创建输入控件的类型
   <span class="hljs-number">2</span><span class="hljs-selector-class">.name</span> 为控件定义名称，提交给服务器端使用（必须）
   <span class="hljs-number">3</span><span class="hljs-selector-class">.value</span> 控件的值，提交给服务器端使用
       <span class="hljs-number">4</span><span class="hljs-selector-class">.disabled</span> 禁用控件，不能操作并不能提交给服务器使用
     该属性无值，只要出现在标记中，就是禁用。
  <span class="hljs-number">3</span>.input元素详解
    <span class="hljs-number">1</span>.文本框和密码框
  文本框：&lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"text"</span>&gt;
  密码框：&lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"password"</span>&gt;
  属性：
    <span class="hljs-number">1</span><span class="hljs-selector-class">.maxlength</span> 指定限制输入的字符数
    <span class="hljs-number">2</span><span class="hljs-selector-class">.readonly</span> 只读，只能看，不能改，但允许提交。
    <span class="hljs-number">3</span><span class="hljs-selector-class">.placeholder</span> 占位符，即默认显示在控件上的文本。
</code></pre>
<h2 id="articleHeader13">13.按钮</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  1.提交按钮
    type=&quot;submit&quot;
    作用：将表单的数据提交给服务器上指定的程序
  2.重置按钮
    type=&quot;reset&quot;
    作用：将表单的内容恢复到初始化的状态
  3.普通按钮
    type=&quot;button&quot;
    没有功能
  属性：
    value:显示在按钮上的文本
    3.单选按钮和复选框
  单选按钮：type=&quot;radio&quot;
  复选框：type=&quot;checkbox&quot;
  属性：
    name 除定义控件名称之外，还能起到分组的作用
    checked 设置默认选中项，无值属性
    4.隐藏域和文件选择框
  1.隐藏域
    type=&quot;hidden&quot;
    想要提交给服务器，但不想展示给用户的数据可以放在隐藏域中。
  2.文件选择框
    type=&quot;file&quot;
        注意：
      1.method的值必须为post
      2.enctype的值必须为multipart/form-data
3.textarea元素
  1.作用
    允许录入多行文本
  2.语法
    标记：<textarea></textarea>
属性：
   1.name 定义控件名称，提供给服务器使用
   2.readonly 只读
   3.cols 指定文本域的列数，即一行能显示多少个英文字符（中文减半）
   4.rows 指定文本域的行数，即默认显示多少行的数据，超出rows的话会出现滚动条。

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>  <span class="hljs-number">1.</span>提交按钮
    <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"submit"</span>
    作用：将表单的数据提交给服务器上指定的程序
  <span class="hljs-number">2.</span>重置按钮
    <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"reset"</span>
    作用：将表单的内容恢复到初始化的状态
  <span class="hljs-number">3.</span>普通按钮
    <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"button"</span>
    没有功能
  属性：
    value:显示在按钮上的文本
    <span class="hljs-number">3.</span>单选按钮和复选框
  单选按钮：<span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"radio"</span>
  复选框：<span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"checkbox"</span>
  属性：
    name 除定义控件名称之外，还能起到分组的作用
    checked 设置默认选中项，无值属性
    <span class="hljs-number">4.</span>隐藏域和文件选择框
  <span class="hljs-number">1.</span>隐藏域
    <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"hidden"</span>
    想要提交给服务器，但不想展示给用户的数据可以放在隐藏域中。
  <span class="hljs-number">2.</span>文件选择框
    <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"file"</span>
        注意：
      <span class="hljs-number">1.</span>method的值必须为post
      <span class="hljs-number">2.</span>enctype的值必须为multipart/form-data
<span class="hljs-number">3.</span>textarea元素
  <span class="hljs-number">1.</span>作用
    允许录入多行文本
  <span class="hljs-number">2.</span>语法
    标记：&lt;textarea&gt;&lt;/textarea&gt;
属性：
   <span class="hljs-number">1.</span>name 定义控件名称，提供给服务器使用
   <span class="hljs-number">2.</span>readonly 只读
   <span class="hljs-number">3.</span>cols 指定文本域的列数，即一行能显示多少个英文字符（中文减半）
   <span class="hljs-number">4.</span>rows 指定文本域的行数，即默认显示多少行的数据，超出rows的话会出现滚动条。

</code></pre>
<h2 id="articleHeader14">14.选项框</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  1.语法
    1.<select></select> 
作用：在页面中表示一个选项框
    2.<option></option>
作用：显示选项框中的内容项
  2.属性
    1.select属性
  1.name 定义选项框的名称
  2.size 定义显示选项的数量，默认值为1
  3.multiple 设置多选，无值的属性
    注意：只有滚动列表支持多选
2.option属性
  1.value 定义选项的值
  2.selected 设置默认选中项，无值属性
5.其它元素
  1.label元素
    作用：关联文本域表单控件
语法：<label></label>
属性：for 要与表单控件关联的id值
  2.为控件分组
    <fieldset></fieldset>为控件定义分组
<legend></legend>为分组指定标题
  3.浮动框架
    作用：允许在一个网页中，再引入另外一个网页。
语法：<iframe></iframe>
属性：
    1.src 要引入页面的url路径
    2.width 宽度
    3.height 高度
    4.frameborder 浮动框架的边框，默认值1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>  <span class="hljs-number">1.</span>语法
    <span class="hljs-number">1.</span>&lt;select&gt;&lt;/select&gt; 
作用：在页面中表示一个选项框
    <span class="hljs-number">2.</span>&lt;option&gt;&lt;/option&gt;
作用：显示选项框中的内容项
  <span class="hljs-number">2.</span>属性
    <span class="hljs-number">1.</span>select属性
  <span class="hljs-number">1.</span>name 定义选项框的名称
  <span class="hljs-number">2.</span>size 定义显示选项的数量，默认值为<span class="hljs-number">1</span>
  <span class="hljs-number">3.</span>multiple 设置多选，无值的属性
    注意：只有滚动列表支持多选
<span class="hljs-number">2.</span>option属性
  <span class="hljs-number">1.</span>value 定义选项的值
  <span class="hljs-number">2.</span>selected 设置默认选中项，无值属性
<span class="hljs-number">5.</span>其它元素
  <span class="hljs-number">1.</span>label元素
    作用：关联文本域表单控件
语法：&lt;label&gt;&lt;/label&gt;
属性：for 要与表单控件关联的id值
  <span class="hljs-number">2.</span>为控件分组
    &lt;fieldset&gt;&lt;/fieldset&gt;为控件定义分组
&lt;legend&gt;&lt;/legend&gt;为分组指定标题
  <span class="hljs-number">3.</span>浮动框架
    作用：允许在一个网页中，再引入另外一个网页。
语法：&lt;iframe&gt;&lt;/iframe&gt;
属性：
    <span class="hljs-number">1.</span>src 要引入页面的url路径
    <span class="hljs-number">2.</span>width 宽度
    <span class="hljs-number">3.</span>height 高度
    <span class="hljs-number">4.</span>frameborder 浮动框架的边框，默认值<span class="hljs-number">1</span>
</code></pre>
<h2 id="articleHeader15">15.单位转换</h2>
<p>1px=0.025rem;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端知识点总结——HTML

## 原文链接
[https://segmentfault.com/a/1190000013373478](https://segmentfault.com/a/1190000013373478)

