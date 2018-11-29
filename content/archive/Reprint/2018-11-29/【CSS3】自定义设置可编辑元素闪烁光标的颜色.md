---
title: '【CSS3】自定义设置可编辑元素闪烁光标的颜色' 
date: 2018-11-29 9:34:56
hidden: true
slug: dq85u9ou0qo
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<blockquote>因为业务需求, 要求我们的input框内的文本与悬浮的光标颜色不同, 这样的问题肯定在书本上很难找到解决办法， 需要通过平时的基础积累和经验。</blockquote>
<h2 id="articleHeader1">解决方案</h2>
<ul>
<li>使用 <code>::first-line</code> 伪元素</li>
<li>使用 <code>text-shadow</code> 和 <code>text-fill-color</code>
</li>
<li>使用 <code>caret-color</code>
</li>
</ul>
<h3 id="articleHeader2">::fist-line 修改元素</h3>
<p><strong>原理</strong> </p>
<p>一般来说，设置input框的 <code>color</code> 属性会修改文本内容的颜色，同时顺带改变光标的颜色。而<code>::first-line</code>也可以设置首行文本内容的颜色, 利用选择器的权重比，<code>::first-line</code>覆盖了前者的<code>color</code>,最终得到了想要的结果。<a href="https://jsfiddle.net/liyl/onr89b3y/2/" rel="nofollow noreferrer" target="_blank">实际演示</a><button class="btn btn-xs btn-default ml10 preview" data-url="liyl/onr89b3y/2/" data-typeid="0">点击预览</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
input.form-control {
    color: #05d380; /* 光标颜色 */
}

input.form-control::first-line {
    color: #333; /* 文本颜色 */
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css3">
<span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.form-control</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#05d380</span>; <span class="hljs-comment">/* 光标颜色 */</span>
}

<span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.form-control</span><span class="hljs-selector-pseudo">::first-line</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>; <span class="hljs-comment">/* 文本颜色 */</span>
}
</code></pre>
<p><strong>缺陷</strong></p>
<p>只适用于input框, 同时微信 webview 不支持。需要写两个css样式。</p>
<h3 id="articleHeader3">text-shadow 和  text-fill-color</h3>
<p><strong>原理</strong> </p>
<p>先利用<code>color</code>设置文本和光标的颜色,  然后利用 <code>text-shadow</code> 设置文本阴影覆盖文本颜色, 最后使用<code>text-fill-color</code> 将文本颜色置为透明。<a href="https://jsfiddle.net/liyl/rwawt6df/" rel="nofollow noreferrer" target="_blank">实际演示</a><button class="btn btn-xs btn-default ml10 preview" data-url="liyl/rwawt6df/" data-typeid="0">点击预览</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".form-control {
    color: #05d380; /* 光标颜色 */
    text-shadow: 0 0 0 #333; /* 文本颜色 */
    -webkit-text-fill-color: transparent;
}

/* 设置暗文颜色 */
.form-control::-webkit-input-placeholder{ 
    color: rgb(60, 0, 248); /* 改变placeholder文本颜色 */ 
    text-shadow: none; 
    -webkit-text-fill-color: initial;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css3"><span class="hljs-selector-class">.form-control</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#05d380</span>; <span class="hljs-comment">/* 光标颜色 */</span>
    <span class="hljs-attribute">text-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">#333</span>; <span class="hljs-comment">/* 文本颜色 */</span>
    <span class="hljs-attribute">-webkit-text-fill-color</span>: transparent;
}

