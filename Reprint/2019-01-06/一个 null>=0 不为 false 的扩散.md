---
title: '一个 null>=0 不为 false 的扩散' 
date: 2019-01-06 2:30:10
hidden: true
slug: 76sfxfg8ify
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一个 <code>null&gt;=0</code> 不为 <code>false</code> 的扩散</h2>
<blockquote><p>作为一个 javascript 老司机今日却不小心在 boolean 判断不慎掉坑了，特此记录，并扩散梳理一下知识点。</p></blockquote>
<p>今天我写了一段这样的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="className={this.props.notvisitday >= 0 || this.props.visitday >=0 ? null : &quot;active&quot; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;">className={<span class="hljs-keyword">this</span>.props.notvisitday &gt;= <span class="hljs-number">0</span> || <span class="hljs-keyword">this</span>.props.visitday &gt;=<span class="hljs-number">0</span> ? <span class="hljs-literal">null</span> : <span class="hljs-string">"active"</span> }</code></pre>
<p>在我的思维模式中 当 <code>notvisitday</code> 和 <code>visitday</code> 只有有一个是数字或者数字字符串时，<code>className</code> 就要为 <code>active</code>，出乎意料的是 <code>className</code> 一直为 <code>null</code>。后面断点排查才发现 只要一个属性为 <code>null</code> 时就可以为 <code>true</code>。</p>
<p>于是我在控制台打下这串代码作为验证：</p>
<p><span class="img-wrap"><img data-src="/img/bVRFXu?w=440&amp;h=482" src="https://static.alili.tech/img/bVRFXu?w=440&amp;h=482" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>于是，我通过查阅资料加上自己的理解，有了以下判断和总结：</p>
<ul>
<li><p><code>&gt;</code> <code>&gt;=</code> 和 <code>==</code> 并不是同一层次的 boolean判断，在''''进行 <code>&gt; &gt;= &lt; &lt;=</code>判断是比较式两侧进行隐式转换为number类型。</p></li>
<li><p>所以 <code>null == 0</code> 为false。</p></li>
<li><p>而 <code>null &gt;= 0</code> or <code>null &gt; 0</code> 时候 null隐式转换成 <code>Number(null)</code> 为 <code>0</code>。</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVRFXO?w=360&amp;h=106" src="https://static.alili.tech/img/bVRFXO?w=360&amp;h=106" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>而 <code>Number(undefined)</code> 和 <code>var a={};Number(a);</code> 则为 <code>NaN</code>。</p></li></ul>
<p>此这个概念又一个大胆的想法，我又试验了</p>
<p><span class="img-wrap"><img data-src="/img/bVRFXX?w=292&amp;h=372" src="https://static.alili.tech/img/bVRFXX?w=292&amp;h=372" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>无一例外，用 <code>Number</code>方法可以强制换成0的都可以 <code>&gt;=0</code>为真。</p>
<h4>！！?但是，为什么连<code>null</code> / <code>[]</code>都可以偏偏<code>{}</code>空对象不可以转换成数字。</h4>
<p>因为 <code>Number([])</code> 和 <code>Number({})</code> 会首先调用各自的valueOf方法，如果没有得到期望值就会调用<code>toString</code>方法，他们的<code>toString方法的值分别为 </code>""<code> ， </code>"[object Object]"`;<br>所以 一个为<code>0</code>，一个为<code>NaN</code>。</p>
<p>值得一提的是 <code>array</code> 跟 <code>object</code> 的 <code>toString</code> 结果不一样是因为，<code>Array.protptype</code> 的 <code>toString</code> 覆盖了 <code>Object.proptype</code> 的 <code>toString</code>。</p>
<blockquote><p>如果你认为这是胡乱猜测，这里我贴上javascript高级程序的一段<code>Number</code>函数的转换规则：</p></blockquote>
<ul>
<li><p>如果是 <code>Boolean</code> 值，true 和 false 分别被转换成 1 和 0。</p></li>
<li><p>如果是数字值，只是简单的传入和返回。</p></li>
<li><p>如果是 null 值，返回 0。</p></li>
<li><p>如果是 undefined ，返回 NaN。</p></li>
<li>
<p>如果是字符串，遵循下列规则：</p>
<ul>
<li><p>如果字符串中只包含数字（包括前面带正号或者负号的情况），则将其转化为10进制数值（注意：前导的0会被忽略）。</p></li>
<li><p>如果字符串中包含有效的浮点数格式，如"0.1"，则将其转换为对应的浮点数值（同样忽略前导0）。</p></li>
<li><p>如果字符串中包含有效的十六进制格式，如"0xf"，则将其转换为相同大小的十进制数值。</p></li>
<li><p>如果字符串是空的（不包含任何字符），则将其转换为 0；</p></li>
<li><p>如果字符串包含除上述格式之外的字符，则将其转换为 NaN。</p></li>
</ul>
</li>
<li><p>如果是对象，则调用对象的valueOf()方法，然后依照前面的规则转换为返回的值。如果转换的结果是 NaN，则调用对象的 toString 方法，然后再次依照前面的规则转换为返回的字符串值。</p></li>
</ul>
<h3 id="articleHeader1">写在最后：</h3>
<p><code>Number</code>转换的规则在某些方面的确不够合理，但是JavaScript就是这样一门灵活至极的语言，我们在书写判断式时，千万要对各种类型的隐式转换小之又小心！?，在不确定的情况下 我们宁可牺牲判断式长度也不可做模凌两可的简单判断。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个 null>=0 不为 false 的扩散

## 原文链接
[https://segmentfault.com/a/1190000010367251](https://segmentfault.com/a/1190000010367251)

