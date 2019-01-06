---
title: 'Angular 4.0 内置指令全攻略' 
date: 2019-01-06 2:30:10
hidden: true
slug: 1x5dijwdrnk
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000010419270" src="https://static.alili.tech/img/remote/1460000010419270" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在这篇文章中，我们将分别列举每一个内置指令的用法，并提供一个例子作为演示。尽量用<code>最少最简单</code>的描述，让你在<code>更快更准确</code>地学会每一种内置指令的基本用法。</p>
<h2 id="articleHeader0">ngFor</h2>
<blockquote>作用：像 for 循环一样，可以重复的从数组中取值并显示出来。</blockquote>
<p><strong>例子：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// .ts

this.userInfo = ['张三', '李四', '王五'];

// .html

<div class=&quot;ui list&quot; *ngFor=&quot;let username of userInfo&quot;>
    <div class=&quot;item&quot;>"{{"username"}}"</div>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">// .ts</span>

<span class="hljs-keyword">this</span>.userInfo = [<span class="hljs-string">'张三'</span>, <span class="hljs-string">'李四'</span>, <span class="hljs-string">'王五'</span>];

<span class="hljs-comment">// .html</span>

&lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"ui list"</span> *ngFor=<span class="hljs-string">"let username of userInfo"</span>&gt;
    &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"item"</span>&gt;"{{"username"}}"&lt;/div&gt;
&lt;/div&gt;
</code></pre>
<p><strong>讲解：</strong>  <br>他的语法是 <code>*ngFor="let username of userInfo"</code>，其中 userInfo 是从中取值的数组，username 是每次从中取出来的值。然后在这个标签里面的内容就会重复执行，并通过双向绑定，将 username 显示出来。</p>
<h2 id="articleHeader1">ngIf</h2>
<blockquote>作用：根据条件决定是否显示或隐藏这个元素。</blockquote>
<p><strong>例子：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// .html

<div *ngIf=&quot;false&quot;></div>
<div *ngIf=&quot;a > b&quot;></div>
<div *ngIf=&quot;username == '张三'&quot;></div>
<div *ngIf=&quot;myFunction()&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-comment">// .html</span>

&lt;<span class="hljs-keyword">div</span> *ngIf=<span class="hljs-string">"false"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> *ngIf=<span class="hljs-string">"a &gt; b"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> *ngIf=<span class="hljs-string">"username == '张三'"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> *ngIf=<span class="hljs-string">"myFunction()"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p><strong>讲解：</strong></p>
<ol>
<li>永远不会显示</li>
<li>当 a 大于 b 的时候显示</li>
<li>当 username 等于 张三 的时候显示</li>
<li>根据 myFunction() 这个函数的返回值，决定是否显示</li>
</ol>
<h2 id="articleHeader2">ngSwitch</h2>
<blockquote>作用：防止条件复杂的情况导致过多的使用 ngIf。</blockquote>
<p><strong>例子：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// .html

<div class=&quot;container&quot; [ngSwitch]=&quot;myAge&quot;>
    <div *ngSwitchCase=&quot;'10'&quot;>age = 10</div>
    <div *ngSwitchCase=&quot;'20'&quot;>age = 20</div>
    <div *ngSwitchDefault=&quot;'18'&quot;>age = 18</div>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// .html</span>

&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"container"</span> [ngSwitch]=<span class="hljs-string">"myAge"</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> *ngSwitchCase=<span class="hljs-string">"'10'"</span>&gt;age = <span class="hljs-number">10</span>&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> *ngSwitchCase=<span class="hljs-string">"'20'"</span>&gt;age = <span class="hljs-number">20</span>&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> *ngSwitchDefault=<span class="hljs-string">"'18'"</span>&gt;age = <span class="hljs-number">18</span>&lt;/div&gt;
&lt;/div&gt;
</code></pre>
<p><strong>讲解：</strong>  <br>[ngSwitch] 先与目标进行绑定，ngSwitchCase 列出每个可能性，ngSwitchDefault 列出默认值。</p>
<h2 id="articleHeader3">ngStyle</h2>
<blockquote>作用：可以使用动态值给特定的 DOM 元素设定 CSS 属性。</blockquote>
<p><strong>例子：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// .ts
backColor: string = 'red';

