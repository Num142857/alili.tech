---
title: 'web前端编码规范整合' 
date: 2018-12-29 2:30:10
hidden: true
slug: 9bey0zm4ec
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>决定综合网上的规范整出一套自己的开发规范出来，以后代码的风格均按照要求来编排，方便管理维护</p></blockquote>
<h2>一、 命名规范</h2>
<ol>
<li>项目命名：全部采用小写方式， 以下划线分隔，例：my_project_name</li>
<li>目录命名：参照项目命名规则；有复数结构时，要采用复数命名法。例：scripts, styles</li>
<li>JS文件命名：参照项目命名规则。例：account_model.js</li>
<li>CSS, SCSS文件命名：参照项目命名规则。例：retina_sprites.scss</li>
<li>HTML文件命名：参照项目命名规则。例：error_report.html</li>
<li>
<p>CSS命名：<br>   通用类：使用小写字母，以中划线分隔。例：element-content</p>
<p>业务类：BEM思想，block__element--modifier。例如：person__hand--left</p>
<p>另外：SCSS中的变量、函数、混合、placeholder采用驼峰式命名</p>
</li>
<li>ID命名：采用驼峰式命名。例：colorBlack</li>
</ol>
<h2>二、 HTML规范</h2>
<h3>2.1 html头部声明统一</h3>
<p>1、 DTD声明</p>
<pre><code class="html">&lt;!DOCTYPE html&gt;</code></pre>
<p>2、页面编码统一</p>
<pre><code class="html">&lt;meta charset="UTF-8"/&gt; </code></pre>
<p>3、meta声明</p>
<p>PC端注明: IE兼容/keywords/description</p>
<pre><code class="html">  &lt;meta http-equiv="X-UA-Compatible" content="IE=Edge"&gt;
  &lt;meta name="title" content="优酷-中国领先视频网站,提供视频播放,视频发布,视频搜索 - 优酷视频"&gt;
  &lt;meta name="keywords" content="视频,视频分享,视频搜索,视频播放,优酷视频"&gt;
  &lt;meta name="description" content="视频服务平台,提供视频播放,视频发布,视频搜索,视频分享"&gt;</code></pre>
<p>移动端注明：</p>
<pre><code class="html">&lt;meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"&gt;
&lt;meta name="apple-mobile-web-app-capable" content="yes"&gt;
&lt;meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"&gt;
&lt;meta name="format-detection" content="telephone=no, address=no"&gt;</code></pre>
<p>4、引入CSS, JS</p>
<p>根据HTML5规范, 通常在引入CSS和JS时不需要指明 type，因为 text/css 和 text/javascript 分别是他们的默认值</p>
<p>HTML5 规范链接：使用link，使用style，使用script</p>
<pre><code class="html">&lt;!-- External CSS --&gt;
&lt;link rel="stylesheet" href="code_guide.css"&gt;

&lt;!-- In-document CSS --&gt;
&lt;style&gt;
    ...
&lt;/style&gt;

&lt;!-- External JS --&gt;
&lt;script src="code_guide.js"&gt;&lt;/script&gt;

&lt;!-- In-document JS --&gt;
&lt;script&gt;
    ...
&lt;/script&gt;</code></pre>
<h3>2.2 风格与易读性</h3>
<p>1、格式缩进</p>
<p>html编码统一格式化显示，使用一个Tab键进行分层缩进 (2个空格宽度)，使整个页面结构层次清晰，方便阅读和修改。</p>
<p>2、模块注释</p>
<p>html较大独立模块之间注释格式统一使用：</p>
<pre><code class="html">&lt;!-- start: XXX模块 --&gt;

&lt;!-- end: XXX模块 --&gt;</code></pre>
<p>或者：</p>
<pre><code class="html">&lt;!-- XXX模块 --&gt;

&lt;!-- /XXX模块 --&gt;</code></pre>
<h3>2.3 标签与属性</h3>
<p>1、由于html标签和属性不区别大小写，所有建议都采用小写，尤其是自定义标签和属性名，否定js中取不到，如：</p>
<pre><code class="javascript">&lt;div data-bgColor="red"&gt;&lt;/div&gt;

$('div').data('bgColor');  // 取不到，已自动被浏览器转成了data-bgcolor</code></pre>
<p>2、所有html属性必须添加双引号（非单引号）。</p>
<pre><code class="javascript">// 禁止
&lt;div id=mainframe&gt; 或 &lt;div id='mainframe'&gt;

