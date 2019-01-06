---
title: 'angular4 @ViewChild ElementRef renderer' 
date: 2019-01-07 2:30:11
hidden: true
slug: flpr76t41b6
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">angular4 @ViewChild ElementRef  renderer2</h1>
<p>angular 如何操作 DOM ? 这是一个问题, 熟练了 Jquery 就会想引入 Jquery 去操作, 但是这不是一个好办法.</p>
<p>先看看看 ElementRef 和 renderer2 是否满足你的需求:</p>
<h2 id="articleHeader1">选择组件内节点</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--视图  -->
<div #mydiv><input></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--视图  --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> #<span class="hljs-attr">mydiv</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 选择, 括号中的'mydiv'对应 模板中的 #mydiv ,  mydiv: ElementRef 为本组件类的对象

@ViewChild('mydiv') mydiv: ElementRef

// 如果选择子组件直接写组件名,如:

@ViewChild(MatMenuTrigger) userIcon: MatMenuTrigger;

// 返回原生节点
let el = this.mydiv.nativeElement // 

要想有提示断言一下即可, 改成:

let el:HTMLElement = <HTMLElement>this.mydiv.nativeElement 

// 使用原生方法
let ipt = el.querySelector('input')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">// 选择, 括号中的'mydiv'对应 模板中的 #mydiv ,  mydiv: ElementRef 为本组件类的对象</span>

<span class="hljs-meta">@ViewChild</span>(<span class="hljs-string">'mydiv'</span>) mydiv: ElementRef

<span class="hljs-comment">// 如果选择子组件直接写组件名,如:</span>

<span class="hljs-meta">@ViewChild</span>(MatMenuTrigger) userIcon: MatMenuTrigger;

<span class="hljs-comment">// 返回原生节点</span>
<span class="hljs-keyword">let</span> el = <span class="hljs-keyword">this</span>.mydiv.nativeElement <span class="hljs-comment">// </span>

要想有提示断言一下即可, 改成:

<span class="hljs-keyword">let</span> el:HTMLElement = &lt;HTMLElement&gt;<span class="hljs-keyword">this</span>.mydiv.nativeElement 

<span class="hljs-comment">// 使用原生方法</span>
<span class="hljs-keyword">let</span> ipt = el.querySelector(<span class="hljs-string">'input'</span>)
</code></pre>
<h2 id="articleHeader2">@ViewChild @ContentChild @ViewChildren @ContentChildren 又是什么</h2>
<p>@ViewChild 选择组件模板内的节点, 类型 ElementRef 或子组件</p>
<p>@ContentChild 选择当前组件引用的子组件 <code>@ContentChild(组件名)</code></p>
<p>这两哥们看起来是一样的, 区别在于ViewChild选择Shadow DOM, ContentChild 选择 Light DOM,一般情况下用ViewChild就ok了, 有关ShadowDom参见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/%E5%BD%B1%E5%AD%90_DOM" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></p>
<p>@ViewChildren 和 @ContentChildren 则为对应的复数 类型:QueryList&lt;ElementRef&gt;</p>
<h2 id="articleHeader3">renderer2</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 添加类
this.renderer2.addClass(el, 'active')
// 移除了类
this.renderer2.removeClass(el, 'active')
// 设置样式
this.renderer2.setStyle(el, 'height', '10px')
// 移除样式
this.renderer2.removeStyle(el, 'height')
// 设置属性
this.renderer2.setAttribute(el, 'data-id', 'id')
// 移除属性
this.renderer2.removeAttribute(el, 'data-id')
// 设置值
this.renderer2.setValue(ipt, 'some str')
// 监听事件
this.renderer2.listen(el, 'click', (e)=>{console.log(e)}) //el|'window'|'document'|'body'

// 其他类似
createElement 创建元素
createComment 动态创建组件
createText 创建文本节点
destroyNode 销毁节点
appendChild 插入子节点
insertBefore (parent: any, newChild: any, refChild: any): void
removeChild(parent: any, oldChild: any): void 移除子元素
selectRootElement(selectorOrNode: string|any): any
parentNode(node: any): any
nextSibling(node: any): any" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">// 添加类</span>
<span class="hljs-keyword">this</span>.renderer2.addClass(el, <span class="hljs-string">'active'</span>)
<span class="hljs-comment">// 移除了类</span>
<span class="hljs-keyword">this</span>.renderer2.removeClass(el, <span class="hljs-string">'active'</span>)
<span class="hljs-comment">// 设置样式</span>
<span class="hljs-keyword">this</span>.renderer2.setStyle(el, <span class="hljs-string">'height'</span>, <span class="hljs-string">'10px'</span>)
<span class="hljs-comment">// 移除样式</span>
<span class="hljs-keyword">this</span>.renderer2.removeStyle(el, <span class="hljs-string">'height'</span>)
<span class="hljs-comment">// 设置属性</span>
<span class="hljs-keyword">this</span>.renderer2.setAttribute(el, <span class="hljs-string">'data-id'</span>, <span class="hljs-string">'id'</span>)
<span class="hljs-comment">// 移除属性</span>
<span class="hljs-keyword">this</span>.renderer2.removeAttribute(el, <span class="hljs-string">'data-id'</span>)
<span class="hljs-comment">// 设置值</span>
<span class="hljs-keyword">this</span>.renderer2.setValue(ipt, <span class="hljs-string">'some str'</span>)
<span class="hljs-comment">// 监听事件</span>
<span class="hljs-keyword">this</span>.renderer2.listen(el, <span class="hljs-string">'click'</span>, <span class="hljs-function">(<span class="hljs-params">e</span>)=&gt;</span>{<span class="hljs-built_in">console</span>.log(e)}) <span class="hljs-comment">//el|'window'|'document'|'body'</span>

<span class="hljs-comment">// 其他类似</span>
createElement 创建元素
createComment 动态创建组件
createText 创建文本节点
destroyNode 销毁节点
appendChild 插入子节点
insertBefore (parent: <span class="hljs-built_in">any</span>, newChild: <span class="hljs-built_in">any</span>, refChild: <span class="hljs-built_in">any</span>): <span class="hljs-built_in">void</span>
removeChild(parent: <span class="hljs-built_in">any</span>, oldChild: <span class="hljs-built_in">any</span>): <span class="hljs-built_in">void</span> 移除子元素
selectRootElement(selectorOrNode: <span class="hljs-built_in">string</span>|<span class="hljs-built_in">any</span>): <span class="hljs-built_in">any</span>
parentNode(node: <span class="hljs-built_in">any</span>): <span class="hljs-built_in">any</span>
nextSibling(node: <span class="hljs-built_in">any</span>): <span class="hljs-built_in">any</span></code></pre>
<p>虽然大面积地操作dom没有 Jquery 方便, 比如要做一个编辑器, 但是常规的用途建议使用 renderer2 而不是 引入Jquery</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
angular4 @ViewChild ElementRef renderer

## 原文链接
[https://segmentfault.com/a/1190000010300160](https://segmentfault.com/a/1190000010300160)

