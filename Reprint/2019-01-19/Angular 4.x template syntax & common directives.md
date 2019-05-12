---
title: 'Angular 4.x template syntax & common directives' 
date: 2019-01-19 2:30:10
hidden: true
slug: dpth2hu87r
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>阅读 Angular 6/RxJS 最新教程，请访问<a href="http://www.semlinker.com/" rel="nofollow noreferrer" target="_blank">前端修仙之路</a>
</blockquote>
<h2 id="articleHeader0">模板语法简介</h2>
<h3 id="articleHeader1">插值表达式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>Hello "{{"name"}}"</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello "{{"name"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>等价于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div [textContent]=&quot;interpolate(['Hello'], [name])&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> [<span class="hljs-attr">textContent</span>]=<span class="hljs-string">"interpolate(['Hello'], [name])"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader2">模板表达式</h3>
<h4>属性绑定</h4>
<p>输入属性的值为常量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<show-title title=&quot;Some Title&quot;></show-title>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">show-title</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Some Title"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">show-title</span>&gt;</span></code></pre>
<p>等价于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<show-title [title]=&quot;'Some Title'&quot;></show-title>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">show-title</span> [<span class="hljs-attr">title</span>]=<span class="hljs-string">"'Some Title'"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">show-title</span>&gt;</span></code></pre>
<p>输入属性的值为实例属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<show-title [title]=&quot;title&quot;></show-title>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">show-title</span> [<span class="hljs-attr">title</span>]=<span class="hljs-string">"title"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">show-title</span>&gt;</span></code></pre>
<p>等价于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<show-title bind-title=&quot;title&quot;></show-title>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">show-title</span> <span class="hljs-attr">bind-title</span>=<span class="hljs-string">"title"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">show-title</span>&gt;</span></code></pre>
<h4>事件绑定</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<date-picker (dateChanged)=&quot;statement()&quot;></date-picker>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">date-picker</span> (<span class="hljs-attr">dateChanged</span>)=<span class="hljs-string">"statement()"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">date-picker</span>&gt;</span></code></pre>
<p>等价于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<date-picker on-dateChanged=&quot;statement()&quot;></date-picker>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">date-picker</span> <span class="hljs-attr">on-dateChanged</span>=<span class="hljs-string">"statement()"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">date-picker</span>&gt;</span></code></pre>
<h4>模板引用变量</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video-player #player></video-player> 
<button (click)=&quot;player.pause()&quot;>Pause</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">video-player</span> #<span class="hljs-attr">player</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video-player</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"player.pause()"</span>&gt;</span>Pause<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>等价于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video-player ref-player></video-player>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">video-player</span> <span class="hljs-attr">ref-player</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video-player</span>&gt;</span></code></pre>
<h4>双向绑定</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input [ngModel]=&quot;todo.text&quot; (ngModelChange)=&quot;todo.text=$event&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> [<span class="hljs-attr">ngModel</span>]=<span class="hljs-string">"todo.text"</span> (<span class="hljs-attr">ngModelChange</span>)=<span class="hljs-string">"todo.text=$event"</span>&gt;</span></code></pre>
<p>等价于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input [(ngModel)]=&quot;todo.text&quot;> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">"todo.text"</span>&gt;</span> </code></pre>
<h4>
<code>*</code> 与 <code>&lt;template&gt;</code>
</h4>
<p><code>*ngIf</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<hero-detail *ngIf=&quot;currentHero&quot; [hero]=&quot;currentHero&quot;></hero-detail>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">hero-detail</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"currentHero"</span> [<span class="hljs-attr">hero</span>]=<span class="hljs-string">"currentHero"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hero-detail</span>&gt;</span></code></pre>
<p>最终转换为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template [ngIf]=&quot;currentHero&quot;>
  <hero-detail [hero]=&quot;currentHero&quot;></hero-detail>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> [<span class="hljs-attr">ngIf</span>]=<span class="hljs-string">"currentHero"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">hero-detail</span> [<span class="hljs-attr">hero</span>]=<span class="hljs-string">"currentHero"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hero-detail</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p><code>*ngFor</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<hero-detail *ngFor=&quot;let hero of heroes; trackBy:trackByHeroes&quot; 
    [hero]=&quot;hero&quot;>
