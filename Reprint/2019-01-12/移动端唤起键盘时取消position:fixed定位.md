---
title: '移动端唤起键盘时取消position:fixed定位' 
date: 2019-01-12 2:30:24
hidden: true
slug: xfd2l08llsn
categories: [reprint]
---

{{< raw >}}

                    
<p>当在移动端按钮position:fixed;底部bottom:0;</p>
<p>固定定位后，当唤起键盘输入数据时就会出现很头疼的问题：</p>
<p>固定在底部的按钮会被系统自带的键盘挤上去，占用输入框位置；</p>
<p>如图：</p>
<p><span class="img-wrap"><img data-src="/img/bVPmP7?w=315&amp;h=558" src="https://static.alili.tech/img/bVPmP7?w=315&amp;h=558" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>怎么样才能让按钮固定底部，后面找到了两种方式。</p>
<p>HTML</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;submit&quot;>
     <button type=&quot;button&quot; class=&quot;btn&quot;>提交信息</button>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"submit"</span>&gt;
     &lt;button <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"button"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"btn"</span>&gt;提交信息&lt;/button&gt;
&lt;/div&gt;</code></pre>
<p>css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".submit {
    display: flex;
    width: 100%;
    justify-content: center;
    position: fixed;
    bottom: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.submit</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p>1.第一种</p>
<p>通过输入框input获取焦点/移除焦点 来控制按钮的position样式；</p>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;input,textarea&quot;).focus(function(){
      $(&quot;.submit&quot;).css(&quot;position&quot;,&quot;static&quot;);
}).blur(function(){
   $(&quot;.submit&quot;).css(&quot;position&quot;,&quot;fixed&quot;);            
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">"input,textarea"</span>).focus(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      $(<span class="hljs-string">".submit"</span>).css(<span class="hljs-string">"position"</span>,<span class="hljs-string">"static"</span>);
}).blur(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   $(<span class="hljs-string">".submit"</span>).css(<span class="hljs-string">"position"</span>,<span class="hljs-string">"fixed"</span>);            
});</code></pre>
<p>效果是实现了，但是后面发现一个问题，如图：</p>
<p><span class="img-wrap"><img data-src="/img/bVPmOL?w=317&amp;h=558" src="https://static.alili.tech/img/bVPmOL?w=317&amp;h=558" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>会发现按键没有显示完整。</p>
<p>2.第二种</p>
<p>需要了解 resize()</p>
<p>通过resize() 方法触发 resize 事件，或规定当发生 resize 事件时运行的函数。</p>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var windheight = $(window).height();  /*未唤起键盘时当前窗口高度*/
        
$(window).resize(function(){
   var docheight = $(window).height();  /*唤起键盘时当前窗口高度*/        
   if(docheight < windheight){            /*当唤起键盘高度小于未唤起键盘高度时执行*/
      $(&quot;.submit&quot;).css(&quot;position&quot;,&quot;static&quot;);
   }else{
      $(&quot;.submit&quot;).css(&quot;position&quot;,&quot;fixed&quot;);
   }           
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> windheight = $(<span class="hljs-built_in">window</span>).height();  <span class="hljs-comment">/*未唤起键盘时当前窗口高度*/</span>
        
$(<span class="hljs-built_in">window</span>).resize(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   <span class="hljs-keyword">var</span> docheight = $(<span class="hljs-built_in">window</span>).height();  <span class="hljs-comment">/*唤起键盘时当前窗口高度*/</span>        
   <span class="hljs-keyword">if</span>(docheight &lt; windheight){            <span class="hljs-comment">/*当唤起键盘高度小于未唤起键盘高度时执行*/</span>
      $(<span class="hljs-string">".submit"</span>).css(<span class="hljs-string">"position"</span>,<span class="hljs-string">"static"</span>);
   }<span class="hljs-keyword">else</span>{
      $(<span class="hljs-string">".submit"</span>).css(<span class="hljs-string">"position"</span>,<span class="hljs-string">"fixed"</span>);
   }           
});</code></pre>
<p>运行后显示效果</p>
<p>唤起时：</p>
<p><span class="img-wrap"><img data-src="/img/bVPmPP?w=364&amp;h=488" src="https://static.alili.tech/img/bVPmPP?w=364&amp;h=488" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>取消时：</p>
<p><span class="img-wrap"><img data-src="/img/bVPmP2?w=313&amp;h=313" src="https://static.alili.tech/img/bVPmP2?w=313&amp;h=313" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这样就完美解决了类似键盘问题，当然这种方式也可以运用到其他场景当中。</p>
<blockquote><p>前端菜鸟，多多指教</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动端唤起键盘时取消position:fixed定位

## 原文链接
[https://segmentfault.com/a/1190000009820183](https://segmentfault.com/a/1190000009820183)