// 推荐
&lt;div id="mainframe"&gt;</code></pre>
<p>3、标签属性顺序</p>
<p>属性应该按照特定的顺序出现以保证易读性；</p>
<ul>
<li>class</li>
<li>id</li>
<li>name</li>
<li>data-*</li>
<li>src, for, type, href, value , max-length, max, min, pattern</li>
<li>placeholder, title, alt</li>
<li>aria-*, role</li>
<li>required, readonly, disabled</li>
</ul>
<p>class是为高可复用组件设计的，所以应处在第一位；</p>
<p>id更加具体且应该尽量少使用，所以将它放在第二位</p>
<p>4、boolean属性</p>
<p>boolean属性指不需要声明取值的属性，XHTML需要每个属性声明取值，但是HTML5并不需要；</p>
<p>boolean属性的存在表示取值为true，不存在则表示取值为false。</p>
<pre><code class="html">&lt;input type="text" disabled&gt;

&lt;input type="checkbox" value="1" checked&gt;

&lt;select&gt;
    &lt;option value="1" selected&gt;1&lt;/option&gt;
&lt;/select&gt;</code></pre>
<h3>2.4 杂项</h3>
<p>1、所有标签必须采用合理嵌套。</p>
<pre><code class="javascript">// 禁止
&lt;p&gt;&lt;b&gt;&lt;/p&gt;&lt;/b&gt;

// 推荐
&lt;p&gt;&lt;b&gt;&lt;/b&gt;&lt;/p&gt;

// 禁止inline级标签嵌套block级标签
&lt;span&gt;&lt;div&gt;&lt;/div&gt;&lt;/span&gt;</code></pre>
<p>2、img标签中必须添加alt属性。如：<code>&lt;img src="…" alt="logo" /&gt;</code></p>
<p>3、减少标签数量</p>
<p>在编写HTML代码时，需要尽量避免多余的父节点；</p>
<p>很多时候，需要通过迭代和重构来使HTML变得更少。</p>
<pre><code class="html">&lt;!-- Not well --&gt;
&lt;span class="avatar"&gt;
    &lt;img src="..."&gt;
&lt;/span&gt;

&lt;!-- Better --&gt;
&lt;img class="avatar" src="..."&gt;</code></pre>
<h2>三、 CSS代码规范</h2>
<h3>3.1 CSS引用规范</h3>
<p>1、所有CSS均为外部调用，不得在页面书写任何内部样式或行内样式；</p>
<p>2、html页面引入样式文件：</p>
<p>统一使用link标签，少用@import（原生import有加载性能问题），sass、less、vue.js等文件使用import命令除外（因为最终前端构建工具会将引入文件编译成一个css文件）。</p>
<pre><code class="javascript">&lt;link rel="stylesheet" href="xxx.css"&gt;
&lt;!-- type="text/css"可以省略，清爽 --&gt;</code></pre>
<h3>3.2 CSS注释规范</h3>
<p>1、css头部文档注释( 统一加上@charset声明 )，如下：</p>
<pre><code class="css">@charset "utf-8";

/**
 * @created : 2017/09/15 
 * @author : Mr.Wang 
 * @version : v1.0 
 * @desc : XX模块 
 **/</code></pre>
<p>关于"version"，如果对代码有修改更新version版本号，并添加相关注释。</p>
<p>2、内部模块之间注释（建议 @模块英文名，好查找）：</p>
<pre><code class="javascript">/* @info 商品信息区 -----------------------------------------------------------*/
.infoArea{}

/* 单行注释 */
.specArea{}

/* @price 商品价格区 ----------------------------------------------------------*/
.price{}</code></pre>
<h3>3.3 CSS字符规范</h3>
<p>1、缩进：使用soft tab（2个空格）；<br>2、分号：每个属性声明末尾都要加分号；<br>3、空行:</p>
<p>以下几种情况需要空行</p>
<pre><code class="css">/**
 * 文件最后保留一个空行
 * '}'后最好跟一个空行，包括scss中嵌套的规则
 * 属性之间需要适当的空行，具体见属性声明顺序
 **/

.element {
    ...
}