</hero-detail>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">hero-detail</span> *<span class="hljs-attr">ngFor</span>=<span class="hljs-string">"let hero of heroes; trackBy:trackByHeroes"</span> 
    [<span class="hljs-attr">hero</span>]=<span class="hljs-string">"hero"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">hero-detail</span>&gt;</span></code></pre>
<p>最终转换为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template ngFor let-hero [ngForOf]=&quot;heroes&quot; [ngForTrackBy]=&quot;trackByHeroes&quot;>
  <hero-detail [hero]=&quot;hero&quot;></hero-detail>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">ngFor</span> <span class="hljs-attr">let-hero</span> [<span class="hljs-attr">ngForOf</span>]=<span class="hljs-string">"heroes"</span> [<span class="hljs-attr">ngForTrackBy</span>]=<span class="hljs-string">"trackByHeroes"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">hero-detail</span> [<span class="hljs-attr">hero</span>]=<span class="hljs-string">"hero"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hero-detail</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<h2 id="articleHeader3">常用指令简介</h2>
<h3 id="articleHeader4">NgIf</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div *ngIf=&quot;false&quot;></div> <!-- never displayed -->
<div *ngIf=&quot;a > b&quot;></div> <!-- displayed if a is more than b -->
<div *ngIf=&quot;str == 'yes'&quot;></div> <!-- displayed if str holds the string &quot;yes&quot; -->
<div *ngIf=&quot;myFunc()&quot;></div> <!-- displayed if myFunc returns a true value -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"false"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> <span class="hljs-comment">&lt;!-- never displayed --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"a &gt; b"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> <span class="hljs-comment">&lt;!-- displayed if a is more than b --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"str == 'yes'"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> <span class="hljs-comment">&lt;!-- displayed if str holds the string "yes" --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"myFunc()"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> <span class="hljs-comment">&lt;!-- displayed if myFunc returns a true value --&gt;</span></code></pre>
<h3 id="articleHeader5">NgSwitch</h3>
<p>有时候需要根据不同的条件，渲染不同的元素，此时我们可以使用多个 <code>ngIf</code> 来实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
    <div *ngIf=&quot;myVar == 'A'&quot;>Var is A</div>
    <div *ngIf=&quot;myVar == 'B'&quot;>Var is B</div>
    <div *ngIf=&quot;myVar != 'A' &amp;&amp; myVar != 'B'&quot;>Var is something else</div>
</div>    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"myVar == 'A'"</span>&gt;</span>Var is A<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"myVar == 'B'"</span>&gt;</span>Var is B<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"myVar != 'A' &amp;&amp; myVar != 'B'"</span>&gt;</span>Var is something else<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>    </code></pre>
<p>如果 <code>myVar</code> 的可选值多了一个 <code>'C'</code>，就得相应增加判断逻辑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
    <div *ngIf=&quot;myVar == 'A'&quot;>Var is A</div>
    <div *ngIf=&quot;myVar == 'B'&quot;>Var is B</div>
    <div *ngIf=&quot;myVar == 'C'&quot;>Var is C</div>
    <div *ngIf=&quot;myVar != 'A' &amp;&amp; myVar != 'B' &amp;&amp; myVar != 'C'&quot;>
      Var is something else
      </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"myVar == 'A'"</span>&gt;</span>Var is A<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"myVar == 'B'"</span>&gt;</span>Var is B<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"myVar == 'C'"</span>&gt;</span>Var is C<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"myVar != 'A' &amp;&amp; myVar != 'B' &amp;&amp; myVar != 'C'"</span>&gt;</span>
      Var is something else
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>可以发现 <code> Var is something else</code> 的判断逻辑，会随着 <code>myVar</code>  可选值的新增，变得越来越复杂。遇到这种情景，我们可以使用 <code>ngSwitch</code> 指令。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot; [ngSwitch]=&quot;myVar&quot;>
    <div *ngSwitchCase=&quot;'A'&quot;>Var is A</div>
    <div *ngSwitchCase=&quot;'B'&quot;>Var is B</div>
    <div *ngSwitchCase=&quot;'C'&quot;>Var is C</div>
    <div *ngSwitchDefault>Var is something else</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span> [<span class="hljs-attr">ngSwitch</span>]=<span class="hljs-string">"myVar"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngSwitchCase</span>=<span class="hljs-string">"'A'"</span>&gt;</span>Var is A<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngSwitchCase</span>=<span class="hljs-string">"'B'"</span>&gt;</span>Var is B<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngSwitchCase</span>=<span class="hljs-string">"'C'"</span>&gt;</span>Var is C<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> *<span class="hljs-attr">ngSwitchDefault</span>&gt;</span>Var is something else<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader6">NgStyle</h3>