// .html
<div [style.color]=&quot;yellow&quot;>
    你好，世界
</div>
<div [style.background-color]=&quot;backColor&quot;>
    你好，世界
</div>
<div [style.font-size.px]=&quot;20&quot;>
    你好，世界
</div>
<div [ngStyle]=&quot;{color: 'white', 'background-color': 'blue', 'font-size.px': '20'}&quot;>
    你好，世界
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>
<span class="hljs-comment">// .ts</span>
backColor: string = <span class="hljs-string">'red'</span>;

<span class="hljs-comment">// .html</span>
&lt;<span class="hljs-keyword">div</span> [style.color]=<span class="hljs-string">"yellow"</span>&gt;
    你好，世界
&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> [style.background-color]=<span class="hljs-string">"backColor"</span>&gt;
    你好，世界
&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> [style.font-size.px]=<span class="hljs-string">"20"</span>&gt;
    你好，世界
&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> [ngStyle]=<span class="hljs-string">"{color: 'white', 'background-color': 'blue', 'font-size.px': '20'}"</span>&gt;
    你好，世界
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p><strong>讲解：</strong></p>
<ol>
<li>直接设置颜色为 yellow。</li>
<li>设置背景颜色为 backColor，并可以在 .ts 文件中对 backColor 的值进行修改。</li>
<li>设置字体大小，需要注意的是 <code>只写 font-size 会报错，必须在后面加上 .px。</code>当然 .em .% 都是可以的。</li>
<li>前三种都是只设置一个，写 [ngStyle] 可以同时写多个，使用花括号包住里面的内功。需要注意的是<code>连字符 -</code> 是不允许出现在对象的键名当中的，如果使用 background-color 等时需要加上单引号。</li>
</ol>
<h2 id="articleHeader4">ngClass</h2>
<blockquote>作用：动态地设置和改变一个给定 DOM 元素的 CSS类。</blockquote>
<p><strong>例子：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// .scss
.bordered {
    border: 1px dashed black;
    background-color: #eee;
}

// .ts
isBordered: boolean = true;
    
// .html
<div [ngClass]=&quot;{bordered: isBordered}&quot;>
    是否显示边框
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-comment">// .scss</span>
.bordered {
    border: <span class="hljs-number">1</span>px dashed black;
    background-color: <span class="hljs-meta">#eee;</span>
}

<span class="hljs-comment">// .ts</span>
isBordered: <span class="hljs-keyword">boolean</span> = <span class="hljs-keyword">true</span>;
    
<span class="hljs-comment">// .html</span>
&lt;<span class="hljs-keyword">div</span> [ngClass]=<span class="hljs-string">"{bordered: isBordered}"</span>&gt;
    是否显示边框
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p><strong>讲解：</strong></p>
<ul>
<li>scss 中设置了样式，相当于你建了一个 class="bordered"。</li>
<li>ts 中新建了一个 isBordered，用于判断是否显示 .scss 中的样式。</li>
<li>html 中用 isBordered 作为 <code>bordered 是否显示</code> 的判断依据。</li>
</ul>
<h2 id="articleHeader5">ngNonBindable</h2>
<blockquote>作用：告诉 Angular 不要绑定页面的某个部分。</blockquote>
<p><strong>例子：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".html

<div ngNonBindable>
    "{{"我不会被绑定"}}"
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-class">.html</span>

&lt;<span class="hljs-selector-tag">div</span> ngNonBindable&gt;
    "{{"我不会被绑定"}}"
&lt;/div&gt;
</code></pre>
<p><strong>讲解：</strong>  <br>使用了 ngNonBindable ，花括号就会被当做字符串一起显示出来。</p>
<h2 id="articleHeader6">总结</h2>
<p>日常开发中，用 ngFor 和 ngIf 应该是最多的了，所以把他们两个写在了前面。至于 ngNonBindable，我实际开发中一次没用过，也是查着资料测试一遍写下来的。?</p>
<p>喜欢的可以点个赞，有问题的可以在下方留言。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular 4.0 内置指令全攻略

## 原文链接
[https://segmentfault.com/a/1190000010416792](https://segmentfault.com/a/1190000010416792)