<span class="hljs-comment">/* 设置暗文颜色 */</span>
<span class="hljs-selector-class">.form-control</span><span class="hljs-selector-pseudo">::-webkit-input-placeholder</span>{ 
    <span class="hljs-attribute">color</span>: <span class="hljs-built_in">rgb</span>(60, 0, 248); <span class="hljs-comment">/* 改变placeholder文本颜色 */</span> 
    <span class="hljs-attribute">text-shadow</span>: none; 
    <span class="hljs-attribute">-webkit-text-fill-color</span>: initial;
}</code></pre>
<p><strong>缺陷</strong> </p>
<p><code>text-fill-color</code> 属性不太支持 <code>firefox</code>, 目前尽量使用 <code>-webkit-</code> 前缀。</p>
<h3 id="articleHeader4">caret-color</h3>
<p><strong>原理</strong> </p>
<p>这是<code>CSS3</code>最新的属性，目的就是为了解决光标颜色的问题。 <a href="https://jsfiddle.net/liyl/qxqn6hgy/" rel="nofollow noreferrer" target="_blank">实际演示</a><button class="btn btn-xs btn-default ml10 preview" data-url="liyl/qxqn6hgy/" data-typeid="0">点击预览</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".form-control {
    color: #333; /* 文本颜色 */
    caret-color: #05d380; /* 光标颜色 */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css3"><span class="hljs-selector-class">.form-control</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>; <span class="hljs-comment">/* 文本颜色 */</span>
    <span class="hljs-attribute">caret-color</span>: <span class="hljs-number">#05d380</span>; <span class="hljs-comment">/* 光标颜色 */</span>
}</code></pre>
<p><strong>缺陷</strong> </p>
<p>低版本IE浏览器不支持</p>
<h2 id="articleHeader5">兼容性考虑</h2>
<p>为了兼容多端设备显示情况，我们必须要将一些情况考虑进来, 使用<code>@support</code> 条件判断来检测是否可用。因为我的环境在于移动端展示，所以只要要求进行兼容移动端，结合第二种和第三种解决方案，可以大面积覆盖设备。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
.form-control {
    color: #05d380; /* 光标颜色 */
    text-shadow: 0 0 0 #333; /* 文本颜色 */
    -webkit-text-fill-color: transparent;
}

@supports (caret-color: #05d380) {
    .form-control {
        color: #333; /* 文本颜色 */
        caret-color: #05d380; /* 光标颜色 */
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css3">
<span class="hljs-selector-class">.form-control</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#05d380</span>; <span class="hljs-comment">/* 光标颜色 */</span>
    <span class="hljs-attribute">text-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">#333</span>; <span class="hljs-comment">/* 文本颜色 */</span>
    <span class="hljs-attribute">-webkit-text-fill-color</span>: transparent;
}

@<span class="hljs-keyword">supports</span> (caret-color: #<span class="hljs-number">05</span>d380) {
    <span class="hljs-selector-class">.form-control</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>; <span class="hljs-comment">/* 文本颜色 */</span>
        <span class="hljs-attribute">caret-color</span>: <span class="hljs-number">#05d380</span>; <span class="hljs-comment">/* 光标颜色 */</span>
    }
}
</code></pre>
<h2 id="articleHeader6">小结</h2>
<p>最近的需求里，移动端开发越来越多，而设备兼容性一直都是头疼的事情，如何更好的方式调试，写出兼容性更强的代码。需要的就是不断总结，减少错误重复发生。</p>
<p>最后能给大家带来帮助就好，希望大家多点赞，收藏 !!</p>
<h2 id="articleHeader7">周边知识</h2>
<ul>
<li><a href="http://www.zhangxinxu.com/wordpress/2018/01/css-caret-color-first-line/" rel="nofollow noreferrer" target="_blank">CSS改变插入光标颜色caret-color简介</a></li>
<li><a href="http://www.w3cplus.com/css/caret-color.html" rel="nofollow noreferrer" target="_blank">W3cplus 介绍 caret-color</a></li>
<li><a href="https://terminal.jcubic.pl/examples.php#css-cursor" rel="nofollow noreferrer" target="_blank">自定义 command line</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【CSS3】自定义设置可编辑元素闪烁光标的颜色

## 原文链接
[https://segmentfault.com/a/1190000015018374](https://segmentfault.com/a/1190000015018374)