<p>NgStyle 让我们可以方便得通过 Angular 表达式，设置 DOM 元素的 CSS 属性。</p>
<ul><li>设置元素的背景颜色</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div [style.background-color=&quot;'yellow'&quot;]>
  Use fixed yellow background
</div> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> [<span class="hljs-attr">style.background-color</span>=<span class="hljs-string">"'yellow'"</span>]&gt;</span>
  Use fixed yellow background
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> </code></pre>
<ul><li>设置元素的字体大小</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 支持单位: px | em | %-->
<div>
   <span [ngStyle]=&quot;{color: 'red'}&quot; [style.font-size.px]=&quot;fontSize&quot;>
      red text
   </span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 支持单位: px | em | %--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">span</span> [<span class="hljs-attr">ngStyle</span>]=<span class="hljs-string">"{color: 'red'}"</span> [<span class="hljs-attr">style.font-size.px</span>]=<span class="hljs-string">"fontSize"</span>&gt;</span>
      red text
   <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>NgStyle 支持通过键值对的形式设置 DOM 元素的样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div [ngStyle]=&quot;{color: 'white', 'background-color': 'blue'}&quot;>
   Uses fixed white text on blue background
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> [<span class="hljs-attr">ngStyle</span>]=<span class="hljs-string">"{color: 'white', 'background-color': 'blue'}"</span>&gt;</span>
   Uses fixed white text on blue background
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>注意到 <code>background-color</code> 需要使用单引号，而 <code>color</code> 不需要。这其中的原因是，<code>ng-style</code> 要求的参数是一个 <code>Javascript</code> 对象，<code>color</code> 是一个有效的 <code>key</code>，而 <code>background-color</code> 不是一个有效的 <code>key</code> ，所以需要添加 <code>''</code>。</p>
<blockquote>NgStyle 源码片段</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Directive({selector: '[ngStyle]'})
export class NgStyle implements DoCheck {
  private _ngStyle: {[key: string]: string};
  private _differ: KeyValueDiffer<string, string|number>;

  constructor(
    private _differs: KeyValueDiffers, 
    private _ngEl: ElementRef, 
    private _renderer: Renderer) {}

  @Input()
  set ngStyle(v: {[key: string]: string}) { 
    // <div [ngStyle]=&quot;{color: 'white', 'background-color': 'blue'}&quot;>
    this._ngStyle = v;
    if (!this._differ &amp;&amp; v) {
      this._differ = this._differs.find(v).create();
    }
  }
 
