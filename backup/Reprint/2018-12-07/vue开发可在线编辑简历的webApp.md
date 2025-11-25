---
title: 'vue开发可在线编辑简历的webApp' 
date: 2018-12-07 2:30:09
hidden: true
slug: 3am7ph2k98q
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">项目初始</h1>
<p>在一个阳光明媚的下午，学院就业指导老师让我们每个人做一份简历，然后打印上交。后回到宿舍，苦苦在网上寻找，未果。因为不要钱的模板太丑，好看的模板得花钱...，像我等穷逼，哪里有什么闲钱。于是，果断下载了个丑不拉几的模板，打开word随便填了填交了上去......</p>
<p>后来良心隐隐作痛，于是打算开发一款能在线编辑简历的webAPP，就随手将脑海中的想法写了下来：</p>
<p><span class="img-wrap"><img data-src="/img/bV7IZ6?w=320&amp;h=426" src="https://static.alili.tech/img/bV7IZ6?w=320&amp;h=426" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>接下了就是使用vue-cli初始化项目、下载依赖等常规操作...</p>
<p>大家可以去我的GitHub地址，查看具体的项目源码：<a href="https://github.com/bjw1234/v_resume" rel="nofollow noreferrer" target="_blank">https://github.com/bjw1234/v_...</a><br>欢迎<code>star</code>谢谢各位大佬...</p>
<p>也可以直接点击该网址运行项目：<br><a href="http://resume.baijiawei.top" rel="nofollow noreferrer" target="_blank">http://resume.baijiawei.top</a></p>
<p><strong> 我主要把我遇到的一些小问题，以及把配置服务器的过程记录下了，以供以后参考学习使用... </strong></p>
<h1 id="articleHeader1">inline-block元素垂直居中</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".content{
    display:inline-block;
}

.wrapper:before{
    content:&quot;&quot;;
    display:inline-block;
    height:100%;
    vertical-align:middle;
}

.content{
    vetical-align:middle;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.content</span>{
    <span class="hljs-attribute">display</span>:inline-block;
}

<span class="hljs-selector-class">.wrapper</span><span class="hljs-selector-pseudo">:before</span>{
    <span class="hljs-attribute">content</span>:<span class="hljs-string">""</span>;
    <span class="hljs-attribute">display</span>:inline-block;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">vertical-align</span>:middle;
}

<span class="hljs-selector-class">.content</span>{
    <span class="hljs-attribute">vetical-align</span>:middle;
}
</code></pre>
<h1 id="articleHeader2">自定义组件嵌套</h1>
<p>在组建中使用<code>&lt;slot&gt;&lt;/slot&gt;</code>插槽，那么在父组件中可以将内容填充到插槽中。</p>
<h1 id="articleHeader3">动态设置图片的的路径</h1>
<p>通过<code>v-for</code>指令渲染时，图片的路径需要父组件动态传递，父组件只是传过来的图片的名称。这时我们可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img :src=val( item.icon )>

// val是一个函数
val(icon){
    return require('./'+icon);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;img :src=val( item.icon )&gt;

<span class="hljs-comment">// val是一个函数</span>
val(icon){
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">'./'</span>+icon);
}</code></pre>
<h1 id="articleHeader4">plceHolder改变其颜色</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #fff;
  }

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #fff;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #fff;
  }

  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #fff;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">  <span class="hljs-selector-pseudo">::-webkit-input-placeholder</span> { <span class="hljs-comment">/* WebKit browsers */</span>
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
  }

  <span class="hljs-selector-pseudo">:-moz-placeholder</span> { <span class="hljs-comment">/* Mozilla Firefox 4 to 18 */</span>
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
  }

  <span class="hljs-selector-pseudo">::-moz-placeholder</span> { <span class="hljs-comment">/* Mozilla Firefox 19+ */</span>
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
  }

  <span class="hljs-selector-pseudo">:-ms-input-placeholder</span> { <span class="hljs-comment">/* Internet Explorer 10+ */</span>
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
  }</code></pre>
