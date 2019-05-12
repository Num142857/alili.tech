---
title: '了解新标签----<dialog>' 
date: 2019-01-25 2:30:23
hidden: true
slug: xeams6gxub
categories: [reprint]
---

{{< raw >}}

            <p>HTML 5.2中引入了本地模式对话框标签&lt;dialog&gt;,乍一看，这个标签相当容易理解，当然它的确如此。但是在使用的过程中，我发现它有几个特别容易被忽略的特性。</p>
<p>本文的完整demo。<a href="https://codepen.io/keithjgrant/pen/eyMMVL">点击此处</a></p>
<p>&lt;dialog&gt;最基本的用法：</p>
<pre><code class="hljs hsp">    &lt;<span class="hljs-keyword">dialog</span> open&gt;
      Native <span class="hljs-keyword">dialog</span> box!
    &lt;/<span class="hljs-keyword">dialog</span>&gt;
</code></pre><p>'open' 属性表示 &lt;dialog&gt;标签可见。如果不加'open'属性，&lt;dialog&gt;标签是默认不可见的，除非使用Javascript来设置使其显示。上面一段代码在页面上显示如下：
<img src="https://keithjgrant.com/images/2018/native-dialog-basic.png" alt="">
因为&lt;dialog&gt;在页面上是绝对定位，所以它会显示在其他元素前面并水平居中。默认宽度由内容所决定。</p>
<h2><strong>基本用法</strong></h2>
<p>JavaScript有几个方法和属性可以配合'&lt;dialog&gt;'来使用。最经常用到的方法是以下两个 'showModal()'和'close()'。</p>
<pre><code class="hljs dart">    <span class="hljs-keyword">const</span> modal = <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'dialog'</span>);

    <span class="hljs-comment">// 使元素显示 (添加 `open` 属性)</span>
    modal.showModal();

    <span class="hljs-comment">// 隐藏元素 (移除 `open` 属性)</span>
    modal.close();
</code></pre><p>当使用'showModal()'使元素显示，页面会弹出遮罩层，阻止用户与非对话框的内容交互。遮罩层默认是完全透明的。如下：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">dialog</span><span class="hljs-selector-pseudo">::backdrop</span> {
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.1);
}
</code></pre><p>开发者可以通过css来设置遮罩层的样式。
按Esc键关闭对话框及遮罩层。也可以通过按钮来触发关闭。</p>
<p>&lt;dialog&gt;第三个方法 'show()', 同样也是让元素显示，但与'showModal()'不同的是没有遮罩层。
用户依然可以和页面上其他内容交互。</p>
<p><strong>浏览器支持和兼容</strong></p>
<p>目前，只有chrome浏览器支持&lt;dialog&gt;标签的样式及方法，而火狐仅支持样式，不支持方法。相信火狐不久之后就会支持的。</p>
<p>值得高兴的是，有一种方法可以使浏览器兼容这些方法和样式。通过npm安装 dialog-polyfill，或者通过&lt;script&gt;标签引入。 此插件支持IE9+
使用polyfill，记得页面要进行初始化</p>
<pre><code class="hljs abnf">dialogPolyfill.registerDialog(modal)<span class="hljs-comment">;</span>
</code></pre><p>这种用法不会覆盖已支持&lt;dialog&gt;的浏览器自身的方法。</p>
<p><strong>样式</strong></p>
<p>&lt;dialog&gt;自带的打开或者关闭modal很好用，但是看起来不是特别专业，给它添加样式的方法与其他元素一样简单。遮罩层可以用伪元素 ::backdrop来设置：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">dialog</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0.6rem</span>;
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1em</span> black;
}

<span class="hljs-selector-tag">dialog</span><span class="hljs-selector-pseudo">::backdrop</span> {
  <span class="hljs-comment">/* 遮罩层设置为半透明 */</span>
  <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.4);
}
</code></pre><p>但是，有些旧版本浏览器并不支持伪元素，因此 polyfill 在标签后面增加了 .backdrop，可以在css中使用：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">dialog</span> + <span class="hljs-selector-class">.backdrop</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.4);
}
</code></pre><p>增加.backdrop来应对css兼容性问题。</p>
<p>&lt;dialog&gt;对话框的常用方法是将其分解为header，body和footer:</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">dialog</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"demo-modal"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>A native modal dialog box<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Finally, HTML has a native dialog box element! This is fantastic.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>And a polyfill makes this usable today.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"close"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span>&gt;</span>close<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span>
</code></pre><p>添加一些样式，变成下面的样子：
<img src="https://keithjgrant.com/images/2018/native-dialog-styled.png" alt=""></p>
<h2><strong>更多用法</strong></h2>
<p>通常，我们希望从对话框中获得某种用户反馈，例如当关闭对话框时，可以传递一个值给close()方法，该值被指定给DOM元素的returnValue属性。用法如下：</p>
<pre><code class="hljs less"><span class="hljs-selector-tag">modal</span><span class="hljs-selector-class">.close</span>(<span class="hljs-string">'Accepted'</span>);

<span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(modal.returnValue); <span class="hljs-comment">// logs `Accepted`</span>
</code></pre><p>同样的，也可以监听很多事件。两个比较有用的就是 close() （关闭对话框时触发）和 cancel() （当用户按Esc键关闭对话框时触发）。</p>
<p>这里有一个功能貌似被忽略了，就是点击遮罩层时关闭对话框。别着急，有对应的解决办法。</p>
<pre><code class="hljs cs">modal.addEventListener(<span class="hljs-string">'click'</span>, (<span class="hljs-keyword">event</span>) =&amp;gt; {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">event</span>.target === modal) {
    modal.close(<span class="hljs-string">'cancelled'</span>);
  }
});
</code></pre><p>点击遮罩层就会触发对话框内部的点击事件。如果对话框内的子元素占满了父元素，那么点击对话框内的任何地方都会通过target触发event事件。</p>
<p>这样一来便可以实现点击遮罩层关闭对话框功能了。
这种方法并不一定完美，但它确实是可行的。如果有更好的实现方法，可以分享出来一起探讨。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
了解新标签----<dialog>

## 原文链接
[https://www.zcfy.cc/article/meet-the-new-dialog-element](https://www.zcfy.cc/article/meet-the-new-dialog-element)