  // 设置元素的样式
  private _setStyle(nameAndUnit: string, value: string|number): void {
    const [name, unit] = nameAndUnit.split('.'); // 截取样式名和单位
    value = value != null &amp;&amp; unit ? `${value}${unit}` : value;

    this._renderer.setElementStyle(this._ngEl.nativeElement, name, value as string);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Directive</span>({selector: <span class="hljs-string">'[ngStyle]'</span>})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> NgStyle <span class="hljs-keyword">implements</span> DoCheck {
  <span class="hljs-keyword">private</span> _ngStyle: {[key: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span>};
  <span class="hljs-keyword">private</span> _differ: KeyValueDiffer&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>|<span class="hljs-built_in">number</span>&gt;;

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params">
    <span class="hljs-keyword">private</span> _differs: KeyValueDiffers, 
    <span class="hljs-keyword">private</span> _ngEl: ElementRef, 
    <span class="hljs-keyword">private</span> _renderer: Renderer</span>) {}

  <span class="hljs-meta">@Input</span>()
  <span class="hljs-keyword">set</span> ngStyle(v: {[key: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span>}) { 
    <span class="hljs-comment">// &lt;div [ngStyle]="{color: 'white', 'background-color': 'blue'}"&gt;</span>
    <span class="hljs-keyword">this</span>._ngStyle = v;
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>._differ &amp;&amp; v) {
      <span class="hljs-keyword">this</span>._differ = <span class="hljs-keyword">this</span>._differs.find(v).create();
    }
  }
 
  <span class="hljs-comment">// 设置元素的样式</span>
  <span class="hljs-keyword">private</span> _setStyle(nameAndUnit: <span class="hljs-built_in">string</span>, value: <span class="hljs-built_in">string</span>|<span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">const</span> [name, unit] = nameAndUnit.split(<span class="hljs-string">'.'</span>); <span class="hljs-comment">// 截取样式名和单位</span>
    value = value != <span class="hljs-literal">null</span> &amp;&amp; unit ? <span class="hljs-string">`<span class="hljs-subst">${value}</span><span class="hljs-subst">${unit}</span>`</span> : value;

    <span class="hljs-keyword">this</span>._renderer.setElementStyle(<span class="hljs-keyword">this</span>._ngEl.nativeElement, name, value <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>);
  }
}</code></pre>
<h3 id="articleHeader7">NgClass</h3>
<p>NgClass 接收一个对象字面量，对象的 <code>key</code> 是 CSS class 的名称，<code>value</code> 的值是 <code>truthy/falsy</code> 的值，表示是否应用该样式。</p>
<ul><li>CSS Class</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bordered {
    border: 1px dashed black; background-color: #eee;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.bordered</span> {
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> dashed black; <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#eee</span>;
}</code></pre>
<ul><li>HTML</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Use boolean value -->
<div [ngClass]=&quot;{bordered: false}&quot;>This is never bordered</div>
<div [ngClass]=&quot;{bordered: true}&quot;>This is always bordered</div>

<!-- Use component instance property -->
<div [ngClass]=&quot;{bordered: isBordered}&quot;>
   Using object literal. Border "{{" isBordered ? &quot;ON&quot; : &quot;OFF&quot; "}}"
</div>

<!-- Class names contains dashes -->
<div[ngClass]=&quot;{'bordered-box': false}&quot;>
   Class names contains dashes must use single quote
</div>

<!-- Use a list of class names -->
<div class=&quot;base&quot; [ngClass]=&quot;['blue', 'round']&quot;> 
  This will always have a blue background and round corners
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- Use boolean value --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> [<span class="hljs-attr">ngClass</span>]=<span class="hljs-string">"{bordered: false}"</span>&gt;</span>This is never bordered<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> [<span class="hljs-attr">ngClass</span>]=<span class="hljs-string">"{bordered: true}"</span>&gt;</span>This is always bordered<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Use component instance property --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> [<span class="hljs-attr">ngClass</span>]=<span class="hljs-string">"{bordered: isBordered}"</span>&gt;</span>
   Using object literal. Border "{{" isBordered ? "ON" : "OFF" "}}"
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Class names contains dashes --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div[ngClass]="{'bordered-box':</span> <span class="hljs-attr">false</span>}"&gt;</span>
   Class names contains dashes must use single quote
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Use a list of class names --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"base"</span> [<span class="hljs-attr">ngClass</span>]=<span class="hljs-string">"['blue', 'round']"</span>&gt;</span> 
  This will always have a blue background and round corners
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader8">NgFor</h3>
<p>NgFor 指令用来根据集合(数组) ，创建 <code>DOM</code> 元素，类似于 <code>ng1</code> 中 <code>ng-repeat</code> 指令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;ui list&quot; *ngFor=&quot;let c of cities; let num = index&quot;> 
  <div class=&quot;item&quot;>"{{" num+1 "}}" - "{{" c "}}"</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ui list"</span> *<span class="hljs-attr">ngFor</span>=<span class="hljs-string">"let c of cities; let num = index"</span>&gt;</span> 
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>"{{" num+1 "}}" - "{{" c "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>使用 <code>trackBy</code> 提高列表的性能</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'my-app',
  template: `
    <ul>
      <li *ngFor=&quot;let item of collection;trackBy: trackByFn&quot;>"{{"item.id"}}"</li>
    </ul>
    <button (click)=&quot;getItems()&quot;>Refresh items</button>
  `,
})
export class App {