<h1 id="articleHeader5">非父子组件之间通信</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="思路：创建一个事件中心，相当于中继站，可以用来传递事件和接收事件。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">思路：创建一个事件中心，相当于中继站，可以用来传递事件和接收事件。</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// 在main.js中，将这个事件中继站添加到Vue的原型链上
Vue.protype.$hub = new Vue();

// 在不同组件之间通过这个中继站收发数据

// 组件A发数据
 this.$hub.$emit('saveAs', 'png');
 
// 组件B接收数据
    created: function () {     
      this.$hub.$on('saveAs', (type) => {
        // 执行对应的操作
      });
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-comment">// 在main.js中，将这个事件中继站添加到Vue的原型链上</span>
Vue.protype.$hub = <span class="hljs-keyword">new</span> Vue();

<span class="hljs-comment">// 在不同组件之间通过这个中继站收发数据</span>

<span class="hljs-comment">// 组件A发数据</span>
 <span class="hljs-keyword">this</span>.$hub.$emit(<span class="hljs-string">'saveAs'</span>, <span class="hljs-string">'png'</span>);
 
<span class="hljs-comment">// 组件B接收数据</span>
    created: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{     
      <span class="hljs-keyword">this</span>.$hub.$on(<span class="hljs-string">'saveAs'</span>, (type) =&gt; {
        <span class="hljs-comment">// 执行对应的操作</span>
      });
    }</code></pre>
<h1 id="articleHeader6">HTML页面以png、pdf格式保存</h1>
<ul><li><strong> 使用的第三方模块 </strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 下载模块
npm install jspdf html2canvas --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 下载模块</span>
npm install jspdf html2canvas --save-dev</code></pre>
<ul><li><strong> 具体实例 </strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 用户点击保存
  saveAsType(type) {
    // png保存
    if (type === 'png') {
      let resume = document.getElementById('pageDefault');
      html2canvas(resume).then(function (canvas) {
        canvas.toBlob(function (blob) {
          fileSaver.saveAs(blob, 'Resume.png');
        });
      });
    }
    // pdf保存
    if (type === 'pdf') {
      let resume = document.getElementById('pageDefault');
      html2canvas(resume).then(function (canvas) {
        // 通过html2canvas将html渲染成canvas，然后获取图片数据
        let imgData = canvas.toDataURL('image/jpeg');

        // 初始化pdf，设置相应格式
        let doc = new JsPDF('p', 'mm', 'a4');

        // 这里设置的是a4纸张尺寸
        doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);

        // 输出保存命名为content的pdf
        doc.save('resume.pdf');
      });
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-comment">// 用户点击保存</span>
  saveAsType(type) {
    <span class="hljs-comment">// png保存</span>
    <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'png'</span>) {
      <span class="hljs-keyword">let</span> resume = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'pageDefault'</span>);
      html2canvas(resume).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">canvas</span>) </span>{
        canvas.toBlob(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">blob</span>) </span>{
          fileSaver.saveAs(blob, <span class="hljs-string">'Resume.png'</span>);
        });
      });
    }
    <span class="hljs-comment">// pdf保存</span>
    <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'pdf'</span>) {
      <span class="hljs-keyword">let</span> resume = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'pageDefault'</span>);
      html2canvas(resume).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">canvas</span>) </span>{
        <span class="hljs-comment">// 通过html2canvas将html渲染成canvas，然后获取图片数据</span>
        <span class="hljs-keyword">let</span> imgData = canvas.toDataURL(<span class="hljs-string">'image/jpeg'</span>);

        <span class="hljs-comment">// 初始化pdf，设置相应格式</span>
        <span class="hljs-keyword">let</span> doc = <span class="hljs-keyword">new</span> JsPDF(<span class="hljs-string">'p'</span>, <span class="hljs-string">'mm'</span>, <span class="hljs-string">'a4'</span>);

        <span class="hljs-comment">// 这里设置的是a4纸张尺寸</span>
        doc.addImage(imgData, <span class="hljs-string">'JPEG'</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">210</span>, <span class="hljs-number">297</span>);

        <span class="hljs-comment">// 输出保存命名为content的pdf</span>
        doc.save(<span class="hljs-string">'resume.pdf'</span>);
      });
    }
  }</code></pre>