.dialog {
    color: red;

    &amp;:after {
        ...
    }
}</code></pre>
<p>4、空格</p>
<table>
<thead><tr>
<th>以下几种情况不需要空格</th>
<th>以下几种情况需要空格</th>
</tr></thead>
<tbody>
<tr>
<td>属性名后</td>
<td>属性值前</td>
</tr>
<tr>
<td>多个规则的分隔符','前</td>
<td>选择器'&gt;', '+', '~'前后</td>
</tr>
<tr>
<td>!important '!'后</td>
<td>'{'前</td>
</tr>
<tr>
<td>属性值中'('后和')'前</td>
<td>!important '!'前</td>
</tr>
<tr>
<td>行末不要有多余的空格</td>
<td>属性值中的','后</td>
</tr>
<tr><td colspan="2">注释'/*'后和'*/'前</td></tr>
</tbody>
</table>
<pre><code class="css">/* 示例代码 */
.element,
.dialog {
  color: red !important;
  background-color: rgba(0, 0, 0, .5);
}</code></pre>
<p>5、引号</p>
<p>最外层统一使用双引号；</p>
<p>url的内容要用引号；</p>
<p>属性选择器中的属性值需要引号。</p>
<pre><code class="css">.element:after {
    content: "";
    background-image: url("logo.png");
}

li[data-type="single"] {
    ...
}</code></pre>
<h3>3.4 样式中属性</h3>
<p>1、排序规则：先外部 &gt; 再自身 &gt; 后内部</p>
<p>推荐工具<code>CSScomb</code>，sublime 和 vscode 均有对应插件</p>
<pre><code> A. 影响文档流的属性（display, position, float, clear, visibility, table-layout等）

 B. 自身盒模型的属性（width, height, margin, padding, border等）

 C. 排版相关属性（font, line-height, text-align, text-indent, vertical-align等）

 D. 装饰性属性（color, background, opacity, cursor等）

 E. 生成内容的属性（content, list-style, quotes等）</code></pre>
<p>2、属性简写</p>
<p>属性简写需要你非常清楚属性值的正确顺序，而且在大多数情况下并不需要设置属性简写中包含的所有值，所以建议尽量分开声明会更加清晰；</p>
<p>margin 和 padding 相反，需要使用简写；</p>
<p>常见的属性简写包括：font background transition animation</p>
<pre><code class="css">/* not good */
.element {
    transition: opacity 1s linear 2s;
}

/* good */
.element {
    transition-delay: 2s;
    transition-timing-function: linear;
    transition-duration: 1s;
    transition-property: opacity;
}</code></pre>
<h3>3.5 杂项</h3>
<p>1、不允许有空的规则；</p>
<p>2、元素选择器用小写字母；</p>
<p>3、去掉小数点前面的0；</p>
<p>4、去掉数字中不必要的小数点和末尾的0；</p>
<p>5、属性值'0'后面不要加单位；</p>
<p>6、同个属性不同前缀的写法需要在垂直方向保持对齐，具体参照右边的写法；</p>
<p>7、无前缀的标准属性应该写在有前缀的属性后面；</p>
<p>8、不要在同个规则里出现重复的属性，如果重复的属性是连续的则没关系；</p>
<p>9、不要在一个文件里出现两个相同的规则；</p>
<p>10、用 border: 0; 代替 border: none;；</p>
<p>11、选择器不要超过4层（在scss中如果超过4层应该考虑用嵌套的方式来写）；</p>
<p>12、发布的代码中不要有 @import；</p>
<p>13、尽量少用'*'选择器。</p>
<h2>三、 JavaScript规范（jslint/eslint）</h2>
<h3>3.1 JS文件引用</h3>
<p>1、引入格式： </p>
<p>脚本语言发展至今，也只有js混的最好了，所以type="text/javascript"类型指定可以省去。</p>
<pre><code class="javascript">&lt;script src="model.js"&gt; &lt;/script&gt;</code></pre>
<p>2、引入位置： body标签内最后部（非body外面）, 减少因载入脚本而造成其他页面内容阻塞的问题（js单线程）。</p>
<pre><code class="html">&lt;html&gt;
  &lt;body&gt;
    &lt;div&gt;页面内容….&lt;/div&gt;
    &lt;script src="model.js"&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