  constructor() {
    this.collection = [{id: 1}, {id: 2}, {id: 3}];
  }
  
  getItems() {
    this.collection = this.getItemsFromServer();
  }
  
  getItemsFromServer() {
    return [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
  }
  
  trackByFn(index, item) {
    return index; // or item.id
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'my-app'</span>,
  template: <span class="hljs-string">`
    &lt;ul&gt;
      &lt;li *ngFor="let item of collection;trackBy: trackByFn"&gt;"{{"item.id"}}"&lt;/li&gt;
    &lt;/ul&gt;
    &lt;button (click)="getItems()"&gt;Refresh items&lt;/button&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> App {

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">this</span>.collection = [{id: <span class="hljs-number">1</span>}, {id: <span class="hljs-number">2</span>}, {id: <span class="hljs-number">3</span>}];
  }
  
  getItems() {
    <span class="hljs-keyword">this</span>.collection = <span class="hljs-keyword">this</span>.getItemsFromServer();
  }
  
  getItemsFromServer() {
    <span class="hljs-keyword">return</span> [{id: <span class="hljs-number">1</span>}, {id: <span class="hljs-number">2</span>}, {id: <span class="hljs-number">3</span>}, {id: <span class="hljs-number">4</span>}];
  }
  
  trackByFn(index, item) {
    <span class="hljs-keyword">return</span> index; <span class="hljs-comment">// or item.id</span>
  }
}</code></pre>
<h3 id="articleHeader9">NgNonBindable</h3>
<p>ngNonBindable 指令用于告诉 Angular 编译器，无需编译页面中某个特定的HTML代码片段。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class='ngNonBindableDemo'>
    <span class=&quot;bordered&quot;>"{{" content "}}"</span>
    <span class=&quot;pre&quot; ngNonBindable>
      &amp;larr; This is what "{{" content "}}" rendered
    </span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'ngNonBindableDemo'</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bordered"</span>&gt;</span>"{{" content "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pre"</span> <span class="hljs-attr">ngNonBindable</span>&gt;</span>
      &amp;larr; This is what "{{" content "}}" rendered
    <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h2 id="articleHeader10">Angular 4.x 新特性</h2>
<h3 id="articleHeader11">If...Else Template Conditions</h3>
<h4>语法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<element *ngIf=&quot;[condition expression]; else [else template]&quot;></element>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">element</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"[condition expression]; else [else template]"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">element</span>&gt;</span></code></pre>
<h4>使用示例</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ng-template #hidden>
  <p>You are not allowed to see our secret</p>
</ng-template>
<p *ngIf=&quot;shown; else hidden&quot;>
  Our secret is being happy
</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ng-template</span> #<span class="hljs-attr">hidden</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>You are not allowed to see our secret<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ng-template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> *<span class="hljs-attr">ngIf</span>=<span class="hljs-string">"shown; else hidden"</span>&gt;</span>
  Our secret is being happy
<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<h3 id="articleHeader12">
<code>&lt;template&gt;</code>  —&gt; <code>&lt;ng-template&gt;</code>
</h3>
<h4>使用示例</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'exe-app',
  template: `
   <ng-template #fetching>
      <p>Fetching...</p>
   </ng-template>
   <p *ngIf=&quot;auth | async; else fetching; let user&quot;>
      "{{"user.username "}}"
   </p>
  `,
})
export class AppComponent implements OnInit {
  auth: Observable<{}>;

  ngOnInit() {
    this.auth = Observable
      .of({ username: 'semlinker', password: 'segmentfault' })
      .delay(new Date(Date.now() + 2000));
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { Observable } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs/Observable'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/observable/of'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/operator/delay'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'exe-app'</span>,
  template: <span class="hljs-string">`
   &lt;ng-template #fetching&gt;
      &lt;p&gt;Fetching...&lt;/p&gt;
   &lt;/ng-template&gt;
   &lt;p *ngIf="auth | async; else fetching; let user"&gt;
      "{{"user.username "}}"
   &lt;/p&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent <span class="hljs-keyword">implements</span> OnInit {
  auth: Observable&lt;{}&gt;;

  ngOnInit() {
    <span class="hljs-keyword">this</span>.auth = Observable
      .of({ username: <span class="hljs-string">'semlinker'</span>, password: <span class="hljs-string">'segmentfault'</span> })
      .delay(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-built_in">Date</span>.now() + <span class="hljs-number">2000</span>));
  }
}</code></pre>
<h2 id="articleHeader13">我有话说</h2>
<h3 id="articleHeader14">使用 <code>[hidden]</code> 属性控制元素可见性存在的问题</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div [hidden]=&quot;!showGreeting&quot;>
  Hello, there!
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> [<span class="hljs-attr">hidden</span>]=<span class="hljs-string">"!showGreeting"</span>&gt;</span>
  Hello, there!
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>上面的代码在通常情况下，都能正常工作。但当在对应的 DOM 元素上设置 <code>display: flex</code> 属性时，尽管<code>[hidden]</code> 对应的表达式为 <code>true</code>，但元素却能正常显示。对于这种特殊情况，则推荐使用 <code>*ngIf</code>。</p>
<h3 id="articleHeader15">直接使用 <code>DOM</code> API 获取页面上的元素存在的问题</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'my-comp',
  template: `
    <input type=&quot;text&quot; />
    <div> Some other content </div>
  `
})
export class MyComp {
  constructor(el: ElementRef) {
    el.nativeElement.querySelector('input').focus();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'my-comp'</span>,
  template: <span class="hljs-string">`
    &lt;input type="text" /&gt;
    &lt;div&gt; Some other content &lt;/div&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> MyComp {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params">el: ElementRef</span>) {
    el.nativeElement.querySelector(<span class="hljs-string">'input'</span>).focus();
  }
}</code></pre>
<p>以上的代码直接通过 <code>querySelector()</code> 获取页面中的元素，通常不推荐使用这种方式。更好的方案是使用 <code>@ViewChild</code> 和模板变量，具体示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'my-comp',
  template: `
    <input #myInput type=&quot;text&quot; />
    <div> Some other content </div>
  `
})
export class MyComp implements AfterViewInit {
  @ViewChild('myInput') input: ElementRef;

  constructor(private renderer: Renderer) {}

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(
        this.input.nativeElement, 'focus');
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'my-comp'</span>,
  template: <span class="hljs-string">`
    &lt;input #myInput type="text" /&gt;
    &lt;div&gt; Some other content &lt;/div&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> MyComp <span class="hljs-keyword">implements</span> AfterViewInit {
  <span class="hljs-meta">@ViewChild</span>(<span class="hljs-string">'myInput'</span>) input: ElementRef;

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> renderer: Renderer</span>) {}

  ngAfterViewInit() {
    <span class="hljs-keyword">this</span>.renderer.invokeElementMethod(
        <span class="hljs-keyword">this</span>.input.nativeElement, <span class="hljs-string">'focus'</span>);
    }
}</code></pre>
<p>另外值得注意的是，<code>@ViewChild()</code> 属性装饰器，还支持设置返回对象的类型，具体使用方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@ViewChild('myInput') myInput1: ElementRef;
@ViewChild('myInput', {read: ViewContainerRef}) myInput2: ViewContainerRef;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@ViewChild</span>(<span class="hljs-string">'myInput'</span>) myInput1: ElementRef;
<span class="hljs-meta">@ViewChild</span>(<span class="hljs-string">'myInput'</span>, {read: ViewContainerRef}) myInput2: ViewContainerRef;</code></pre>
<p>若未设置 <code>read</code> 属性，则默认返回的是 <code>ElementRef</code> 对象实例。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular 4.x template syntax & common directives

## 原文链接
[https://segmentfault.com/a/1190000008625978](https://segmentfault.com/a/1190000008625978)