<h1 id="articleHeader7">ES6模块 Modules</h1>
<p>在模块中可以使用<code>import</code>和<code>export</code>关键字。</p>
<p><strong> 注意： </strong> <code>export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。</code></p>
<ul><li><strong> 想要导出模块的功能有很多方法，其中最简单的方式是添加export关键字。 </strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// 导出方法
export function a(){
    // xxxxx
}

// 导出类
export class Person {
    // xxxxx
}

// 报错
var m = 1;
export m;

// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};

// 这三种写法都是正确的。


// 报错
function f() {}
export f;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-comment">// 导出方法</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// xxxxx</span>
}

<span class="hljs-comment">// 导出类</span>
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
    <span class="hljs-comment">// xxxxx</span>
}

<span class="hljs-comment">// 报错</span>
<span class="hljs-keyword">var</span> m = <span class="hljs-number">1</span>;
<span class="hljs-keyword">export</span> m;

<span class="hljs-comment">// 写法一</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">var</span> m = <span class="hljs-number">1</span>;

<span class="hljs-comment">// 写法二</span>
<span class="hljs-keyword">var</span> m = <span class="hljs-number">1</span>;
<span class="hljs-keyword">export</span> {m};

<span class="hljs-comment">// 写法三</span>
<span class="hljs-keyword">var</span> n = <span class="hljs-number">1</span>;
<span class="hljs-keyword">export</span> {n <span class="hljs-keyword">as</span> m};

<span class="hljs-comment">// 这三种写法都是正确的。</span>


<span class="hljs-comment">// 报错</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-keyword">export</span> f;</code></pre>
<p>或者也可以采用这样的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export {detectCats, Kittydar};
// 此处不需要 `export`关键字
function detectCats(canvas, options) { ... }
class Kittydar { ... }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> {detectCats, Kittydar};
<span class="hljs-comment">// 此处不需要 `export`关键字</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">detectCats</span>(<span class="hljs-params">canvas, options</span>) </span>{ ... }
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Kittydar</span> </span>{ ... }</code></pre>
<p>你可以导出所有的最外层函数、类以及var、let或const声明的变量。</p>
<ul><li><strong> 在另一个模块中导入其他模块。 </strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { a, Person } from 'xxxx.js';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { a, Person } <span class="hljs-keyword">from</span> <span class="hljs-string">'xxxx.js'</span>;
</code></pre>
<ul><li><strong> 重命名import和export </strong></li></ul>
<p>导入时的重命名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 基本语法
import { 模块名称 as 重名后的名称 } from 'xxxx.js';

import {flip as flipOmelet} from &quot;eggs.js&quot;;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 基本语法</span>
<span class="hljs-keyword">import</span> { 模块名称 <span class="hljs-keyword">as</span> 重名后的名称 } <span class="hljs-keyword">from</span> <span class="hljs-string">'xxxx.js'</span>;

<span class="hljs-keyword">import</span> {flip <span class="hljs-keyword">as</span> flipOmelet} <span class="hljs-keyword">from</span> <span class="hljs-string">"eggs.js"</span>;
</code></pre>
<p>当然，导出时也可以重命名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">v1</span>(<span class="hljs-params"></span>) </span>{ ... }
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">v2</span>(<span class="hljs-params"></span>) </span>{ ... }

<span class="hljs-keyword">export</span> {
  v1 <span class="hljs-keyword">as</span> streamV1,
  v2 <span class="hljs-keyword">as</span> streamV2,
  v2 <span class="hljs-keyword">as</span> streamLatestVersion
};</code></pre>
<ul><li><strong> Default exports </strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// b.js
export default {
  // 其中可以加入任何你想加入的内容。
}

// a.js
import b from 'b.js';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// b.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">// 其中可以加入任何你想加入的内容。</span>
}