<p>3、引入方式：html页面中禁止直接编写js代码，统一使用&lt;script&gt;外部引用方式，以便打包压缩和缓存。</p>
<h3>3.2 空格</h3>
<p>以下几种情况需要空格：</p>
<ul>
<li>二元运算符前后</li>
<li>三元运算符'?:'前后</li>
<li>代码块'{'前</li>
<li>下列关键字前：else, while, catch, finally</li>
<li>下列关键字后：if, else, for, while, do, switch, case, try, catch, finally, with, return, typeof</li>
<li>单行注释'//'后（若单行注释和代码同行，则'//'前也需要），多行注释'*'后<br>对象的属性值前</li>
<li>for循环，分号后留有一个空格，前置条件如果有多个，逗号后留一个空格</li>
<li>无论是函数声明还是函数表达式，'{'前一定要有空格</li>
<li>函数的参数之间</li>
</ul>
<pre><code class="javascript">// not good
var a = {
  b :1
};

// good
var a = {
  b: 1
};

// not good
++ x;
y ++;
z = x?1:2;

// good
++x;
y++;
z = x ? 1 : 2;

// not good
var a = [ 1, 2 ];

// good
var a = [1, 2];

// not good
var a = ( 1+2 )*3;

// good
var a = (1 + 2) * 3;

// no space before '(', one space before '{', one space between function parameters
var doSomething = function(a, b, c) {
  // do something
};

// no space before '('
doSomething(item);

// not good
for(i=0;i&lt;6;i++){
  x++;
}

// good
for (i = 0; i &lt; 6; i++) {
  x++;
}</code></pre>
<h3>3.3 JS注释规则</h3>
<p>1、 文件头部注释 <a href="http://yuri4ever.github.io/jsdoc/" rel="nofollow noreferrer">猛戳查看详情</a></p>
<pre><code class="javascript">/**
  * @created : 2017/09/15 
  * @author : Mr.Wang 
  * @version : v1.0 
  * @desc : 当前js模块功能描述
  * @e.g. : 方法用例，如：$('.title').tip(); 
  **/</code></pre>
<h4>3.3.2 方法注释及单行注释</h4>
<p>1、对于一个较复杂的方法和函数，可用采用多行注释，以便作详情的描述。</p>
<pre><code class="javascript">/** 
  * 此方法是用于解析tpl模块
  * 通过分析html中结构… 
  **/</code></pre>
<p>2、单行注释</p>
<p>双斜线后，必须跟一个空格；<br>缩进与下一行代码保持一致；<br>可位于一个代码行的末尾，与代码间隔一个空格。</p>
<pre><code class="javascript">var funName = function(arg1, arg2) {
  this.arg1 = arg1;

  // 单行注释说明(上面添加一空行, //与说明之间空一格)
  this.arg2 = arg2;
};</code></pre>
<h3>3.4 命名规则</h3>
<p>变量名应由 26 个大小写字母（A..Z，a..z），10 个数字（0..9），和“_”（下划线）组成。</p>
<p>1、通常, 使用”驼峰式”写法，对象、函数和实例时尤其如此。</p>
<pre><code class="javascript">// 不推荐
var is_my_object = {};
var is-my-object = {};

// 推荐
var isMyObject = {};</code></pre>
<p>2、构造函数或类时使用驼峰式大写</p>
<pre><code class="javascript">// 不推荐
var bad = new user({
  name: 'nope'
});

// 推荐
var good = new User({
  name: 'nope'
});</code></pre>
<p>3、常量大写，并用下划线分隔，形式如：NAMES_LIKE_THIS</p>
<p>4、几种特殊命名情况</p>
<pre><code class="javascript">// 'ID'在变量名中全大写
var goodID;

// 'URL'在变量名中全大写
var reportURL;

// 'Android'在变量名中大写第一个字母
var AndroidVersion;

// 'iOS'在变量名中小写第一个，大写后两个字母
var iOSVersion;</code></pre>
<p>5、jquery对象必须以'$'开头命名</p>
<pre><code class="javascript">// not good
var body = $('body');

// good
var $body = $('body');</code></pre>
<h3>3.5 变量声明</h3>
<p>一个函数作用域中所有的变量声明尽量提到函数首部，用一个var声明，不允许出现两个连续的var声明</p>
<pre><code class="javscript">function doSomethingWithItems(items) {
  // use one var
  var value = 10,
      result = value + 10,
      i,
      len;

  for (i = 0, len = items.length; i &lt; len; i++) {
    result += 10;
  }
}</code></pre>
<h3>3.6 null</h3>
<p>（1）适用场景：</p>
<ul>
<li>初始化一个将来可能被赋值为对象的变量</li>
<li>与已经初始化的变量做比较</li>
<li>作为一个参数为对象的函数的调用传参</li>
<li>作为一个返回对象的函数的返回值</li>
</ul>
<p>（2）不适用场景：</p>
<ul>
<li>不要用null来判断函数调用时有无传参</li>
<li>不要与未初始化的变量做比较</li>
</ul>
<pre><code class="javascript">// not good
function test(a, b) {
  if (b === null) {
    // not mean b is not supply
    ...
  }
}

