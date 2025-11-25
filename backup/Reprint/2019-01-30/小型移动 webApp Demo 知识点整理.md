---
title: '小型移动 webApp Demo 知识点整理' 
date: 2019-01-30 2:30:23
hidden: true
slug: lsifmfnwfhi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">小型移动 webApp Demo 知识点整理</h2>
<blockquote><p>移动端的知识点很多，但是我们公司不大，而且对移动web的相关细节并不是太重视，只是整理了这些。<br>按照这个顺序学习下来，相信简单的项目应该就能应付了。<code>注：相关理论不做详细介绍，附上学习链接</code></p></blockquote>
<p><strong>包括内容:</strong> css初始化、css全局设置、常用meat标签、rem适配、flex布局、相关技巧（手势库使用、多行截字、1像素边线、点击状态、placeholder居中等）</p>
<ol>
<li><p>reset 引用 <code>normalize.css</code></p></li>
<li><p>css全局设置 包括字体、行高、默认webkit浏览器属性重置</p></li>
<li><p>meta标签(禁用长按下载保存、禁止数字识别为号码等)</p></li>
<li><p>rem公式和sass函数(如何根据设计稿换算单位，并且写好sass函数 pxTorem) 参考, <a href="http://www.w3cplus.com/preprocessor/sass-px-to-rem-with-mixin-and-function.html" rel="nofollow noreferrer" target="_blank">Sass基础——Rem与Px的转换</a></p></li>
<li><p>flex布局 参考腾讯isux的 <a href="https://isux.tencent.com/flexbox.html" rel="nofollow noreferrer" target="_blank">移动端全兼容的flexbox速成班</a></p></li>
<li><p>单行、多行的截字</p></li>
<li><p>按钮active状态 白色橡树的博客中提到了 <a href="http://www.cnblogs.com/PeunZhang/p/3407453.html#question_17" rel="nofollow noreferrer" target="_blank">模拟按钮hover效果</a></p></li>
<li><p>手势库使用（hammerJS）</p></li>
<li><p>高清屏1像素边框 <a href="https://segmentfault.com/a/1190000007604842">移动web 1像素边框 瞧瞧大公司是怎么做的</a></p></li>
<li><p>placeholder属性设置的文字向上偏移的厉害 <a href="http://caibaojian.com/mobile-web-bug.html" rel="nofollow noreferrer" target="_blank">placeholder属性设置的文字向上偏移的厉害</a></p></li>
</ol>
<h3 id="articleHeader1">reset 引用</h3>
<p><a href="http://devework.com/normalize-css-a-better-css-reset.html" rel="nofollow noreferrer" target="_blank">Normalize介绍</a> - <a href="http://necolas.github.io/normalize.css/" rel="nofollow noreferrer" target="_blank">下载地址</a> 浏览器支持情况：Chrome, Firefox, Opera, Safari 6+, IE 8+<br>Normalize.css 是一个可以定制的CSS文件，它让不同的浏览器在渲染网页元素的时候形式更统一。</p>
<h3 id="articleHeader2">css全局设置</h3>
<p>行高字号颜色什么的就根据项目的视觉规范自己来定义，比较重要的是移动端的<code>字体</code>和<code>a链接以及表单元素</code>的初始化样式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    font-family: &quot;Helvetica Neue&quot;, Helvetica, STHeiTi, sans-serif;
}
a,button,input,textarea{
    -webkit-tap-highlight-color: rgba(0,0,0,0;)
    -webkit-user-modify:read-write-plaintext-only; 
}
input[type=number]::-webkit-textfield-decoration-container {
    background-color: transparent;    
}
input[type=number]::-webkit-inner-spin-button {
     -webkit-appearance: none;
}
input[type=number]::-webkit-outer-spin-button {
     -webkit-appearance: none;
}
input{-webkit-appearance:none;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"Helvetica Neue"</span>, Helvetica, STHeiTi, sans-serif;
}
<span class="hljs-selector-tag">a</span>,<span class="hljs-selector-tag">button</span>,<span class="hljs-selector-tag">input</span>,<span class="hljs-selector-tag">textarea</span>{
    <span class="hljs-attribute">-webkit-tap-highlight-color</span>: <span class="hljs-built_in">rgba</span>(0,0,0,0;)
    -webkit-user-modify:read-write-plaintext-only; 
}
<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=number]</span><span class="hljs-selector-pseudo">::-webkit-textfield-decoration-container</span> {
    <span class="hljs-attribute">background-color</span>: transparent;    
}
<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=number]</span><span class="hljs-selector-pseudo">::-webkit-inner-spin-button</span> {
     <span class="hljs-attribute">-webkit-appearance</span>: none;
}
<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=number]</span><span class="hljs-selector-pseudo">::-webkit-outer-spin-button</span> {
     <span class="hljs-attribute">-webkit-appearance</span>: none;
}
<span class="hljs-selector-tag">input</span>{<span class="hljs-attribute">-webkit-appearance</span>:none;}</code></pre>
<h3 id="articleHeader3">meta标签</h3>
<p>主要是<code>定义了比例</code>，<code>苹果全屏显示</code>、状态条颜色、<code>禁止数字识别为电话号码、禁止邮件识别为链接</code> 具体根据需求增加。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta content=&quot;width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no&quot; name=&quot;viewport&quot;>
<meta content=&quot;yes&quot; name=&quot;apple-mobile-web-app-capable&quot;>
<meta content=&quot;black&quot; name=&quot;apple-mobile-web-app-status-bar-style&quot;>
<meta content=&quot;telephone=no&quot; name=&quot;format-detection&quot;>
<meta content=&quot;email=no&quot; name=&quot;format-detection&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;meta content=<span class="hljs-string">"width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"</span> <span class="hljs-built_in">name</span>=<span class="hljs-string">"viewport"</span>&gt;
&lt;meta content=<span class="hljs-string">"yes"</span> <span class="hljs-built_in">name</span>=<span class="hljs-string">"apple-mobile-web-app-capable"</span>&gt;
&lt;meta content=<span class="hljs-string">"black"</span> <span class="hljs-built_in">name</span>=<span class="hljs-string">"apple-mobile-web-app-status-bar-style"</span>&gt;
&lt;meta content=<span class="hljs-string">"telephone=no"</span> <span class="hljs-built_in">name</span>=<span class="hljs-string">"format-detection"</span>&gt;
&lt;meta content=<span class="hljs-string">"email=no"</span> <span class="hljs-built_in">name</span>=<span class="hljs-string">"format-detection"</span>&gt;</code></pre>
<h3 id="articleHeader4">rem公式和sass函数</h3>
<blockquote><p>1、页面加上js  (通用代码)<br>2、根据公式算出数值   (设计稿宽度/320)*20  <br>3、编写sass函数  函数中 40 就根据公式2算出来的结果 可以参考<a href="http://www.w3cplus.com/preprocessor/sass-px-to-rem-with-mixin-and-function.html" rel="nofollow noreferrer" target="_blank">《Sass基础——Rem与Px的转换》</a><br>4、在sass 文件中 直接调用：height:px(492)</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//sass 方法
@function px($px){
       @return ($px/40)+rem;   
    } " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">//sass 方法</span>