<span class="hljs-comment">// a.js</span>
<span class="hljs-keyword">import</span> b <span class="hljs-keyword">from</span> <span class="hljs-string">'b.js'</span>;</code></pre>
<ul><li><strong> 模块对象 </strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as cows from 'cows.js';

// 当你import * 时，导入的其实是一个模块命名空间对象，模块将它的所有属性都导出了。
// 所以如果“cows”模块导出一个名为moon()的函数，然后用上面这种方法“cows”将其全部导入后，
// 你就可以这样调用函数了：cows.moo()。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> cows <span class="hljs-keyword">from</span> <span class="hljs-string">'cows.js'</span>;

<span class="hljs-comment">// 当你import * 时，导入的其实是一个模块命名空间对象，模块将它的所有属性都导出了。</span>
<span class="hljs-comment">// 所以如果“cows”模块导出一个名为moon()的函数，然后用上面这种方法“cows”将其全部导入后，</span>
<span class="hljs-comment">// 你就可以这样调用函数了：cows.moo()。</span></code></pre>
<ul><li><strong> 聚合模块 </strong></li></ul>
<p>有时一个程序包中主模块的代码比较多，为了简化这样的代码，<br>可以用一种统一的方式将其它模块中的内容聚合在一起导出，<br>可以通过这种简单的方式将所有所需内容导入再导出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// world-foods.js - 来自世界各地的好东西

// 导入&quot;sri-lanka&quot;并将它导出的内容的一部分重新导出
export {Tea, Cinnamon} from &quot;sri-lanka&quot;;

// 导入&quot;equatorial-guinea&quot;并将它导出的内容的一部分重新导出
export {Coffee, Cocoa} from &quot;equatorial-guinea&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// world-foods.js - 来自世界各地的好东西</span>

<span class="hljs-comment">// 导入"sri-lanka"并将它导出的内容的一部分重新导出</span>
<span class="hljs-keyword">export</span> {Tea, Cinnamon} <span class="hljs-keyword">from</span> <span class="hljs-string">"sri-lanka"</span>;