var a;

if (a === null) {
  ...
}

// good
var a = null;

if (a === null) {
  ...
}</code></pre>
<h3>3.7 undefined</h3>
<p>永远不要直接使用undefined进行变量判断；</p>
<p>使用typeof和字符串'undefined'对变量进行判断。</p>
<pre><code class="javascript">// not good
if (person === undefined) {
  ...
}

// good
if (typeof person === 'undefined') {
  ...
}</code></pre>
<h3>3.8 编码模式</h3>
<p>为了规范代码严谨风格，推荐严格模式(Strict Mode)，即总是在模块顶部声明 'use strict';</p>
<pre><code class="javascript">(function(){
  'use strict';
  
  function innerFun(){
    var j = 0;
    //……
  }
});</code></pre>
<p>严格模式的一大目标是显性的抛出错误，让你能更方便更快的调试一些隐性的错误。</p>
<p><strong>1、防止意外的创建了全局变量。</strong></p>
<p>非严格模式下，为一个未申明的局部变量赋值时会自动创建一个同名的全局变量，这是Js程序中最容易出现的错误之一，在严格模式下这么做会显性的抛出异常。</p>
<pre><code class="javascript">// 严格模式下会抛出异常
(function() {
  some = 'foo';
}());</code></pre>
<p><strong>2、防止函数中的this指针意外指向全局。</strong></p>
<p>非严格模式下，函数中未被定义或为空( null or undefined)的this会默认指向全局环境(global)。</p>
<pre><code class="javascript">window.color = 'red';

function getColor() {
  console.log(this.color);
}

// 在严格模式中会报错, 非严格模式中则提示red
getColor();</code></pre>
<p><strong>3、防止重名。</strong></p>
<p>当编写大量代码时，对象属性和函数参数很容易一不小心被设置成一个重复的名字。严格模式在这种情况下会显性的抛出错误</p>
<pre><code class="javascript">// 重复的变量名，在严格模式下会报错。
function doSomething(value1, value2, value1) {
  //code
}

// 重复的对象属性名，在严格模式下会报错。
var object = {
  foo: 'bar',
  foo: 'baz'
};</code></pre>
<p><strong>4、对只读属性修改/删除时会抛出异常。</strong></p>
<p>ES5中可为对象特定属性设为只读或让整个对象不可修改。 但在非严格模式中尝试修改一个只读属性只会默不做声的失败。</p>
<pre><code class="javascript">var person = {};

Object.defineProperty(person, 'name' {
  writable: false,
  value: 'Nicholas'
});

// 在非严格模式时，沉默的失败，在严格模式则抛出异常
person.name = 'John';</code></pre>
<p><strong>5、不要在全局环境下启用严格模式。</strong></p>
<p>为了兼容第三方代码可能没有为严格模式做好准备而引发的问题，最好把开启严格模式的指令作用于自己独立的模块/函数里。</p>
<h3>3.9 杂项</h3>
<p>1、用'===', '!=='代替'==', '!='；</p>
<p>2、for-in里一定要有hasOwnProperty的判断；</p>
<p>3、不要在内置对象的原型上添加方法，如Array, Date；</p>
<p>4、不要在内层作用域的代码里声明了变量，之后却访问到了外层作用域的同名变量；</p>
<p>5、变量不要先使用后声明；</p>
<p>6、不要在一句代码中单单使用构造函数，记得将其赋值给某个变量；</p>
<p>7、不要在同个作用域下声明同名变量；</p>
<p>8、不要在一些不需要的地方加括号，例：delete(a.b)；</p>
<p>9、不要使用未声明的变量（全局变量需要加到.jshintrc文件的globals属性里面）；</p>
<p>10、不要声明了变量却不使用；</p>
<p>11、不要在应该做比较的地方做赋值；</p>
<p>12、debugger不要出现在提交的代码里；</p>
<p>13、数组中不要存在空元素；</p>
<p>14、不要在循环内部声明函数；</p>
<p>15、不要像这样使用构造函数，例：new function () { ... }, new Object；</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
web前端编码规范整合

## 原文链接
[https://segmentfault.com/a/1190000011471739](https://segmentfault.com/a/1190000011471739)