@<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">px</span><span class="hljs-params">($px)</span></span>{
       @<span class="hljs-keyword">return</span> ($px/<span class="hljs-number">40</span>)+rem;   
    } </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//js代码
;(function(win, doc){
            function change(){
                doc.documentElement.style.fontSize=20*doc.documentElement.clientWidth/320+'px';
            }
            change();
            win.addEventListener('resize', function(){
                change();
            }, false);
        })(window, document);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//js代码</span>
;(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">win, doc</span>)</span>{
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">change</span>(<span class="hljs-params"></span>)</span>{
                doc.documentElement.style.fontSize=<span class="hljs-number">20</span>*doc.documentElement.clientWidth/<span class="hljs-number">320</span>+<span class="hljs-string">'px'</span>;
            }
            change();
            win.addEventListener(<span class="hljs-string">'resize'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                change();
            }, <span class="hljs-literal">false</span>);
        })(<span class="hljs-built_in">window</span>, <span class="hljs-built_in">document</span>);</code></pre>
<h3 id="articleHeader5">flex布局</h3>
<p>网上关于flex的介绍很多，此处不再展开 参考<a href="https://isux.tencent.com/flexbox.html" rel="nofollow noreferrer" target="_blank">《移动端全兼容的flexbox速成班》</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* ============================================================
   flex：定义布局为盒模型
   flex-v：盒模型垂直布局
   flex-1：子元素占据剩余的空间
   flex-align-center：子元素垂直居中
   flex-pack-center：子元素水平居中
   flex-pack-justify：子元素两端对齐
   兼容性：ios 4+、android 2.3+、winphone8+
   ============================================================ */