<span class="hljs-comment">// 导入"equatorial-guinea"并将它导出的内容的一部分重新导出</span>
<span class="hljs-keyword">export</span> {Coffee, Cocoa} <span class="hljs-keyword">from</span> <span class="hljs-string">"equatorial-guinea"</span>;</code></pre>
<h1 id="articleHeader8">Vue style的scope属性</h1>
<p>当&lt;style&gt;标签有scoped属性时，它的css只作用于当前组件中的元素。</p>
<h3 id="articleHeader9">有作用域的 CSS</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class=&quot;example&quot;>hi</div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.example</span> {
  <span class="hljs-attribute">color</span>: red;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"example"</span>&gt;</span>hi<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>转换结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class=&quot;example&quot; data-v-f3f3eg9>hi</div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.example</span><span class="hljs-selector-attr">[data-v-f3f3eg9]</span> {
  <span class="hljs-attribute">color</span>: red;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"example"</span> <span class="hljs-attr">data-v-f3f3eg9</span>&gt;</span>hi<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<h3 id="articleHeader10">混用本地和全局样式</h3>
<p>你可以在一个组件中同时使用有作用域和无作用域的样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
/* 全局样式 */
</style>

<style scoped>
/* 本地样式 */
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-comment">/* 全局样式 */</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-comment">/* 本地样式 */</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader11">子组件的根元素</h3>
<p>使用 scoped 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件有作用域的 CSS  和子组件有作用域的 CSS 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。</p>
<h3 id="articleHeader12">深度选择器</h3>
<p>如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 <code>&gt;&gt;&gt;</code> 操作符。</p>
<p>有些像 Sass 之类的预处理器无法正确解析 <code>&gt;&gt;&gt;</code>。这种情况下你可以使用 <code>/deep/</code> 操作符取而代之——这是一个 <code>&gt;&gt;&gt;</code> 的别名，同样可以正常工作。</p>
<h1 id="articleHeader13">CentOS下安装Nginx并部署Node项目、vue项目</h1>
<hr>
<h1 id="articleHeader14">安装编译工具及库文件</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yum -y install make zlib zlib-devel gcc-c++ libtool pcre pcre-devel  openssl openssl-devel" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">yum -y install make zlib zlib-devel gcc-c++ libtool pcre pcre-devel  openssl openssl-devel</code></pre>
<h1 id="articleHeader15">使用wget命令下载 Nginx</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wget -c https://nginx.org/download/nginx-1.12.2.tar.gz " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">wget -c https:<span class="hljs-comment">//nginx.org/download/nginx-1.12.2.tar.gz </span></code></pre>
<h1 id="articleHeader16">解压</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tar -zxvf nginx-1.12.2.tar.gz
cd nginx-1.12.2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">tar -zxvf nginx<span class="hljs-number">-1.12</span><span class="hljs-number">.2</span>.tar.gz
cd nginx<span class="hljs-number">-1.12</span><span class="hljs-number">.2</span></code></pre>
<h1 id="articleHeader17">配置</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用默认配置
./configure" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 使用默认配置</span>
./configure</code></pre>
<h1 id="articleHeader18">编译安装</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="make
make install

// 查找安装路径
whereis nginx
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">make
make install

<span class="hljs-comment">// 查找安装路径</span>
whereis nginx
</code></pre>
<h1 id="articleHeader19">启动、停止 Nginx</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /usr/local/nginx/sbin/
./nginx
./nginx -s stop
./nginx -s quit
./nginx -s reload


./nginx -s quit:此方式停止步骤是待nginx进程处理任务完毕进行停止。
./nginx -s stop:此方式相当于先查出nginx进程id再使用kill命令强制杀掉进程。


查询nginx进程：
ps aux|grep nginx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">cd /usr/local/nginx/sbin/
./nginx
./nginx -s stop
./nginx -s quit
./nginx -s reload


./nginx -s quit:此方式停止步骤是待nginx进程处理任务完毕进行停止。
./nginx -s stop:此方式相当于先查出nginx进程id再使用kill命令强制杀掉进程。


查询nginx进程：
ps aux|grep nginx</code></pre>
<h1 id="articleHeader20">重启 Nginx</h1>
<p>1.先停止再启动（推荐）：<br>对 nginx 进行重启相当于先停止再启动，即先执行停止命令再执行启动命令。<br>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./nginx -s quit
./nginx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">./nginx -s quit
./nginx</code></pre>
<p>2.重新加载配置文件：<br>当 nginx的配置文件 nginx.conf 修改后，要想让配置生效需要重启 nginx，<br>执行以下命令即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./nginx -s reload" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">./nginx -s reload</code></pre>
<p>启动成功后，在浏览器可以看到这样的页面：<br><span class="img-wrap"><img data-src="/img/bV7IQ9?w=1452&amp;h=551" src="https://static.alili.tech/img/bV7IQ9?w=1452&amp;h=551" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>如果操作正确的话，按照以上的命令已经安装好了Nginx。</p>
<h1 id="articleHeader21">部署Node项目</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 启动项目
pm2 start app.js
// 该项目运行在8080端口上" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 启动项目</span>
pm2 start app.js
<span class="hljs-comment">// 该项目运行在8080端口上</span></code></pre>
<p>打开 /usr/local/nginx/conf/nginx.conf文件：</p>
<p>添加以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    server {

      listen     80;
      #域名
      server_name     baijiawei.top www.baijiawei.top;

      location / {
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header Host  $http_host;
          proxy_set_header X-Nginx-Proxy true;
          proxy_set_header Connection &quot;&quot;;
          #代理地址
          proxy_pass  http://127.0.0.1:8080;
          root  blog;
      }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    server {

      listen     <span class="hljs-number">80</span>;
      #域名
      server_name     baijiawei.top www.baijiawei.top;

      location / {
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header Host  $http_host;
          proxy_set_header X-Nginx-<span class="hljs-built_in">Proxy</span> <span class="hljs-literal">true</span>;
          proxy_set_header Connection <span class="hljs-string">""</span>;
          #代理地址
          proxy_pass  http:<span class="hljs-comment">//127.0.0.1:8080;</span>
          root  blog;
      }
}</code></pre>
<h1 id="articleHeader22">重新载入配置文件</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./nginx -s reload " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">./nginx -s reload </code></pre>
<p>OK，那么现在就可以通过自己配置的域名进行访问啦！</p>
<p><code>ps:</code><br>我的顶级域名：<a href="http://baijiawei.top" rel="nofollow noreferrer" target="_blank">http://baijiawei.top</a> <br>当然为了更好的利用域名资源，也可以使用二级域名：</p>
<p>例如：<br><a href="http://blog.baijiawei.top" rel="nofollow noreferrer" target="_blank">http://blog.baijiawei.top</a><br><a href="http://resume.baijiawei.top" rel="nofollow noreferrer" target="_blank">http://resume.baijiawei.top</a></p>
<h1 id="articleHeader23">Nginx 作为http服务器访问静态资源</h1>
<p>Nginx配置二级子域名</p>
<h3 id="articleHeader24">第一步</h3>
<p>去自己域名控制台添加解析，这里以添加resume前缀为例：</p>
<p>我用的是阿里云服务器，在控制面板点击添加域名，输入域名名称点击确定即可。  例如：(resume.baijiawei.top)</p>
<p><span class="img-wrap"><img data-src="/img/bV7IRx?w=1853&amp;h=629" src="https://static.alili.tech/img/bV7IRx?w=1853&amp;h=629" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader25">第二步</h3>
<p>在<code>nginx</code>根目录下也就是<code>nginx/html</code>中添加一个文件夹，文件夹名称为第一步中二级域名的前缀，也就是<code>resume</code>,<br>然后将你的Vue项目或者其他项目添加入该文件夹中。</p>
<h3 id="articleHeader26">第三步</h3>
<p>添加配置文件</p>
<p>进入 <code>/usr/local/nginx/conf/</code>目录下：</p>
<p>打开<code>nginx.conf</code>配置文件，添加以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    #  基于Vue的resume项目    
    server {        
        
        listen       80;             # 监听的端口号 
        server_name  resume.baijiawei.top;   #  二级域名

        location / {
            root   html/resume/dist;     # 你的项目地址
            index  index.html index.htm;   # 入口文件
        }

        error_page  404    /404.html;      # 404

        error_page   500 502 503 504  /50x.html; # 服务器端错误页面
        location = /50x.html {           # 页面地址
            root   html;
        }
    }
    
    # 当然还有一些其他的配置项，
    # 可以依据需要自行添加。
    #
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    #  基于Vue的resume项目    
    server {        
        
        listen       <span class="hljs-number">80</span>;             # 监听的端口号 
        server_name  resume.baijiawei.top;   #  二级域名

        location / {
            root   html/resume/dist;     # 你的项目地址
            index  index.html index.htm;   # 入口文件
        }

        error_page  <span class="hljs-number">404</span>    /<span class="hljs-number">404.</span>html;      # <span class="hljs-number">404</span>

        error_page   <span class="hljs-number">500</span> <span class="hljs-number">502</span> <span class="hljs-number">503</span> <span class="hljs-number">504</span>  /<span class="hljs-number">50</span>x.html; # 服务器端错误页面
        location = <span class="hljs-regexp">/50x.html {           # 页面地址
            root   html;
        }
    }
    
    # 当然还有一些其他的配置项，
    # 可以依据需要自行添加。
    #
    </span></code></pre>
<h3 id="articleHeader27">第四步</h3>
<p>重新加载<code>nginx</code>配置文件，就可以开开心心在电脑上去访问自己的项目啦。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./nginx -s reload    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">./nginx -s reload    </code></pre>
<p>大家可以去我的GitHub地址，查看具体的项目源码：<a href="https://github.com/bjw1234/v_resume" rel="nofollow noreferrer" target="_blank">https://github.com/bjw1234/v_...</a></p>
<p>文章写到这里差不多就可以结束啦......</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue开发可在线编辑简历的webApp

## 原文链接
[https://segmentfault.com/a/1190000014195243](https://segmentfault.com/a/1190000014195243)

