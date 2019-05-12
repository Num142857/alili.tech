---
title: 'React开发 获取不到当前触发事件的元素' 
date: 2019-02-09 2:30:59
hidden: true
slug: xngdlbl5vmm
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>应用场景：一组列表，需获取当前触发 <code>onClick</code> 事件元素上的 <code>data-key</code> ；</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVCyue?w=346&amp;h=336" src="https://static.alili.tech/img/bVCyue?w=346&amp;h=336" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>就一个事件冒泡导致的问题；<br>初步没解决方案是给 <code>li</code> 下的所有子元素都加上 <code>data-key</code><br>显然这是很很很笨的方法，仅为当时测试用。</p>
<p>实在不行，其他地方也要解决这个问题<br>就停下脚步</p>
<p>得深挖下，事件捕捉/冒泡的过程（有空补全）</p>
<p>既然是子元素冒泡上来了，就得去子元素下阻止冒泡<br>想了5秒，子元素下要有100个元素且不是。。。。。</p>
<p>到这里就要另外办法了，看下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleMsglistStar(e){
    console.log(e.currentTarget);  //拿到当前触发 onClick事件的元素      
    e.stopPropagation();
    e.preventDefault();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">handleMsglistStar</span>(e){
    <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(e.currentTarget);  <span class="hljs-comment">//拿到当前触发 onClick事件的元素      </span>
    <span class="hljs-selector-tag">e</span><span class="hljs-selector-class">.stopPropagation</span>();
    <span class="hljs-selector-tag">e</span><span class="hljs-selector-class">.preventDefault</span>();
}</code></pre>
<p>跑一遍，还是不行。。。<br>去查了一下 JavaScript event对象属性方法</p>
<ul>
<li>
<code>currentTarget</code>    返回其事件监听器触发该事件的元素。</li>
<li>
<code>target</code>    返回触发此事件的元素（事件的目标节点）。</li>
</ul>
<hr>
<ul>
<li>
<code>target</code> 触发事件的元素。尽管事件是绑定在 <code>li</code> 上的，点 <code>div.item-content</code> 触发的就是 <code>div.item-content</code>。</li>
<li>
<code>currentTarget</code> 事件绑定的元素。事件绑定在 <code>li</code> 不管你点谁 触发的总是 <code>li</code>
</li>
</ul>
<p><strong>解决无法获取到当前触发事件的元素</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleMsglistStar(e){
    console.log(e.currentTarget)
    console.log(e.currentTarget.getAttribute('data-key'))
    //这样就能拿到绑定在 li 上的信息了
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">handleMsglistStar</span><span class="hljs-params">(e)</span></span>{
    console.log(e.currentTarget)
    console.log(e<span class="hljs-selector-class">.currentTarget</span><span class="hljs-selector-class">.getAttribute</span>(<span class="hljs-string">'data-key'</span>))
    <span class="hljs-comment">//这样就能拿到绑定在 li 上的信息了</span>
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{this.props.textList.map(item => (
    <li data-key={key} onClick={this.props.handleShowInfo}>
        <div className=&quot;item-content&quot;>
            <div className=&quot;item-media&quot;><img src={item.headimgurl} /></div>
            <div className=&quot;item-inner&quot;></div>
        </div>
    </li>
))}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>{this<span class="hljs-selector-class">.props</span><span class="hljs-selector-class">.textList</span><span class="hljs-selector-class">.map</span>(item =&gt; (
    &lt;<span class="hljs-selector-tag">li</span> data-key={key} onClick={this<span class="hljs-selector-class">.props</span><span class="hljs-selector-class">.handleShowInfo</span>}&gt;
        &lt;<span class="hljs-selector-tag">div</span> className=<span class="hljs-string">"item-content"</span>&gt;
            &lt;<span class="hljs-selector-tag">div</span> className=<span class="hljs-string">"item-media"</span>&gt;&lt;<span class="hljs-selector-tag">img</span> src={item.headimgurl} /&gt;&lt;/div&gt;
            &lt;<span class="hljs-selector-tag">div</span> className=<span class="hljs-string">"item-inner"</span>&gt;&lt;/div&gt;
        &lt;/div&gt;
    &lt;/li&gt;
))}</code></pre>
<blockquote><p>结语：反正我目前找到的最好的解决方法，匆匆忙忙下班时间搞个文章记录；不太全面，有些东西一笔过，遇到过这个问题的，一看就能明白，如有不正之处，欢迎指正。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React开发 获取不到当前触发事件的元素

## 原文链接
[https://segmentfault.com/a/1190000005614930](https://segmentfault.com/a/1190000005614930)