.flex{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}
.flex-v{-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}
.flex-1{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;}
.flex-align-center{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;}
.flex-pack-center{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}
.flex-pack-justify{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* ============================================================
   flex：定义布局为盒模型
   flex-v：盒模型垂直布局
   flex-1：子元素占据剩余的空间
   flex-align-center：子元素垂直居中
   flex-pack-center：子元素水平居中
   flex-pack-justify：子元素两端对齐
   兼容性：ios 4+、android 2.3+、winphone8+
   ============================================================ */</span>
<span class="hljs-selector-class">.flex</span>{<span class="hljs-attribute">display</span>:-webkit-box;<span class="hljs-attribute">display</span>:-webkit-flex;<span class="hljs-attribute">display</span>:-ms-flexbox;<span class="hljs-attribute">display</span>:flex;}
<span class="hljs-selector-class">.flex-v</span>{<span class="hljs-attribute">-webkit-box-orient</span>:vertical;<span class="hljs-attribute">-webkit-flex-direction</span>:column;<span class="hljs-attribute">-ms-flex-direction</span>:column;<span class="hljs-attribute">flex-direction</span>:column;}
<span class="hljs-selector-class">.flex-1</span>{<span class="hljs-attribute">-webkit-box-flex</span>:<span class="hljs-number">1</span>;<span class="hljs-attribute">-webkit-flex</span>:<span class="hljs-number">1</span>;<span class="hljs-attribute">-ms-flex</span>:<span class="hljs-number">1</span>;<span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;}
<span class="hljs-selector-class">.flex-align-center</span>{<span class="hljs-attribute">-webkit-box-align</span>:center;<span class="hljs-attribute">-webkit-align-items</span>:center;<span class="hljs-attribute">-ms-flex-align</span>:center;<span class="hljs-attribute">align-items</span>:center;}
<span class="hljs-selector-class">.flex-pack-center</span>{<span class="hljs-attribute">-webkit-box-pack</span>:center;<span class="hljs-attribute">-webkit-justify-content</span>:center;<span class="hljs-attribute">-ms-flex-pack</span>:center;<span class="hljs-attribute">justify-content</span>:center;}
<span class="hljs-selector-class">.flex-pack-justify</span>{<span class="hljs-attribute">-webkit-box-pack</span>:justify;<span class="hljs-attribute">-webkit-justify-content</span>:space-between;<span class="hljs-attribute">-ms-flex-pack</span>:justify;<span class="hljs-attribute">justify-content</span>:space-between;}</code></pre>
<h3 id="articleHeader6">单行、多行的截字</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//单行css截字
div{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">//单行css截字</span>
<span class="hljs-selector-tag">div</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">text-overflow</span>:ellipsis;
    <span class="hljs-attribute">white-space</span>: nowrap;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//多行截字
div{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">//多行截字</span>
<span class="hljs-selector-tag">div</span>{
    <span class="hljs-attribute">display</span>: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: <span class="hljs-number">3</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<h3 id="articleHeader7">按钮active状态</h3>
<p>自己按照网上的方式做了例子，虽然都有active的效果了，但是<code>响应速度</code>不一样，最快的还是js的方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
<meta charset=&quot;utf-8&quot;>
<meta content=&quot;width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no&quot; name=&quot;viewport&quot;>
<meta content=&quot;yes&quot; name=&quot;apple-mobile-web-app-capable&quot;>
<meta content=&quot;black&quot; name=&quot;apple-mobile-web-app-status-bar-style&quot;>
<meta content=&quot;telephone=no&quot; name=&quot;format-detection&quot;>
<meta content=&quot;email=no&quot; name=&quot;format-detection&quot;>
<style type=&quot;text/css&quot;>
a{-webkit-tap-highlight-color: rgba(0,0,0,0);}
.btn-blue{display:block;height:42px;line-height:42px;text-align:center;border-radius:4px;font-size:18px;color:#FFFFFF;background-color: #4185F3;}
.btn-blue-on{background-color: #357AE8;}
</style>
</head>
<body>

<div class=&quot;btn-blue&quot;>按钮</div>

<script type=&quot;text/javascript&quot;>
var btnBlue = document.querySelector(&quot;.btn-blue&quot;);
btnBlue.ontouchstart = function(){
    this.className = &quot;btn-blue btn-blue-on&quot;
}
btnBlue.ontouchend = function(){
    this.className = &quot;btn-blue&quot;
}
</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"yes"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-capable"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"black"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-status-bar-style"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"telephone=no"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"format-detection"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"email=no"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"format-detection"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">a</span>{<span class="hljs-attribute">-webkit-tap-highlight-color</span>: <span class="hljs-built_in">rgba</span>(0,0,0,0);}
<span class="hljs-selector-class">.btn-blue</span>{<span class="hljs-attribute">display</span>:block;<span class="hljs-attribute">height</span>:<span class="hljs-number">42px</span>;<span class="hljs-attribute">line-height</span>:<span class="hljs-number">42px</span>;<span class="hljs-attribute">text-align</span>:center;<span class="hljs-attribute">border-radius</span>:<span class="hljs-number">4px</span>;<span class="hljs-attribute">font-size</span>:<span class="hljs-number">18px</span>;<span class="hljs-attribute">color</span>:<span class="hljs-number">#FFFFFF</span>;<span class="hljs-attribute">background-color</span>: <span class="hljs-number">#4185F3</span>;}
<span class="hljs-selector-class">.btn-blue-on</span>{<span class="hljs-attribute">background-color</span>: <span class="hljs-number">#357AE8</span>;}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-blue"</span>&gt;</span>按钮<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">var</span> btnBlue = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".btn-blue"</span>);
btnBlue.ontouchstart = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.className = <span class="hljs-string">"btn-blue btn-blue-on"</span>
}
btnBlue.ontouchend = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.className = <span class="hljs-string">"btn-blue"</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader8">手势库使用（hammerJS）</h3>
<p>hammer是一个移动端是手势库， <a href="http://hammerjs.github.io/" rel="nofollow noreferrer" target="_blank"></a><a href="http://hammerjs.github.io/" rel="nofollow noreferrer" target="_blank">http://hammerjs.github.io/</a> 这是他们的官网，这些英文不是太难，利用翻译软件应该就能轻松学习，具体细节不再展开，只贴一个简单的demo代码吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>hammer.js</title>
    <style>
        #div{ width: 100px; height: 100px; background: red;transition:transform 1s;   margin:100px auto;}
    </style>
    <script src=&quot;hammer.min.js&quot;></script>
</head>
<body>
    <div id=&quot;div&quot;></div>
    <script type=&quot;text/javascript&quot;>
        
        var el = document.getElementById('div');
        Hammer(el).on('swipeleft',function(e){
            // alert('快速左滑成功');
            console.log(e.deltaX);
            el.style.transform='translateX('+e.deltaX+'px)';
        });
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>hammer.js<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-id">#div</span>{ <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>; <span class="hljs-attribute">background</span>: red;<span class="hljs-attribute">transition</span>:transform <span class="hljs-number">1s</span>;   <span class="hljs-attribute">margin</span>:<span class="hljs-number">100px</span> auto;}
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"hammer.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"div"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        
        <span class="hljs-keyword">var</span> el = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'div'</span>);
        Hammer(el).on(<span class="hljs-string">'swipeleft'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
            <span class="hljs-comment">// alert('快速左滑成功');</span>
            <span class="hljs-built_in">console</span>.log(e.deltaX);
            el.style.transform=<span class="hljs-string">'translateX('</span>+e.deltaX+<span class="hljs-string">'px)'</span>;
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader9">高清屏1像素边框）</h3>
<p>实现方式很多，主要原理还是通过调整viewpor的缩放比或者将1px的元素压缩0.5来实现，<a href="https://segmentfault.com/a/1190000007604842">移动web 1像素边框 瞧瞧大公司是怎么做的</a>，文章写得比较详细，看完就能明白了，下边的代码是用 border-images 使用base64的图片实现的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".border-image-1px {
    border-width: 1px 0px;
    -webkit-border-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAECAYAAABP2FU6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAcSURBVHjaBMEBDQAADMMgckv1r20H1WxzoNoPAER9BjAKc4kUAAAAAElFTkSuQmCC&quot;) 2 0 stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code>.border-image<span class="hljs-string">-1</span>px {
    border-width: 1px 0px;
    -webkit-border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAECAYAAABP2FU6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167<span class="hljs-string">+3</span>t<span class="hljs-string">+9</span>f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC<span class="hljs-string">+0</span>lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB<span class="hljs-string">+7</span>gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q<span class="hljs-string">+0</span>hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq<span class="hljs-string">+2</span>mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o<span class="hljs-string">+02</span>PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r<span class="hljs-string">+00</span>umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle<span class="hljs-string">+70</span>eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN<span class="hljs-string">+1</span>n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ<span class="hljs-string">+2</span>e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e<span class="hljs-string">+2</span>Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX<span class="hljs-string">+39</span>QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y<span class="hljs-string">+1</span>XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y<span class="hljs-string">+2</span>v3qB/oP6n<span class="hljs-string">+0</span>/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO<span class="hljs-string">+638</span>e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAcSURBVHjaBMEBDQAADMMgckv1r20H1WxzoNoPAER9BjAKc4kUAAAAAElFTkSuQmCC") 2 0 stretch;
}</code></pre>
<h3 id="articleHeader10">placeholder属性设置的文字向上偏移</h3>
<p>在查看京东、糯米、美团等一些webapp的时候也发现有苹果和安卓不居中的情况，而且很严重，网上所设置这个属性，但是没有效果并不好，建议使用padding的形式，我抽时间研究研究其他框架后再</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//placeholder属性设置的文字向上偏移的厉害    Android4.x部分机型    
inpu{
    line-height:normal
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">//placeholder属性设置的文字向上偏移的厉害    Android4.x部分机型    </span>
inpu{
    <span class="hljs-built_in">line</span>-<span class="hljs-built_in">height</span>:<span class="hljs-built_in">normal</span>
}</code></pre>
<h2 id="articleHeader11">移动端相关知识点汇总资料</h2>
<ul>
<li><p>AlloyTeam 腾讯移动Web前端知识库 <a href="https://github.com/AlloyTeam/Mars" rel="nofollow noreferrer" target="_blank">《面向亿万用户级的移动端Web解决方案》</a></p></li>
<li><p>腾讯微信支付设计中心白树的博文 <a href="http://www.cnblogs.com/PeunZhang/p/3407453.html" rel="nofollow noreferrer" target="_blank">【原】移动web资源整理</a></p></li>
<li><p>手Q开发 <a href="https://github.com/imweb/mobile" rel="nofollow noreferrer" target="_blank">Mobile开发经验沉淀</a></p></li>
<li><p><a href="https://github.com/jtyjty99999/mobileTech" rel="nofollow noreferrer" target="_blank">移动端开发所需要的一些资源与小技巧</a></p></li>
<li><p>参考白色橡树的<a href="http://www.cnblogs.com/PeunZhang/p/3407453.html" rel="nofollow noreferrer" target="_blank">移动web资源整理</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
小型移动 webApp Demo 知识点整理

## 原文链接
[https://segmentfault.com/a/1190000007657534](https://segmentfault.com/a/1190000007657534)

